import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Lock, Bell, Eye, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { updateUser, deleteUser } from '../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { user, refreshUser, logout } = useAuth();
  const navigate = useNavigate();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [privacySettings, setPrivacySettings] = useState({
    showPhone: true,
    showPhoto: true,
    emailAlerts: true
  });
  const [saving, setSaving] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setSaving(true);
    try {
      await updateUser(user.id, { password: passwordForm.newPassword });
      toast.success('Password updated successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch {
      toast.error('Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await deleteUser(user.id);
        toast.success('Account deleted successfully');
        logout();
        navigate('/');
      } catch {
        toast.error('Failed to delete account');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-red-700" /> Account Settings
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Manage your security, privacy, and account preferences</p>
      </div>

      <div className="space-y-6">
        {/* Security & Password */}
        <div className="card p-6 bg-white border border-gray-100 shadow-sm">
          <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
            <Lock className="w-4 h-4 text-red-700" /> Change Password
          </h2>
          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Current Password</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                className="input-field text-sm"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="input-field text-sm"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="input-field text-sm"
                required
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="bg-red-700 text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-red-800 transition-colors"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Privacy Options */}
        <div className="card p-6 bg-white border border-gray-100 shadow-sm">
          <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2 border-b pb-2">
            <Eye className="w-4 h-4 text-red-700" /> Privacy & Visibility
          </h2>
          <div className="space-y-4 max-w-lg">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-gray-800">Show Contact Number</p>
                <p className="text-xs text-gray-500">Only verified premium members can view contact</p>
              </div>
              <input
                type="checkbox"
                checked={privacySettings.showPhone}
                onChange={e => setPrivacySettings({ ...privacySettings, showPhone: e.target.checked })}
                className="w-4 h-4 text-red-600 rounded"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-gray-800">Profile Photo Visibility</p>
                <p className="text-xs text-gray-500">Make photos visible to registered users only</p>
              </div>
              <input
                type="checkbox"
                checked={privacySettings.showPhoto}
                onChange={e => setPrivacySettings({ ...privacySettings, showPhoto: e.target.checked })}
                className="w-4 h-4 text-red-600 rounded"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-gray-800">Email Notifications</p>
                <p className="text-xs text-gray-500">Receive alerts when new matches or interests arrive</p>
              </div>
              <input
                type="checkbox"
                checked={privacySettings.emailAlerts}
                onChange={e => setPrivacySettings({ ...privacySettings, emailAlerts: e.target.checked })}
                className="w-4 h-4 text-red-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="card p-6 bg-red-50/40 border border-red-200">
          <h2 className="text-base font-bold text-red-800 mb-2 flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-red-600" /> Danger Zone
          </h2>
          <p className="text-xs text-gray-600 mb-4">
            Once you delete your profile, all your match history, shortlisted profiles, and messages will be permanently removed.
          </p>
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}

