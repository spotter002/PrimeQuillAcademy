import React, { useState } from 'react';
import { Settings, DollarSign, Mail, Users, Shield, BarChart3, Globe, Bot } from 'lucide-react';
import PlatformConfig from './platform/PlatformConfig';
import FinancialConfig from './platform/FinancialConfig';
import EmailConfig from './platform/EmailConfig';
import UserManagement from './platform/UserManagement';
import SecurityConfig from './platform/SecurityConfig';
import AnalyticsConfig from './platform/AnalyticsConfig';
import AppearanceConfig from './platform/AppearanceConfig';
import AutomationConfig from './platform/AutomationConfig';

const PlatformSettings = () => {
  const [activeSection, setActiveSection] = useState('platform');

  const sections = [
    { id: 'platform', label: 'Platform Configuration', icon: Settings },
    { id: 'financial', label: 'Financial Configuration', icon: DollarSign },
    { id: 'email', label: 'Email & Notifications', icon: Mail },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'security', label: 'Security Settings', icon: Shield },
    { id: 'analytics', label: 'Analytics & Logs', icon: BarChart3 },
    { id: 'appearance', label: 'Platform Appearance', icon: Globe },
    { id: 'automation', label: 'Automation Settings', icon: Bot }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'platform': return <PlatformConfig />;
      case 'financial': return <FinancialConfig />;
      case 'email': return <EmailConfig />;
      case 'users': return <UserManagement />;
      case 'security': return <SecurityConfig />;
      case 'analytics': return <AnalyticsConfig />;
      case 'appearance': return <AppearanceConfig />;
      case 'automation': return <AutomationConfig />;
      default: return <PlatformConfig />;
    }
  };

  return (
    <div className="flex h-full">
      {/* Settings Navigation */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Platform Settings</h2>
          <p className="text-sm text-gray-600">Admin Configuration</p>
        </div>
        <nav className="mt-4">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  activeSection === section.id ? 'bg-teal-50 text-teal-600 border-r-2 border-teal-600' : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {section.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {renderSection()}
      </div>
    </div>
  );
};

export default PlatformSettings;