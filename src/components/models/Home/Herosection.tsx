/* eslint-disable react/no-unescaped-entities */
'use client';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import Typewriter from '@/components/ui/typewriter';
import { User } from '@/types/user';
import Image from 'next/image';
import { snakeToProfession } from '@/helpers/sanakeToProfe';
import { Profession } from '@/types/Profile.data';

// ── Animated background orbs ──────────────────────────────────────────────────
function BackgroundOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Top-left large orb */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-10"
        style={{
          background:
            'radial-gradient(circle, oklch(0.65 0.22 264) 0%, transparent 70%)',
          animation: 'orb-drift-1 12s ease-in-out infinite',
        }}
      />
      {/* Bottom-right accent orb */}
      <div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-15 dark:opacity-10"
        style={{
          background:
            'radial-gradient(circle, oklch(0.65 0.25 310) 0%, transparent 70%)',
          animation: 'orb-drift-2 16s ease-in-out infinite',
        }}
      />
      {/* Center accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-5 dark:opacity-5"
        style={{
          background:
            'radial-gradient(circle, oklch(0.75 0.18 180) 0%, transparent 70%)',
          animation: 'orb-drift-3 20s ease-in-out infinite',
        }}
      />
    </div>
  );
}

// ── Floating dot grid decoration ──────────────────────────────────────────────
function DotGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
      style={{
        backgroundImage: `radial-gradient(circle, oklch(0.4 0 0) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
      }}
    />
  );
}

// ── Animated stat badge ───────────────────────────────────────────────────────
function StatBadge({
  value,
  label,
  delay = 0,
}: {
  value: string;
  label: string;
  delay?: number;
}) {
  return (
    <div
      className="flex flex-col items-center px-5 py-3 rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-sm"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent leading-none">
        {value}
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
}

// ── Social icon button ────────────────────────────────────────────────────────
function SocialBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:scale-110 transition-all duration-200 backdrop-blur-sm shadow-sm"
    >
      {children}
    </a>
  );
}

// ── Main Hero section ─────────────────────────────────────────────────────────
export default function Herosection({ user }: { user: User }) {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax tilt on mouse move (subtle)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;

      const orbs = section.querySelectorAll<HTMLElement>('.hero-orb');
      orbs.forEach((orb, i) => {
        const strength = (i + 1) * 18;
        orb.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      });
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const professionLabel = snakeToProfession(
    (user?.profession || '') as Profession
  );
  const professions = professionLabel ? [professionLabel] : ['Developer'];

  return (
    <>
      {/* Keyframe animations injected once */}
      <style>{`
        @keyframes orb-drift-1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(60px, -40px) scale(1.08); }
          66%      { transform: translate(-30px, 50px) scale(0.95); }
        }
        @keyframes orb-drift-2 {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(-50px, 30px) scale(1.06); }
          70%      { transform: translate(40px, -60px) scale(0.97); }
        }
        @keyframes orb-drift-3 {
          0%,100% { transform: translate(-50%,-50%) scale(1); }
          50%      { transform: translate(-50%,-50%) scale(1.3); }
        }
        @keyframes avatar-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }
        @keyframes badge-pop {
          0%   { opacity:0; transform:scale(0.8) translateY(16px); }
          100% { opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes hero-fade-up {
          0%   { opacity:0; transform:translateY(28px); }
          100% { opacity:1; transform:translateY(0); }
        }
        @keyframes scroll-bounce {
          0%,100% { transform:translateY(0); opacity:1; }
          50%     { transform:translateY(8px); opacity:0.4; }
        }
        @keyframes ring-spin {
          to { transform: rotate(360deg); }
        }
        .hero-text-animate {
          opacity:0;
          animation: hero-fade-up 0.7s ease forwards;
        }
        .avatar-float {
          animation: avatar-float 5s ease-in-out infinite;
        }
        .scroll-bounce {
          animation: scroll-bounce 1.8s ease-in-out infinite;
        }
        .ring-spin {
          animation: ring-spin 12s linear infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* ── Decorative background ── */}
        <BackgroundOrbs />
        <DotGrid />

        {/* ── Main content grid ── */}
        <div className="relative z-10 max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-24 pb-16 lg:pt-28">

          {/* ── LEFT: Text content ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Available badge */}
            <div
              className="hero-text-animate inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm shadow-sm"
              style={{ animationDelay: '0.05s' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for opportunities
            </div>

            {/* Greeting + name */}
            <h1
              className="hero-text-animate text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-4"
              style={{ animationDelay: '0.15s' }}
            >
              <span className="text-gray-800 dark:text-white">Hi, I&apos;m</span>
              <br />
              <span
                className="bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent"
                style={{ WebkitBackgroundClip: 'text' }}
              >
                <Typewriter
                  texts={[user?.name || 'Developer']}
                  speed={90}
                  deleteSpeed={80}
                  pauseTime={4000}
                  className="inherit"
                />
              </span>
            </h1>

            {/* Profession typewriter */}
            <div
              className="hero-text-animate flex items-center gap-2 mb-6 h-10"
              style={{ animationDelay: '0.25s' }}
            >
              <span className="w-8 h-px bg-gradient-to-r from-blue-500 to-violet-500 rounded-full hidden sm:block" />
              <p className="text-xl sm:text-2xl font-semibold text-gray-600 dark:text-gray-300">
                <Typewriter
                  texts={professions}
                  speed={80}
                  deleteSpeed={50}
                  pauseTime={3000}
                />
              </p>
            </div>

            {/* Bio */}
            <p
              className="hero-text-animate text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg mb-8"
              style={{ animationDelay: '0.35s' }}
            >
              {user?.bio ||
                'Building premium digital experiences with modern technologies. Passionate about clean code, performance, and great design.'}
            </p>

            {/* CTA buttons */}
            <div
              className="hero-text-animate flex flex-col sm:flex-row gap-4 mb-10"
              style={{ animationDelay: '0.45s' }}
            >
              <Link
                href="/projects"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {/* Arrow icon */}
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  View My Work
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-200 font-semibold text-sm backdrop-blur-sm hover:bg-white dark:hover:bg-white/10 hover:scale-[1.03] active:scale-[0.98] hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-200 shadow-sm"
              >
                {/* Mail icon */}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get In Touch
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="hero-text-animate flex flex-wrap gap-3 justify-center lg:justify-start"
              style={{ animationDelay: '0.55s' }}
            >
              <StatBadge
                value={`${user?.projects?.length ?? 0}+`}
                label="Projects"
              />
              <StatBadge
                value={user?.experience ? `${user.experience}` : '2+'}
                label="Yrs Exp"
              />
              <StatBadge
                value={`${user?.skills?.length ?? 0}+`}
                label="Skills"
              />
            </div>
          </div>

          {/* ── RIGHT: Avatar ── */}
          <div className="flex justify-center lg:justify-end relative">

            {/* Spinning dashed ring */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden
            >
              <div
                className="ring-spin w-[360px] h-[360px] rounded-full border-2 border-dashed border-blue-300/40 dark:border-blue-600/30"
              />
            </div>

            {/* Second slower ring */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden
            >
              <div
                style={{ animation: 'ring-spin 20s linear infinite reverse' }}
                className="w-[310px] h-[310px] rounded-full border border-violet-300/30 dark:border-violet-600/20"
              />
            </div>

            {/* Glow blob behind avatar */}
            <div
              className="absolute w-72 h-72 rounded-full opacity-20 dark:opacity-15 blur-3xl -z-10"
              style={{
                background:
                  'radial-gradient(circle, oklch(0.65 0.22 264) 0%, oklch(0.65 0.25 310) 100%)',
              }}
            />

            {/* Avatar card */}
            <div className="avatar-float relative">
              {/* Glassmorphism frame */}
              <div className="p-2 rounded-full bg-gradient-to-br from-blue-500/30 via-violet-500/20 to-fuchsia-500/30 backdrop-blur-sm shadow-2xl">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white/50 dark:border-white/10 shadow-2xl">
                  <Image
                    src={user?.picture || '/placeholder.jpg'}
                    alt={user?.name || 'Profile Picture'}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Subtle shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                </div>
              </div>

              {/* Floating tech badge – top right */}
              <div
                className="absolute -top-3 -right-3 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-white/10 text-xs font-bold text-blue-600 dark:text-blue-400 backdrop-blur-sm"
                style={{ animation: 'badge-pop 0.6s ease 0.8s both' }}
              >
                💻 Full Stack
              </div>

              {/* Floating open-to-work badge – bottom left */}
              <div
                className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-white/10 text-xs font-bold text-emerald-600 dark:text-emerald-400 backdrop-blur-sm flex items-center gap-1.5"
                style={{ animation: 'badge-pop 0.6s ease 1s both' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Open to Work
              </div>
            </div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600">
          <span className="text-[10px] font-semibold tracking-widest uppercase opacity-60">
            Scroll
          </span>
          <div className="scroll-bounce">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
}
