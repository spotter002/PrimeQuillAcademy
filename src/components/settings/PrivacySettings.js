import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Download, Trash2, AlertTriangle } from 'lucide-react';

const PrivacySettings = () => {
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEarnings: false,
    showReviews: true,
    showOnlineStatus: true,
    allowDirectContact: true,
    searchEngineIndexing: true
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handleDataExport = () => {
    // TODO: Implement data export
    alert('Data export will be sent to your email within 24 hours');
  };

  const handleAccountDeletion = () => {
    // TODO: Implement account deletion
    setShowDeleteModal(false);
    alert('Account deletion request submitted. You will receive a confirmation email.');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Data & Privacy Settings</h1>

      {/* Profile Visibility */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Eye className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Profile Visibility</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Who can see your profile?</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="profileVisibility"
                  value="public"
                  checked={privacy.profileVisibility === 'public'}
                  onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                  className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  <strong>Public</strong> - Anyone can view your profile
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="profileVisibility"
                  value="clients-only"
                  checked={privacy.profileVisibility === 'clients-only'}
                  onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                  className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  <strong>Clients Only</strong> - Only registered clients can view
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="profileVisibility"
                  value="private"
                  checked={privacy.profileVisibility === 'private'}
                  onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                  className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  <strong>Private</strong> - Only you can view your profile
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Search Engine Indexing</p>
              <p className="text-sm text-gray-600">Allow search engines to index your public profile</p>
            </div>
            <input
              type="checkbox"
              checked={privacy.searchEngineIndexing}
              onChange={(e) => handlePrivacyChange('searchEngineIndexing', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Information Display */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <EyeOff className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Information Display</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Show Earnings on Profile</p>
              <p className="text-sm text-gray-600">Display your total earnings to potential clients</p>
            </div>
            <input
              type="checkbox"
              checked={privacy.showEarnings}
              onChange={(e) => handlePrivacyChange('showEarnings', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Show Reviews</p>
              <p className="text-sm text-gray-600">Display client reviews and ratings on your profile</p>
            </div>
            <input
              type="checkbox"
              checked={privacy.showReviews}
              onChange={(e) => handlePrivacyChange('showReviews', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Show Online Status</p>
              <p className="text-sm text-gray-600">Let others see when you're online</p>
            </div>
            <input
              type="checkbox"
              checked={privacy.showOnlineStatus}
              onChange={(e) => handlePrivacyChange('showOnlineStatus', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Allow Direct Contact</p>
              <p className="text-sm text-gray-600">Allow clients to contact you directly outside of jobs</p>
            </div>
            <input
              type="checkbox"
              checked={privacy.allowDirectContact}
              onChange={(e) => handlePrivacyChange('allowDirectContact', e.target.checked)}
              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <Download className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold">Data Management</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Export Your Data</p>
              <p className="text-sm text-gray-600">Download a copy of all your data including profile, jobs, and messages</p>
            </div>
            <button
              onClick={handleDataExport}
              className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </button>
          </div>

          <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Data Retention Policy</p>
                <p className="text-sm text-yellow-700 mt-1">
                  We retain your data for as long as your account is active. After account deletion, 
                  most data is removed within 30 days, though some information may be retained for 
                  legal compliance purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Deletion */}
      <div className="bg-white p-6 rounded-lg border border-red-200">
        <div className="flex items-center mb-4">
          <Trash2 className="w-5 h-5 text-red-600 mr-2" />
          <h3 className="text-lg font-semibold text-red-900">Delete Account</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              <strong>Warning:</strong> Account deletion is permanent and cannot be undone. 
              All your data, including profile, job history, and messages will be permanently deleted.
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-700"><strong>What happens when you delete your account:</strong></p>
            <ul className="text-sm text-gray-600 space-y-1 ml-4">
              <li>• Your profile will be immediately removed</li>
              <li>• All job applications and contracts will be cancelled</li>
              <li>• Messages and communication history will be deleted</li>
              <li>• Any pending payments will be processed before deletion</li>
              <li>• You won't be able to recover your account or data</li>
            </ul>
          </div>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete My Account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
              <h3 className="text-lg font-semibold text-red-900">Confirm Account Deletion</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Are you absolutely sure you want to delete your account? This action cannot be undone.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Type <strong>DELETE</strong> to confirm:
            </p>
            <input
              type="text"
              placeholder="Type DELETE to confirm"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAccountDeletion}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Save Privacy Settings
        </button>
      </div>
    </div>
  );
};

export default PrivacySettings;