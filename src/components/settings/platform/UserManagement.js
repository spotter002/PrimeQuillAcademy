import React, { useState } from 'react';
import { Users, UserPlus, Shield, Ban } from 'lucide-react';

const UserManagement = () => {
  const [settings, setSettings] = useState({
    autoApprove: false,
    verificationRequired: true,
    roles: {
      admin: { permissions: ['all'] },
      moderator: { permissions: ['users', 'jobs', 'disputes'] },
      support: { permissions: ['users', 'messages'] }
    }
  });

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">User Permissions & Roles</h1>

      {/* User Approval Settings */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <UserPlus className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">User Approval Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Auto-approve New Users</p>
              <p className="text-sm text-gray-600">Automatically approve user registrations</p>
            </div>
            <input
              type="checkbox"
              checked={settings.autoApprove}
              onChange={(e) => setSettings({ ...settings, autoApprove: e.target.checked })}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Verification Required</p>
              <p className="text-sm text-gray-600">Require email verification for new accounts</p>
            </div>
            <input
              type="checkbox"
              checked={settings.verificationRequired}
              onChange={(e) => setSettings({ ...settings, verificationRequired: e.target.checked })}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Role Management */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Shield className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Role Management</h3>
        </div>
        <div className="space-y-4">
          {Object.entries(settings.roles).map(([role, config]) => (
            <div key={role} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 capitalize">{role}</h4>
                <button className="text-teal-600 hover:text-teal-800 text-sm">Edit Permissions</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {config.permissions.map((permission, index) => (
                  <span key={index} className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded">
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Save User Management Settings
        </button>
      </div>
    </div>
  );
};

export default UserManagement;