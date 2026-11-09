import { useEffect, useState, type ReactNode } from 'react';

const STICKY_HEADER_OFFSET_PX = 72;

interface Props {
  targetId: string;
  className?: string;
  children: ReactNode;
}

export default function RevealAfterScroll({ targetId, className = '', children }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const hasScrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setIsVisible(hasScrolledPast);
      },
      { rootMargin: `-${STICKY_HEADER_OFFSET_PX}px 0px 0px 0px` }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId]);

  return (
    <div
      inert={!isVisible}
      aria-hidden={!isVisible}
      className={`transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${className}`}
    >
      {children}
    </div>
  );
}
