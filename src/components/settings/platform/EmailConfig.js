import React, { useState } from 'react';
import { Mail, Server, Template } from 'lucide-react';

const EmailConfig = () => {
  const [config, setConfig] = useState({
    smtp: {
      host: 'smtp.gmail.com',
      port: 587,
      username: '',
      password: '',
      secure: false
    },
    templates: {
      welcome: { subject: 'Welcome to FreelanceHub', enabled: true },
      jobPosted: { subject: 'Your job has been posted', enabled: true },
      applicationReceived: { subject: 'New application received', enabled: true },
      paymentReceived: { subject: 'Payment received', enabled: true }
    }
  });

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Email & Notification Management</h1>

      {/* SMTP Settings */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Server className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">SMTP Configuration</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
            <input
              type="text"
              value={config.smtp.host}
              onChange={(e) => setConfig({
                ...config,
                smtp: { ...config.smtp, host: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
            <input
              type="number"
              value={config.smtp.port}
              onChange={(e) => setConfig({
                ...config,
                smtp: { ...config.smtp, port: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="email"
              value={config.smtp.username}
              onChange={(e) => setConfig({
                ...config,
                smtp: { ...config.smtp, username: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={config.smtp.password}
              onChange={(e) => setConfig({
                ...config,
                smtp: { ...config.smtp, password: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Email Templates */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Template className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Email Templates</h3>
        </div>
        <div className="space-y-4">
          {Object.entries(config.templates).map(([key, template]) => (
            <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                <p className="text-sm text-gray-600">{template.subject}</p>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={template.enabled}
                  onChange={(e) => setConfig({
                    ...config,
                    templates: {
                      ...config.templates,
                      [key]: { ...template, enabled: e.target.checked }
                    }
                  })}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <button className="text-teal-600 hover:text-teal-800 text-sm">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Save Email Configuration
        </button>
      </div>
    </div>
  );
};

export default EmailConfig;