'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit3, Trash2, Calendar, Briefcase, GraduationCap, MapPin, X, Save, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';

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

export default function TimelineDashboardPage() {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<TimelineItem> | null>(null);
  const [formType, setFormType] = useState<'create' | 'update'>('create');
  
  // Form fields
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    type: 'work' as 'work' | 'education',
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v2/timeline');
      const data = await res.json();
      if (data?.success) {
        setItems(data.data);
      } else {
        toast.error(data?.message || 'Failed to fetch timeline items.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error fetching timeline.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleStartAdd = () => {
    setFormData({
      title: '',
      organization: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      type: 'work',
    });
    setFormType('create');
    setEditingItem(null);
    setIsEditing(true);
  };

  const handleStartEdit = (item: TimelineItem) => {
    setFormData({
      title: item.title,
      organization: item.organization,
      location: item.location || '',
      startDate: item.startDate,
      endDate: item.endDate === 'Present' ? '' : item.endDate || '',
      description: item.description,
      type: item.type,
    });
    setFormType('update');
    setEditingItem(item);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this entry?')) return;
    try {
      const res = await fetch(`/api/v2/timeline/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data?.success) {
        toast.success('Timeline entry deleted');
        setItems(prev => prev.filter(item => item.id !== id));
      } else {
        toast.error(data?.message || 'Failed to delete timeline entry.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error deleting timeline entry.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.organization || !formData.startDate || !formData.description) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      if (formType === 'create') {
        const res = await fetch('/api/v2/timeline/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok && data?.success) {
          toast.success('Timeline entry created successfully');
          setItems(prev => [data.data, ...prev]);
          setIsEditing(false);
        } else {
          toast.error(data?.message || 'Failed to create timeline entry.');
        }
      } else if (formType === 'update' && editingItem) {
        const res = await fetch(`/api/v2/timeline/update/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok && data?.success) {
          toast.success('Timeline entry updated successfully');
          setItems(prev => prev.map(item => (item.id === editingItem.id ? data.data : item)));
          setIsEditing(false);
        } else {
          toast.error(data?.message || 'Failed to update timeline entry.');
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred during save.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 md:p-4 p-2">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-950 to-gray-750 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Manage Timeline
            </h1>
            <p className="text-gray-650 dark:text-gray-400 mt-1">
              Add and edit your professional work experiences and educational timeline
            </p>
          </div>
          
          {!isEditing && (
            <button
              onClick={handleStartAdd}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-655 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:cursor-pointer transition-all font-medium self-start sm:self-center"
            >
              <Plus className="w-5 h-5" />
              <span>Add Entry</span>
            </button>
          )}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main List */}
          <div className={`${isEditing ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-6`}>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md">
                <ImSpinner9 className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="text-gray-600 dark:text-gray-450 mt-4 font-semibold">Loading timeline items...</span>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md">
                <AlertCircle className="w-12 h-12 text-gray-400 dark:text-gray-650 mb-3" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">No timeline items added</h3>
                <p className="text-gray-600 dark:text-gray-450 mt-1 text-sm">Get started by creating your first entry.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Work Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Work Experiences
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {items.filter(i => i.type === 'work').map(item => (
                      <div key={item.id} className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1.5 min-w-0">
                          <span className="inline-block text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full">
                            {item.startDate} - {item.endDate || 'Present'}
                          </span>
                          <h3 className="font-bold text-gray-900 dark:text-white text-base truncate">{item.title}</h3>
                          <p className="text-sm font-semibold text-gray-650 dark:text-gray-400 flex items-center gap-1.5">
                            {item.organization} {item.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{item.location}</span>}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-350 line-clamp-2 pt-1">{item.description}</p>
                        </div>
                        <div className="flex gap-2.5 shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => handleStartEdit(item)}
                            className="p-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-750 text-gray-600 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-600 hover:cursor-pointer transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl border border-red-150 dark:border-red-800/80 hover:cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education Section */}
                <div className="space-y-4 pt-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Education History
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    {items.filter(i => i.type === 'education').map(item => (
                      <div key={item.id} className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1.5 min-w-0">
                          <span className="inline-block text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-0.5 rounded-full">
                            {item.startDate} - {item.endDate || 'Present'}
                          </span>
                          <h3 className="font-bold text-gray-900 dark:text-white text-base truncate">{item.title}</h3>
                          <p className="text-sm font-semibold text-gray-655 dark:text-gray-400 flex items-center gap-1.5">
                            {item.organization} {item.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{item.location}</span>}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-350 line-clamp-2 pt-1">{item.description}</p>
                        </div>
                        <div className="flex gap-2.5 shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => handleStartEdit(item)}
                            className="p-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-750 text-gray-600 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-600 hover:cursor-pointer transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2.5 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 rounded-xl border border-red-150 dark:border-red-800/80 hover:cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Edit Pane / Form */}
          {isEditing && (
            <div className="lg:col-span-6 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6 h-fit sticky top-24">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-650" />
                  {formType === 'create' ? 'Add Timeline Entry' : 'Edit Timeline Entry'}
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Type</label>
                    <select
                      value={formData.type}
                      onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as 'work' | 'education' }))}
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-550/10"
                    >
                      <option value="work">Work Experience</option>
                      <option value="education">Education</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Title / Degree *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior Developer"
                      value={formData.title}
                      onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-550/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Company / School *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Acme Corp"
                      value={formData.organization}
                      onChange={e => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-550/10"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Remote / Dhaka"
                      value={formData.location}
                      onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-550/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Start Date *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jan 2024"
                      value={formData.startDate}
                      onChange={e => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-550/10"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">End Date</label>
                    <input
                      type="text"
                      placeholder="e.g. Present / Dec 2025"
                      value={formData.endDate}
                      onChange={e => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-550/10"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Description *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your role, achievements, or field of study..."
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-550/10 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-650 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:cursor-pointer transition-all active:scale-98"
                >
                  <Save className="w-4.5 h-4.5" />
                  <span>{formType === 'create' ? 'Create Entry' : 'Save Changes'}</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
