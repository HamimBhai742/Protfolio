'use client';

import { useState, useEffect } from 'react';

interface IntroLoaderProps {
  name: string;
}

export default function IntroLoader({ name }: IntroLoaderProps) {
  const [show, setShow] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if the user has visited in this session
    const hasVisited = sessionStorage.getItem('portfolio_intro_visited');
    if (hasVisited === 'true') {
      setShow(false);
      return;
    }
    
    // Otherwise show the intro loader
    setShow(true);
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Increment progress bar smoothly
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 38); // 38ms * 100 = ~3800ms

    // Trigger fade-out transition after 4.4 seconds
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
    }, 4400);

    // Completely unmount and restore scrolling after 5.0 seconds
    const endTimeout = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('portfolio_intro_visited', 'true');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimeout);
      clearTimeout(endTimeout);
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const handleSkip = () => {
    setFadeOut(true);
    setTimeout(() => {
      setShow(false);
      sessionStorage.setItem('portfolio_intro_visited', 'true');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }, 400);
  };

  if (show === false || show === null) return null;

  const displayName = name.toUpperCase();
  const letters = displayName.split('');

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-white transition-opacity duration-500 ease-out select-none ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* CSS Keyframes for premium animations */}
      <style>{`
        @keyframes letter-entrance {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.15;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1.15);
          }
        }
        .intro-letter {
          display: inline-block;
          animation: letter-entrance 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        .glowing-orb {
          background: radial-gradient(circle, oklch(0.511 0.241 264) 0%, transparent 70%);
          animation: glow-pulse 6s ease-in-out infinite;
        }
        .shimmer-text {
          background: linear-gradient(
            to right,
            #94a3b8 20%,
            #ffffff 40%,
            #ffffff 60%,
            #94a3b8 80%
          );
          background-size: 200% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          animation: textShimmer 4s linear infinite;
        }
        @keyframes textShimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full glowing-orb blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-2xl -z-10 pointer-events-none animate-pulse" />

      {/* Top Welcome Title */}
      <div className="absolute top-16 text-center animate-fade-in opacity-80">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-400">
          Welcome to my digital space
        </p>
      </div>

      {/* Central Typographic Brand Display */}
      <div className="text-center space-y-4 px-6">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-[0.18em] leading-none text-center select-none flex flex-wrap justify-center">
          {letters.map((char, index) => (
            <span
              key={index}
              className="intro-letter shimmer-text"
              style={{
                animationDelay: `${150 + index * 100}ms`,
                marginRight: char === ' ' ? '1.5rem' : '0.05rem',
              }}
            >
              {char}
            </span>
          ))}
        </h1>
        <p
          className="text-sm font-semibold tracking-[0.4em] uppercase text-slate-400 opacity-0"
          style={{
            animation: 'letter-entrance 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards',
            animationDelay: `${letters.length * 100 + 400}ms`,
          }}
        >
          Creative Portfolio & Showcases
        </p>
      </div>

      {/* Bottom Loading Indicator */}
      <div className="absolute bottom-24 w-64 max-w-xs flex flex-col items-center space-y-3">
        <div className="flex justify-between w-full text-xs font-mono font-bold tracking-widest text-slate-500">
          <span>INITIALIZING</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-[3px] bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Skip Button (Fades in after 1.5s) */}
      <button
        onClick={handleSkip}
        className="absolute bottom-10 right-10 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white px-4 py-2 rounded-lg border border-slate-800/80 hover:border-slate-600 bg-slate-900/40 backdrop-blur-sm transition-all duration-300 hover:cursor-pointer"
        style={{
          animation: 'letter-entrance 1.0s ease forwards',
          animationDelay: '1500ms',
          opacity: 0,
        }}
      >
        Skip Intro
      </button>
    </div>
  );
}
