/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Typewriter from '@/components/ui/typewriter';
import { User } from '@/types/user';
import SkillBadge from '@/components/ui/SkillBadge';
import ScrollReveal from '@/components/shared/ScrollReveal';

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCard({
  value,
  label,
  accent,
}: {
  value: string | number;
  label: string;
  accent: string;
}) {
  return (
    <div className="relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/30 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
      {/* Glow blob */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl ${accent}`}
      />
      <span className={`text-4xl font-black mb-1 ${accent.replace('bg-', 'text-')}`}>
        {value}
      </span>
      <span className="text-xs font-semibold tracking-widest uppercase text-gray-500 dark:text-gray-400">
        {label}
      </span>
    </div>
  );
}

export default function AboutSection({ user }: { user: User }) {
  const skills = user?.skills || [];
  const displaySkills = skills.slice(0, 12); // show max 12 on homepage

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* ── Background gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-violet-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 -z-10" />
      {/* Decorative orb */}
      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-violet-400/10 dark:bg-violet-600/5 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-blue-400/10 dark:bg-blue-600/5 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800/60 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              Who I Am
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
              About{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto">
              A quick snapshot of who I am, what I do, and the tools I love.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── LEFT: Bio + skills ── */}
          <ScrollReveal direction="left" delay={200} className="space-y-8">
            {/* Profession typewriter */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl border border-gray-200/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-sm shadow-sm">
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">I'm an expert in</span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 min-w-[120px]">
                <Typewriter
                  texts={skills.length > 0 ? skills : ['Web Development']}
                  speed={90}
                  deleteSpeed={55}
                  pauseTime={2000}
                />
              </span>
            </div>

            {/* Bio text */}
            <div className="relative p-6 rounded-2xl border border-white/30 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-sm">
              {/* Decorative quote mark */}
              <div className="absolute -top-3 left-6 text-6xl text-blue-200 dark:text-blue-900/60 font-serif leading-none select-none">"</div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base relative">
                {user?.bio
                  ? user.bio.length > 280
                    ? user.bio.slice(0, 280) + '…'
                    : user.bio
                  : 'Passionate developer building premium digital experiences with modern technologies. I love clean code, great design, and solving real problems.'}
              </p>
            </div>

            {/* Skills pills with icons */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-3">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {displaySkills.map((skill, i) => (
                  <SkillBadge key={i} skill={skill} size="sm" />
                ))}
                {skills.length > 12 && (
                  <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-xl border border-dashed border-gray-300 dark:border-white/10 text-gray-400 dark:text-gray-500">
                    +{skills.length - 12} more
                  </span>
                )}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              View Full Profile
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </ScrollReveal>

          {/* ── RIGHT: Stats + highlights ── */}
          <ScrollReveal direction="right" delay={300} className="space-y-6">
            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                value={`${user?.projects?.length ?? 0}+`}
                label="Projects Completed"
                accent="bg-blue-500 text-blue-600 dark:text-blue-400"
              />
              <StatCard
                value={user?.experience ? `${user.experience}+` : '2+'}
                label="Years Experience"
                accent="bg-violet-500 text-violet-600 dark:text-violet-400"
              />
              <StatCard
                value={`${user?.skills?.length ?? 0}+`}
                label="Skills Mastered"
                accent="bg-indigo-500 text-indigo-600 dark:text-indigo-400"
              />
              <StatCard
                value="100%"
                label="Client Satisfaction"
                accent="bg-emerald-500 text-emerald-600 dark:text-emerald-400"
              />
            </div>

            {/* Highlights card */}
            <div className="p-6 rounded-2xl border border-white/30 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-sm space-y-4">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-4">
                What I Bring
              </p>
              {[
                { icon: '🎯', title: 'Clean Code', desc: 'Maintainable, well-structured, and scalable' },
                { icon: '🚀', title: 'Performance First', desc: 'Optimized for speed and great user experience' },
                { icon: '🎨', title: 'Beautiful UI', desc: 'Modern, responsive, and accessible designs' },
                { icon: '🤝', title: 'Collaborative', desc: 'Team player with strong communication skills' },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/60 dark:hover:bg-white/5 transition-colors duration-200"
                >
                  <span className="text-xl mt-0.5 select-none">{item.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-white">{item.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

