import React, { useState, useEffect } from 'react';
import { Bell, Mail, Smartphone, Volume2, Clock } from 'lucide-react';
import { settingsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    email: {
      jobUpdates: true,
      messages: true,
      payments: true,
      marketing: false,
      systemUpdates: true
    },
    push: {
      jobUpdates: true,
      messages: true,
      payments: true,
      marketing: false
    },
    sms: {
      payments: true,
      security: true,
      urgent: false
    },
    sound: {
      enabled: true,
      messages: true,
      notifications: false
    }
  });

  const [quietHours, setQuietHours] = useState({
    enabled: false,
    start: '22:00',
    end: '08:00'
  });

  const handleSave = async () => {
    try {
      await settingsAPI.updateUserSettings('notifications', {
        emailNotifications: notifications.email,
        pushNotifications: notifications.push,
        smsNotifications: notifications.sms,
        soundNotifications: notifications.sound,
        quietHours
      });
      toast.success('Notification settings saved successfully');
    } catch (error) {
      toast.error('Failed to save notification settings');
      console.error('Error saving notifications:', error);
    }
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await settingsAPI.getUserSettings();
        const prefs = response.data.settings.notifications;
        if (prefs) {
          setNotifications({
            email: prefs.emailNotifications || notifications.email,
            push: prefs.pushNotifications || notifications.push,
            sms: prefs.smsNotifications || notifications.sms,
            sound: prefs.soundNotifications || notifications.sound
          });
          setQuietHours(prefs.quietHours || quietHours);
        }
      } catch (error) {
        console.error('Error loading notification settings:', error);
      }
    };
    loadSettings();
  }, []);

  const handleNotificationChange = (category, type, value) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: value
      }
    }));
  };

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Notification Settings</h1>

      {/* Email Notifications */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Mail className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Email Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Job Updates</p>
              <p className="text-sm text-gray-600">Proposals accepted, rejected, job status changes</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.email.jobUpdates}
              onChange={(e) => handleNotificationChange('email', 'jobUpdates', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Messages</p>
              <p className="text-sm text-gray-600">New messages from clients or freelancers</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.email.messages}
              onChange={(e) => handleNotificationChange('email', 'messages', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Payment Alerts</p>
              <p className="text-sm text-gray-600">Payment received, withdrawal processed, invoices</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.email.payments}
              onChange={(e) => handleNotificationChange('email', 'payments', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">System Updates</p>
              <p className="text-sm text-gray-600">Platform updates, maintenance notifications</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.email.systemUpdates}
              onChange={(e) => handleNotificationChange('email', 'systemUpdates', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Marketing & Promotions</p>
              <p className="text-sm text-gray-600">Tips, featured jobs, platform news</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.email.marketing}
              onChange={(e) => handleNotificationChange('email', 'marketing', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Bell className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Push Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Job Updates</p>
              <p className="text-sm text-gray-600">Real-time job status changes</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.push.jobUpdates}
              onChange={(e) => handleNotificationChange('push', 'jobUpdates', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Messages</p>
              <p className="text-sm text-gray-600">Instant message notifications</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.push.messages}
              onChange={(e) => handleNotificationChange('push', 'messages', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Payment Alerts</p>
              <p className="text-sm text-gray-600">Instant payment notifications</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.push.payments}
              onChange={(e) => handleNotificationChange('push', 'payments', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Marketing</p>
              <p className="text-sm text-gray-600">Promotional notifications</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.push.marketing}
              onChange={(e) => handleNotificationChange('push', 'marketing', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Smartphone className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">SMS Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Payment Confirmations</p>
              <p className="text-sm text-gray-600">SMS when payments are processed</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.sms.payments}
              onChange={(e) => handleNotificationChange('sms', 'payments', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Security Alerts</p>
              <p className="text-sm text-gray-600">Login attempts, password changes</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.sms.security}
              onChange={(e) => handleNotificationChange('sms', 'security', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Urgent Notifications</p>
              <p className="text-sm text-gray-600">Critical platform updates</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.sms.urgent}
              onChange={(e) => handleNotificationChange('sms', 'urgent', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Sound & Desktop Notifications */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Volume2 className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Sound & Desktop Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Enable Sound</p>
              <p className="text-sm text-gray-600">Play sound for notifications</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.sound.enabled}
              onChange={(e) => handleNotificationChange('sound', 'enabled', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          
          {notifications.sound.enabled && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Message Sounds</p>
                  <p className="text-sm text-gray-600">Sound for new messages</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.sound.messages}
                  onChange={(e) => handleNotificationChange('sound', 'messages', e.target.checked)}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">General Notifications</p>
                  <p className="text-sm text-gray-600">Sound for other notifications</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.sound.notifications}
                  onChange={(e) => handleNotificationChange('sound', 'notifications', e.target.checked)}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Clock className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Quiet Hours</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Enable Quiet Hours</p>
              <p className="text-sm text-gray-600">Disable notifications during specified hours</p>
            </div>
            <input
              type="checkbox"
              checked={quietHours.enabled}
              onChange={(e) => setQuietHours({ ...quietHours, enabled: e.target.checked })}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          
          {quietHours.enabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <input
                  type="time"
                  value={quietHours.start}
                  onChange={(e) => setQuietHours({ ...quietHours, start: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <input
                  type="time"
                  value={quietHours.end}
                  onChange={(e) => setQuietHours({ ...quietHours, end: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Save Notification Settings
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;