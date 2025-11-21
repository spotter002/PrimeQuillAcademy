import React, { useState } from 'react';
import { BarChart3, Database, Clock } from 'lucide-react';

const AnalyticsConfig = () => {
  const [config, setConfig] = useState({
    analytics: {
      enabled: true,
      trackUserBehavior: true,
      trackSearchQueries: true,
      trackJobViews: true
    },
    dataRetention: {
      logs: 90,
      analytics: 365,
      userActivity: 180
    }
  });

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics & Logs Settings</h1>

      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <BarChart3 className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Analytics Configuration</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Enable Analytics</p>
              <p className="text-sm text-gray-600">Track platform usage and performance</p>
            </div>
            <input
              type="checkbox"
              checked={config.analytics.enabled}
              onChange={(e) => setConfig({
                ...config,
                analytics: { ...config.analytics, enabled: e.target.checked }
              })}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Save Analytics Settings
        </button>
      </div>
    </div>
  );
};

export default AnalyticsConfig;