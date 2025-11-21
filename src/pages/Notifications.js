import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Check, X, Clock, User, Briefcase, DollarSign } from 'lucide-react';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Mock notifications - in real app, fetch from API
    const mockNotifications = [
      {
        id: 1,
        type: 'job_application',
        title: 'New Job Application',
        message: 'A client has applied to your project "Website Development"',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        icon: Briefcase,
        color: 'text-blue-600'
      },
      {
        id: 2,
        type: 'payment',
        title: 'Payment Received',
        message: 'You received KSh 15,000 for project completion',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        read: false,
        icon: DollarSign,
        color: 'text-green-600'
      },
      {
        id: 3,
        type: 'profile_update',
        title: 'Profile Updated',
        message: 'Your profile information has been successfully updated',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        read: true,
        icon: User,
        color: 'text-purple-600'
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'unread') return !notif.read;
    if (filter === 'read') return notif.read;
    return true;
  });

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Bell className="w-8 h-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
        </div>
        
        {notifications.some(n => !n.read) && (
          <button
            onClick={markAllAsRead}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {['all', 'unread', 'read'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === filterType
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            {filterType === 'unread' && notifications.filter(n => !n.read).length > 0 && (
              <span className="ml-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'unread' ? 'No unread notifications' : 
               filter === 'read' ? 'No read notifications' : 'No notifications'}
            </h3>
            <p className="text-gray-500">
              {filter === 'all' ? 'You\'ll see notifications here when there\'s activity on your account.' : ''}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`bg-white border rounded-lg p-4 transition-all hover:shadow-md ${
                  !notification.read ? 'border-indigo-200 bg-indigo-50/30' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-full bg-gray-100 ${notification.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {notification.title}
                          {!notification.read && (
                            <span className="ml-2 w-2 h-2 bg-indigo-600 rounded-full inline-block"></span>
                          )}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {formatTime(notification.timestamp)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100 rounded"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                          title="Delete notification"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Contact Info */}
      <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-3">Need to Contact Us?</h3>
        <p className="text-gray-600 mb-4">
          For direct communication, please use one of these methods:
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:elijahspotter@gmail.com"
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors"
          >
            <span className="text-sm font-medium">Email Us</span>
          </a>
          <a
            href="https://wa.me/254704258346"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <span className="text-sm font-medium">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Notifications;