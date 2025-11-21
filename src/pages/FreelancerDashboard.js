import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Briefcase, Settings, Star, Edit3, Save, FileText, CheckCircle, DollarSign, Calendar, Send, Eye, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import CollapsibleSidebar from '../components/CollapsibleSidebar';
import UserSettings from '../components/settings/UserSettings';
import toast from 'react-hot-toast';
import axios from 'axios';

const FreelancerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState({
    totalApplications: 0,
    approvedApplications: 0,
    pendingApplications: 0,
    rejectedApplications: 0,
    winRate: 0,
    applicationsLast7Days: 0,
    applicationsLast30Days: 0,
    avgProposalAmount: 0,
    totalEarnings: 0
  });
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [profile, setProfile] = useState({
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills || [],
    rates: user?.profile?.rates || '',
    email: user?.profile?.contactLinks?.email || '',
    whatsapp: user?.profile?.contactLinks?.whatsapp || '',
    website: user?.profile?.contactLinks?.website || ''
  });

  const handleSaveProfile = () => {
    // TODO: API call to save profile
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [jobsRes] = await Promise.all([
          axios.get('https://primequillacademy.onrender.com/api/jobs')
        ]);
        
        const openJobs = jobsRes.data.jobs?.filter(job => job.status === 'open') || [];
        setJobs(openJobs);
        
        // Fetch user's applications
        try {
          const appsRes = await axios.get(`https://primequillacademy.onrender.com/api/applications/freelancer/${user.id}`);
          setApplications(appsRes.data.applications || []);
          
          // Calculate stats from applications
          const apps = appsRes.data.applications || [];
          const approved = apps.filter(app => app.status === 'approved').length;
          const total = apps.length;
          
          setStats({
            totalApplications: total,
            approvedApplications: approved,
            pendingApplications: apps.filter(app => app.status === 'submitted').length,
            rejectedApplications: apps.filter(app => app.status === 'rejected').length,
            winRate: total > 0 ? (approved / total) * 100 : 0,
            avgProposalAmount: total > 0 ? apps.reduce((sum, app) => sum + (app.quoteAmount || 0), 0) / total : 0,
            totalEarnings: apps.filter(app => app.status === 'approved').reduce((sum, app) => sum + (app.quoteAmount || 0), 0)
          });
        } catch (error) {
          console.error('Error fetching applications:', error);
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

  const handleApplyToJob = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
  };

  const onSubmitApplication = async (data) => {
    try {
      const response = await axios.post(`https://primequillacademy.onrender.com/api/applications/${selectedJob._id}/apply`, {
        quoteAmount: parseFloat(data.quoteAmount),
        deliveryDays: parseInt(data.deliveryDays),
        coverLetter: data.coverLetter,
        portfolioLinks: data.portfolioLinks ? data.portfolioLinks.split('\n').filter(link => link.trim()) : []
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        toast.success('Application submitted successfully!');
        setShowApplicationModal(false);
        reset();
        // Refresh applications
        const appsRes = await axios.get(`https://primequillacademy.onrender.com/api/applications/freelancer/${user.id}`);
        setApplications(appsRes.data.applications || []);
      }
    } catch (error) {
      toast.error('Failed to submit application');
      console.error('Application error:', error);
    }
  };

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Briefcase },
    { id: 'browse', label: 'Browse Jobs', icon: Briefcase },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'contracts', label: 'Active Contracts', icon: CheckCircle },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
    { id: 'portfolio', label: 'Portfolio', icon: Star },
    { id: 'profile', label: 'Edit Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Collapsible Sidebar */}
      <CollapsibleSidebar
        items={sidebarItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={user}
        title="Freelancer Dashboard"
      />

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
        {activeTab === 'settings' && (
          <div className="h-full">
            <UserSettings />
          </div>
        )}
        
        {activeTab !== 'settings' && (
          <div className="p-8">
            {activeTab === 'overview' && (
              <div>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900">Freelancer Dashboard</h1>
                  <p className="text-gray-600">Welcome back, {user?.name}!</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                        <p className="text-3xl font-bold text-green-600">KSh {stats.totalEarnings.toLocaleString()}</p>
                        <p className="text-sm text-gray-500 mt-1">{stats.totalEarnings === 0 ? 'No earnings yet' : 'From approved applications'}</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Applications Sent</p>
                        <p className="text-3xl font-bold text-blue-600">{stats.totalApplications}</p>
                        <p className="text-sm text-gray-500 mt-1">{stats.totalApplications === 0 ? 'No applications sent' : 'Total applications'}</p>
                      </div>
                      <Briefcase className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Win Rate</p>
                        <p className="text-3xl font-bold text-purple-600">{stats.winRate.toFixed(1)}%</p>
                        <p className="text-sm text-gray-500 mt-1">{stats.approvedApplications} of {stats.totalApplications} approved</p>
                      </div>
                      <FileText className="w-8 h-8 text-purple-600" />
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Avg Proposal</p>
                        <p className="text-3xl font-bold text-orange-600">KSh {Math.round(stats.avgProposalAmount).toLocaleString()}</p>
                        <p className="text-sm text-gray-500 mt-1">{stats.avgProposalAmount === 0 ? 'No proposals yet' : 'Average proposal amount'}</p>
                      </div>
                      <User className="w-8 h-8 text-orange-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Applications</h2>
                  {applications.length === 0 ? (
                    <div className="text-center py-8">
                      <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 mb-2">No applications yet</p>
                      <p className="text-sm text-gray-500">Start applying to jobs to see your activity here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {applications.slice(0, 5).map((application) => (
                        <div key={application._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{application.jobId?.title || 'Job Title'}</h4>
                            <p className="text-sm text-gray-600">KSh {application.quoteAmount?.toLocaleString()} • {application.deliveryDays} days</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            application.status === 'approved' ? 'bg-green-100 text-green-800' :
                            application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {application.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'browse' && (
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Jobs</h1>
                <div className="space-y-6">
                  {jobs.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <div className="text-center py-12">
                        <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs available</h3>
                        <p className="text-gray-600">Check back later for new opportunities</p>
                      </div>
                    </div>
                  ) : (
                    jobs.map((job) => (
                      <div key={job._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                              {job.upgrades?.urgent && (
                                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Urgent</span>
                              )}
                            </div>
                            <p className="text-gray-600 mb-3 line-clamp-3">{job.finalDescription || job.originalIdea}</p>
                            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                KSh {(job.budgetMin || 0).toLocaleString()} - {(job.budgetMax || 0).toLocaleString()}
                              </span>
                              <span className="capitalize">{job.category?.replace('_', ' ')}</span>
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(job.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 text-xs text-gray-400">
                              <span>{job.applicationsCount || 0} applications</span>
                              <span>Posted by {job.clientId?.name || 'Client'}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <button 
                              onClick={() => handleApplyToJob(job)}
                              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center"
                            >
                              <Send className="w-4 h-4 mr-2" />
                              Apply Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {activeTab === 'applications' && (
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Applications</h1>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  {applications.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                      <p className="text-gray-600">Start applying to jobs to track your applications here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((application) => (
                        <div key={application._id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {application.jobId?.title || 'Job Title'}
                                </h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  application.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {application.status}
                                </span>
                              </div>
                              
                              <p className="text-gray-600 mb-3 line-clamp-2">{application.coverLetter}</p>
                              
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
                            
                            <div className="flex items-center space-x-2 ml-4">
                              <button className="p-2 text-gray-400 hover:text-teal-600 transition-colors">
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
            )}

            {activeTab === 'profile' && (
              <div>
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
                  <button
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        disabled={!isEditing}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                        placeholder="Tell clients about yourself..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate</label>
                      <input
                        type="text"
                        value={profile.rates}
                        onChange={(e) => setProfile({...profile, rates: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                        placeholder="e.g., KSh 2,000/hour"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp</label>
                      <input
                        type="text"
                        value={profile.whatsapp}
                        onChange={(e) => setProfile({...profile, whatsapp: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                        placeholder="+254 704 258 346"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      <input
                        type="url"
                        value={profile.website}
                        onChange={(e) => setProfile({...profile, website: e.target.value})}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {['contracts', 'earnings', 'portfolio'].includes(activeTab) && (
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                  {activeTab === 'contracts' ? 'Active Contracts' :
                   activeTab === 'earnings' ? 'Earnings' : 'Portfolio'}
                </h1>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-center py-12">
                    {activeTab === 'contracts' && <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />}
                    {activeTab === 'earnings' && <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />}
                    {activeTab === 'portfolio' && <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />}
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {activeTab === 'contracts' ? 'No active contracts' :
                       activeTab === 'earnings' ? 'No earnings yet' : 'No portfolio items'}
                    </h3>
                    <p className="text-gray-600">
                      {activeTab === 'contracts' ? 'Your accepted job applications will appear here' :
                       activeTab === 'earnings' ? 'Complete jobs to start earning money' :
                       'Add your work samples to showcase your skills'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Apply to Job</h2>
              <button 
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedJob?.title}</h3>
              <p className="text-gray-600 mb-4">{selectedJob?.finalDescription || selectedJob?.originalIdea}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Budget: KSh {selectedJob?.budgetMin?.toLocaleString()} - {selectedJob?.budgetMax?.toLocaleString()}</span>
                <span>Category: {selectedJob?.category}</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit(onSubmitApplication)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Quote (KSh)</label>
                  <input
                    {...register('quoteAmount', { required: 'Quote amount is required' })}
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="10000"
                  />
                  {errors.quoteAmount && <p className="text-red-500 text-sm mt-1">{errors.quoteAmount.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time (Days)</label>
                  <input
                    {...register('deliveryDays', { required: 'Delivery time is required' })}
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="7"
                  />
                  {errors.deliveryDays && <p className="text-red-500 text-sm mt-1">{errors.deliveryDays.message}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                <textarea
                  {...register('coverLetter', { required: 'Cover letter is required' })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Explain why you're the best fit for this project..."
                />
                {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter.message}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Links (Optional)</label>
                <textarea
                  {...register('portfolioLinks')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="https://github.com/yourproject&#10;https://yourwebsite.com&#10;One link per line"
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowApplicationModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancerDashboard;