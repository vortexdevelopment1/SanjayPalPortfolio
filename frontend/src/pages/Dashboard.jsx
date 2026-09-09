import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  getProjects, createProject, updateProject, deleteProject,
  getContactMessages, getUnreadContactCount, markMessageAsRead, 
  markMessageAsUnread, deleteContactMessage 
} from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit3, Trash2, LogOut, LayoutDashboard, 
  ExternalLink, Github, Search, AlertCircle, Mail,
  Inbox, FolderKanban, Clock, User, X, CheckCircle2, Eye, MailOpen
} from 'lucide-react';
import ProjectForm from '../components/ProjectForm';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Active Tab: 'projects' | 'messages'
  const [activeTab, setActiveTab] = useState('projects');

  // Projects State
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Messages State
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteMsgConfirm, setDeleteMsgConfirm] = useState(null);

  // Common Search
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch Projects
  async function fetchProjects() {
    setLoadingProjects(true);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
    setLoadingProjects(false);
  }

  // Fetch Messages & Unread Count
  async function fetchMessages() {
    setLoadingMessages(true);
    try {
      const data = await getContactMessages();
      setMessages(data);
      const countRes = await getUnreadContactCount();
      setUnreadCount(countRes.unreadCount || 0);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
    setLoadingMessages(false);
  }

  useEffect(() => {
    fetchProjects();
    fetchMessages();

    // Poll for unread count every 30 seconds
    const interval = setInterval(async () => {
      try {
        const countRes = await getUnreadContactCount();
        setUnreadCount(countRes.unreadCount || 0);
      } catch (err) {
        // Silent catch
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Project Actions
  async function handleAddProject(formData) {
    try {
      await createProject(formData);
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      console.error('Error adding project:', err);
    }
  }

  async function handleUpdateProject(formData) {
    try {
      await updateProject(editingProject._id, formData);
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      console.error('Error updating project:', err);
    }
  }

  async function handleDeleteProject(id) {
    try {
      await deleteProject(id);
      setDeleteConfirm(null);
      fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  }

  // Message Actions
  async function handleOpenMessage(msg) {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      try {
        await markMessageAsRead(msg._id);
        setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: true } : m));
        setUnreadCount(prev => Math.max(0, prev - 1));
      } catch (err) {
        console.error('Error marking as read:', err);
      }
    }
  }

  async function handleToggleReadStatus(msg, e) {
    if (e) e.stopPropagation();
    try {
      if (msg.isRead) {
        await markMessageAsUnread(msg._id);
        setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: false } : m));
        setUnreadCount(prev => prev + 1);
        if (selectedMessage?._id === msg._id) {
          setSelectedMessage(prev => ({ ...prev, isRead: false }));
        }
      } else {
        await markMessageAsRead(msg._id);
        setMessages(prev => prev.map(m => m._id === msg._id ? { ...m, isRead: true } : m));
        setUnreadCount(prev => Math.max(0, prev - 1));
        if (selectedMessage?._id === msg._id) {
          setSelectedMessage(prev => ({ ...prev, isRead: true }));
        }
      }
    } catch (err) {
      console.error('Error toggling read status:', err);
    }
  }

  async function handleDeleteMessage(id) {
    try {
      await deleteContactMessage(id);
      if (selectedMessage?._id === id) setSelectedMessage(null);
      setDeleteMsgConfirm(null);
      fetchMessages();
    } catch (err) {
      console.error('Error deleting message:', err);
    }
  }

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  // Filtered lists
  const filteredProjects = projects.filter(p =>
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMessages = messages.filter(m =>
    m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#07050c] text-[#f1eefb]">
      {/* Top Header Bar */}
      <div className="sticky top-0 z-40 bg-[#0d0917]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-5 h-5 text-purple-400" />
              <h1 className="text-lg font-bold text-white tracking-wide">Admin Dashboard</h1>
            </div>

            {/* Main Tabs */}
            <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/10">
              <button
                onClick={() => { setActiveTab('projects'); setSearchQuery(''); }}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'projects'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <FolderKanban className="w-3.5 h-3.5" />
                <span>Projects</span>
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-mono">
                  {projects.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('messages'); setSearchQuery(''); }}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                  activeTab === 'messages'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>Contact Messages</span>
                {unreadCount > 0 ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500 text-white font-bold animate-pulse">
                    {unreadCount} New
                  </span>
                ) : (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-white/10 text-gray-300 font-mono">
                    {messages.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 hidden sm:inline font-mono">{currentUser?.email}</span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-red-500/10 hover:border-red-500/30 text-gray-300 hover:text-red-400 text-xs font-medium transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* TAB 1: PROJECTS */}
        {activeTab === 'projects' && (
          <div>
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Portfolio Projects</h2>
                <p className="text-gray-400 text-sm mt-1">Manage and update your showcased projects</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                    placeholder="Search projects..."
                  />
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-colors shadow-lg shadow-purple-600/20 flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Add Project
                </button>
              </div>
            </div>

            {/* Projects Grid */}
            {loadingProjects ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-gray-500" />
                </div>
                <p className="text-gray-400 text-sm">
                  {searchQuery ? 'No projects match your search' : 'No projects yet. Add your first project!'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden hover:border-purple-500/20 transition-all group"
                  >
                    {project.image && (
                      <div className="h-40 overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-bold text-white truncate">{project.title}</h3>
                          <span className="text-xs text-purple-300 font-mono">{project.category}</span>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                          project.status === 'Live in Production' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">
                        {project.summary}
                      </p>

                      {project.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.techStack.slice(0, 4).map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 rounded text-[10px] text-purple-300 font-mono">
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 4 && (
                            <span className="px-2 py-0.5 text-[10px] text-gray-500">+{project.techStack.length - 4}</span>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
                        <button
                          onClick={() => setEditingProject(project)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-purple-500/10 text-gray-300 hover:text-purple-300 text-xs font-medium transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(project._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-red-500/10 text-gray-300 hover:text-red-400 text-xs font-medium transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                        <div className="ml-auto flex items-center gap-2">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                              <Github className="w-3.5 h-3.5" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CONTACT MESSAGES */}
        {activeTab === 'messages' && (
          <div>
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
                  {unreadCount > 0 && (
                    <span className="px-2.5 py-1 rounded-full text-xs bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {unreadCount} Unread
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mt-1">Inquiries and messages submitted by portfolio visitors</p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/[0.04] border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-all"
                  placeholder="Search sender, email, message..."
                />
              </div>
            </div>

            {/* Messages Inbox View */}
            {loadingMessages ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="text-center py-20 bg-white/[0.02] rounded-2xl border border-white/10">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] flex items-center justify-center mx-auto mb-4 text-gray-500">
                  <Mail className="w-8 h-8" />
                </div>
                <p className="text-gray-300 font-medium text-base mb-1">
                  {searchQuery ? 'No messages match your search' : 'No contact messages yet'}
                </p>
                <p className="text-gray-500 text-xs">
                  {searchQuery ? 'Try searching for something else.' : 'Messages submitted via your portfolio contact form will appear here.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredMessages.map((msg, idx) => {
                  const createdDate = new Date(msg.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  });
                  const createdTime = new Date(msg.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <motion.div
                      key={msg._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      onClick={() => handleOpenMessage(msg)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                        !msg.isRead 
                          ? 'bg-purple-950/20 border-purple-500/40 shadow-lg shadow-purple-950/30 hover:border-purple-400' 
                          : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04] opacity-90'
                      }`}
                    >
                      {/* Left: Sender Info & Status */}
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        {/* Avatar / Status Dot */}
                        <div className="relative shrink-0 mt-0.5">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                            !msg.isRead 
                              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' 
                              : 'bg-white/10 text-gray-300'
                          }`}>
                            {msg.name?.charAt(0).toUpperCase()}
                          </div>
                          {!msg.isRead && (
                            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0d0917] rounded-full" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className={`text-base truncate ${!msg.isRead ? 'font-extrabold text-white' : 'font-semibold text-gray-200'}`}>
                              {msg.name}
                            </h3>
                            <span className="text-xs font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-md truncate max-w-[200px]">
                              {msg.type}
                            </span>
                            {!msg.isRead ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                NEW
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
                                Read
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-gray-400 font-mono mb-2 truncate">
                            {msg.email}
                          </p>

                          <p className={`text-xs leading-relaxed line-clamp-2 ${!msg.isRead ? 'text-gray-200' : 'text-gray-400'}`}>
                            {msg.message}
                          </p>
                        </div>
                      </div>

                      {/* Right: Date & Quick Actions */}
                      <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-white/10 shrink-0 gap-3">
                        <div className="text-left md:text-right font-mono text-[11px] text-gray-400 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-purple-400" />
                          <span>{createdDate} at {createdTime}</span>
                        </div>

                        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={(e) => handleToggleReadStatus(msg, e)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-purple-500/20 text-gray-300 hover:text-purple-300 border border-white/10 transition-colors text-xs flex items-center gap-1"
                            title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                          >
                            {msg.isRead ? <Mail className="w-3.5 h-3.5" /> : <MailOpen className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setDeleteMsgConfirm(msg._id); }}
                            className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 border border-white/10 transition-colors text-xs"
                            title="Delete Message"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* FULL MESSAGE DETAILS MODAL */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4 py-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0d0917] border border-purple-500/30 rounded-2xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl shadow-purple-950/80 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMessage(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-purple-600 transition-all border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white font-extrabold text-lg flex items-center justify-center shadow-lg shadow-purple-600/30">
                  {selectedMessage.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">{selectedMessage.name}</h3>
                  <p className="text-xs font-mono text-purple-300">{selectedMessage.email}</p>
                </div>
              </div>

              {/* Message Details Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 mb-6 text-xs font-mono">
                <div>
                  <span className="text-gray-400 block mb-1">PROJECT / ROLE TYPE</span>
                  <span className="text-purple-300 font-semibold">{selectedMessage.type}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-1">DATE RECEIVED</span>
                  <span className="text-gray-200">
                    {new Date(selectedMessage.createdAt).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              {/* Full Message Content */}
              <div className="mb-8">
                <h4 className="text-xs font-mono text-gray-400 block mb-2">FULL MESSAGE CONTENT</h4>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => handleToggleReadStatus(selectedMessage)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-purple-500/10 text-gray-300 hover:text-purple-300 text-xs font-medium transition-all"
                >
                  {selectedMessage.isRead ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                  <span>{selectedMessage.isRead ? 'Mark as Unread' : 'Mark as Read'}</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setDeleteMsgConfirm(selectedMessage._id)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/30 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Project Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0d0917] border border-white/[0.08] rounded-xl p-6 max-w-sm w-full shadow-2xl"
            >
              <h3 className="text-lg font-bold text-white mb-2">Delete Project?</h3>
              <p className="text-gray-400 text-sm mb-6">This action cannot be undone. The project will be permanently removed.</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDeleteProject(deleteConfirm)}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-gray-300 text-sm font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Message Confirmation */}
      <AnimatePresence>
        {deleteMsgConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0d0917] border border-red-500/30 rounded-xl p-6 max-w-sm w-full shadow-2xl"
            >
              <h3 className="text-lg font-bold text-white mb-2">Delete Message?</h3>
              <p className="text-gray-400 text-sm mb-6">Are you sure you want to delete this contact message? This action cannot be undone.</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDeleteMessage(deleteMsgConfirm)}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteMsgConfirm(null)}
                  className="px-4 py-2 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-gray-300 text-sm font-medium transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Project Form Modal */}
      <AnimatePresence>
        {showForm && (
          <ProjectForm
            onSave={handleAddProject}
            onCancel={() => setShowForm(false)}
          />
        )}
        {editingProject && (
          <ProjectForm
            project={editingProject}
            onSave={handleUpdateProject}
            onCancel={() => setEditingProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
