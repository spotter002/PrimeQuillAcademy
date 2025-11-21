import React, { useState } from 'react';
import { User, Shield, CreditCard, Bell, Palette, Lock } from 'lucide-react';
import ProfileSettings from './ProfileSettings';
import SecuritySettings from './SecuritySettings';
import PaymentSettings from './PaymentSettings';
import NotificationSettings from './NotificationSettings';
import ThemeSettings from './ThemeSettings';
import PrivacySettings from './PrivacySettings';

const UserSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'security', label: 'Security Settings', icon: Shield },
    { id: 'payment', label: 'Payment Settings', icon: CreditCard },
    { id: 'notifications', label: 'Notification Settings', icon: Bell },
    { id: 'theme', label: 'Theme & Display', icon: Palette },
    { id: 'privacy', label: 'Data & Privacy', icon: Lock }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return <ProfileSettings />;
      case 'security': return <SecuritySettings />;
      case 'payment': return <PaymentSettings />;
      case 'notifications': return <NotificationSettings />;
      case 'theme': return <ThemeSettings />;
      case 'privacy': return <PrivacySettings />;
      default: return <ProfileSettings />;
    }
  };

  return (
    <div className="flex h-full">
      {/* Settings Navigation */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
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
      <div className="flex-1 p-6">
        {renderSection()}
      </div>
    </div>
  );
};

export default UserSettings;