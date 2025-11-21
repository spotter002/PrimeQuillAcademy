import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { jobAPI, applicationAPI } from '../services/api';
import { Clock, DollarSign, Eye, MessageSquare, AlertCircle, Shield, FileText, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchData = React.useCallback(async () => {
    try {
      if (user.role === 'freelancer') {
        const [jobsRes, appsRes] = await Promise.all([
          jobAPI.getAll(),
          applicationAPI.getMy()
        ]);
        setJobs(jobsRes.data);
        setApplications(appsRes.data);
      } else if (user.role === 'client') {
        const jobsRes = await jobAPI.getAll();
        setJobs(jobsRes.data);
      }
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [user.role]);

  const getUpgradeBadges = (upgrades) => {
    const badges = [];
    if (upgrades.urgent) badges.push({ icon: Zap, label: 'Urgent', color: 'bg-red-100 text-red-800' });
    if (upgrades.private) badges.push({ icon: Eye, label: 'Private', color: 'bg-purple-100 text-purple-800' });
    if (upgrades.nda) badges.push({ icon: Shield, label: 'NDA', color: 'bg-blue-100 text-blue-800' });
    if (upgrades.ip) badges.push({ icon: FileText, label: 'IP', color: 'bg-green-100 text-green-800' });
    return badges;
  };

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    if (filter === 'urgent') return job.upgrades.urgent;
    if (filter === 'private') return job.upgrades.private;
    return job.status === filter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-accent-teal"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-charcoal">
          {user.role === 'freelancer' ? 'Available Jobs' : 'My Posted Jobs'}
        </h1>
        
        {/* Filters */}
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-teal"
          >
            <option value="all">All Jobs</option>
            <option value="open">Open</option>
            <option value="urgent">Urgent</option>
            <option value="private">Private</option>
            <option value="applied">Applied</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Stats Cards for Freelancers */}
      {user.role === 'freelancer' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Available Jobs</p>
                <p className="text-2xl font-semibold text-gray-900">{jobs.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-green-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">My Applications</p>
                <p className="text-2xl font-semibold text-gray-900">{applications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Urgent Jobs</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {jobs.filter(job => job.upgrades.urgent).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-accent-teal" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500">Avg. Budget</p>
                <p className="text-2xl font-semibold text-gray-900">
                  KSh {Math.round(jobs.reduce((acc, job) => acc + (job.budgetMax || 0), 0) / jobs.length || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Jobs List */}
      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.map((job) => (
          <div key={job._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-charcoal mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-3">{job.finalDescription || job.originalIdea}</p>
                
                {/* Upgrade Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {getUpgradeBadges(job.upgrades).map((badge, index) => (
                    <span key={index} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
                      <badge.icon className="w-3 h-3 mr-1" />
                      {badge.label}
                    </span>
                  ))}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    job.status === 'open' ? 'bg-green-100 text-green-800' :
                    job.status === 'applied' ? 'bg-yellow-100 text-yellow-800' :
                    job.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {job.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-accent-teal">
                  KSh {job.budgetMin?.toLocaleString()} - {job.budgetMax?.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 flex items-center mt-1">
                  <Clock className="w-4 h-4 mr-1" />
                  {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'No deadline'}
                </div>
              </div>
            </div>

            {/* Milestones */}
            {job.milestones && job.milestones.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Milestones:</h4>
                <div className="space-y-1">
                  {job.milestones.map((milestone, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      • {milestone.title} - {milestone.description}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="text-sm text-gray-500">
                Posted by {job.clientId?.name} • {new Date(job.createdAt).toLocaleDateString()}
              </div>
              
              <div className="flex space-x-3">
                <button className="flex items-center text-gray-600 hover:text-gray-900">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Message
                </button>
                
                {user.role === 'freelancer' && job.status === 'open' && (
                  <button 
                    onClick={() => {/* Navigate to application form */}}
                    className="bg-accent-teal text-white px-4 py-2 rounded-md hover:bg-teal-600 transition-colors"
                  >
                    Apply Now
                  </button>
                )}
                
                {user.role === 'client' && (
                  <button 
                    onClick={() => {/* Navigate to job details */}}
                    className="bg-soft-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            {user.role === 'freelancer' ? 'No jobs available at the moment' : 'You haven\'t posted any jobs yet'}
          </div>
          {user.role === 'client' && (
            <button 
              onClick={() => window.location.href = '/'}
              className="mt-4 bg-accent-teal text-white px-6 py-2 rounded-md hover:bg-teal-600 transition-colors"
            >
              Post Your First Job
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;