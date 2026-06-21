'use client';
import { getSkillMeta } from '@/helpers/skillIcons';

interface SkillBadgeProps {
  skill: string;
  size?: 'sm' | 'md' | 'lg';
  colorVariant?: string; // optional tailwind colour classes override
}

const sizeMap = {
  sm: { pill: 'px-2.5 py-1.5 text-[11px] gap-1.5', icon: 16 },
  md: { pill: 'px-3.5 py-2 text-xs gap-2',          icon: 18 },
  lg: { pill: 'px-4 py-2.5 text-sm gap-2.5',        icon: 22 },
};

export default function SkillBadge({
  skill,
  size = 'md',
  colorVariant,
}: SkillBadgeProps) {
  const meta = getSkillMeta(skill);
  const { pill, icon: iconSize } = sizeMap[size];

  // For Next.js dark mode: white icons on dark background look best for
  // brands that are normally black (e.g. Next.js, Express, GitHub).
  const isDarkBrand =
    meta?.color === '#000000' || meta?.color === '#181717' ||
    meta?.color === '#2D3748' || meta?.color === '#010101';

  const defaultClasses = `
    inline-flex items-center font-semibold rounded-xl border 
    border-gray-200/70 dark:border-white/10 
    bg-white/70 dark:bg-white/5 
    text-gray-700 dark:text-gray-300 
    hover:border-blue-300 dark:hover:border-blue-500 
    hover:text-blue-600 dark:hover:text-blue-400 
    hover:bg-blue-50 dark:hover:bg-blue-950/30 
    hover:scale-105 transition-all duration-200 cursor-default backdrop-blur-sm
  `;

  return (
    <span className={`${defaultClasses} ${pill} ${colorVariant ?? ''}`}>
      {meta ? (
        <meta.icon
          size={iconSize}
          style={{
            color: isDarkBrand ? undefined : meta.color,
            flexShrink: 0,
          }}
          className={isDarkBrand ? 'dark:text-white text-gray-800' : ''}
        />
      ) : (
        /* generic code icon for unrecognised skills */
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="flex-shrink-0 opacity-50"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      )}
      {skill}
    </span>
  );
}
