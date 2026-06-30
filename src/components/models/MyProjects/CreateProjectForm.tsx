'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  X, Upload, Link as LinkIcon, Calendar, Tag, Plus, ArrowLeft,
  BarChart3, Video, Users, MessageSquare, Star, Trash2
} from 'lucide-react';
import Image from 'next/image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import UploadCloudinary from '@/upload/UploadCloudinary';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import { cleanObj } from '@/actions/cleanObj';
import RichTextEditor from '@/components/shared/RichTextEditor';

export default function CreateProjectForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    details: '',
    technologies: [] as string[],
    liveUrl: '',
    githubUrl: '',
    category: '',
    startDate: '',
    endDate: '',
    status: '',
    features: '',
    videoUrl: '',
  });

  const [techInput, setTechInput] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [screenshotFiles, setScreenshotFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic KPI Metrics State
  const [metrics, setMetrics] = useState<Array<{ label: string; value: string }>>([]);
  const [newMetric, setNewMetric] = useState({ label: '', value: '' });

  // Dynamic Team State
  const [teamMembers, setTeamMembers] = useState<Array<{
    name: string;
    role: string;
    avatarFile: File | null;
    github?: string;
    linkedin?: string;
  }>>([]);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
    avatarFile: null as File | null,
    github: '',
    linkedin: '',
  });

  // Dynamic Testimonials State
  const [testimonials, setTestimonials] = useState<Array<{
    clientName: string;
    clientCompany: string;
    clientAvatarFile: File | null;
    feedback: string;
    rating: number;
  }>>([]);
  const [newTestimonial, setNewTestimonial] = useState({
    clientName: '',
    clientCompany: '',
    clientAvatarFile: null as File | null,
    feedback: '',
    rating: 5,
  });

  // KPI Actions
  const handleAddMetric = () => {
    if (newMetric.label.trim() && newMetric.value.trim()) {
      setMetrics(prev => [...prev, { ...newMetric }]);
      setNewMetric({ label: '', value: '' });
    } else {
      toast.error('Both label and value are required for metrics');
    }
  };
  const handleRemoveMetric = (idx: number) => {
    setMetrics(prev => prev.filter((_, i) => i !== idx));
  };

  // Team Actions
  const handleAddMember = () => {
    if (newMember.name.trim() && newMember.role.trim()) {
      setTeamMembers(prev => [...prev, { ...newMember }]);
      setNewMember({ name: '', role: '', avatarFile: null, github: '', linkedin: '' });
    } else {
      toast.error('Collaborator name and role are required');
    }
  };
  const handleRemoveMember = (idx: number) => {
    setTeamMembers(prev => prev.filter((_, i) => i !== idx));
  };

  // Testimonial Actions
  const handleAddTestimonial = () => {
    if (newTestimonial.clientName.trim() && newTestimonial.feedback.trim()) {
      setTestimonials(prev => [...prev, { ...newTestimonial }]);
      setNewTestimonial({ clientName: '', clientCompany: '', clientAvatarFile: null, feedback: '', rating: 5 });
    } else {
      toast.error('Client name and feedback content are required');
    }
  };
  const handleRemoveTestimonial = (idx: number) => {
    setTestimonials(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAddTech = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const handleRemoveTech = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== techToRemove)
    }));
  };

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setScreenshotFiles(prev => [...prev, ...fileArray]);
    }
  };

  const handleRemoveScreenshot = (indexToRemove: number) => {
    setScreenshotFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!thumbnail) {
      toast.error('Project thumbnail is required');
      return;
    }
    if (!formData.category) {
      toast.error('Project category is required');
      return;
    }
    if (!formData.status) {
      toast.error('Project status is required');
      return;
    }
    if (!formData.startDate) {
      toast.error('Project start date is required');
      return;
    }
    if (formData.description.length < 200) {
      toast.error('Description must be at least 200 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload thumbnail
      const thumbnailUrl = await UploadCloudinary({ thumbnail });
      if (!thumbnailUrl) {
        throw new Error('Thumbnail upload failed');
      }

      // 2. Upload multiple screenshots
      const screenshotUrls: string[] = [];
      if (screenshotFiles.length > 0) {
        const uploadPromises = screenshotFiles.map(file => UploadCloudinary({ thumbnail: file }));
        const urls = await Promise.all(uploadPromises);
        screenshotUrls.push(...(urls.filter(Boolean) as string[]));
      }

      // 3. Upload team avatars
      const uploadedTeam = await Promise.all(
        teamMembers.map(async (member) => {
          let avatar = '';
          if (member.avatarFile) {
            const url = await UploadCloudinary({ thumbnail: member.avatarFile });
            if (url) avatar = url;
          }
          return {
            name: member.name,
            role: member.role,
            avatar,
            github: member.github,
            linkedin: member.linkedin,
          };
        })
      );

      // 4. Upload client reviews avatars
      const uploadedReviews = await Promise.all(
        testimonials.map(async (review) => {
          let clientAvatar = '';
          if (review.clientAvatarFile) {
            const url = await UploadCloudinary({ thumbnail: review.clientAvatarFile });
            if (url) clientAvatar = url;
          }
          return {
            clientName: review.clientName,
            clientCompany: review.clientCompany,
            clientAvatar,
            feedback: review.feedback,
            rating: Number(review.rating),
          };
        })
      );

      // 5. Prepare body payload
      const payload = {
        ...formData,
        thumbnail: thumbnailUrl,
        images: screenshotUrls,
        metrics,
        team: uploadedTeam,
        testimonials: uploadedReviews,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(cleanObj(payload)),
        }
      );
      
      const result = await res.json();
      if (result?.success) {
        toast.success(result?.message || 'Project created successfully');
        router.push('/dashboard/my-projects');
      } else {
        toast.error(result?.message || 'Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('An error occurred while creating the project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-55 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-4 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Back and Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/dashboard/my-projects')}
              className="p-3 bg-white dark:bg-gray-855 hover:bg-gray-100 dark:hover:bg-gray-750 text-gray-700 dark:text-gray-300 rounded-xl transition-all duration-200 border border-gray-205 dark:border-gray-700/80 shadow-sm"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                Add New Project
              </h1>
              <p className="text-gray-650 dark:text-gray-400 mt-1">
                Showcase your development milestones, stats, client feedback, and team details
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800/80 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8">
            
            {/* Project Basic Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
                Basic Info
              </h3>
              
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-705 dark:text-gray-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-205 dark:border-gray-700/80 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                  placeholder="Enter a descriptive project name..."
                />
              </div>

              {/* Description */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-755 dark:text-gray-300 mb-2">
                  Short Description * <span className="text-xs text-gray-400 font-normal">(Min. 200 characters)</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-205 dark:border-gray-700/80 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-gray-900 dark:text-white"
                  placeholder="Describe your project summary..."
                />
                <span className={`text-xs absolute right-3 bottom-3 block ${formData.description.length < 200 ? 'text-red-505 dark:text-red-400 font-bold' : 'text-gray-400'}`}>
                  {formData.description.length} / 200
                </span>
              </div>

              {/* Features Editor */}
              <div>
                <label className="block text-sm font-semibold text-gray-750 dark:text-gray-300 mb-2">
                  Features * <span className="text-xs text-gray-400 font-normal">(Formatted layout of core functionalities)</span>
                </label>
                <RichTextEditor
                  value={formData.features}
                  onChange={(html) =>
                    setFormData((prev) => ({ ...prev, features: html }))
                  }
                  placeholder="e.g. Bold items or insert Bullet Lists for features..."
                  minHeight="120px"
                />
              </div>

              {/* Details Editor */}
              <div>
                <label className="block text-sm font-semibold text-gray-750 dark:text-gray-300 mb-2">
                  Full Project Details
                </label>
                <RichTextEditor
                  value={formData.details}
                  onChange={(html) =>
                    setFormData((prev) => ({ ...prev, details: html }))
                  }
                  placeholder="Describe design patterns, structures, and systems details..."
                  minHeight="220px"
                />
              </div>
            </div>

            {/* Classification and Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-805">
              <div>
                <label className="block text-sm font-semibold text-gray-750 dark:text-gray-300 mb-2">
                  Technologies Used
                </label>
                <div className="flex gap-2 items-center mb-3">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTech();
                        }
                      }}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-205 dark:border-gray-700/80 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                      placeholder="Type a tech (e.g. React) and press Enter"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddTech}
                    className="p-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-750 text-gray-800 dark:text-white rounded-xl transition-colors border border-gray-205 dark:border-gray-700/80"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                {/* Tech badges */}
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map(tech => (
                    <span key={tech} className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-105/80 text-blue-705 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200/50 dark:border-blue-800/30">
                      {tech}
                      <button type="button" onClick={() => handleRemoveTech(tech)} className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-850"><X className="w-3.5 h-3.5" /></button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-750 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  required
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, category: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-205 dark:border-gray-700/80 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                >
                  <option value="">Select category</option>
                  <option value="web">Web Application</option>
                  <option value="mobile">Mobile App</option>
                  <option value="api">API/Backend</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-750 dark:text-gray-300 mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  required
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-205 dark:border-gray-700/80 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                >
                  <option value="">Select status</option>
                  <option value="completed">Completed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-750 dark:text-gray-300 mb-2">
                  Start Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <DatePicker
                    required
                    selected={formData.startDate ? new Date(formData.startDate) : null}
                    onChange={(date: Date | null) =>
                      setFormData((prev) => ({
                        ...prev,
                        startDate: date ? date.toISOString().split('T')[0] : '',
                      }))
                    }
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select start date"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-205 dark:border-gray-700/80 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-750 dark:text-gray-300 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <Calendar className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                  <DatePicker
                    selected={formData.endDate ? new Date(formData.endDate) : null}
                    onChange={(date: Date | null) =>
                      setFormData((prev) => ({
                        ...prev,
                        endDate: date ? date.toISOString().split('T')[0] : '',
                      }))
                    }
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select end date"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-205 dark:border-gray-700/80 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Links and Video */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100 dark:border-gray-805">
              <div>
                <label className="block text-sm font-semibold text-gray-750 dark:text-gray-300 mb-2">
                  Live Site Link
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, liveUrl: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-205 dark:border-gray-700/80 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-750 dark:text-gray-300 mb-2">
                  GitHub Code Link
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-205 dark:border-gray-700/80 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-750 dark:text-gray-300 mb-2">
                  Demo Video Embed URL
                </label>
                <div className="relative">
                  <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="url"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, videoUrl: e.target.value }))}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-205 dark:border-gray-700/80 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white"
                    placeholder="https://www.youtube.com/embed/..."
                  />
                </div>
              </div>
            </div>

            {/* Advanced Section: KPI Metrics */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                <span>KPI Metrics & Achievements</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-2xl border border-gray-200/50 dark:border-gray-800">
                <div>
                  <label className="block text-xs font-bold text-gray-550 dark:text-gray-400 mb-2 uppercase tracking-wide">Metric Title/Label</label>
                  <input
                    type="text"
                    value={newMetric.label}
                    onChange={(e) => setNewMetric(prev => ({ ...prev, label: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-205 dark:border-gray-750 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 dark:text-white"
                    placeholder="e.g., Uptime, Load Time, Active Users"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-550 dark:text-gray-400 mb-2 uppercase tracking-wide">Achievement Value</label>
                  <input
                    type="text"
                    value={newMetric.value}
                    onChange={(e) => setNewMetric(prev => ({ ...prev, value: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-205 dark:border-gray-750 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 dark:text-white"
                    placeholder="e.g., 99.99%, 40% Decreased, 15k+"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddMetric}
                  className="w-full md:w-fit flex items-center justify-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Metric</span>
                </button>
              </div>

              {/* KPI metrics list display */}
              {metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  {metrics.map((m, idx) => (
                    <div key={idx} className="relative p-4 rounded-2xl bg-white dark:bg-gray-800/80 border border-gray-205 dark:border-gray-700/60 shadow-sm flex flex-col justify-between group">
                      <div>
                        <p className="text-xs text-gray-450 dark:text-gray-400 font-semibold">{m.label}</p>
                        <p className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">{m.value}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMetric(idx)}
                        className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Advanced Section: Team Collaborators */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-500" />
                <span>Team Collaborators</span>
              </h4>
              
              <div className="bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-2xl border border-gray-200/50 dark:border-gray-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-550 dark:text-gray-400 mb-1">Collaborator Name</label>
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => setNewMember(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-205 dark:border-gray-750 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 dark:text-white"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-550 dark:text-gray-400 mb-1">Collaborator Role</label>
                    <input
                      type="text"
                      value={newMember.role}
                      onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-205 dark:border-gray-750 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 dark:text-white"
                      placeholder="e.g. Lead Designer"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-550 dark:text-gray-400 mb-1">GitHub URL</label>
                    <input
                      type="url"
                      value={newMember.github}
                      onChange={(e) => setNewMember(prev => ({ ...prev, github: e.target.value }))}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-205 dark:border-gray-750 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 dark:text-white"
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-550 dark:text-gray-400 mb-1">LinkedIn URL</label>
                    <input
                      type="url"
                      value={newMember.linkedin}
                      onChange={(e) => setNewMember(prev => ({ ...prev, linkedin: e.target.value }))}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-205 dark:border-gray-750 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 dark:text-white"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-4 w-full sm:w-1/2">
                    <label className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors shadow-sm text-xs font-semibold text-gray-700 dark:text-gray-300">
                      <span>Upload Avatar</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          setNewMember(prev => ({ ...prev, avatarFile: file }));
                        }}
                      />
                    </label>
                    {newMember.avatarFile && (
                      <div className="flex items-center gap-2 text-xs text-gray-505 dark:text-gray-400">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                          <Image src={URL.createObjectURL(newMember.avatarFile)} alt="Avatar" fill className="object-cover" />
                        </div>
                        <span>Selected</span>
                      </div>
                    )}
                  </div>
                  
                  <button
                    type="button"
                    onClick={handleAddMember}
                    className="w-full sm:w-fit flex items-center justify-center space-x-2 px-5 py-2.5 bg-purple-650 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Collaborator</span>
                  </button>
                </div>
              </div>

              {/* Render Collaborators Grid */}
              {teamMembers.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  {teamMembers.map((member, idx) => (
                    <div key={idx} className="relative flex items-center gap-3 p-4 bg-white dark:bg-gray-800/80 border border-gray-205 dark:border-gray-700/60 rounded-2xl shadow-sm group">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
                        <Image
                          src={member.avatarFile ? URL.createObjectURL(member.avatarFile) : '/placeholder-avatar.png'}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{member.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{member.role}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(idx)}
                        className="absolute top-2 right-2 p-1.5 text-gray-405 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="h-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Advanced Section: Client Testimonials */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-emerald-500" />
                <span>Client Testimonials & Feedback</span>
              </h4>
              
              <div className="bg-gray-50/50 dark:bg-gray-800/30 p-4 rounded-2xl border border-gray-200/50 dark:border-gray-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-550 dark:text-gray-400 mb-1">Client Name</label>
                    <input
                      type="text"
                      value={newTestimonial.clientName}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, clientName: e.target.value }))}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-205 dark:border-gray-750 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 dark:text-white"
                      placeholder="e.g. Jane Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-555 dark:text-gray-400 mb-1">Company/Association</label>
                    <input
                      type="text"
                      value={newTestimonial.clientCompany}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, clientCompany: e.target.value }))}
                      className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-205 dark:border-gray-750 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 dark:text-white"
                      placeholder="e.g. TechCorp CEO"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-550 dark:text-gray-400 mb-1">Client Review/Feedback</label>
                  <textarea
                    rows={3}
                    value={newTestimonial.feedback}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, feedback: e.target.value }))}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-205 dark:border-gray-750 rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 dark:text-white resize-none"
                    placeholder="Write client's testimonial feedback here..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-6 w-full sm:w-2/3">
                    <label className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors shadow-sm text-xs font-semibold text-gray-700 dark:text-gray-300 shrink-0">
                      <span>Upload Avatar</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          setNewTestimonial(prev => ({ ...prev, clientAvatarFile: file }));
                        }}
                      />
                    </label>
                    
                    {newTestimonial.clientAvatarFile && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                          <Image src={URL.createObjectURL(newTestimonial.clientAvatarFile)} alt="Client Avatar" fill className="object-cover" />
                        </div>
                        <span>Selected</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-550 dark:text-gray-405 shrink-0">Rating:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewTestimonial(prev => ({ ...prev, rating: star }))}
                            className="focus:outline-none"
                          >
                            <Star className={`h-5 w-5 ${star <= newTestimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddTestimonial}
                    className="w-full sm:w-fit flex items-center justify-center space-x-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Testimonial</span>
                  </button>
                </div>
              </div>

              {/* Render Testimonials List */}
              {testimonials.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {testimonials.map((review, idx) => (
                    <div key={idx} className="relative p-4 bg-white dark:bg-gray-800/80 border border-gray-205 dark:border-gray-700/60 rounded-2xl shadow-sm flex flex-col justify-between group">
                      <div className="space-y-2">
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 text-amber-550 fill-amber-500" />
                          ))}
                        </div>
                        <p className="text-xs italic text-gray-650 dark:text-gray-350 line-clamp-3">&ldquo;{review.feedback}&rdquo;</p>
                      </div>
                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                          <Image
                            src={review.clientAvatarFile ? URL.createObjectURL(review.clientAvatarFile) : '/placeholder-avatar.png'}
                            alt={review.clientName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900 dark:text-white">{review.clientName}</p>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400">{review.clientCompany}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveTestimonial(idx)}
                        className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="h-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Single Thumbnail & Multiple Gallery Upload */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-gray-100 dark:border-gray-800">
              
              {/* Main Thumbnail Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-750 dark:text-gray-300">
                  Project Main Thumbnail *
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <label className="flex flex-col items-center justify-center w-full sm:w-1/2 h-44 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl cursor-pointer bg-gray-55 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors shadow-sm">
                    <div className="flex flex-col gap-2 items-center justify-center text-center p-4">
                      <Upload className="h-8 w-8 text-gray-450 dark:text-gray-450" />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Drag & drop or click to upload Main Banner
                      </p>
                    </div>
                    <input
                      required
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        setThumbnail(file);
                      }}
                    />
                  </label>
                  {thumbnail && (
                    <div className="w-full sm:w-1/2 h-44 relative rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                      <Image
                        src={URL.createObjectURL(thumbnail)}
                        alt="Thumbnail Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setThumbnail(null)}
                        className="absolute top-2.5 right-2.5 p-1.5 bg-red-650/90 text-white rounded-full hover:bg-red-700 transition-colors shadow-sm"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Multiple Gallery Images Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-750 dark:text-gray-300">
                  Project Gallery Screenshots <span className="text-xs text-gray-400 font-normal">(Multiple files supported)</span>
                </label>
                <div className="space-y-4">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl cursor-pointer bg-gray-55 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors shadow-sm">
                    <div className="flex flex-col gap-1 items-center justify-center text-center p-2">
                      <Upload className="h-6 w-6 text-gray-450 dark:text-gray-450" />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Upload additional screenshots
                      </p>
                    </div>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleScreenshotChange}
                    />
                  </label>

                  {/* Screenshots preview grid */}
                  {screenshotFiles.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {screenshotFiles.map((file, idx) => (
                        <div key={idx} className="relative h-20 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden group shadow-sm">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`Gallery preview ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveScreenshot(idx)}
                            className="absolute top-1 right-1 p-1 bg-red-650/90 text-white rounded-full hover:bg-red-700 transition-colors shadow-sm opacity-90 hover:opacity-100"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={() => router.push('/dashboard/my-projects')}
                className="flex-1 px-6 py-3.5 border border-gray-300 dark:border-gray-650 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <ImSpinner9 className="animate-spin h-5 w-5 mr-2" />
                    <span>Uploading images & creating project...</span>
                  </span>
                ) : (
                  <span>Create Project</span>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
