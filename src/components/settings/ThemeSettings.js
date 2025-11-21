import React, { useState, useEffect } from 'react';
import { Palette, Monitor, Sun, Moon, Layout, Globe } from 'lucide-react';
import { settingsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ThemeSettings = () => {
  const [theme, setTheme] = useState({
    mode: 'light',
    accentColor: '#0d9488',
    layout: 'comfortable',
    language: 'en',
    sidebarCollapsed: false
  });

  const accentColors = [
    { name: 'Teal', value: '#0d9488' },
    { name: 'Blue', value: '#2563eb' },
    { name: 'Purple', value: '#7c3aed' },
    { name: 'Green', value: '#059669' },
    { name: 'Orange', value: '#ea580c' },
    { name: 'Pink', value: '#db2777' }
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'sw', name: 'Kiswahili' },
    { code: 'fr', name: 'Français' }
  ];

  const handleSave = async () => {
    try {
      await settingsAPI.updateUserSettings('theme', theme);
      toast.success('Theme settings applied successfully');
      
      // Apply theme to document
      document.documentElement.setAttribute('data-theme', theme.mode);
      document.documentElement.style.setProperty('--accent-color', theme.accentColor);
      document.documentElement.setAttribute('data-layout', theme.layout);
    } catch (error) {
      toast.error('Failed to apply theme settings');
      console.error('Error saving theme:', error);
    }
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await settingsAPI.getUserSettings();
        const themeSettings = response.data.settings.theme;
        if (themeSettings) {
          setTheme({
            mode: themeSettings.mode || 'light',
            accentColor: themeSettings.accentColor || '#0d9488',
            layout: themeSettings.layout || 'comfortable',
            language: themeSettings.language || 'en',
            sidebarCollapsed: themeSettings.sidebarCollapsed || false
          });
        }
      } catch (error) {
        console.error('Error loading theme settings:', error);
      }
    };
    loadSettings();
  }, []);

  // Apply theme changes immediately for preview
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', theme.accentColor);
  }, [theme.accentColor]);

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Theme & Display Settings</h1>

      {/* Theme Mode */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Palette className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Theme Mode</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setTheme({ ...theme, mode: 'light' })}
            className={`p-4 border-2 rounded-lg transition-colors ${
              theme.mode === 'light' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="font-medium">Light</p>
            <p className="text-sm text-gray-600">Clean and bright</p>
          </button>
          
          <button
            onClick={() => setTheme({ ...theme, mode: 'dark' })}
            className={`p-4 border-2 rounded-lg transition-colors ${
              theme.mode === 'dark' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Moon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="font-medium">Dark</p>
            <p className="text-sm text-gray-600">Easy on the eyes</p>
          </button>
          
          <button
            onClick={() => setTheme({ ...theme, mode: 'system' })}
            className={`p-4 border-2 rounded-lg transition-colors ${
              theme.mode === 'system' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Monitor className="w-8 h-8 mx-auto mb-2 text-gray-500" />
            <p className="font-medium">System</p>
            <p className="text-sm text-gray-600">Match device</p>
          </button>
        </div>
      </div>

      {/* Accent Color */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Accent Color</h3>
        <div className="grid grid-cols-6 gap-3">
          {accentColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setTheme({ ...theme, accentColor: color.value })}
              className={`relative w-12 h-12 rounded-lg border-2 transition-all ${
                theme.accentColor === color.value ? 'border-gray-400 scale-110' : 'border-gray-200 hover:scale-105'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {theme.accentColor === color.value && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Current color: <span className="font-medium">{accentColors.find(c => c.value === theme.accentColor)?.name}</span>
        </p>
      </div>

      {/* Layout Preferences */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Layout className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Layout Preferences</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Layout Density</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setTheme({ ...theme, layout: 'compact' })}
                className={`p-4 border-2 rounded-lg transition-colors ${
                  theme.layout === 'compact' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="space-y-1 mb-2">
                  <div className="h-2 bg-gray-300 rounded"></div>
                  <div className="h-2 bg-gray-300 rounded"></div>
                  <div className="h-2 bg-gray-300 rounded"></div>
                </div>
                <p className="font-medium">Compact</p>
                <p className="text-sm text-gray-600">More content, less spacing</p>
              </button>
              
              <button
                onClick={() => setTheme({ ...theme, layout: 'comfortable' })}
                className={`p-4 border-2 rounded-lg transition-colors ${
                  theme.layout === 'comfortable' ? 'border-teal-500 bg-teal-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="space-y-2 mb-2">
                  <div className="h-2 bg-gray-300 rounded"></div>
                  <div className="h-2 bg-gray-300 rounded"></div>
                  <div className="h-2 bg-gray-300 rounded"></div>
                </div>
                <p className="font-medium">Comfortable</p>
                <p className="text-sm text-gray-600">Balanced spacing</p>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Sidebar Auto-collapse</p>
              <p className="text-sm text-gray-600">Automatically collapse sidebar on smaller screens</p>
            </div>
            <input
              type="checkbox"
              checked={theme.sidebarCollapsed}
              onChange={(e) => setTheme({ ...theme, sidebarCollapsed: e.target.checked })}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Language */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Globe className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Language</h3>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Interface Language</label>
          <select
            value={theme.language}
            onChange={(e) => setTheme({ ...theme, language: e.target.value })}
            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Preview</h3>
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center space-x-3 mb-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: theme.accentColor }}
            ></div>
            <div className="h-4 bg-gray-300 rounded flex-1"></div>
          </div>
          <div className={`space-y-${theme.layout === 'compact' ? '1' : '2'}`}>
            <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          </div>
          <div className="mt-4 flex space-x-2">
            <div 
              className="px-3 py-1 rounded text-white text-sm"
              style={{ backgroundColor: theme.accentColor }}
            >
              Button
            </div>
            <div className="px-3 py-1 rounded border text-sm">
              Secondary
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button 
          onClick={handleSave}
          className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
          style={{ backgroundColor: theme.accentColor }}
        >
          Apply Theme Settings
        </button>
      </div>
    </div>
  );
};

export default ThemeSettings;