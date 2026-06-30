'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function ContactSection({ email, phone, address }: { email?: string; phone?: string; address?: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/v2/messages/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data?.success) {
        toast.success(data?.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(data?.message || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Contact submission error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-slate-50 via-slate-50 to-indigo-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 border-t border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <ScrollReveal direction="up" delay={100}>
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border border-blue-100 dark:border-blue-900/50">
              <MessageSquare className="w-4 h-4" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-gray-950 dark:text-white tracking-tight">
              Let&apos;s Start A <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-400 dark:to-indigo-300 bg-clip-text text-transparent">Conversation</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a project in mind, want to collaborate, or just want to say hello? Drop me a message and I&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Contact details */}
          <ScrollReveal direction="left" delay={200} className="lg:col-span-5 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-400">
                You can reach out directly via email or phone, or locate me at my main address.
              </p>

              <div className="space-y-6 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center border border-blue-100/50 dark:border-blue-800/30 text-blue-600 dark:text-blue-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Email Me</p>
                    <a href={`mailto:${email || 'mdhamim5088@gmail.com'}`} className="text-sm sm:text-base font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {email || 'mdhamim5088@gmail.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center border border-green-100/50 dark:border-green-800/30 text-green-600 dark:text-green-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Call Me</p>
                    <a href={`tel:${phone || '+8801700000000'}`} className="text-sm sm:text-base font-bold text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors">
                      {phone || '+880 1700-000000'}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center border border-indigo-100/50 dark:border-indigo-800/30 text-indigo-600 dark:text-indigo-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Location</p>
                    <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                      {address || 'House 24, Road 08, Rampura, Banasree, Dhaka 1219'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200/50 dark:border-gray-800/50">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-3">Response Time</span>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Typically responds within 24 hours.
              </p>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal direction="right" delay={300} className="lg:col-span-7 bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="form-name" className="text-sm font-bold text-gray-700 dark:text-gray-300">Name</label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-750 focus:border-blue-500 dark:focus:border-blue-400 rounded-2xl px-4 py-3.5 text-gray-900 dark:text-white text-sm outline-none transition-all focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="form-email" className="text-sm font-bold text-gray-700 dark:text-gray-300">Email Address</label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-750 focus:border-blue-500 dark:focus:border-blue-400 rounded-2xl px-4 py-3.5 text-gray-900 dark:text-white text-sm outline-none transition-all focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="form-subject" className="text-sm font-bold text-gray-700 dark:text-gray-300">Subject</label>
                <input
                  id="form-subject"
                  type="text"
                  required
                  placeholder="Project Collaboration"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-750 focus:border-blue-500 dark:focus:border-blue-400 rounded-2xl px-4 py-3.5 text-gray-900 dark:text-white text-sm outline-none transition-all focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="form-message" className="text-sm font-bold text-gray-700 dark:text-gray-300">Message</label>
                <textarea
                  id="form-message"
                  required
                  rows={5}
                  placeholder="Hi Hamim, I&apos;d like to talk about..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-750 focus:border-blue-500 dark:focus:border-blue-400 rounded-2xl px-4 py-3.5 text-gray-900 dark:text-white text-sm outline-none transition-all focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-indigo-500/20 active:scale-98 transition-all hover:cursor-pointer disabled:opacity-70 disabled:pointer-events-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4.5 h-4.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

