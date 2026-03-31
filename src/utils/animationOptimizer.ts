export interface AnimationOptions {
  duration?: number;
  easing?: string;
  delay?: number;
  fillMode?: 'forwards' | 'backwards' | 'both' | 'none';
}

export interface AnimationResult {
  element: HTMLElement;
  animation: Animation;
  cancel: () => void;
  finished: Promise<void>;
}

export class AnimationOptimizer {
  private static instance: AnimationOptimizer;
  private activeAnimations: Map<HTMLElement, Animation[]> = new Map();
  private frameRequest: number | null = null;
  private lastFrameTime: number = 0;
  private frameCount: number = 0;

  private constructor() {
    this.startFrameMonitoring();
  }

  static getInstance(): AnimationOptimizer {
    if (!AnimationOptimizer.instance) {
      AnimationOptimizer.instance = new AnimationOptimizer();
    }
    return AnimationOptimizer.instance;
  }

  private startFrameMonitoring() {
    const monitorFrame = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - this.lastFrameTime;
      
      if (deltaTime >= 1000) {
        const fps = Math.round((this.frameCount * 1000) / deltaTime);
        
        if (fps < 30) {
          this.reduceAnimationComplexity();
        }
        
        this.frameCount = 0;
        this.lastFrameTime = currentTime;
      }
      
      this.frameCount++;
      this.frameRequest = requestAnimationFrame(monitorFrame);
    };

    this.frameRequest = requestAnimationFrame(monitorFrame);
  }

  private reduceAnimationComplexity() {
    this.activeAnimations.forEach((animations, element) => {
      animations.forEach(animation => {
        if (animation.playState === 'running') {
          animation.updatePlaybackRate(0.5);
        }
      });
    });
  }

  public animate(
    element: HTMLElement,
    keyframes: Keyframe[] | PropertyIndexedKeyframes,
    options: AnimationOptions = {}
  ): AnimationResult {
    const {
      duration = 300,
      easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
      delay = 0,
      fillMode = 'forwards'
    } = options;

    const animation = element.animate(keyframes, {
      duration,
      easing,
      delay,
      fill: fillMode
    });

    if (!this.activeAnimations.has(element)) {
      this.activeAnimations.set(element, []);
    }
    this.activeAnimations.get(element)!.push(animation);

    animation.onfinish = () => {
      const animations = this.activeAnimations.get(element);
      if (animations) {
        const index = animations.indexOf(animation);
        if (index > -1) {
          animations.splice(index, 1);
        }
      }
    };

    return {
      element,
      animation,
      cancel: () => animation.cancel(),
      finished: animation.finished
    };
  }

  public animateWithRAF(
    element: HTMLElement,
    update: (progress: number) => void,
    duration: number = 300,
    easing: (t: number) => number = (t) => t
  ): AnimationResult {
    const startTime = performance.now();
    let cancelled = false;

    const animate = (currentTime: number) => {
      if (cancelled) return;

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);

      update(easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const frameId = requestAnimationFrame(animate);

    const animation = {
      cancel: () => {
        cancelled = true;
        cancelAnimationFrame(frameId);
      },
      finished: new Promise<void>((resolve) => {
        setTimeout(resolve, duration);
      })
    } as Animation;

    if (!this.activeAnimations.has(element)) {
      this.activeAnimations.set(element, []);
    }
    this.activeAnimations.get(element)!.push(animation);

    return {
      element,
      animation,
      cancel: animation.cancel,
      finished: animation.finished
    };
  }

  public cancelAllAnimations(element?: HTMLElement) {
    if (element) {
      const animations = this.activeAnimations.get(element);
      if (animations) {
        animations.forEach(animation => animation.cancel?.());
        this.activeAnimations.delete(element);
      }
    } else {
      this.activeAnimations.forEach((animations) => {
        animations.forEach(animation => animation.cancel?.());
      });
      this.activeAnimations.clear();
    }
  }

  public getActiveAnimationCount(): number {
    let count = 0;
    this.activeAnimations.forEach((animations) => {
      count += animations.filter(a => a.playState === 'running').length;
    });
    return count;
  }

  public destroy() {
    if (this.frameRequest) {
      cancelAnimationFrame(this.frameRequest);
    }
    this.cancelAllAnimations();
  }
}

export const animationOptimizer = AnimationOptimizer.getInstance();

export const easingFunctions = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => 1 - (--t) * t * t * t,
  easeInOutQuart: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  easeInQuint: (t: number) => t * t * t * t * t,
  easeOutQuint: (t: number) => 1 + (--t) * t * t * t * t,
  easeInOutQuint: (t: number) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
  easeInElastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
  },
  easeOutElastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
  easeInOutElastic: (t: number) => {
    const c5 = (2 * Math.PI) / 4.5;
    return t === 0 ? 0 : t === 1 ? 1 : t < 0.5
      ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2
      : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1;
  }
};

export function createOptimizedTransition(
  element: HTMLElement,
  properties: Record<string, string>,
  options: AnimationOptions = {}
): AnimationResult {
  return animationOptimizer.animate(element, properties, options);
}

export function createGPUAcceleratedAnimation(
  element: HTMLElement,
  keyframes: Keyframe[],
  options: AnimationOptions = {}
): AnimationResult {
  element.style.transform = 'translateZ(0)';
  element.style.willChange = 'transform, opacity';
  
  const result = animationOptimizer.animate(element, keyframes, options);
  
  result.finished.then(() => {
    element.style.willChange = 'auto';
  });
  
  return result;
}

export function createStaggeredAnimation(
  elements: HTMLElement[],
  keyframes: Keyframe[],
  options: AnimationOptions & { stagger?: number } = {}
): AnimationResult[] {
  const { stagger = 50, ...animationOptions } = options;
  
  return elements.map((element, index) => {
    return animationOptimizer.animate(element, keyframes, {
      ...animationOptions,
      delay: (animationOptions.delay || 0) + (index * stagger)
    });
  });
}

export function createScrollTriggeredAnimation(
  element: HTMLElement,
  keyframes: Keyframe[],
  options: AnimationOptions = {},
  threshold: number = 0.5
): { result: AnimationResult; observer: IntersectionObserver } {
  const result = animationOptimizer.animate(element, keyframes, {
    ...options,
    duration: 0
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animationOptimizer.animate(element, keyframes, options);
          observer.unobserve(element);
        }
      });
    },
    { threshold }
  );

  observer.observe(element);

  return { result, observer };
}