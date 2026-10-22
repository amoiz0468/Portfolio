import { useRef, ReactNode, MouseEvent } from 'react';

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  onClick?: () => void;
};

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(99, 102, 241, 0.14)',
  onClick,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !spotlightRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.background = `radial-gradient(550px circle at ${x}px ${y}px, ${spotlightColor}, transparent 40%)`;
  };

  const handleMouseEnter = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`spotlight-card relative overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] hover:border-indigo-500/40 dark:hover:border-indigo-400/50 hover:shadow-[0_14px_40px_rgba(79,70,229,0.12)] dark:hover:shadow-[0_20px_50px_rgba(99,102,241,0.25)] ${
        className.includes('p-') ? '' : 'p-4 sm:p-7'
      } ${className}`}
    >
      {/* High-speed Direct DOM Spotlight Layer (Zero React component re-render overhead) */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 will-change-[background,opacity]"
      />
      <div className="relative z-10 h-full flex flex-col justify-between">{children}</div>
    </div>
  );
}
