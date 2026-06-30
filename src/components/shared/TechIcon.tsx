'use client';

import React from 'react';
import { 
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, 
  FaGithub, FaDocker, FaAws, FaPython, FaGitAlt, FaJava, FaRust 
} from 'react-icons/fa';
import { 
  SiNextdotjs, SiMongodb, SiTailwindcss, SiPostgresql, SiTypescript, 
  SiRedux, SiFigma, SiExpress, SiGraphql, SiFirebase, SiPrisma, 
  SiMysql, SiNestjs, SiDjango, SiGooglecloud, SiVercel, SiSvelte, 
  SiVuedotjs, SiWebpack, SiKubernetes 
} from 'react-icons/si';
import { TbBrandThreejs, TbBrandSupabase, TbBrandReactNative, TbBrandFlutter } from 'react-icons/tb';
import { FiCpu } from 'react-icons/fi';

interface TechIconProps {
  tech: string;
  size?: number;
  showName?: boolean;
}

export default function TechIcon({ tech, size = 16, showName = true }: TechIconProps) {
  const normalized = tech.toLowerCase().trim().replace(/[\s.-]/g, '');

  let IconComponent = FiCpu;
  let colorClass = 'text-gray-400 dark:text-gray-500';

  // Mapping configurations
  switch (normalized) {
    case 'react':
    case 'reactjs':
      IconComponent = FaReact;
      colorClass = 'text-sky-400';
      break;
    case 'reactnative':
      IconComponent = TbBrandReactNative;
      colorClass = 'text-sky-500';
      break;
    case 'next':
    case 'nextjs':
      IconComponent = SiNextdotjs;
      colorClass = 'text-black dark:text-white';
      break;
    case 'node':
    case 'nodejs':
      IconComponent = FaNodeJs;
      colorClass = 'text-green-500';
      break;
    case 'express':
    case 'expressjs':
      IconComponent = SiExpress;
      colorClass = 'text-gray-600 dark:text-gray-400';
      break;
    case 'mongodb':
    case 'mongo':
      IconComponent = SiMongodb;
      colorClass = 'text-emerald-500';
      break;
    case 'tailwind':
    case 'tailwindcss':
      IconComponent = SiTailwindcss;
      colorClass = 'text-cyan-400';
      break;
    case 'typescript':
    case 'ts':
      IconComponent = SiTypescript;
      colorClass = 'text-blue-500';
      break;
    case 'javascript':
    case 'js':
      IconComponent = FaJs;
      colorClass = 'text-yellow-500';
      break;
    case 'html':
    case 'html5':
      IconComponent = FaHtml5;
      colorClass = 'text-orange-500';
      break;
    case 'css':
    case 'css3':
      IconComponent = FaCss3Alt;
      colorClass = 'text-blue-600';
      break;
    case 'postgresql':
    case 'postgres':
      IconComponent = SiPostgresql;
      colorClass = 'text-blue-400';
      break;
    case 'mysql':
      IconComponent = SiMysql;
      colorClass = 'text-blue-600 dark:text-blue-500';
      break;
    case 'firebase':
      IconComponent = SiFirebase;
      colorClass = 'text-amber-500';
      break;
    case 'supabase':
      IconComponent = TbBrandSupabase;
      colorClass = 'text-emerald-450';
      break;
    case 'redux':
    case 'reduxtoolkit':
      IconComponent = SiRedux;
      colorClass = 'text-purple-500';
      break;
    case 'graphql':
      IconComponent = SiGraphql;
      colorClass = 'text-pink-655';
      break;
    case 'prisma':
      IconComponent = SiPrisma;
      colorClass = 'text-blue-900 dark:text-blue-100';
      break;
    case 'nestjs':
      IconComponent = SiNestjs;
      colorClass = 'text-red-600';
      break;
    case 'django':
      IconComponent = SiDjango;
      colorClass = 'text-green-800 dark:text-green-600';
      break;
    case 'python':
      IconComponent = FaPython;
      colorClass = 'text-blue-450';
      break;
    case 'docker':
      IconComponent = FaDocker;
      colorClass = 'text-blue-500';
      break;
    case 'aws':
      IconComponent = FaAws;
      colorClass = 'text-amber-550';
      break;
    case 'gcp':
    case 'googlecloud':
      IconComponent = SiGooglecloud;
      colorClass = 'text-blue-500';
      break;
    case 'vercel':
      IconComponent = SiVercel;
      colorClass = 'text-black dark:text-white';
      break;
    case 'git':
      IconComponent = FaGitAlt;
      colorClass = 'text-orange-600';
      break;
    case 'github':
      IconComponent = FaGithub;
      colorClass = 'text-black dark:text-white';
      break;
    case 'figma':
      IconComponent = SiFigma;
      colorClass = 'text-pink-500';
      break;
    case 'threejs':
    case 'three':
      IconComponent = TbBrandThreejs;
      colorClass = 'text-black dark:text-white';
      break;
    case 'flutter':
      IconComponent = TbBrandFlutter;
      colorClass = 'text-sky-400';
      break;
    case 'svelte':
      IconComponent = SiSvelte;
      colorClass = 'text-orange-600';
      break;
    case 'vue':
    case 'vuejs':
      IconComponent = SiVuedotjs;
      colorClass = 'text-emerald-500';
      break;
    case 'java':
      IconComponent = FaJava;
      colorClass = 'text-red-500';
      break;
    case 'rust':
      IconComponent = FaRust;
      colorClass = 'text-orange-705';
      break;
    case 'kubernetes':
    case 'k8s':
      IconComponent = SiKubernetes;
      colorClass = 'text-blue-500';
      break;
    case 'webpack':
      IconComponent = SiWebpack;
      colorClass = 'text-blue-400';
      break;
    default:
      IconComponent = FiCpu;
      colorClass = 'text-gray-450 dark:text-gray-400';
      break;
  }

  return (
    <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gray-50/50 hover:bg-gray-100/60 dark:bg-gray-900/40 dark:hover:bg-gray-800/60 text-gray-850 dark:text-gray-250 border border-gray-200/50 dark:border-gray-800/60 text-xs font-bold rounded-xl transition-colors">
      <IconComponent style={{ width: size, height: size }} className={colorClass} />
      {showName && <span>{tech}</span>}
    </span>
  );
}
