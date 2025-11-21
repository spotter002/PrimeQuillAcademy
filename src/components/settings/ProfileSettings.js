import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Camera, Save, MapPin, Globe, Phone, Mail, User, Briefcase } from 'lucide-react';
import { settingsAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ProfileSettings = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.profile?.phone || '',
    country: user?.profile?.country || '',
    bio: user?.profile?.bio || '',
    website: user?.profile?.contactLinks?.website || '',
    linkedin: user?.profile?.contactLinks?.linkedin || '',
    twitter: user?.profile?.contactLinks?.twitter || '',
    profession: user?.profile?.profession || '',
    skills: user?.profile?.skills || [],
    languages: user?.profile?.languages || [],
    hourlyRate: user?.profile?.rates || ''
  });

  const handleSave = async () => {
    try {
      await settingsAPI.updateUserSettings('profile', formData);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await settingsAPI.getUserSettings();
        const profile = response.data.settings.profile;
        setFormData({
          name: profile.name || '',
          username: profile.username || '',
          email: profile.email || '',
          phone: profile.phone || '',
          country: profile.country || '',
          bio: profile.bio || '',
          website: profile.contactLinks?.website || '',
          linkedin: profile.contactLinks?.linkedin || '',
          twitter: profile.contactLinks?.twitter || '',
          profession: profile.profession || '',
          skills: profile.skills || [],
          languages: profile.languages || [],
          hourlyRate: profile.rates || ''
        });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

  const handleSkillAdd = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  const handleSkillRemove = (skill) => {
    setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) });
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Profile Picture</h3>
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              {user?.profile?.photoUrl ? (
                <img src={user.profile.photoUrl} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
              ) : (
                <User className="w-8 h-8 text-gray-400" />
              )}
            </div>
            {isEditing && (
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Camera className="w-4 h-4 mr-2" />
                Upload Photo
              </button>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                >
                  <option value="">Select Country</option>
                  <option value="KE">Kenya</option>
                  <option value="UG">Uganda</option>
                  <option value="TZ">Tanzania</option>
                </select>
              </div>
            </div>
            {user?.role === 'freelancer' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                    disabled={!isEditing}
                    placeholder="e.g., KSh 2,000/hour"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Bio</h3>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            disabled={!isEditing}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
            placeholder="Tell others about yourself..."
          />
        </div>

        {/* Social Links */}
        <div className="bg-white p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Social Links</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
              <div className="relative">
                <Globe className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-50"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Skills (Freelancer only) */}
        {user?.role === 'freelancer' && (
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-teal-100 text-teal-800"
                >
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => handleSkillRemove(skill)}
                      className="ml-2 text-teal-600 hover:text-teal-800"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditing && (
              <input
                type="text"
                placeholder="Add a skill and press Enter"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSkillAdd(e.target.value);
                    e.target.value = '';
                  }
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;