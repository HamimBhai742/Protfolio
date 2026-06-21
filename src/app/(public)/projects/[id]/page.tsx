import Link from 'next/link';
import Image from 'next/image';
import { FiExternalLink, FiGithub, FiArrowLeft, FiCalendar, FiFolder, FiCheckCircle, FiClock, FiActivity } from 'react-icons/fi';
import { dbConnect } from '@/lib/db';
import { Project } from '@/models/Project';
import { notFound } from 'next/navigation';
import { formatStatusLabel } from '@/helpers/status';

export const dynamic = 'force-dynamic';

interface ProjectDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  await dbConnect();
  
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return notFound();
  }

  const projectData = await Project.findOne({ id: numericId });

  if (!projectData) {
    return notFound();
  }

  const project = JSON.parse(JSON.stringify(projectData));

  const statusColors = {
    completed: 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200/50 dark:border-green-800/30',
    in_progress: 'bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200/50 dark:border-yellow-800/30',
    planned: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/30',
  };

  const statusIcons = {
    completed: <FiCheckCircle className="w-4 h-4 shrink-0" />,
    in_progress: <FiClock className="w-4 h-4 shrink-0" />,
    planned: <FiActivity className="w-4 h-4 shrink-0" />,
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  const features = project?.features
    ? project.features.split(',').map((item: string) => item.trim()).filter(Boolean)
    : [];

  const categoryName = project?.category
    ? project.category.charAt(0).toUpperCase() + project.category.slice(1)
    : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <Link
          href="/projects"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8 group"
        >
          <FiArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </Link>

        {/* Hero Section Banner */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/30 dark:border-gray-800/80 shadow-xl overflow-hidden mb-12">
          <div className="relative w-full h-[300px] sm:h-[450px]">
            {project?.thumbnail && (
              <Image
                src={project.thumbnail}
                alt={project?.title || 'Project Banner'}
                fill
                className="object-cover"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 text-white space-y-4">
              <div className="flex flex-wrap gap-3">
                {project?.category && (
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/10">
                    {categoryName}
                  </span>
                )}
                {project?.status && (
                  <span className={`px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md bg-white/10 border border-white/5`}>
                    {statusIcons[project.status as 'completed' | 'in_progress' | 'planned']}
                    {formatStatusLabel(project.status)}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight">{project?.title}</h1>
            </div>
          </div>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview / Brief description */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-8 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-b-gray-800 pb-3">
                Project Overview
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg">
                {project?.description}
              </p>
            </div>

            {/* Detailed specifications */}
            {project?.details && (
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-8 shadow-md">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-b-gray-800 pb-3">
                  Implementation Details
                </h2>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed text-base whitespace-pre-line space-y-4">
                  {project.details}
                </div>
              </div>
            )}

            {/* Features */}
            {features.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-8 shadow-md">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5 border-b border-gray-100 dark:border-b-gray-800 pb-3">
                  Core Features
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-3 text-gray-700 dark:text-gray-350 text-sm">
                      <div className="mt-1 w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100/50 dark:border-blue-900/50 shrink-0">
                        <FiCheckCircle className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Quick Specifications Column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Quick Details Card */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-6 shadow-md space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-b-gray-800 pb-3">
                Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3.5">
                  <FiFolder className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-405 dark:text-gray-500 uppercase tracking-wider">Category</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 capitalize">{categoryName}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <FiClock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-405 dark:text-gray-500 uppercase tracking-wider">Status</p>
                    {project?.status && (
                      <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mt-0.5 capitalize ${statusColors[project.status as 'completed' | 'in_progress' | 'planned'] || 'bg-gray-500 text-white'}`}>
                        {formatStatusLabel(project.status)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <FiCalendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-405 dark:text-gray-500 uppercase tracking-wider">Project Timeline</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {formatDate(project?.startDate)} - {project?.endDate ? formatDate(project.endDate) : 'Present'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Links */}
              {project?.status !== 'planned' && (
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-150 dark:border-gray-800">
                  {project?.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors hover:cursor-pointer text-sm"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      <span>Live Website</span>
                    </a>
                  )}
                  {project?.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-150 hover:bg-gray-205 dark:bg-gray-805 dark:hover:bg-gray-750 text-gray-800 dark:text-gray-200 font-bold rounded-xl border border-gray-200 dark:border-gray-700 transition-colors hover:cursor-pointer text-sm"
                    >
                      <FiGithub className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Tech Stack Tags Card */}
            {project?.technologies && project.technologies.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-6 shadow-md space-y-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-b-gray-800 pb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/30 text-xs font-bold rounded-xl"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
