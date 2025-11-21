import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Briefcase, Users, DollarSign, Clock, Star, FileText, MessageSquare, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EnhancedClientDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    jobsInProgress: 0,
    jobsCompleted: 0,
    totalApplications: 0,
    acceptedApplications: 0,
    totalSpent: 0,
    avgBudget: 0
  });
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Mock data for sections not yet implemented
  const topFreelancers = [];
  const invoices = [];

  const handleApplicationAction = async (applicationId, action) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://primequillacademy.onrender.com/api/applications/${applicationId}/status`,
        { status: action },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        // Refresh applications
        setApplications(prev => prev.map(app => 
          app._id === applicationId ? { ...app, status: action } : app
        ));
      }
    } catch (error) {
      console.error('Failed to update application:', error);
    }
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Briefcase },
    { id: 'jobs', label: 'My Jobs', icon: Briefcase },
    { id: 'applications', label: 'Applications', icon: Users },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        
        // Fetch jobs first
        const jobsRes = await axios.get('https://primequillacademy.onrender.com/api/jobs', config);
        const userJobs = jobsRes.data.jobs?.filter(job => job.clientId === user.id) || [];
        setJobs(userJobs);
        
        // Calculate stats from jobs
        const totalJobs = userJobs.length;
        const activeJobs = userJobs.filter(job => job.status === 'open').length;
        const jobsInProgress = userJobs.filter(job => job.status === 'in_progress').length;
        const jobsCompleted = userJobs.filter(job => job.status === 'completed').length;
        const totalSpent = userJobs.reduce((sum, job) => sum + (job.budgetMax || 0), 0);
        const avgBudget = totalJobs > 0 ? totalSpent / totalJobs : 0;
        
        setStats({
          totalJobs,
          activeJobs,
          jobsInProgress,
          jobsCompleted,
          totalApplications: 0,
          acceptedApplications: 0,
          totalSpent,
          avgBudget
        });
        
        // Fetch applications for user's jobs
        const jobIds = userJobs.map(job => job._id);
        if (jobIds.length > 0) {
          const appsPromises = jobIds.map(jobId => 
            axios.get(`https://primequillacademy.onrender.com/api/applications/${jobId}/applications`, config).catch(() => ({ data: { applications: [] } }))
          );
          const appsResults = await Promise.all(appsPromises);
          const allApps = appsResults.flatMap(res => res.data.applications || []);
          setApplications(allApps);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user?.id) {
      fetchData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Client Dashboard</h2>
            <p className="text-sm text-gray-600">{user?.name}</p>
          </div>
          <nav className="mt-6">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                    activeTab === item.id ? 'bg-teal-50 text-teal-600 border-r-2 border-teal-600' : 'text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'overview' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                  <p className="text-gray-600">Welcome back, {user?.name}! Here's your project summary.</p>
                </div>
                <Link
                  to="/post-job"
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors inline-flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Post New Job
                </Link>
              </div>
              
              {/* Main Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Jobs Posted</p>
                      <p className="text-3xl font-bold text-teal-600">{stats.totalJobs}</p>
                      <p className="text-sm text-gray-500 mt-1">{stats.totalJobs === 0 ? 'No jobs posted' : 'Jobs posted'}</p>
                    </div>
                    <Briefcase className="w-8 h-8 text-teal-600" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Jobs In Progress</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.jobsInProgress}</p>
                      <p className="text-sm text-gray-500 mt-1">{stats.jobsInProgress === 0 ? 'No active projects' : 'Active projects'}</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Completed Jobs</p>
                      <p className="text-3xl font-bold text-green-600">{stats.jobsCompleted}</p>
                      <p className="text-sm text-gray-500 mt-1">{stats.jobsCompleted === 0 ? 'No completed jobs' : 'Completed jobs'}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Investment</p>
                      <p className="text-3xl font-bold text-purple-600">KSh {stats.totalSpent.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">{stats.totalSpent === 0 ? 'No spending yet' : 'Total investment'}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>

              {/* Secondary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-2xl font-bold text-yellow-600 ml-2">{stats.avgBudget ? (stats.avgBudget / 1000).toFixed(1) + 'K' : 'N/A'}</span>
                  </div>
                  <p className="text-sm text-gray-600">Avg Job Budget</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                  <p className="text-2xl font-bold text-orange-600">{stats.totalApplications}</p>
                  <p className="text-sm text-gray-600">Total Applications</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                  <p className="text-2xl font-bold text-indigo-600">{stats.acceptedApplications}</p>
                  <p className="text-sm text-gray-600">Accepted Applications</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                  <p className="text-2xl font-bold text-pink-600">{stats.activeJobs}</p>
                  <p className="text-sm text-gray-600">Active Jobs</p>
                </div>
              </div>

              {/* Recent Jobs & Top Freelancers */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Jobs */}
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Jobs</h2>
                  </div>
                  <div className="p-6">
                    {jobs.length === 0 ? (
                      <div className="text-center py-8">
                        <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-2">No recent jobs</p>
                        <p className="text-sm text-gray-500">Your posted jobs will appear here</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {jobs.slice(0, 5).map((job) => (
                          <div key={job._id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 mb-1">{job.title}</h3>
                              <p className="text-sm text-gray-600">
                                {job.status === 'open' ? 'Awaiting proposals' : `Status: ${job.status}`}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Posted {new Date(job.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right ml-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                job.status === 'completed' ? 'bg-green-100 text-green-800' :
                                job.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                job.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {job.status.replace('_', ' ')}
                              </span>
                              <p className="text-sm text-gray-600 mt-1">KSh {(job.budgetMax || 0).toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Top Freelancers */}
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Top Freelancers</h2>
                  </div>
                  <div className="p-6">
                    {topFreelancers.length === 0 ? (
                      <div className="text-center py-8">
                        <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-2">No freelancers yet</p>
                        <p className="text-sm text-gray-500">Freelancers you've worked with will appear here</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {topFreelancers.map((freelancer, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                                <span className="text-teal-600 font-semibold">{freelancer.name.charAt(0)}</span>
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{freelancer.name}</h3>
                                <p className="text-sm text-gray-600">{freelancer.projects} projects completed</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center mb-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                <span className="text-sm font-medium">{freelancer.rating}</span>
                              </div>
                              <p className="text-sm text-gray-600">KSh {freelancer.totalEarned.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Job Applications</h1>
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">Pending Applications</h2>
                  <p className="text-gray-600">Review and manage freelancer proposals</p>
                </div>
                {applications.length === 0 ? (
                  <div className="p-12 text-center">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-600">Job applications from freelancers will appear here</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {applications.map((app) => (
                      <div key={app._id} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-semibold text-gray-900">{app.jobId?.title || 'Job Title'}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                app.status === 'approved' ? 'bg-green-100 text-green-800' :
                                app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {app.status}
                              </span>
                            </div>
                            <div className="flex items-center mb-3">
                              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                <span className="text-gray-600 text-sm font-medium">{app.freelancerId?.name?.charAt(0) || 'F'}</span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{app.freelancerId?.name || 'Freelancer'}</p>
                                <p className="text-sm text-gray-600">{app.freelancerId?.email}</p>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3">{app.coverLetter}</p>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Proposed Price:</span>
                                <p className="font-medium">KSh {app.quoteAmount?.toLocaleString()}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Delivery Time:</span>
                                <p className="font-medium">{app.deliveryDays} days</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Applied:</span>
                                <p className="font-medium">{new Date(app.createdAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                          </div>
                          {app.status === 'submitted' && (
                            <div className="flex space-x-3 ml-6">
                              <button 
                                onClick={() => handleApplicationAction(app._id, 'approved')}
                                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                              >
                                Accept
                              </button>
                              <button 
                                onClick={() => handleApplicationAction(app._id, 'rejected')}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
          )}

          {activeTab === 'invoices' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Invoices & Payments</h1>
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">Invoice Management</h2>
                </div>
                {invoices.length === 0 ? (
                  <div className="p-12 text-center">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices yet</h3>
                    <p className="text-gray-600">Invoices from accepted job applications will appear here</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{invoice.jobTitle}</h3>
                            <p className="text-gray-600">Freelancer: {invoice.freelancer}</p>
                            <p className="text-sm text-gray-500">Due: {invoice.dueDate}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">KSh {invoice.amount.toLocaleString()}</p>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                              invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {invoice.status}
                            </span>
                            <div className="mt-2 space-x-2">
                              {invoice.status !== 'Paid' && (
                                <button className="px-3 py-1 bg-teal-600 text-white rounded text-sm hover:bg-teal-700">
                                  Pay Now
                                </button>
                              )}
                              <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300">
                                Download PDF
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Other tabs would be implemented similarly */}
          {activeTab === 'jobs' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Job Management</h1>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="text-center py-12">
                  <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs to manage</h3>
                  <p className="text-gray-600">Your posted jobs will appear here for management</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No messages</h3>
                  <p className="text-gray-600">Conversations with freelancers will appear here</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Reviews & Ratings</h1>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-600">Reviews from completed projects will appear here</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedClientDashboard;