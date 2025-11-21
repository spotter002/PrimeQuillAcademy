import React, { useState } from 'react';
import { Shield, AlertTriangle, Clock, Filter } from 'lucide-react';

const SecurityConfig = () => {
  const [config, setConfig] = useState({
    rateLimit: {
      enabled: true,
      requests: 100,
      window: 15
    },
    sessionTimeout: 24,
    captcha: {
      enabled: true,
      onLogin: true,
      onJobPost: false,
      onMessage: false
    },
    contentFilter: {
      enabled: true,
      keywords: ['whatsapp', 'telegram', 'direct contact', 'outside platform']
    }
  });

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>

      {/* Rate Limiting */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Shield className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Rate Limiting</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Enable Rate Limiting</p>
              <p className="text-sm text-gray-600">Limit API requests to prevent abuse</p>
            </div>
            <input
              type="checkbox"
              checked={config.rateLimit.enabled}
              onChange={(e) => setConfig({
                ...config,
                rateLimit: { ...config.rateLimit, enabled: e.target.checked }
              })}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          {config.rateLimit.enabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Requests</label>
                <input
                  type="number"
                  value={config.rateLimit.requests}
                  onChange={(e) => setConfig({
                    ...config,
                    rateLimit: { ...config.rateLimit, requests: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Window (minutes)</label>
                <input
                  type="number"
                  value={config.rateLimit.window}
                  onChange={(e) => setConfig({
                    ...config,
                    rateLimit: { ...config.rateLimit, window: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Session Management */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Clock className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Session Management</h3>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (hours)</label>
          <input
            type="number"
            value={config.sessionTimeout}
            onChange={(e) => setConfig({ ...config, sessionTimeout: parseInt(e.target.value) })}
            className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* CAPTCHA Settings */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <AlertTriangle className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">CAPTCHA Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Enable CAPTCHA</p>
              <p className="text-sm text-gray-600">Protect against automated attacks</p>
            </div>
            <input
              type="checkbox"
              checked={config.captcha.enabled}
              onChange={(e) => setConfig({
                ...config,
                captcha: { ...config.captcha, enabled: e.target.checked }
              })}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          {config.captcha.enabled && (
            <div className="space-y-3 ml-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.captcha.onLogin}
                  onChange={(e) => setConfig({
                    ...config,
                    captcha: { ...config.captcha, onLogin: e.target.checked }
                  })}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700">On Login</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.captcha.onJobPost}
                  onChange={(e) => setConfig({
                    ...config,
                    captcha: { ...config.captcha, onJobPost: e.target.checked }
                  })}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700">On Job Posting</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.captcha.onMessage}
                  onChange={(e) => setConfig({
                    ...config,
                    captcha: { ...config.captcha, onMessage: e.target.checked }
                  })}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700">On Sending Messages</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Content Filtering */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Content Filtering</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Enable Content Filter</p>
              <p className="text-sm text-gray-600">Auto-flag content with blocked keywords</p>
            </div>
            <input
              type="checkbox"
              checked={config.contentFilter.enabled}
              onChange={(e) => setConfig({
                ...config,
                contentFilter: { ...config.contentFilter, enabled: e.target.checked }
              })}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
          {config.contentFilter.enabled && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blocked Keywords</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {config.contentFilter.keywords.map((keyword, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                    {keyword}
                    <button
                      onClick={() => setConfig({
                        ...config,
                        contentFilter: {
                          ...config.contentFilter,
                          keywords: config.contentFilter.keywords.filter((_, i) => i !== index)
                        }
                      })}
                      className="ml-2 text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add keyword and press Enter"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    setConfig({
                      ...config,
                      contentFilter: {
                        ...config.contentFilter,
                        keywords: [...config.contentFilter.keywords, e.target.value.toLowerCase()]
                      }
                    });
                    e.target.value = '';
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Save Security Settings
        </button>
      </div>
    </div>
  );
};

export default SecurityConfig;