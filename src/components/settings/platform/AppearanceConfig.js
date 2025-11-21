import React, { useState } from 'react';
import { Globe, Palette, Layout } from 'lucide-react';

const AppearanceConfig = () => {
  const [config, setConfig] = useState({
    theme: {
      primaryColor: '#0d9488',
      secondaryColor: '#2563eb',
      mode: 'light'
    },
    homepage: {
      heroTitle: 'Find the Perfect Freelancer',
      heroSubtitle: 'Connect with skilled professionals worldwide',
      showStats: true,
      showTestimonials: true
    }
  });

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Platform Appearance</h1>

      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Palette className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Theme Configuration</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
            <input
              type="color"
              value={config.theme.primaryColor}
              onChange={(e) => setConfig({
                ...config,
                theme: { ...config.theme, primaryColor: e.target.value }
              })}
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
            <input
              type="color"
              value={config.theme.secondaryColor}
              onChange={(e) => setConfig({
                ...config,
                theme: { ...config.theme, secondaryColor: e.target.value }
              })}
              className="w-full h-10 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Save Appearance Settings
        </button>
      </div>
    </div>
  );
};

export default AppearanceConfig;