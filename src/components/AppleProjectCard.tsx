import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import SpotlightCard from './SpotlightCard';

type Project = {
  title: string;
  category: string;
  description: string;
  stack: string[];
};

type AppleProjectCardProps = {
  project: Project;
  index: number;
  onSelect: () => void;
};

export default function AppleProjectCard({ project, index, onSelect }: AppleProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked scaling from 0.94 to 1.0 and fade in
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const cardScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.6], [0.75, 1]);

  return (
    <div ref={cardRef} className="h-full">
      <motion.div
        style={shouldReduceMotion ? undefined : { scale: cardScale, opacity: cardOpacity }}
        className="h-full transform-gpu will-change-[transform,opacity]"
        transition={{ delay: index * 0.1 }}
      >
        <SpotlightCard
          onClick={onSelect}
          className="group flex h-full cursor-pointer flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(79,70,229,0.14)] dark:hover:shadow-[0_20px_50px_rgba(99,102,241,0.25)] active:scale-[0.98]"
        >
          {/* Card Body with strict normalization across all rows */}
          <div className="flex flex-1 flex-col">
            {/* Top Row: Category Pill + Polished Interactive Arrow */}
            <div className="flex min-h-[44px] items-start justify-between gap-3">
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200/90 bg-indigo-50/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 shadow-sm dark:border-indigo-400/30 dark:bg-indigo-950/80 dark:text-indigo-300 leading-tight">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
                <span className="line-clamp-2">{project.category}</span>
              </div>

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-600 shadow-sm transition-all duration-300 group-hover:border-indigo-500 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-[0_4px_14px_rgba(79,70,229,0.35)] group-hover:scale-110 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:group-hover:border-indigo-400 dark:group-hover:bg-indigo-500 dark:group-hover:text-white">
                <FiArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </div>

            {/* Normalized Title: Exactly 2 lines height so descriptions align horizontally */}
            <h3 className="mt-4 flex items-center min-h-[3.5rem] sm:min-h-[4.125rem] text-xl sm:text-2xl font-black tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-200 line-clamp-2 leading-snug">
              {project.title}
            </h3>

            {/* Normalized Description: Exactly 4 lines height */}
            <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-4 min-h-[5rem]">
              {project.description}
            </p>
          </div>

          {/* Bottom Row: Tech Stack with uniform baseline height */}
          <div className="mt-6 border-t border-slate-200/80 dark:border-white/10 pt-4">
            <div className="flex flex-wrap content-start items-center gap-1.5 min-h-[3.5rem]">
              {project.stack.slice(0, 4).map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 transition group-hover:border-indigo-200 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 dark:group-hover:border-indigo-500/40"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </div>
  );
}
