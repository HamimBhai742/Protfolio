'use client';

import { useEffect, useState, useCallback } from 'react';
import { Mail, MailOpen, Trash2, Calendar, User, Eye, ArrowRight, Inbox } from 'lucide-react';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function InquiriesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v2/messages?filter=${filter}`);
      const data = await res.json();
      if (data?.success) {
        setMessages(data.data);
      } else {
        toast.error(data?.message || 'Failed to fetch inquiries.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error fetching inquiries.');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const toggleReadStatus = async (msg: Message) => {
    try {
      const newReadState = !msg.isRead;
      const res = await fetch(`/api/v2/messages/update/${msg.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: newReadState }),
      });
      const data = await res.json();
      if (res.ok && data?.success) {
        toast.success(newReadState ? 'Marked as read' : 'Marked as unread');
        
        // Update local state
        setMessages(prev =>
          prev.map(m => (m.id === msg.id ? { ...m, isRead: newReadState } : m))
        );
        if (selectedMessage && selectedMessage.id === msg.id) {
          setSelectedMessage(prev => prev ? { ...prev, isRead: newReadState } : null);
        }
      } else {
        toast.error(data?.message || 'Failed to update status.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating status.');
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    try {
      const res = await fetch(`/api/v2/messages/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data?.success) {
        toast.success('Inquiry deleted successfully');
        setMessages(prev => prev.filter(m => m.id !== id));
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(null);
        }
      } else {
        toast.error(data?.message || 'Failed to delete inquiry.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error deleting inquiry.');
    }
  };

  const handleOpenMessage = (msg: Message) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      toggleReadStatus(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 md:p-4 p-2">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-950 to-gray-750 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Inquiries
            </h1>
            <p className="text-gray-650 dark:text-gray-400 mt-1">
              Read and manage contact messages from your portfolio visitors
            </p>
          </div>

          {/* Filters */}
          <div className="flex bg-white dark:bg-gray-800 p-1 rounded-xl shadow border border-gray-200 dark:border-gray-700">
            {(['all', 'unread', 'read'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all capitalize hover:cursor-pointer ${
                  filter === tab
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Messages list */}
          <div className={`${selectedMessage ? 'lg:col-span-6' : 'lg:col-span-12'} space-y-4`}>
            {loading && messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md">
                <ImSpinner9 className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="text-gray-600 dark:text-gray-450 mt-4 font-semibold">Loading inquiries...</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md">
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                  <Inbox className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">No inquiries found</h3>
                <p className="text-gray-600 dark:text-gray-450 mt-1">There are no messages in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    onClick={() => handleOpenMessage(msg)}
                    className={`relative p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:border-blue-500/30 dark:hover:border-blue-400/30 hover:cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      selectedMessage?.id === msg.id
                        ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 shadow-md'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    } ${!msg.isRead ? 'border-l-4 border-l-blue-600 dark:border-l-blue-500 font-medium' : ''}`}
                  >
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="flex items-center space-x-2.5">
                        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${msg.isRead ? 'bg-gray-300 dark:bg-gray-600' : 'bg-blue-600 dark:bg-blue-500'}`} />
                        <h3 className="font-bold text-gray-900 dark:text-white truncate text-base">{msg.subject}</h3>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-450">
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{msg.name}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(msg.createdAt).toLocaleDateString()}</span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-350 truncate">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => toggleReadStatus(msg)}
                        title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                        className={`p-2 rounded-xl border transition-colors hover:cursor-pointer ${
                          msg.isRead
                            ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                            : 'bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                        }`}
                      >
                        {msg.isRead ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        title="Delete Message"
                        className="p-2 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-150 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/50 hover:cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Message view detail pane */}
          {selectedMessage && (
            <div className="lg:col-span-6 bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 space-y-6 h-fit sticky top-24">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  View Inquiry
                </h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-sm font-bold text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">From</label>
                  <p className="font-bold text-gray-900 dark:text-white text-base">{selectedMessage.name}</p>
                  <a href={`mailto:${selectedMessage.email}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 mt-0.5">
                    {selectedMessage.email} <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Date Received</label>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Status</label>
                    <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full mt-0.5 ${
                      selectedMessage.isRead
                        ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200/50'
                        : 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200/50'
                    }`}>
                      {selectedMessage.isRead ? 'Read' : 'New / Unread'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Subject</label>
                  <p className="font-bold text-gray-900 dark:text-white text-lg bg-gray-50 dark:bg-gray-900/50 p-3.5 rounded-xl border border-gray-150 dark:border-gray-700/50">
                    {selectedMessage.subject}
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Message Content</label>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border border-gray-150 dark:border-gray-700/50 whitespace-pre-wrap max-h-80 overflow-y-auto">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => toggleReadStatus(selectedMessage)}
                  className={`flex-1 py-3 px-4 rounded-xl border text-sm font-bold transition-all hover:cursor-pointer flex items-center justify-center gap-2 ${
                    selectedMessage.isRead
                      ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-650 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      : 'bg-blue-600 dark:bg-blue-500 text-white border-transparent hover:bg-blue-700 dark:hover:bg-blue-600 shadow-md'
                  }`}
                >
                  {selectedMessage.isRead ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                  {selectedMessage.isRead ? 'Mark as Unread' : 'Mark as Read'}
                </button>
                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-750 text-white text-sm font-bold hover:cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
