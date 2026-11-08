import React, { useEffect, useState } from 'react';
import { Heart, Check, X, ArrowRight } from 'lucide-react';
import { getInterests, updateInterest, getUserById } from '../api';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Interests() {
  const { user } = useAuth();
  const [tab, setTab] = useState('received');
  const [received, setReceived] = useState([]);
  const [sent, setSent] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      getInterests({ toUserId: user.id }),
      getInterests({ fromUserId: user.id })
    ]).then(async ([receivedRes, sentRes]) => {
      setReceived(receivedRes.data);
      setSent(sentRes.data);

      const allIds = new Set([
        ...receivedRes.data.map(i => i.fromUserId),
        ...sentRes.data.map(i => i.toUserId)
      ]);
      const profileMap = {};
      for (const id of allIds) {
        try {
          const res = await getUserById(id);
          profileMap[id] = res.data;
        } catch (e) {
          console.error(e);
        }
      }
      setProfiles(profileMap);
    }).catch(console.error).finally(() => setLoading(false));
  }, [user]);

  const handleAccept = async (interest) => {
    try {
      await updateInterest(interest.id, { status: 'accepted', updatedAt: new Date().toISOString() });
      setReceived(prev => prev.map(i => i.id === interest.id ? { ...i, status: 'accepted' } : i));
      toast.success('Interest accepted! You can now chat.');
    } catch {
      toast.error('Could not accept interest');
    }
  };

  const handleDecline = async (interest) => {
    try {
      await updateInterest(interest.id, { status: 'declined', updatedAt: new Date().toISOString() });
      setReceived(prev => prev.map(i => i.id === interest.id ? { ...i, status: 'declined' } : i));
      toast('Interest declined');
    } catch {
      toast.error('Could not decline interest');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-8 h-8 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const current = tab === 'received' ? received : sent;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Heart className="w-6 h-6 text-red-500 fill-red-500" /> Expression of Interests
      </h1>

      <div className="flex gap-3 mb-6 border-b border-gray-200 pb-3">
        <button
          onClick={() => setTab('received')}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === 'received' ? 'bg-red-700 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Received ({received.length})
        </button>
        <button
          onClick={() => setTab('sent')}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            tab === 'sent' ? 'bg-red-700 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Sent ({sent.length})
        </button>
      </div>

      {current.length === 0 ? (
        <div className="card p-12 text-center bg-white">
          <Heart className="w-14 h-14 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-700 text-lg">No {tab} interests yet</h3>
          <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
            {tab === 'received'
              ? 'When other members send you an interest, their details and request will appear here.'
              : 'Browse recommendations and click "Send Interest" to connect with potential matches.'}
          </p>
          {tab === 'sent' && (
            <Link to="/matches" className="btn-primary inline-flex items-center gap-2 mt-5">
              Browse Matches <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {current.map(item => {
            const partnerId = tab === 'received' ? item.fromUserId : item.toUserId;
            const profile = profiles[partnerId];
            if (!profile) return null;

            const statusColors = {
              pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
              accepted: 'bg-green-50 text-green-700 border-green-200',
              declined: 'bg-red-50 text-red-700 border-red-200'
            };

            return (
              <div key={item.id} className="card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 bg-white border border-gray-100 shadow-sm hover:shadow transition-shadow">
                <Link to={`/profile/${profile.id}`}>
                  <img
                    src={profile.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=c0392b&color=fff`}
                    alt={profile.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-red-100 shrink-0"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <Link to={`/profile/${profile.id}`} className="font-bold text-gray-800 hover:text-red-700 transition-colors text-base">
                      {profile.name}
                    </Link>
                    <span className="text-xs text-gray-400">
                      {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    {profile.age} yrs • {profile.height} • {profile.caste} • {profile.city}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {profile.education} • {profile.occupation}
                  </p>

                  {item.message && (
                    <p className="text-xs text-gray-600 mt-2 bg-gray-50 p-2 rounded border border-gray-100 italic">
                      "{item.message}"
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-3">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${statusColors[item.status] || 'bg-gray-100'}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                </div>

                {tab === 'received' && item.status === 'pending' && (
                  <div className="flex sm:flex-col gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                    <button
                      onClick={() => handleAccept(item)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors"
                    >
                      <Check className="w-4 h-4" /> Accept
                    </button>
                    <button
                      onClick={() => handleDecline(item)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-50 transition-colors"
                    >
                      <X className="w-4 h-4" /> Decline
                    </button>
                  </div>
                )}

                {item.status === 'accepted' && (
                  <Link
                    to="/inbox"
                    className="self-start sm:self-center px-4 py-2 bg-red-700 text-white rounded-lg text-xs font-semibold hover:bg-red-800 transition-colors"
                  >
                    Start Chat
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

