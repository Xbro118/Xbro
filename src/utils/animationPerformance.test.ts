import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { animationOptimizer, easingFunctions, createOptimizedTransition, createGPUAcceleratedAnimation } from './animationOptimizer';

describe('Animation Performance Tests', () => {
  let testElement: HTMLElement;

  beforeEach(() => {
    testElement = document.createElement('div');
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    animationOptimizer.cancelAllAnimations();
    document.body.removeChild(testElement);
  });

  describe('GPU Acceleration', () => {
    it('should apply GPU acceleration to animations', () => {
      const result = createGPUAcceleratedAnimation(testElement, [
        { transform: 'translateY(0)' },
        { transform: 'translateY(100px)' }
      ], { duration: 300 });

      expect(testElement.style.transform).toBe('translateZ(0)');
      expect(testElement.style.willChange).toBe('transform, opacity');
      
      result.cancel();
    });

    it('should clean up GPU acceleration after animation', async () => {
      const result = createGPUAcceleratedAnimation(testElement, [
        { opacity: 0 },
        { opacity: 1 }
      ], { duration: 100 });

      await result.finished;
      
      expect(testElement.style.willChange).toBe('auto');
    });
  });

  describe('Animation Performance', () => {
    it('should complete basic animation within expected time', async () => {
      const startTime = performance.now();
      const result = animationOptimizer.animate(testElement, [
        { transform: 'translateX(0)' },
        { transform: 'translateX(100px)' }
      ], { duration: 300 });

      await result.finished;
      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeGreaterThanOrEqual(280);
      expect(duration).toBeLessThanOrEqual(350);
    });

    it('should handle multiple concurrent animations efficiently', async () => {
      const elements = Array.from({ length: 10 }, () => {
        const el = document.createElement('div');
        document.body.appendChild(el);
        return el;
      });

      const startTime = performance.now();
      const animations = elements.map(el =>
        animationOptimizer.animate(el, [
          { transform: 'translateY(0)' },
          { transform: 'translateY(50px)' }
        ], { duration: 200 })
      );

      await Promise.all(animations.map(a => a.finished));
      const endTime = performance.now();
      const duration = endTime - startTime;

      elements.forEach(el => document.body.removeChild(el));
      
      expect(duration).toBeLessThanOrEqual(300);
      expect(animationOptimizer.getActiveAnimationCount()).toBe(0);
    });

    it('should maintain 60fps equivalent performance', async () => {
      const frameTimes: number[] = [];
      let lastFrameTime = performance.now();

      const measureFrame = () => {
        const currentTime = performance.now();
        frameTimes.push(currentTime - lastFrameTime);
        lastFrameTime = currentTime;
      };

      const result = animationOptimizer.animateWithRAF(
        testElement,
        (progress) => {
          measureFrame();
          testElement.style.transform = `translateY(${progress * 100}px)`;
        },
        300,
        easingFunctions.easeInOutCubic
      );

      await result.finished;

      const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
      const estimatedFPS = 1000 / avgFrameTime;

      expect(estimatedFPS).toBeGreaterThanOrEqual(55);
    });
  });

  describe('Easing Functions', () => {
    it('should provide smooth easing curves', () => {
      const linearProgress = easingFunctions.linear(0.5);
      const easeInOutProgress = easingFunctions.easeInOutCubic(0.5);
      const elasticProgress = easingFunctions.easeOutElastic(0.5);

      expect(linearProgress).toBe(0.5);
      expect(easeInOutProgress).toBe(0.5);
      expect(elasticProgress).toBeGreaterThan(0.5);
    });

    it('should handle edge cases correctly', () => {
      expect(easingFunctions.linear(0)).toBe(0);
      expect(easingFunctions.linear(1)).toBe(1);
      expect(easingFunctions.easeInOutCubic(0)).toBe(0);
      expect(easingFunctions.easeInOutCubic(1)).toBe(1);
    });
  });

  describe('Animation Cleanup', () => {
    it('should properly cancel animations', () => {
      const result = animationOptimizer.animate(testElement, [
        { opacity: 0 },
        { opacity: 1 }
      ], { duration: 1000 });

      result.cancel();

      expect(result.animation.playState).toBe('idle');
    });

    it('should cancel all animations for an element', () => {
      const results = [
        animationOptimizer.animate(testElement, [{ transform: 'scale(1)' }, { transform: 'scale(1.1)' }]),
        animationOptimizer.animate(testElement, [{ opacity: 0 }, { opacity: 1 }])
      ];

      animationOptimizer.cancelAllAnimations(testElement);

      results.forEach(result => {
        expect(result.animation.playState).toBe('idle');
      });
    });

    it('should cancel all animations globally', () => {
      const elements = Array.from({ length: 5 }, () => {
        const el = document.createElement('div');
        document.body.appendChild(el);
        return el;
      });

      const results = elements.map(el =>
        animationOptimizer.animate(el, [{ opacity: 0 }, { opacity: 1 }])
      );

      animationOptimizer.cancelAllAnimations();

      results.forEach(result => {
        expect(result.animation.playState).toBe('idle');
      });

      elements.forEach(el => document.body.removeChild(el));
    });
  });

  describe('Memory Management', () => {
    it('should not leak animation references', () => {
      const initialCount = animationOptimizer.getActiveAnimationCount();

      const results = Array.from({ length: 20 }, (_, i) =>
        animationOptimizer.animate(testElement, [
          { transform: `translateX(${i * 10}px)` },
          { transform: `translateX(${(i + 1) * 10}px)` }
        ], { duration: 50 })
      );

      await Promise.all(results.map(r => r.finished));

      expect(animationOptimizer.getActiveAnimationCount()).toBe(initialCount);
    });

    it('should handle rapid animation creation and cleanup', async () => {
      const promises: Promise<void>[] = [];

      for (let i = 0; i < 50; i++) {
        const result = animationOptimizer.animate(testElement, [
          { transform: `translateY(${i}px)` },
          { transform: `translateY(${i + 1}px)` }
        ], { duration: 10 });
        
        promises.push(result.finished);
      }

      await Promise.all(promises);

      expect(animationOptimizer.getActiveAnimationCount()).toBe(0);
    });
  });
});

describe('Animation Performance Benchmarks', () => {
  let testElement: HTMLElement;

  beforeEach(() => {
    testElement = document.createElement('div');
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    animationOptimizer.cancelAllAnimations();
    document.body.removeChild(testElement);
  });

  it('should maintain 60fps with simple transforms', async () => {
    const frameCount = 60;
    const frameTimes: number[] = [];
    let lastTime = performance.now();

    const measureFrame = () => {
      const currentTime = performance.now();
      frameTimes.push(currentTime - lastTime);
      lastTime = currentTime;
    };

    const promises = Array.from({ length: frameCount }, (_, i) => {
      return animationOptimizer.animate(testElement, [
        { transform: `translateY(${i}px)` },
        { transform: `translateY(${i + 1}px)` }
      ], { duration: 16 }).finished.then(measureFrame);
    });

    await Promise.all(promises);

    const avgFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
    const fps = 1000 / avgFrameTime;

    expect(fps).toBeGreaterThanOrEqual(55);
  });

  it('should handle complex animations efficiently', async () => {
    const complexKeyframes = [
      { transform: 'translate(0, 0) scale(1)', opacity: 0 },
      { transform: 'translate(50px, 50px) scale(1.2)', opacity: 0.5 },
      { transform: 'translate(100px, 100px) scale(1)', opacity: 1 }
    ];

    const startTime = performance.now();
    const result = animationOptimizer.animate(testElement, complexKeyframes, { duration: 500 });
    await result.finished;
    const endTime = performance.now();

    const duration = endTime - startTime;
    expect(duration).toBeLessThanOrEqual(600);
  });

  it('should maintain performance with multiple elements', async () => {
    const elements = Array.from({ length: 20 }, () => {
      const el = document.createElement('div');
      document.body.appendChild(el);
      return el;
    });

    const startTime = performance.now();
    const animations = elements.map(el =>
      animationOptimizer.animate(el, [
        { transform: 'translateY(0)' },
        { transform: 'translateY(20px)' }
      ], { duration: 200 })
    );

    await Promise.all(animations.map(a => a.finished));
    const endTime = performance.now();

    elements.forEach(el => document.body.removeChild(el));

    const duration = endTime - startTime;
    expect(duration).toBeLessThanOrEqual(400);
  });
});