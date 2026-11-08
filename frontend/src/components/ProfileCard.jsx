import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Briefcase, GraduationCap, Star, CheckCircle, Eye } from 'lucide-react';
import { addShortlist, removeShortlist, sendInterest } from '../api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function ProfileCard({ profile, onShortlistToggle, isShortlisted = false, compact = false }) {
  const { user } = useAuth();
  const [shortlisted, setShortlisted] = useState(isShortlisted);
  const [interestSent, setInterestSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShortlist = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      if (shortlisted) {
        // Find shortlist entry and remove (simplified)
        setShortlisted(false);
        toast.success('Removed from shortlist');
      } else {
        await addShortlist({ userId: user.id, shortlistedUserId: profile.id, createdAt: new Date().toISOString() });
        setShortlisted(true);
        toast.success('Added to shortlist!');
      }
      onShortlistToggle?.();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const handleInterest = async (e) => {
    e.preventDefault();
    if (!user || loading) return;
    setLoading(true);
    try {
      await sendInterest({
        fromUserId: user.id,
        toUserId: profile.id,
        status: 'pending',
        message: 'I am interested in your profile.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setInterestSent(true);
      toast.success('Interest sent successfully!');
    } catch {
      toast.error('Could not send interest');
    } finally {
      setLoading(false);
    }
  };

  const age = profile.age || (new Date().getFullYear() - new Date(profile.dob).getFullYear());

  return (
    <div className="profile-card card hover:shadow-lg transition-all duration-300 group">
      <Link to={`/profile/${profile.id}`}>
        {/* Photo */}
        <div className="relative overflow-hidden">
          <img
            src={profile.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&size=400&background=c0392b&color=fff`}
            alt={profile.name}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {profile.isPremium && (
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow">
                ⭐ Premium
              </span>
            )}
            {profile.isVerified && (
              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Verified
              </span>
            )}
          </div>
          {/* Online indicator */}
          {profile.isOnline && (
            <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow"></div>
          )}
          {/* Shortlist button */}
          <button
            onClick={handleShortlist}
            className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all ${
              shortlisted ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${shortlisted ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-bold text-gray-800 text-base">{profile.name}</h3>
            <span className="text-xs text-gray-400">{profile.profileId}</span>
          </div>

          <p className="text-sm text-gray-500 mb-2">
            {age} yrs • {profile.height} • {profile.maritalStatus}
          </p>

          <div className="space-y-1 mb-3">
            {profile.education && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <GraduationCap className="w-3.5 h-3.5 text-red-400" />
                <span className="truncate">{profile.education}</span>
              </div>
            )}
            {profile.occupation && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Briefcase className="w-3.5 h-3.5 text-red-400" />
                <span className="truncate">{profile.occupation}</span>
              </div>
            )}
            {profile.city && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span className="truncate">{profile.city}, {profile.state}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
            <span className="bg-gray-100 px-2 py-0.5 rounded-full">{profile.religion}</span>
            <span className="bg-gray-100 px-2 py-0.5 rounded-full">{profile.caste}</span>
          </div>
        </div>
      </Link>

      {/* Actions */}
      <div className="px-4 pb-4 flex gap-2">
        <button
          onClick={handleInterest}
          disabled={interestSent || loading}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${
            interestSent
              ? 'bg-green-50 text-green-700 border border-green-200 cursor-default'
              : 'bg-red-700 text-white hover:bg-red-800'
          }`}
        >
          {interestSent ? '✓ Sent' : 'Send Interest'}
        </button>
        <Link
          to={`/profile/${profile.id}`}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Eye className="w-4 h-4" />
          View
        </Link>
      </div>
    </div>
  );
}
