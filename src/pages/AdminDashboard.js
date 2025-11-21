import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, Briefcase, DollarSign, AlertCircle, User, FileText, Settings, BarChart3, Shield } from 'lucide-react';
import { adminAPI } from '../services/api';
import toast from 'react-hot-toast';
import CollapsibleSidebar from '../components/CollapsibleSidebar';
import PlatformSettings from '../components/settings/PlatformSettings';
import UserSettings from '../components/settings/UserSettings';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeJobs: 0,
    totalRevenue: 0,
    pendingReviews: 0
  });
  const [loading, setLoading] = useState(true);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'jobs', label: 'Job Management', icon: Briefcase },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'user-settings', label: 'Settings', icon: User },
    ...(user?.role === 'admin' ? [{ id: 'platform-settings', label: 'Platform Settings', icon: Settings }] : [])
  ];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // TODO: Replace with actual API calls when admin endpoints are ready
      setStats({
        totalUsers: 0,
        activeJobs: 0,
        totalRevenue: 0,
        pendingReviews: 0
      });
    } catch (error) {
      toast.error('Failed to fetch admin statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (activeTab === 'platform-settings') {
      return <PlatformSettings />;
    }
    if (activeTab === 'user-settings') {
      return <UserSettings />;
    }

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.totalUsers === 0 ? 'No users registered' : 'Registered users'}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeJobs}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.activeJobs === 0 ? 'No active jobs' : 'Jobs in progress'}
                </p>
              </div>
              <Briefcase className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-purple-600">KSh {stats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.totalRevenue === 0 ? 'No revenue generated' : 'Platform revenue'}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pendingReviews}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats.pendingReviews === 0 ? 'No pending reviews' : 'Items to review'}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Users</h2>
            <div className="text-center py-8">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">No users registered</p>
              <p className="text-sm text-gray-500">New user registrations will appear here</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Jobs</h2>
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">No jobs posted</p>
              <p className="text-sm text-gray-500">Recent job postings will appear here</p>
            </div>
          </div>
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
        title="Admin Dashboard"
      />

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;