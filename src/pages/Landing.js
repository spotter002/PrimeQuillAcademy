import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jobAPI } from '../services/api';
import AIRefinementModal from '../components/AIRefinementModal';
import { Upload, Shield, Clock, FileText, CheckCircle, Calendar, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const Landing = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [refinementData, setRefinementData] = useState(null);
  const [currentJob, setCurrentJob] = useState(null);
  const [featuredJobs, setFeaturedJobs] = useState([]);

  const upgrades = [
    { key: 'nda', label: 'NDA (Non-disclosure Agreement)', price: 3303.90, desc: 'Freelancers must sign NDA before accessing files' },
    { key: 'ip', label: 'IP Agreement', price: 3303.90, desc: 'Freelancer signs IP assignment' },
    { key: 'urgent', label: 'Urgent', price: 1500.95, desc: 'Mark job as high-priority with urgent badge' },
    { key: 'private', label: 'Private', price: 3303.90, desc: 'Job hidden from other non-involved users' }
  ];

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        console.log('Fetching featured jobs...');
        const response = await axios.get('http://localhost:5000/api/jobs/featured');
        console.log('Featured jobs response:', response.data);
        setFeaturedJobs(response.data);
      } catch (error) {
        console.error('Failed to fetch featured jobs:', error);
      }
    };
    fetchFeaturedJobs();
  }, []);

  const onSubmit = async (data) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const jobData = {
        title: data.title,
        originalIdea: data.idea,
        category: data.category || 'other',
        budgetMin: parseFloat(data.budgetMin) || 0,
        budgetMax: parseFloat(data.budgetMax) || 0,
        attachments: [], // File upload would be implemented here
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
    } catch (error) {
      toast.error('Failed to create job. Please try again.');
      console.error('Job creation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRefinement = async () => {
    try {
      await jobAPI.confirm(currentJob._id, true);
      setShowModal(false);
      toast.success('Job posted successfully with AI refinement!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to confirm job posting');
    }
  };

  const handleRejectRefinement = async () => {
    try {
      await jobAPI.confirm(currentJob._id, false);
      setShowModal(false);
      toast.success('Job posted with your original idea!');
      navigate('/dashboard');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Hero & Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-charcoal mb-4">
                Turn Your Ideas Into Reality
              </h1>
              <p className="text-xl text-slate mb-6">
                Post your project idea and let our AI refine it into a clear, actionable brief for skilled freelancers.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-accent-teal" />
                <span className="text-slate">AI-powered project refinement</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-accent-teal" />
                <span className="text-slate">Secure payments & signed NDAs</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-accent-teal" />
                <span className="text-slate">Fast turnaround times</span>
              </div>
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-accent-teal" />
                <span className="text-slate">Automatic invoice generation</span>
              </div>
            </div>
          </div>

          {/* Right Column - Job Post Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-charcoal mb-6">Post Your Project</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title
                </label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
                  placeholder="Brief title for your project"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe Your Project
                </label>
                <textarea
                  {...register('idea', { required: 'Project description is required' })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
                  placeholder="Describe your project in detail..."
                />
                {errors.idea && (
                  <p className="text-red-500 text-sm mt-1">{errors.idea.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    {...register('category')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
                  >
                    <option value="programming">Programming</option>
                    <option value="writing">Essay Writing</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Budget (KSh)
                  </label>
                  <input
                    {...register('budgetMin', { required: 'Minimum budget is required' })}
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
                    placeholder="5000"
                  />
                  {errors.budgetMin && (
                    <p className="text-red-500 text-sm mt-1">{errors.budgetMin.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Budget (KSh)
                  </label>
                  <input
                    {...register('budgetMax', { required: 'Maximum budget is required' })}
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
                    placeholder="15000"
                  />
                  {errors.budgetMax && (
                    <p className="text-red-500 text-sm mt-1">{errors.budgetMax.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  File Upload (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Drag & drop files here or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Max 25MB</p>
                </div>
              </div>

              {/* Upgrades Section */}
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-4">Upgrade Options</h3>
                <div className="space-y-3">
                  {upgrades.map((upgrade) => (
                    <label key={upgrade.key} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <input
                        {...register(upgrade.key)}
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-accent-teal focus:ring-accent-teal border-gray-300 rounded"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <span className="font-medium text-gray-900">{upgrade.label}</span>
                          <span className="text-accent-teal font-semibold">
                            KSh {upgrade.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{upgrade.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                
                {calculateTotal() > 0 && (
                  <div className="mt-4 p-3 bg-accent-teal bg-opacity-10 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Total Upgrades:</span>
                      <span className="text-accent-teal font-bold text-lg">
                        KSh {calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent-teal text-white py-3 px-4 rounded-md hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Post Your Idea'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Debug info */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <p className="text-sm text-gray-500">Featured jobs count: {featuredJobs.length}</p>
      </div>

      {/* Featured Jobs Section */}
      {featuredJobs.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-4">
              Recent Projects
            </h2>
            <p className="text-xl text-slate">
              See what clients are looking for
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <div key={job._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-charcoal line-clamp-2">
                    {job.title}
                  </h3>
                  {job.upgrades?.urgent && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                      Urgent
                    </span>
                  )}
                </div>
                
                <p className="text-slate text-sm mb-4 line-clamp-3">
                  {job.finalDescription || job.originalIdea}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>
                      KSh {job.budgetMin?.toLocaleString()} - {job.budgetMax?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500">
                    Posted by {job.clientId?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button 
              onClick={() => navigate('/login')}
              className="bg-accent-teal text-white px-6 py-3 rounded-md hover:bg-teal-600 transition-colors"
            >
              View All Projects
            </button>
          </div>
        </div>
      )}

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

export default Landing;