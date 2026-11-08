import React, { useEffect, useState } from 'react';
import { Star, Heart, ArrowRight } from 'lucide-react';
import { getShortlists, getUserById } from '../api';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';

export default function Shortlist() {
  const { user } = useAuth();
  const [shortlists, setShortlists] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await getShortlists({ userId: user.id });
      setShortlists(res.data);
      const profilePromises = res.data.map(s =>
        getUserById(s.shortlistedUserId).then(r => r.data).catch(() => null)
      );
      const loaded = await Promise.all(profilePromises);
      setProfiles(loaded.filter(Boolean));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" /> Shortlisted Profiles
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Keep track of candidates you're interested in connecting with
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-52 bg-gray-200"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : profiles.length === 0 ? (
        <div className="card p-12 text-center bg-white border border-gray-100 max-w-lg mx-auto">
          <Star className="w-14 h-14 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-700 text-lg">Your shortlist is empty</h3>
          <p className="text-sm text-gray-500 mt-2">
            Click the heart icon on any profile to save it here for quick access later.
          </p>
          <Link to="/matches" className="btn-primary inline-flex items-center gap-2 mt-6">
            Explore Matches <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{profiles.length} profile{profiles.length !== 1 ? 's' : ''} saved</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {profiles.map(p => (
              <ProfileCard
                key={p.id}
                profile={p}
                isShortlisted={true}
                onShortlistToggle={fetchData}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

