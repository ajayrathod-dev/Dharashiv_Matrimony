import React, { useEffect, useState } from 'react';
import { Heart, Filter } from 'lucide-react';
import { getUsers } from '../api';
import { useAuth } from '../contexts/AuthContext';
import ProfileCard from '../components/ProfileCard';

export default function Matches() {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const oppositeGender = user?.gender === 'Male' ? 'Female' : 'Male';
    getUsers({ gender: oppositeGender })
      .then(res => setMatches(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const filters = [
    { id: 'all', label: 'All Matches' },
    { id: 'new', label: 'New Profiles' },
    { id: 'premium', label: 'Premium' },
    { id: 'verified', label: 'Verified' },
    { id: 'online', label: 'Online Now' },
  ];

  const filtered = matches.filter(p => {
    if (activeFilter === 'premium') return p.isPremium;
    if (activeFilter === 'verified') return p.isVerified;
    if (activeFilter === 'online') return p.isOnline;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" /> Your Matches
          </h1>
          <p className="text-gray-500 text-sm mt-1">{matches.length} profiles match your preferences</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {filters.map(f => (
          <button key={f.id} onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === f.id ? 'bg-red-700 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-red-300'}`}>
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState filter={activeFilter} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(p => <ProfileCard key={p.id} profile={p} />)}
        </div>
      )}
    </div>
  );
}

function SkeletonCard() {
  return <div className="card animate-pulse"><div className="h-52 bg-gray-200"></div><div className="p-4 space-y-2"><div className="h-4 bg-gray-200 rounded w-3/4"></div><div className="h-3 bg-gray-200 rounded w-1/2"></div></div></div>;
}

function EmptyState({ filter }) {
  return (
    <div className="text-center py-16">
      <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-700">No {filter} matches found</h3>
      <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
    </div>
  );
}
