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

export default async function AboutPage() {
  await dbConnect();
  const aboutData = await User.findOne().select(
    'name email phone address picture bio githubUrl linkedInUrl facebookUrl profession skills website createdAt updatedAt experience projects'
  );

  if (!aboutData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">😕</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">About info not found</p>
        </div>
      </div>
    );
  }

  const timelineItems = await Timeline.find({}).sort({ createdAt: -1 });
  const u = JSON.parse(JSON.stringify(aboutData));
  const tl: TimelineItem[] = JSON.parse(JSON.stringify(timelineItems));
  const workItems = tl.filter((i) => i?.type === 'work');
  const eduItems = tl.filter((i) => i?.type === 'education');

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

      <div className="min-h-screen bg-gray-50 dark:bg-[oklch(0.12_0_0)]">

        {/* ══════════════════════════════════════════
            HERO BANNER
        ══════════════════════════════════════════ */}
        <div className="relative overflow-hidden">
          {/* Gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-violet-600 to-fuchsia-600" />
          {/* Orbs */}
          <div
            className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"
            style={{ animation: 'banner-orb-1 12s ease-in-out infinite' }}
          />
          <div
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-fuchsia-300/20 blur-3xl"
            style={{ animation: 'banner-orb-2 15s ease-in-out infinite' }}
          />
          {/* Dot grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8">

              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm shadow-2xl">
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white/40 shadow-xl">
                    {u?.picture ? (
                      <Image
                        src={u.picture}
                        alt={u?.name || 'Profile'}
                        width={176}
                        height={176}
                        className="w-full h-full object-cover"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-white/20 flex items-center justify-center">
                        <span className="text-5xl font-black text-white">
                          {u?.name?.[0] || '?'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Online dot */}
                <div className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white shadow-md" />
              </div>

              {/* Name + profession */}
              <div className="text-center md:text-left text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white/80 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm mb-3">
                  <Sparkles className="w-3 h-3" />
                  Personal Portfolio
                </div>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight drop-shadow-lg mb-2">
                  {u?.name || '—'}
                </h1>
                <p className="text-white/80 text-lg font-semibold">
                  {snakeToProfession(u?.profession) || 'Developer'}
                </p>
              </div>
            </div>

            {/* Quick-stat pills */}
            <div className="flex flex-wrap gap-3 mt-10">
              {[
                { icon: '💼', value: `${u?.projects?.length ?? 0}+ Projects` },
                { icon: '⏱️', value: `${u?.experience || '2'}+ Yrs Experience` },
                { icon: '🛠️', value: `${u?.skills?.length ?? 0}+ Skills` },
              ].map((pill) => (
                <div
                  key={pill.value}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/20 text-white text-sm font-semibold backdrop-blur-sm"
                >
                  <span>{pill.icon}</span>
                  <span>{pill.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            CONTENT
        ══════════════════════════════════════════ */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">

          {/* ── Quick contact row ── */}
          <div
            className="about-animate grid grid-cols-1 sm:grid-cols-3 gap-4"
            style={{ animationDelay: '0.05s' }}
          >
            {[
              {
                icon: <Mail className="w-5 h-5" />,
                label: 'Email',
                value: u?.email,
                href: `mailto:${u?.email}`,
                color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/40',
              },
              {
                icon: <Phone className="w-5 h-5" />,
                label: 'Phone',
                value: u?.phone,
                href: `tel:${u?.phone}`,
                color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/40',
              },
              {
                icon: <MapPin className="w-5 h-5" />,
                label: 'Location',
                value: u?.address,
                href: undefined,
                color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-100 dark:border-rose-900/40',
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-4 p-4 rounded-2xl border ${item.color} backdrop-blur-sm`}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold tracking-widest uppercase opacity-70 mb-0.5">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-semibold truncate hover:underline">
                      {item.value || '—'}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold truncate">{item.value || '—'}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Bio ── */}
          <div
            className="about-animate p-8 rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md shadow-sm"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                <Code2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">About Me</h2>
            </div>
            {/* Large decorative quote */}
            <div className="relative">
              <span className="absolute -top-4 -left-2 text-7xl text-blue-100 dark:text-blue-900/40 font-serif select-none leading-none">"</span>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base pl-4">
                {u?.bio || 'No bio provided yet.'}
              </p>
            </div>
          </div>

          {/* ── Skills ── */}
          <div
            className="about-animate p-8 rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md shadow-sm"
            style={{ animationDelay: '0.15s' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Skills &amp; Technologies
              </h2>
              <span className="ml-auto text-xs text-gray-400 dark:text-gray-500 font-semibold">
                {u?.skills?.length ?? 0} total
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {(u?.skills || []).map((skill: string, index: number) => (
                <SkillBadge key={index} skill={skill} size="md" />
              ))}
            </div>
          </div>

          {/* ── Timeline ── */}
          <div
            className="about-animate p-8 rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md shadow-sm"
            style={{ animationDelay: '0.2s' }}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b border-gray-100 dark:border-white/10">
              My Journey
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

              {/* Work experience */}
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Work Experience</h3>
                </div>

                {workItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <span className="text-3xl mb-2">📂</span>
                    <p className="text-sm text-gray-400 dark:text-gray-500">No work experience added yet.</p>
                  </div>
                ) : (
                  <div className="relative pl-4 border-l-2 border-blue-200 dark:border-blue-900/60 space-y-8">
                    {workItems.map((item) => (
                      <div key={item?.id} className="relative pl-5 group">
                        {/* Timeline dot */}
                        <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-white dark:bg-gray-900 border-2 border-blue-500 group-hover:scale-150 group-hover:bg-blue-500 transition-all duration-300" />
                        <div className="p-4 rounded-2xl border border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-white/3 hover:border-blue-200 dark:hover:border-blue-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all duration-200">
                          <span className="inline-block text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/50 px-2.5 py-0.5 rounded-full mb-2 tracking-wide">
                            {item?.startDate} – {item?.endDate || 'Present'}
                          </span>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {item?.title}
                          </h4>
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                            {item?.organization}{item?.location ? ` • ${item.location}` : ''}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
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
                <div className="flex items-center gap-2.5 mb-6">
                  <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border border-violet-100 dark:border-violet-900/30">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">Education</h3>
                </div>

                {eduItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <span className="text-3xl mb-2">🎓</span>
                    <p className="text-sm text-gray-400 dark:text-gray-500">No education history added yet.</p>
                  </div>
                ) : (
                  <div className="relative pl-4 border-l-2 border-violet-200 dark:border-violet-900/60 space-y-8">
                    {eduItems.map((item) => (
                      <div key={item?.id} className="relative pl-5 group">
                        <div className="absolute -left-[25px] top-1 w-3 h-3 rounded-full bg-white dark:bg-gray-900 border-2 border-violet-500 group-hover:scale-150 group-hover:bg-violet-500 transition-all duration-300" />
                        <div className="p-4 rounded-2xl border border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-white/3 hover:border-violet-200 dark:hover:border-violet-800/50 hover:bg-violet-50/50 dark:hover:bg-violet-950/20 transition-all duration-200">
                          <span className="inline-block text-[10px] font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-950/50 px-2.5 py-0.5 rounded-full mb-2 tracking-wide">
                            {item?.startDate} – {item?.endDate || 'Present'}
                          </span>
                          <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-0.5 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                            {item?.title}
                          </h4>
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                            {item?.organization}{item?.location ? ` • ${item.location}` : ''}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
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
            <div className="p-8 rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Get In Touch</h2>
              <div className="space-y-3">
                {[
                  {
                    icon: <Globe className="w-4 h-4" />,
                    label: 'Website',
                    value: u?.website,
                    href: u?.website,
                    color: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
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
                    color: 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 p-3.5 rounded-2xl border border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-white/3 hover:border-blue-200 dark:hover:border-blue-800/40 transition-all duration-200"
                  >
                    <div className={`flex-shrink-0 p-2 rounded-xl ${item.color}`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 truncate"
                        >
                          {item.value}
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="p-8 rounded-3xl border border-gray-200/60 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Connect With Me</h2>
              <div className="space-y-3">
                {[
                  {
                    icon: <Github className="w-5 h-5" />,
                    label: 'GitHub',
                    sub: 'View my repositories',
                    href: u?.githubUrl,
                    color: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700',
                  },
                  {
                    icon: <Linkedin className="w-5 h-5" />,
                    label: 'LinkedIn',
                    sub: 'Professional network',
                    href: u?.linkedInUrl,
                    color: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40',
                  },
                  {
                    icon: <Facebook className="w-5 h-5" />,
                    label: 'Facebook',
                    sub: 'Social updates',
                    href: u?.facebookUrl,
                    color: 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/40',
                  },
                ].map((s) =>
                  s.href ? (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-3.5 rounded-2xl border border-gray-100 dark:border-white/8 ${s.color} hover:scale-[1.02] hover:shadow-md transition-all duration-200 group`}
                    >
                      <div className="flex-shrink-0">{s.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold">{s.label}</p>
                        <p className="text-xs opacity-60">{s.sub}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                    </a>
                  ) : (
                    <div
                      key={s.label}
                      className={`flex items-center gap-4 p-3.5 rounded-2xl border border-gray-100 dark:border-white/8 ${s.color} opacity-40 cursor-not-allowed`}
                    >
                      <div className="flex-shrink-0">{s.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold">{s.label}</p>
                        <p className="text-xs opacity-60">Not added yet</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* ── Last updated footer ── */}
          <div className="text-center pt-4">
            <p className="text-xs text-gray-400 dark:text-gray-600">
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
