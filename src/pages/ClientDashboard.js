import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Eye, MessageSquare, Clock, CheckCircle, XCircle, FileText, Briefcase, Settings, User, DollarSign, Upload, Shield, Calendar } from 'lucide-react';
import { jobAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import CollapsibleSidebar from '../components/CollapsibleSidebar';
import UserSettings from '../components/settings/UserSettings';
import AIRefinementModal from '../components/AIRefinementModal';

const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
  const [activeTab, setActiveTab] = useState('overview');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    rejected: 0
  });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [refinementData, setRefinementData] = useState(null);
  const [currentJob, setCurrentJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Briefcase },
    { id: 'post-job', label: 'Post New Job', icon: Plus },
    { id: 'jobs', label: 'My Jobs', icon: FileText },
    { id: 'applications', label: 'Applications', icon: MessageSquare },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const upgrades = [
    { key: 'nda', label: 'NDA (Non-disclosure Agreement)', price: 3303.90, desc: 'Freelancers must sign NDA before accessing files' },
    { key: 'ip', label: 'IP Agreement', price: 3303.90, desc: 'Freelancer signs IP assignment' },
    { key: 'urgent', label: 'Urgent', price: 1500.95, desc: 'Mark job as high-priority with urgent badge' },
    { key: 'private', label: 'Private', price: 3303.90, desc: 'Job hidden from other non-involved users' }
  ];

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await jobAPI.getAll();
      const userJobs = response.data.jobs || [];
      setJobs(userJobs);
      
      setStats({
        total: userJobs.length,
        active: userJobs.filter(job => job.status === 'open' || job.status === 'in_progress').length,
        completed: userJobs.filter(job => job.status === 'completed').length,
        rejected: userJobs.filter(job => job.status === 'cancelled').length
      });
    } catch (error) {
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    try {
      // Fetch applications for client's jobs
      const jobIds = jobs.map(job => job._id);
      const allApplications = [];
      for (const jobId of jobIds) {
        try {
          const response = await fetch(`http://localhost:5000/api/applications/${jobId}/applications`);
          if (response.ok) {
            const data = await response.json();
            allApplications.push(...data.applications);
          }
        } catch (error) {
          console.error('Error fetching applications for job:', jobId, error);
        }
      }
      setApplications(allApplications);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const jobData = {
        title: data.title,
        originalIdea: data.idea,
        category: data.category || 'other',
        budgetMin: parseFloat(data.budgetMin) || 0,
        budgetMax: parseFloat(data.budgetMax) || 0,
        deadline: data.deadline ? new Date(data.deadline) : null,
        attachments: [],
        upgrades: {
          nda: data.nda || false,
          ip: data.ip || false,
          urgent: data.urgent || false,
          private: data.private || false
        }
      };

      const response = await jobAPI.create(jobData);
      setCurrentJob(response.data.job);
      setRefinementData(response.data.refinement);
      setShowModal(true);
      reset();
    } catch (error) {
      toast.error('Failed to create job. Please try again.');
      console.error('Job creation error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAcceptRefinement = async () => {
    try {
      await jobAPI.confirm(currentJob._id, true);
      setShowModal(false);
      toast.success('Job posted successfully with AI refinement!');
      fetchJobs();
      setActiveTab('jobs');
    } catch (error) {
      toast.error('Failed to confirm job posting');
    }
  };

  const handleRejectRefinement = async () => {
    try {
      await jobAPI.confirm(currentJob._id, false);
      setShowModal(false);
      toast.success('Job posted with your original idea!');
      fetchJobs();
      setActiveTab('jobs');
    } catch (error) {
      toast.error('Failed to confirm job posting');
    }
  };

  const calculateTotal = () => {
    const watchedValues = watch();
    return upgrades.reduce((total, upgrade) => {
      return total + (watchedValues[upgrade.key] ? upgrade.price : 0);
    }, 0);
  };

  const handleApplicationAction = async (applicationId, action) => {
    try {
      const response = await fetch(`http://localhost:5000/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: action })
      });
      
      if (response.ok) {
        toast.success(`Application ${action}!`);
        fetchApplications();
      } else {
        toast.error('Failed to update application');
      }
    } catch (error) {
      toast.error('Failed to update application');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (activeTab === 'settings') {
      return (
        <div className="h-full">
          <UserSettings />
        </div>
      );
    }

    if (activeTab === 'post-job') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Your Project</h1>
              <p className="text-xl text-gray-600">Describe your project and let our AI refine it for better results</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
                    <input
                      {...register('title', { required: 'Title is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Brief title for your project"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      {...register('category')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="programming">Programming</option>
                      <option value="writing">Essay Writing</option>
                      <option value="design">Design</option>
                      <option value="marketing">Marketing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Describe Your Project</label>
                  <textarea
                    {...register('idea', { required: 'Project description is required' })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Describe your project in detail..."
                  />
                  {errors.idea && <p className="text-red-500 text-sm mt-1">{errors.idea.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Budget (KSh)</label>
                    <input
                      {...register('budgetMin', { required: 'Minimum budget is required' })}
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="5000"
                    />
                    {errors.budgetMin && <p className="text-red-500 text-sm mt-1">{errors.budgetMin.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Budget (KSh)</label>
                    <input
                      {...register('budgetMax', { required: 'Maximum budget is required' })}
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="15000"
                    />
                    {errors.budgetMax && <p className="text-red-500 text-sm mt-1">{errors.budgetMax.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                    <input
                      {...register('deadline')}
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File Upload (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Drag & drop files here or click to browse</p>
                    <p className="text-xs text-gray-500 mt-1">Max 25MB</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Upgrade Options</h3>
                  <div className="space-y-3">
                    {upgrades.map((upgrade) => (
                      <label key={upgrade.key} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <input
                          {...register(upgrade.key)}
                          type="checkbox"
                          className="mt-1 h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-gray-900">{upgrade.label}</span>
                            <span className="text-teal-600 font-semibold">KSh {upgrade.price.toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{upgrade.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  
                  {calculateTotal() > 0 && (
                    <div className="mt-4 p-3 bg-teal-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">Total Upgrades:</span>
                        <span className="text-teal-600 font-bold text-lg">KSh {calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Processing...' : 'Post Your Project'}
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === 'applications') {
      return (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Job Applications</h1>
            <p className="text-gray-600 mt-1">Review and manage applications from freelancers</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Received Applications</h2>
            </div>
            
            {applications.length === 0 ? (
              <div className="p-12 text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                <p className="text-gray-600">Applications from freelancers will appear here</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {applications.map((application) => (
                  <div key={application._id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.freelancerId?.name || 'Freelancer'}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            application.status === 'approved' ? 'bg-green-100 text-green-800' :
                            application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {application.status}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{application.coverLetter}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            KSh {application.quoteAmount?.toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {application.deliveryDays} days
                          </span>
                          <span>Applied {new Date(application.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      {application.status === 'submitted' && (
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => handleApplicationAction(application._id, 'approved')}
                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleApplicationAction(application._id, 'rejected')}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your projects and track progress</p>
          </div>
          <button 
            onClick={() => setActiveTab('post-job')}
            className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all inline-flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Post New Project
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileText className="w-8 h-8 text-teal-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-3xl font-bold text-blue-600">{stats.active}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Applications</p>
                <p className="text-3xl font-bold text-purple-600">{applications.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white rounded-lg shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Your Projects</h2>
          </div>
          
          {jobs.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
              <p className="text-gray-600 mb-6">Start by posting your first project idea</p>
              <button 
                onClick={() => setActiveTab('post-job')}
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all inline-flex items-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Post Your First Project
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <div key={job._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                          {getStatusIcon(job.status)}
                          <span className="ml-1 capitalize">{job.status.replace('_', ' ')}</span>
                        </span>
                        {job.upgrades?.urgent && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Urgent</span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">{job.finalDescription || job.originalIdea}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          KSh {job.budgetMin?.toLocaleString()} - {job.budgetMax?.toLocaleString()}
                        </span>
                        <span>{job.applicationsCount || 0} applications</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button 
                        onClick={() => setActiveTab('applications')}
                        className="p-2 text-gray-400 hover:text-teal-600 transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <MessageSquare className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* Collapsible Sidebar */}
      <CollapsibleSidebar
        items={sidebarItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={user}
        title="Client Dashboard"
      />

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
        {renderContent()}
      </div>

      <AIRefinementModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        originalIdea={currentJob?.originalIdea}
        refinement={refinementData}
        onAccept={handleAcceptRefinement}
        onReject={handleRejectRefinement}
      />
    </div>
  );
};

export default ClientDashboard;