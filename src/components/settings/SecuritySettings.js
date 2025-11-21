import React, { useState } from 'react';
import { Shield, Key, Smartphone, Monitor, AlertTriangle } from 'lucide-react';

const SecuritySettings = () => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [twoFactor, setTwoFactor] = useState({
    enabled: false,
    method: 'sms'
  });

  const activeSessions = [
    { id: 1, device: 'Chrome on Windows', location: 'Nairobi, Kenya', lastActive: '2 minutes ago', current: true },
    { id: 2, device: 'Safari on iPhone', location: 'Nairobi, Kenya', lastActive: '1 hour ago', current: false }
  ];

  const loginHistory = [
    { id: 1, device: 'Chrome on Windows', location: 'Nairobi, Kenya', time: '2024-01-15 14:30', success: true },
    { id: 2, device: 'Safari on iPhone', location: 'Nairobi, Kenya', time: '2024-01-15 09:15', success: true },
    { id: 3, device: 'Unknown Device', location: 'Lagos, Nigeria', time: '2024-01-14 22:45', success: false }
  ];

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>

      {/* Change Password */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Key className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Change Password</h3>
        </div>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Smartphone className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={twoFactor.enabled}
              onChange={(e) => setTwoFactor({ ...twoFactor, enabled: e.target.checked })}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <label className="ml-2 text-sm text-gray-700">Enable 2FA</label>
          </div>
        </div>
        {twoFactor.enabled && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">Choose your preferred 2FA method:</p>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="twoFactorMethod"
                  value="sms"
                  checked={twoFactor.method === 'sms'}
                  onChange={(e) => setTwoFactor({ ...twoFactor, method: e.target.value })}
                  className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700">SMS Text Message</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="twoFactorMethod"
                  value="email"
                  checked={twoFactor.method === 'email'}
                  onChange={(e) => setTwoFactor({ ...twoFactor, method: e.target.value })}
                  className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700">Email</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="twoFactorMethod"
                  value="app"
                  checked={twoFactor.method === 'app'}
                  onChange={(e) => setTwoFactor({ ...twoFactor, method: e.target.value })}
                  className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700">Authenticator App</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Monitor className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold">Active Sessions</h3>
          </div>
          <button className="text-sm text-red-600 hover:text-red-800">
            Log out of all devices
          </button>
        </div>
        <div className="space-y-3">
          {activeSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium text-gray-900">
                  {session.device}
                  {session.current && <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Current</span>}
                </p>
                <p className="text-sm text-gray-600">{session.location} • {session.lastActive}</p>
              </div>
              {!session.current && (
                <button className="text-sm text-red-600 hover:text-red-800">
                  End Session
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Login History */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Shield className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Login History</h3>
        </div>
        <div className="space-y-3">
          {loginHistory.map((login) => (
            <div key={login.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                {login.success ? (
                  <Shield className="w-4 h-4 text-green-600 mr-3" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-600 mr-3" />
                )}
                <div>
                  <p className="font-medium text-gray-900">{login.device}</p>
                  <p className="text-sm text-gray-600">{login.location} • {login.time}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                login.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {login.success ? 'Success' : 'Failed'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Security Alerts */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Security Alerts</h3>
        </div>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className="ml-2 text-sm text-gray-700">Email me about suspicious login attempts</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className="ml-2 text-sm text-gray-700">Notify me when my account is accessed from a new device</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className="ml-2 text-sm text-gray-700">Send weekly security summary</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;