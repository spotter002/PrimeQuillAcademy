import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Briefcase, DollarSign, AlertTriangle, Settings, TrendingUp, Activity } from 'lucide-react';
import axios from 'axios';

const EnhancedAdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    users: { total: 0, freelancers: 0, clients: 0, active: 0, newSignups: 0 },
    jobs: { total: 0, active: 0, last24h: 0, last7d: 0, last30d: 0, completionRate: 0 },
    applications: { total: 0, approved: 0, pending: 0, approvalRate: 0 },
    platform: { avgJobBudget: 0, totalJobValue: 0 }
  });
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'jobs', label: 'Jobs Management', icon: Briefcase },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'disputes', label: 'Disputes', icon: AlertTriangle },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Platform Settings', icon: Settings }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsRes, usersRes, jobsRes] = await Promise.all([
          axios.get('https://primequillacademy.onrender.com/api/analytics/admin'),
          axios.get('https://primequillacademy.onrender.com/api/admin/users'),
          axios.get('https://primequillacademy.onrender.com/api/jobs')
        ]);
        
        setStats(statsRes.data);
        setUsers(usersRes.data);
        setJobs(jobsRes.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user?.role === 'admin') {
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

  // Mock data for sections not yet implemented
  const recentActivity = [];
  const topCategories = [];
  const securityAlerts = [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Admin Dashboard</h2>
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
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Platform Overview</h1>
                <p className="text-gray-600">Complete system monitoring and management</p>
              </div>

              {/* Platform Performance Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Users</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.users.total.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">{stats.users.total === 0 ? 'No users registered' : `${stats.users.freelancers} freelancers, ${stats.users.clients} clients`}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Jobs</p>
                      <p className="text-3xl font-bold text-teal-600">{stats.jobs.total.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">{stats.jobs.total === 0 ? 'No jobs posted' : `${stats.jobs.active} active jobs`}</p>
                    </div>
                    <Briefcase className="w-8 h-8 text-teal-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                      <p className="text-3xl font-bold text-green-600">KSh {stats.platform.totalJobValue.toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">{stats.platform.totalJobValue === 0 ? 'No revenue generated' : 'Total job value'}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-600" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Open Disputes</p>
                      <p className="text-3xl font-bold text-red-600">{stats.applications.pending}</p>
                      <p className="text-sm text-gray-500 mt-1">{stats.applications.pending === 0 ? 'No pending applications' : 'Pending applications'}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                </div>
              </div>

              {/* Financial Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                  <p className="text-2xl font-bold text-purple-600">KSh {stats.platform.avgJobBudget.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Avg Job Budget</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                  <p className="text-2xl font-bold text-orange-600">{stats.applications.approvalRate.toFixed(1)}%</p>
                  <p className="text-sm text-gray-600">Application Approval Rate</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
                  <p className="text-2xl font-bold text-indigo-600">{stats.jobs.last24h}</p>
                  <p className="text-sm text-gray-600">New Jobs (24h)</p>
                </div>
              </div>

              {/* Recent Activity & Top Categories */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                  </div>
                  <div className="p-6">
                    {recentActivity.length === 0 ? (
                      <div className="text-center py-8">
                        <Activity className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-2">No recent activity</p>
                        <p className="text-sm text-gray-500">Platform activity will appear here</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              activity.type === 'user_signup' ? 'bg-blue-500' :
                              activity.type === 'job_posted' ? 'bg-teal-500' :
                              activity.type === 'payment' ? 'bg-green-500' :
                              'bg-yellow-500'
                            }`}></div>
                            <div>
                              <p className="text-gray-900">{activity.message}</p>
                              <p className="text-sm text-gray-500">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Top Categories */}
                <div className="bg-white rounded-lg shadow-sm border">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">Top Categories</h2>
                  </div>
                  <div className="p-6">
                    {topCategories.length === 0 ? (
                      <div className="text-center py-8">
                        <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 mb-2">No categories data</p>
                        <p className="text-sm text-gray-500">Job categories will appear here</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {topCategories.map((category, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-gray-900">{category.name}</h3>
                              <p className="text-sm text-gray-600">{category.jobs} jobs</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">KSh {(category.revenue / 1000).toFixed(0)}K</p>
                              <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className="bg-teal-600 h-2 rounded-full" 
                                  style={{ width: `${(category.revenue / 1000000) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Security & Compliance */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">Security Alerts</h2>
                </div>
                <div className="p-6">
                  {securityAlerts.length === 0 ? (
                    <div className="text-center py-8">
                      <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 mb-2">No security alerts</p>
                      <p className="text-sm text-gray-500">Security notifications will appear here</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {securityAlerts.map((alert, index) => (
                        <div key={index} className={`p-4 rounded-lg border-l-4 ${
                          alert.severity === 'high' ? 'bg-red-50 border-red-500' :
                          alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
                          'bg-blue-50 border-blue-500'
                        }`}>
                          <div className="flex items-center justify-between">
                            <p className="text-gray-900">{alert.message}</p>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                              alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {alert.severity.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">User Management</h1>
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">All Users ({users.length})</h2>
                </div>
                {users.length === 0 ? (
                  <div className="p-12 text-center">
                    <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No users to manage</h3>
                    <p className="text-gray-600">Registered users will appear here for management</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {users.slice(0, 10).map((user) => (
                      <div key={user._id} className="p-6 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <span className="text-gray-600 font-medium">{user.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{user.name}</h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-xs text-gray-500">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.role === 'admin' ? 'bg-red-100 text-red-800' :
                            user.role === 'freelancer' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Jobs Management</h1>
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">All Jobs ({jobs.length})</h2>
                </div>
                {jobs.length === 0 ? (
                  <div className="p-12 text-center">
                    <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs to manage</h3>
                    <p className="text-gray-600">Posted jobs will appear here for management</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {jobs.slice(0, 10).map((job) => (
                      <div key={job._id} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 mb-2">{job.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{job.finalDescription || job.originalIdea}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>Budget: KSh {(job.budgetMax || 0).toLocaleString()}</span>
                              <span>Category: {job.category}</span>
                              <span>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                            </div>
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
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Payments Management</h1>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="text-center py-12">
                  <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No payments to manage</h3>
                  <p className="text-gray-600">Payment transactions will appear here</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'disputes' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Disputes Center</h1>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="text-center py-12">
                  <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No disputes to resolve</h3>
                  <p className="text-gray-600">Dispute cases will appear here for resolution</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Suite</h1>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No analytics data</h3>
                  <p className="text-gray-600">Platform analytics will appear here when data is available</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Platform Settings</h1>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Platform Settings</h3>
                  <p className="text-gray-600">Configuration options will be available here</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedAdminDashboard;