import { useState, useEffect, useRef, useCallback } from 'react';

interface Announcement {
  title: string;
  url: string;
}

interface ScrollingTickerProps {
  announcements: Announcement[];
  className?: string;
}

const bulletColors = [
  'from-amber-500 to-amber-600',
  'from-emerald-500 to-emerald-600',
  'from-blue-500 to-blue-600',
  'from-purple-500 to-purple-600',
  'from-rose-500 to-rose-600',
  'from-cyan-500 to-cyan-600',
  'from-orange-500 to-orange-600',
  'from-pink-500 to-pink-600',
  'from-teal-500 to-teal-600',
  'from-indigo-500 to-indigo-600',
  'from-violet-500 to-violet-600',
  'from-fuchsia-500 to-fuchsia-600',
  'from-lime-500 to-lime-600',
  'from-sky-500 to-sky-600',
  'from-red-500 to-red-600'
];

export default function ScrollingTicker({ announcements, className = '' }: ScrollingTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [itemHeights, setItemHeights] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationRef = useRef<number>();

  const measureItemHeights = useCallback(() => {
    const heights = itemRefs.current.map(ref => ref?.offsetHeight || 56);
    setItemHeights(heights);
  }, []);

  useEffect(() => {
    measureItemHeights();
    const resizeObserver = new ResizeObserver(measureItemHeights);
    
    itemRefs.current.forEach(ref => {
      if (ref) resizeObserver.observe(ref);
    });

    return () => resizeObserver.disconnect();
  }, [announcements.length, measureItemHeights]);

  useEffect(() => {
    let lastTime = performance.now();
    let accumulatedTime = 0;
    const interval = 3000;

    const animate = (currentTime: number) => {
      if (!isPaused && hoveredIndex === null) {
        const deltaTime = currentTime - lastTime;
        accumulatedTime += deltaTime;

        if (accumulatedTime >= interval) {
          setCurrentIndex(prev => (prev + 1) % announcements.length);
          accumulatedTime = 0;
        }
      }
      lastTime = currentTime;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused, hoveredIndex, announcements.length]);

  useEffect(() => {
    if (contentRef.current && containerRef.current && itemHeights.length > 0) {
      const containerHeight = containerRef.current.clientHeight - 80;
      const activeItemHeight = itemHeights[currentIndex] || 56;
      const centerOffset = (containerHeight - activeItemHeight) / 2;
      
      let translateY = 0;
      for (let i = 0; i < currentIndex; i++) {
        translateY += itemHeights[i] || 56;
      }
      translateY -= centerOffset;
      
      contentRef.current.style.transform = `translateY(${-translateY}px)`;
    }
  }, [currentIndex, itemHeights]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleClick = (url: string, event: React.MouseEvent) => {
    event.stopPropagation();
    window.open(url, '_blank');
  };

  const handleWheel = (event: React.WheelEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleScroll = (event: React.UIEvent) => {
    event.stopPropagation();
  };

  const handleContainerMouseEnter = () => {
    setIsPaused(true);
  };

  const handleContainerMouseLeave = () => {
    setIsPaused(false);
    setHoveredIndex(null);
  };

  return (
    <div 
      ref={containerRef}
      className={`relative bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl shadow-lg overflow-hidden ${className}`}
      style={{
        height: '320px',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
      onWheel={handleWheel}
      onScroll={handleScroll}
    >
      <div className="absolute top-2 left-3 px-3 py-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-bold text-xs rounded-full shadow-md z-20 pointer-events-none">
        📢 黄檗文化资讯
      </div>
      
      <div 
        className="flex-1 overflow-hidden relative mt-8 px-3 pb-2"
        onWheel={handleWheel}
        onScroll={handleScroll}
      >
        <div 
          ref={contentRef}
          className="flex flex-col space-y-2 py-2 transition-transform duration-500 ease-out"
          style={{
            willChange: 'transform'
          }}
        >
          {announcements.map((announcement, index) => {
            const isActive = index === currentIndex;
            const isHovered = hoveredIndex === index;
            const isBlurred = hoveredIndex !== null && hoveredIndex !== index;
            const bulletColor = bulletColors[index % bulletColors.length];

            return (
              <div
                key={index}
                ref={(el) => (itemRefs.current[index] = el)}
                className={`
                  relative transition-all duration-500 ease-out
                  ${isHovered ? 'scale-105 z-10' : ''}
                  ${isBlurred ? 'opacity-30 blur-sm' : ''}
                `}
                style={{
                  opacity: hoveredIndex === null ? (isActive ? 1 : 0.5) : (isHovered ? 1 : 0.3),
                  transform: `scale(${hoveredIndex === null ? (isActive ? 1.02 : 1) : (isHovered ? 1.05 : 1)})`,
                  minHeight: '48px'
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-300 cursor-pointer
                    ${isActive ? 'bg-gradient-to-r from-amber-50 to-white shadow-lg border-2 border-amber-300' : 'bg-white/40 hover:bg-white/60 border-2 border-transparent'}
                    ${isHovered ? 'bg-gradient-to-r from-amber-100 to-amber-50 shadow-xl border-amber-400' : ''}
                  `}
                  onClick={(e) => handleClick(announcement.url, e)}
                  onWheel={handleWheel}
                >
                  <div className={`
                    flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br ${bulletColor} shadow-md
                    transition-all duration-300
                    ${isActive ? 'w-3 h-3 scale-125' : ''}
                    ${isHovered ? 'w-3 h-3 scale-150' : ''}
                  `}></div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`
                      text-sm md:text-base font-medium leading-relaxed
                      transition-all duration-300
                      ${isActive ? 'text-stone-900 font-semibold' : 'text-stone-600'}
                      ${isHovered ? 'text-amber-800 font-bold' : ''}
                    `}>
                      {announcement.title}
                    </p>
                  </div>

                  {isActive && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>

                {isActive && hoveredIndex === null && (
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent bottom-0 rounded-full"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
