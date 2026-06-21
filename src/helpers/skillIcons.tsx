'use client';
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiJavascript,
  SiHtml5, SiCss3, SiTailwindcss, SiMongodb, SiPostgresql,
  SiMysql, SiGit, SiGithub, SiDocker, SiPython, SiRedux,
  SiExpress, SiFirebase, SiGraphql, SiPrisma, SiFigma,
  SiLinux, SiNpm, SiYarn, SiVite, SiVercel, SiNetlify,
  SiAmazonwebservices, SiPostman, SiJest, SiBootstrap,
  SiSass, SiVuedotjs, SiAngular, SiSvelte, SiDjango,
  SiFlask, SiLaravel, SiPhp, SiRuby, SiGo, SiRust,
  SiKubernetes, SiNginx, SiRedis, SiSocketdotio,
  SiJsonwebtokens, SiCloudinary, SiStripe,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import type { IconType } from 'react-icons';

interface SkillMeta {
  icon: IconType;
  color: string; // hex or tailwind text color
}

// Map normalised skill name → icon + brand colour
const SKILL_MAP: Record<string, SkillMeta> = {
  react:        { icon: SiReact,           color: '#61DAFB' },
  reactjs:      { icon: SiReact,           color: '#61DAFB' },
  'react.js':   { icon: SiReact,           color: '#61DAFB' },
  next:         { icon: SiNextdotjs,       color: '#000000' },
  nextjs:       { icon: SiNextdotjs,       color: '#000000' },
  'next.js':    { icon: SiNextdotjs,       color: '#000000' },
  node:         { icon: SiNodedotjs,       color: '#339933' },
  nodejs:       { icon: SiNodedotjs,       color: '#339933' },
  'node.js':    { icon: SiNodedotjs,       color: '#339933' },
  typescript:   { icon: SiTypescript,      color: '#3178C6' },
  ts:           { icon: SiTypescript,      color: '#3178C6' },
  javascript:   { icon: SiJavascript,      color: '#F7DF1E' },
  js:           { icon: SiJavascript,      color: '#F7DF1E' },
  html:         { icon: SiHtml5,           color: '#E34F26' },
  html5:        { icon: SiHtml5,           color: '#E34F26' },
  css:          { icon: SiCss3,            color: '#1572B6' },
  css3:         { icon: SiCss3,            color: '#1572B6' },
  tailwind:     { icon: SiTailwindcss,     color: '#06B6D4' },
  tailwindcss:  { icon: SiTailwindcss,     color: '#06B6D4' },
  mongodb:      { icon: SiMongodb,         color: '#47A248' },
  mongo:        { icon: SiMongodb,         color: '#47A248' },
  postgresql:   { icon: SiPostgresql,      color: '#4169E1' },
  postgres:     { icon: SiPostgresql,      color: '#4169E1' },
  mysql:        { icon: SiMysql,           color: '#4479A1' },
  git:          { icon: SiGit,             color: '#F05032' },
  github:       { icon: SiGithub,          color: '#181717' },
  docker:       { icon: SiDocker,          color: '#2496ED' },
  python:       { icon: SiPython,          color: '#3776AB' },
  redux:        { icon: SiRedux,           color: '#764ABC' },
  express:      { icon: SiExpress,         color: '#000000' },
  expressjs:    { icon: SiExpress,         color: '#000000' },
  'express.js': { icon: SiExpress,         color: '#000000' },
  firebase:     { icon: SiFirebase,        color: '#FFCA28' },
  graphql:      { icon: SiGraphql,         color: '#E10098' },
  prisma:       { icon: SiPrisma,          color: '#2D3748' },
  figma:        { icon: SiFigma,           color: '#F24E1E' },
  linux:        { icon: SiLinux,           color: '#FCC624' },
  npm:          { icon: SiNpm,             color: '#CB3837' },
  yarn:         { icon: SiYarn,            color: '#2C8EBB' },
  vite:         { icon: SiVite,            color: '#646CFF' },
  vercel:       { icon: SiVercel,          color: '#000000' },
  netlify:      { icon: SiNetlify,         color: '#00C7B7' },
  aws:          { icon: SiAmazonwebservices, color: '#FF9900' },
  postman:      { icon: SiPostman,         color: '#FF6C37' },
  jest:         { icon: SiJest,            color: '#C21325' },
  bootstrap:    { icon: SiBootstrap,       color: '#7952B3' },
  sass:         { icon: SiSass,            color: '#CC6699' },
  scss:         { icon: SiSass,            color: '#CC6699' },
  vue:          { icon: SiVuedotjs,        color: '#4FC08D' },
  vuejs:        { icon: SiVuedotjs,        color: '#4FC08D' },
  angular:      { icon: SiAngular,         color: '#DD0031' },
  svelte:       { icon: SiSvelte,          color: '#FF3E00' },
  django:       { icon: SiDjango,          color: '#092E20' },
  flask:        { icon: SiFlask,           color: '#000000' },
  laravel:      { icon: SiLaravel,         color: '#FF2D20' },
  php:          { icon: SiPhp,             color: '#777BB4' },
  ruby:         { icon: SiRuby,            color: '#CC342D' },
  go:           { icon: SiGo,              color: '#00ADD8' },
  golang:       { icon: SiGo,              color: '#00ADD8' },
  rust:         { icon: SiRust,            color: '#000000' },
  java:         { icon: FaJava,            color: '#007396' },
  kubernetes:   { icon: SiKubernetes,      color: '#326CE5' },
  k8s:          { icon: SiKubernetes,      color: '#326CE5' },
  nginx:        { icon: SiNginx,           color: '#009639' },
  redis:        { icon: SiRedis,           color: '#DC382D' },
  socket:       { icon: SiSocketdotio,     color: '#010101' },
  socketio:     { icon: SiSocketdotio,     color: '#010101' },
  'socket.io':  { icon: SiSocketdotio,     color: '#010101' },
  jwt:          { icon: SiJsonwebtokens,   color: '#000000' },
  cloudinary:   { icon: SiCloudinary,      color: '#3448C5' },
  stripe:       { icon: SiStripe,          color: '#635BFF' },
};

/** Return icon metadata for a skill name, or null if not recognised */
export function getSkillMeta(skill: string): SkillMeta | null {
  const key = skill.toLowerCase().trim();
  return SKILL_MAP[key] ?? null;
}
