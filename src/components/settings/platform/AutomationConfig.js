import React, { useState } from 'react';
import { Bot, Clock, Mail } from 'lucide-react';

const AutomationConfig = () => {
  const [config, setConfig] = useState({
    autoApprove: {
      users: false,
      jobs: false
    },
    reminders: {
      enabled: true,
      proposalFollowUp: 3,
      paymentReminder: 7
    },
    archiving: {
      enabled: true,
      oldJobs: 90
    }
  });

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Automation Settings</h1>

      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Bot className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Auto-approval Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Auto-approve Users</p>
              <p className="text-sm text-gray-600">Automatically approve new user registrations</p>
            </div>
            <input
              type="checkbox"
              checked={config.autoApprove.users}
              onChange={(e) => setConfig({
                ...config,
                autoApprove: { ...config.autoApprove, users: e.target.checked }
              })}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Save Automation Settings
        </button>
      </div>
    </div>
  );
};

export default AutomationConfig;