import React, { useState } from 'react';
import { Building, Upload, Tag, Star } from 'lucide-react';

const PlatformConfig = () => {
  const [config, setConfig] = useState({
    platformName: 'FreelanceHub',
    tagline: 'AI-Powered Freelance Marketplace',
    description: 'Connect with skilled freelancers and get your projects done with AI assistance',
    logo: null,
    favicon: null,
    defaultRates: {
      hourlyMin: 500,
      hourlyMax: 10000,
      platformFee: 10
    },
    categories: [
      'Web Development',
      'Mobile Development',
      'Design & Creative',
      'Writing & Translation',
      'Digital Marketing',
      'Data & Analytics'
    ],
    skills: [
      'JavaScript', 'Python', 'React', 'Node.js', 'PHP', 'WordPress',
      'Graphic Design', 'UI/UX Design', 'Content Writing', 'SEO'
    ],
    featuredFreelancers: []
  });

  const [newCategory, setNewCategory] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const handleAddCategory = () => {
    if (newCategory && !config.categories.includes(newCategory)) {
      setConfig({
        ...config,
        categories: [...config.categories, newCategory]
      });
      setNewCategory('');
    }
  };

  const handleRemoveCategory = (category) => {
    setConfig({
      ...config,
      categories: config.categories.filter(c => c !== category)
    });
  };

  const handleAddSkill = () => {
    if (newSkill && !config.skills.includes(newSkill)) {
      setConfig({
        ...config,
        skills: [...config.skills, newSkill]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill) => {
    setConfig({
      ...config,
      skills: config.skills.filter(s => s !== skill)
    });
  };

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Platform Configuration</h1>

      {/* Basic Information */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Building className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Basic Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
            <input
              type="text"
              value={config.platformName}
              onChange={(e) => setConfig({ ...config, platformName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
            <input
              type="text"
              value={config.tagline}
              onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={config.description}
              onChange={(e) => setConfig({ ...config, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Branding */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Upload className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Branding</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform Logo</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload logo (PNG, JPG, SVG)</p>
              <p className="text-xs text-gray-500">Recommended: 200x60px</p>
              <input type="file" className="hidden" accept="image/*" />
              <button className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                Choose File
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Upload favicon (ICO, PNG)</p>
              <p className="text-xs text-gray-500">Recommended: 32x32px</p>
              <input type="file" className="hidden" accept="image/*" />
              <button className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                Choose File
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Default Rates */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Default Rates & Fees</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Hourly Rate (KSh)</label>
            <input
              type="number"
              value={config.defaultRates.hourlyMin}
              onChange={(e) => setConfig({
                ...config,
                defaultRates: { ...config.defaultRates, hourlyMin: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Hourly Rate (KSh)</label>
            <input
              type="number"
              value={config.defaultRates.hourlyMax}
              onChange={(e) => setConfig({
                ...config,
                defaultRates: { ...config.defaultRates, hourlyMax: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Platform Fee (%)</label>
            <input
              type="number"
              value={config.defaultRates.platformFee}
              onChange={(e) => setConfig({
                ...config,
                defaultRates: { ...config.defaultRates, platformFee: parseInt(e.target.value) }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Tag className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Job Categories</h3>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Add new category"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            />
            <button
              onClick={handleAddCategory}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {config.categories.map((category, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal-100 text-teal-800"
              >
                {category}
                <button
                  onClick={() => handleRemoveCategory(category)}
                  className="ml-2 text-teal-600 hover:text-teal-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Available Skills</h3>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add new skill"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            />
            <button
              onClick={handleAddSkill}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {config.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Freelancers */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Star className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Featured Freelancers</h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <Star className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>No featured freelancers selected</p>
          <button className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
            Select Freelancers
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Save Platform Configuration
        </button>
      </div>
    </div>
  );
};

export default PlatformConfig;