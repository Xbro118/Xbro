import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  isHealthy: boolean;
}

export function usePerformanceMonitor(threshold: number = 55) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    isHealthy: true
  });
  
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const animationFrameRef = useRef<number>();
  const fpsHistoryRef = useRef<number[]>([]);

  useEffect(() => {
    const measurePerformance = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTimeRef.current;
      
      frameCountRef.current++;
      
      if (deltaTime >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / deltaTime);
        const frameTime = deltaTime / frameCountRef.current;
        
        fpsHistoryRef.current.push(fps);
        if (fpsHistoryRef.current.length > 10) {
          fpsHistoryRef.current.shift();
        }
        
        const avgFps = fpsHistoryRef.current.reduce((a, b) => a + b, 0) / fpsHistoryRef.current.length;
        
        setMetrics({
          fps: Math.round(avgFps),
          frameTime: Math.round(frameTime * 100) / 100,
          isHealthy: avgFps >= threshold
        });
        
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }
      
      animationFrameRef.current = requestAnimationFrame(measurePerformance);
    };

    animationFrameRef.current = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [threshold]);

  return metrics;
}

interface PerformanceMonitorProps {
  show?: boolean;
  threshold?: number;
}

export function PerformanceMonitor({ show = false, threshold = 55 }: PerformanceMonitorProps) {
  const metrics = usePerformanceMonitor(threshold);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-xl font-mono text-xs z-50 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-3 h-3 rounded-full ${metrics.isHealthy ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="font-bold">性能监控</span>
      </div>
      <div className="space-y-1">
        <div>FPS: <span className={metrics.isHealthy ? 'text-green-400' : 'text-red-400'}>{metrics.fps}</span></div>
        <div>帧时间: <span className={metrics.isHealthy ? 'text-green-400' : 'text-red-400'}>{metrics.frameTime}ms</span></div>
        <div>状态: <span className={metrics.isHealthy ? 'text-green-400' : 'text-red-400'}>{metrics.isHealthy ? '良好' : '需要优化'}</span></div>
      </div>
    </div>
  );
}

export function withPerformanceMonitor<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  threshold: number = 55
) {
  return function WithPerformanceMonitor(props: P) {
    const metrics = usePerformanceMonitor(threshold);
    
    return (
      <>
        <WrappedComponent {...props} />
        <PerformanceMonitor show={process.env.NODE_ENV === 'development'} threshold={threshold} />
      </>
    );
  };
}