import Image from 'next/image';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Facebook,
  Calendar,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Sparkles,
  Code2,
} from 'lucide-react';
import { snakeToProfession } from '@/helpers/sanakeToProfe';
import { dbConnect } from '@/lib/db';
import { User } from '@/models/User';
import { Timeline } from '@/models/Timeline';
import { Project } from '@/models/Project';
import SkillBadge from '@/components/ui/SkillBadge';

interface TimelineItem {
  id: number;
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string;
  type: 'work' | 'education';
}

export const dynamic = 'force-dynamic';

// ── Background Decorations (Cohesive with homepage design language) ──────────────
function BackgroundOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      {/* Top-left large ambient orb */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-10"
        style={{
          background: 'radial-gradient(circle, var(--brand) 0%, transparent 70%)',
          animation: 'banner-orb-1 15s ease-in-out infinite',
        }}
      />
      {/* Mid-right accent orb */}
      <div
        className="absolute top-[30%] -right-40 w-[500px] h-[500px] rounded-full opacity-15 dark:opacity-10"
        style={{
          background: 'radial-gradient(circle, var(--brand-dim) 0%, transparent 70%)',
          animation: 'banner-orb-2 18s ease-in-out infinite',
        }}
      />
      {/* Lower accent orb */}
      <div
        className="absolute -bottom-40 left-1/3 w-[450px] h-[450px] rounded-full opacity-10 dark:opacity-5"
        style={{
          background: 'radial-gradient(circle, var(--brand-muted) 0%, transparent 70%)',
          animation: 'banner-orb-1 20s ease-in-out infinite reverse',
        }}
      />
    </div>
  );
}

function DotGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06] -z-10"
      style={{
        backgroundImage: 'radial-gradient(circle, var(--text-muted) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    />
  );
}

export default async function AboutPage() {
  await dbConnect();
  
  // Fetch user information
  const aboutData = await User.findOne().select(
    'name email phone address picture bio githubUrl linkedInUrl facebookUrl profession skills website createdAt updatedAt experience'
  );

  // Fetch actual project count from database
  const projectCount = await Project.countDocuments({});

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center bg-surface p-8 rounded-2xl border border-border">
          <div className="w-16 h-16 rounded-full bg-surface-alt flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">😕</span>
          </div>
          <p className="text-text-muted text-lg">About info not found</p>
        </div>
      </div>
    );
  }

  // Fetch timeline information
  const timelineItems = await Timeline.find({}).sort({ createdAt: -1 });
  const u = JSON.parse(JSON.stringify(aboutData));
  const tl: TimelineItem[] = JSON.parse(JSON.stringify(timelineItems));
  const workItems = tl.filter((i) => i?.type === 'work');
  const eduItems = tl.filter((i) => i?.type === 'education');

  // Helper to categorize skills dynamically
  const categories = {
    frontend: {
      name: 'Frontend Development',
      skills: [] as string[],
      keywords: ['react', 'next', 'typescript', 'ts', 'javascript', 'js', 'html', 'css', 'tailwind', 'redux', 'vite', 'bootstrap', 'sass', 'scss', 'vue', 'angular', 'svelte'],
      icon: <Code2 className="w-5 h-5 text-sky-500" />
    },
    backend: {
      name: 'Backend & Database',
      skills: [] as string[],
      keywords: ['node', 'express', 'mongodb', 'mongo', 'postgresql', 'postgres', 'mysql', 'python', 'django', 'flask', 'laravel', 'php', 'ruby', 'go', 'golang', 'rust', 'java', 'redis', 'socket', 'jwt', 'graphql', 'prisma', 'firebase'],
      icon: <Briefcase className="w-5 h-5 text-emerald-500" />
    },
    tools: {
      name: 'Tools & DevOps',
      skills: [] as string[],
      keywords: ['git', 'github', 'docker', 'linux', 'npm', 'yarn', 'vercel', 'netlify', 'aws', 'postman', 'jest', 'kubernetes', 'k8s', 'nginx', 'cloudinary', 'stripe', 'figma'],
      icon: <Sparkles className="w-5 h-5 text-indigo-500" />
    },
    others: {
      name: 'Other Technologies',
      skills: [] as string[],
      icon: <Globe className="w-5 h-5 text-violet-500" />
    }
  };

  const userSkills = u?.skills || [];
  userSkills.forEach((skill: string) => {
    const norm = skill.toLowerCase().trim();
    if (categories.frontend.keywords.some(k => norm.includes(k))) {
      categories.frontend.skills.push(skill);
    } else if (categories.backend.keywords.some(k => norm.includes(k))) {
      categories.backend.skills.push(skill);
    } else if (categories.tools.keywords.some(k => norm.includes(k))) {
      categories.tools.skills.push(skill);
    } else {
      categories.others.skills.push(skill);
    }
  });

  return (
    <>
      <style>{`
        @keyframes about-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes banner-orb-1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(40px,-20px) scale(1.1); }
        }
        @keyframes banner-orb-2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-30px,30px) scale(0.95); }
        }
        .about-animate {
          opacity: 0;
          animation: about-fade-up 0.6s ease forwards;
        }
      `}</style>

      <div className="min-h-screen bg-background text-foreground transition-colors duration-300 relative overflow-hidden">
        
        {/* ── Decorative backgrounds ── */}
        <BackgroundOrbs />
        <DotGrid />

        {/* Spacer to clear the fixed navbar */}
        <div className="h-24 sm:h-36" />

        {/* ══════════════════════════════════════════
            HERO BANNER
        ══════════════════════════════════════════ */}
        <div className="relative border-b border-border">
          
          <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 pt-12 pb-20 sm:pt-20">
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
              
              {/* Avatar with glowing ring */}
              <div className="relative group flex-shrink-0">
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-brand via-brand-dim to-success blur opacity-70 group-hover:opacity-100 group-hover:scale-105 transition duration-500 animate-glow-pulse" />
                <div className="relative p-1.5 rounded-full bg-surface border-2 border-border">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-surface shadow-2xl relative">
                    {u?.picture ? (
                      <Image
                        src={u.picture}
                        alt={u?.name || 'Profile'}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-500"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-alt flex items-center justify-center">
                        <span className="text-6xl font-black brand-gradient-text">
                          {u?.name?.[0] || '?'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Active/Online indicator */}
                <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-success border-4 border-surface shadow-lg animate-pulse" />
              </div>

              {/* Name & Profession Title details */}
              <div className="text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-muted text-brand border border-brand/20 text-xs font-bold tracking-wider uppercase backdrop-blur-md mb-4 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-brand" />
                  Personal Profile
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-3 brand-gradient-text">
                  {u?.name || '—'}
                </h1>
                <p className="text-text-secondary text-lg sm:text-xl font-extrabold tracking-wide uppercase">
                  {snakeToProfession(u?.profession) || 'Developer'}
                </p>
              </div>

            </div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14">
              {[
                { icon: '💼', value: `${projectCount}+`, label: 'Completed Projects', glow: 'hover:shadow-brand/5 hover:border-brand/35' },
                { icon: '⏱️', value: u?.experience ? (u.experience.toLowerCase().includes('year') || u.experience.toLowerCase().includes('yr') ? u.experience : `${u.experience}+ Yrs`) : '2+ Yrs', label: 'Professional Experience', glow: 'hover:shadow-success/5 hover:border-success/35' },
                { icon: '🛠️', value: `${u?.skills?.length ?? 0}+`, label: 'Skills & Tools mastered', glow: 'hover:shadow-brand-dim/5 hover:border-brand-dim/35' },
              ].map((pill, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-5 p-5 rounded-2xl bg-surface/60 border border-border backdrop-blur-md transition-all duration-300 group hover:-translate-y-1 ${pill.glow} hover:shadow-lg`}
                >
                  <div className="text-3xl bg-surface-alt w-14 h-14 rounded-xl flex items-center justify-center border border-border/50 group-hover:scale-110 transition duration-300">
                    {pill.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-black text-text-primary leading-none mb-1">
                      {pill.value}
                    </div>
                    <div className="text-xs font-semibold text-text-secondary">
                      {pill.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════════
            CONTENT
        ══════════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">

          {/* ── Quick contact row ── */}
          <div
            className="about-animate grid grid-cols-1 sm:grid-cols-3 gap-6"
            style={{ animationDelay: '0.05s' }}
          >
            {[
              {
                icon: <Mail className="w-6 h-6" />,
                label: 'Email',
                value: u?.email,
                href: `mailto:${u?.email}`,
                color: 'hover:border-brand/40 hover:shadow-brand/5',
                iconColor: 'bg-brand-muted text-brand'
              },
              {
                icon: <Phone className="w-6 h-6" />,
                label: 'Phone',
                value: u?.phone,
                href: `tel:${u?.phone}`,
                color: 'hover:border-success/40 hover:shadow-success/5',
                iconColor: 'bg-emerald-50 dark:bg-emerald-950/40 text-success'
              },
              {
                icon: <MapPin className="w-6 h-6" />,
                label: 'Location',
                value: u?.address,
                href: undefined,
                color: 'hover:border-danger/40 hover:shadow-danger/5',
                iconColor: 'bg-red-50 dark:bg-red-950/40 text-danger'
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-4 p-5 rounded-2xl border border-border bg-surface shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group ${item.color}`}
              >
                <div className={`p-3 rounded-xl ${item.iconColor} group-hover:scale-110 transition duration-300`}>
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-text-muted mb-1">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-bold text-text-primary truncate block hover:text-brand transition-colors">
                      {item.value || '—'}
                    </a>
                  ) : (
                    <p className="text-sm font-bold text-text-primary truncate">{item.value || '—'}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Bio ── */}
          <div
            className="about-animate p-8 md:p-10 rounded-3xl border border-border bg-surface shadow-sm relative overflow-hidden"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-muted/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-3.5 mb-6">
              <div className="p-2.5 rounded-xl bg-brand-muted text-brand border border-brand/20">
                <Code2 className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary">Professional Biography</h2>
            </div>

            <div className="relative">
              {/* Large quote mark */}
              <span className="absolute -top-6 -left-3 text-8xl text-brand/10 font-serif select-none pointer-events-none">&ldquo;</span>
              <div className="relative pl-6 sm:pl-8 border-l-2 border-brand/30">
                <p className="text-text-secondary leading-relaxed text-base sm:text-lg font-normal whitespace-pre-line">
                  {u?.bio || 'No biography has been added yet.'}
                </p>
              </div>
            </div>
          </div>

          {/* ── Skills ── */}
          <div
            className="about-animate p-8 md:p-10 rounded-3xl border border-border bg-surface shadow-sm"
            style={{ animationDelay: '0.15s' }}
          >
            <div className="flex items-center gap-3.5 mb-8 pb-4 border-b border-border-muted">
              <div className="p-2.5 rounded-xl bg-brand-muted text-brand border border-brand/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary">
                  Skills &amp; Core Tech Stack
                </h2>
                <p className="text-xs text-text-secondary mt-0.5">
                  A breakdown of tools and technologies I use to build applications
                </p>
              </div>
              <span className="ml-auto px-3 py-1 text-xs font-bold text-brand bg-brand-muted border border-brand/20 rounded-full">
                {u?.skills?.length ?? 0} Skills
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(categories).map(([key, category]) => {
                if (category.skills.length === 0) return null;
                return (
                  <div
                    key={key}
                    className="p-6 rounded-2xl border border-border/50 bg-surface-alt/40 hover:border-brand/35 hover:bg-surface-alt/75 transition-all duration-200"
                  >
                    <div className="flex items-center gap-2.5 mb-4">
                      {category.icon}
                      <h3 className="font-bold text-text-primary text-sm tracking-wide">
                        {category.name}
                      </h3>
                      <span className="text-[10px] font-bold text-text-secondary ml-auto bg-surface-alt px-2 py-0.5 rounded-full">
                        {category.skills.length}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill: string, index: number) => (
                        <SkillBadge key={index} skill={skill} size="sm" />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Timeline ── */}
          <div
            className="about-animate p-8 md:p-10 rounded-3xl border border-border bg-surface shadow-sm"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="mb-10 pb-4 border-b border-border-muted">
              <h2 className="text-2xl font-bold text-text-primary">My Professional Journey</h2>
              <p className="text-xs text-text-secondary mt-0.5">My educational background and professional work history</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Work experience */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl bg-brand-muted text-brand border border-brand/20">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">Work Experience</h3>
                </div>

                {workItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-2xl bg-surface-alt/20">
                    <span className="text-4xl mb-3">📂</span>
                    <p className="text-sm font-medium text-text-muted">No work experience added yet.</p>
                  </div>
                ) : (
                  <div className="relative pl-6 border-l-2 border-brand-muted space-y-8 ml-2">
                    {workItems.map((item) => (
                      <div key={item?.id} className="relative group">
                        {/* Timeline dot with glowing effect */}
                        <div className="absolute -left-[32px] top-1.5 w-4 h-4 rounded-full bg-background border-3 border-brand group-hover:scale-125 group-hover:bg-brand transition-all duration-300 shadow-sm" />
                        <div className="p-5 rounded-2xl border border-border/50 bg-surface-alt/30 hover:border-brand/40 hover:bg-brand-muted/10 transition-all duration-300 hover:shadow-md">
                          <span className="inline-block text-[10px] font-bold text-brand bg-brand-muted border border-brand/10 px-3 py-1 rounded-full mb-3 tracking-wide uppercase">
                            {item?.startDate} – {item?.endDate || 'Present'}
                          </span>
                          <h4 className="font-extrabold text-text-primary text-base mb-1.5 group-hover:text-brand transition-colors">
                            {item?.title}
                          </h4>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-text-secondary mb-3 items-center">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5 opacity-75 text-brand" />
                              {item?.organization}
                            </span>
                            {item?.location && (
                              <span className="flex items-center gap-1 border-l border-border pl-3">
                                <MapPin className="w-3.5 h-3.5 opacity-75 text-danger" />
                                {item.location}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-text-secondary leading-relaxed font-normal">
                            {item?.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Education */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl bg-brand-muted text-brand border border-brand/20">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">Education</h3>
                </div>

                {eduItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-2xl bg-surface-alt/20">
                    <span className="text-4xl mb-3">🎓</span>
                    <p className="text-sm font-medium text-text-muted">No education history added yet.</p>
                  </div>
                ) : (
                  <div className="relative pl-6 border-l-2 border-brand-muted space-y-8 ml-2">
                    {eduItems.map((item) => (
                      <div key={item?.id} className="relative group">
                        {/* Timeline dot with glowing effect */}
                        <div className="absolute -left-[32px] top-1.5 w-4 h-4 rounded-full bg-background border-3 border-brand group-hover:scale-125 group-hover:bg-brand transition-all duration-300 shadow-sm" />
                        <div className="p-5 rounded-2xl border border-border/50 bg-surface-alt/30 hover:border-brand/40 hover:bg-brand-muted/10 transition-all duration-300 hover:shadow-md">
                          <span className="inline-block text-[10px] font-bold text-brand bg-brand-muted border border-brand/10 px-3 py-1 rounded-full mb-3 tracking-wide uppercase">
                            {item?.startDate} – {item?.endDate || 'Present'}
                          </span>
                          <h4 className="font-extrabold text-text-primary text-base mb-1.5 group-hover:text-brand transition-colors">
                            {item?.title}
                          </h4>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-text-secondary mb-3 items-center">
                            <span className="flex items-center gap-1">
                              <GraduationCap className="w-3.5 h-3.5 opacity-75 text-brand" />
                              {item?.organization}
                            </span>
                            {item?.location && (
                              <span className="flex items-center gap-1 border-l border-border pl-3">
                                <MapPin className="w-3.5 h-3.5 opacity-75 text-danger" />
                                {item.location}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-text-secondary leading-relaxed font-normal">
                            {item?.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Contact + Social ── */}
          <div
            className="about-animate grid grid-cols-1 md:grid-cols-2 gap-6"
            style={{ animationDelay: '0.25s' }}
          >

            {/* Contact details */}
            <div className="p-8 rounded-3xl border border-border bg-surface shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-6">Get In Touch</h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Globe className="w-4 h-4" />,
                      label: 'Website',
                      value: u?.website,
                      href: u?.website,
                      color: 'bg-brand-muted text-brand border border-brand/20',
                    },
                    {
                      icon: <Calendar className="w-4 h-4" />,
                      label: 'Member Since',
                      value: u?.createdAt
                        ? new Date(u.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                          })
                        : '—',
                      href: undefined,
                      color: 'bg-brand-muted text-brand border border-brand/20',
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-surface-alt/30 hover:border-brand/30 transition-all duration-200"
                    >
                      <div className={`flex-shrink-0 p-2.5 rounded-xl ${item.color}`}>
                        {item.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-text-muted mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-bold text-brand hover:underline flex items-center gap-1 truncate"
                          >
                            {item.value}
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          </a>
                        ) : (
                          <p className="text-sm font-bold text-text-primary truncate">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="p-8 rounded-3xl border border-border bg-surface shadow-sm">
              <h2 className="text-xl font-bold text-text-primary mb-6">Connect With Me</h2>
              <div className="space-y-4">
                {[
                  {
                    icon: <Github className="w-5 h-5" />,
                    label: 'GitHub',
                    sub: 'View my repositories',
                    href: u?.githubUrl,
                    color: 'hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 hover:border-slate-950 dark:hover:border-white',
                  },
                  {
                    icon: <Linkedin className="w-5 h-5" />,
                    label: 'LinkedIn',
                    sub: 'Professional network',
                    href: u?.linkedInUrl,
                    color: 'hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]',
                  },
                  {
                    icon: <Facebook className="w-5 h-5" />,
                    label: 'Facebook',
                    sub: 'Social updates',
                    href: u?.facebookUrl,
                    color: 'hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]',
                  },
                ].map((s) =>
                  s.href ? (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-surface-alt/30 ${s.color} hover:scale-[1.01] hover:shadow-md transition-all duration-300 group`}
                    >
                      <div className="flex-shrink-0 bg-surface-alt p-2.5 rounded-xl group-hover:bg-transparent group-hover:text-current transition-colors duration-200">{s.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold">{s.label}</p>
                        <p className="text-xs opacity-60">{s.sub}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  ) : (
                    <div
                      key={s.label}
                      className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-surface-alt/30 opacity-45 cursor-not-allowed"
                    >
                      <div className="flex-shrink-0 bg-surface-alt p-2.5 rounded-xl">{s.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-text-muted">{s.label}</p>
                        <p className="text-xs text-text-muted">Not added yet</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

          </div>

          {/* ── Last updated footer ── */}
          <div className="text-center pt-4">
            <p className="text-xs text-text-muted">
              Last updated:{' '}
              {u?.updatedAt
                ? new Date(u.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : '—'}
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

export async function generateMetadata() {
  try {
    await dbConnect();
    const data = await User.findOne().select('name bio picture');
    if (data) {
      return {
        title: `About ${data?.name || ''}`,
        description: data?.bio || '',
        openGraph: {
          title: `About ${data?.name || ''}`,
          description: data?.bio || '',
          images: data?.picture ? [data.picture] : [],
        },
      };
    }
  } catch {
    // ignore
  }
  return { title: 'About' };
}
