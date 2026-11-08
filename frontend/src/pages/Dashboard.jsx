import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Star, Bell, Users, MessageCircle, ArrowRight, TrendingUp, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getUsers, getInterests, getNotifications, getProfileViews, getShortlists } from '../api';
import ProfileCard from '../components/ProfileCard';

export default function Dashboard() {
  const { user } = useAuth();
  const [suggestedMatches, setSuggestedMatches] = useState([]);
  const [recentVisitors, setRecentVisitors] = useState([]);
  const [pendingInterests, setPendingInterests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({ matches: 0, interests: 0, visitors: 0, unread: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const oppositeGender = user.gender === 'Male' ? 'Female' : 'Male';
    Promise.all([
      getUsers({ gender: oppositeGender, _limit: 6 }),
      getInterests({ toUserId: user.id, status: 'pending' }),
      getNotifications({ userId: user.id, _limit: 5 }),
      getProfileViews({ viewedId: user.id, _limit: 5 }),
    ]).then(([matchRes, interestRes, notifRes, viewsRes]) => {
      setSuggestedMatches(matchRes.data);
      setPendingInterests(interestRes.data);
      setNotifications(notifRes.data);
      
      // Get visitor profiles
      const viewerIds = viewsRes.data.map(v => v.viewerId);
      if (viewerIds.length > 0) {
        getUsers().then(allUsers => {
          setRecentVisitors(allUsers.data.filter(u => viewerIds.includes(u.id)));
        });
      }
      
      setStats({
        matches: matchRes.data.length,
        interests: interestRes.data.length,
        visitors: viewsRes.data.length,
        unread: notifRes.data.filter(n => !n.isRead).length
      });
    }).catch(console.error).finally(() => setLoading(false));
  }, [user]);

  if (loading) return <PageLoader />;

  const profilePct = user.profileCompleteness || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl mb-8 p-6 md:p-8" style={{ background: 'linear-gradient(135deg, #c0392b, #8e44ad)' }}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=80&background=fff&color=c0392b`}
              alt={user.name}
              className="w-16 h-16 rounded-full border-4 border-white/30 object-cover"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">Welcome, {user.name?.split(' ')[0]}! 👋</h1>
              <p className="text-white/70 text-sm">{user.profileId} • Member since {user.memberSince}</p>
              {user.isPremium && <span className="text-xs bg-yellow-400/20 text-yellow-200 border border-yellow-400/30 px-2 py-0.5 rounded-full">⭐ Premium Member</span>}
            </div>
          </div>
          
          {/* Profile Completion */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-48 border border-white/20">
            <div className="flex justify-between text-xs text-white/80 mb-2">
              <span>Profile Completeness</span>
              <span className="font-bold">{profilePct}%</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${profilePct}%` }}></div>
            </div>
            <Link to="/edit-profile" className="text-xs text-yellow-300 mt-2 block hover:text-yellow-200">
              {profilePct < 100 ? '✏️ Complete your profile →' : '✅ Profile complete!'}
            </Link>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-full opacity-5">
          <Heart className="w-full h-full" />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Heart className="w-6 h-6 text-red-500" />} label="Matches" value={stats.matches} color="red" to="/matches" />
        <StatCard icon={<Star className="w-6 h-6 text-yellow-500" />} label="Interests" value={stats.interests} color="yellow" to="/interests" />
        <StatCard icon={<Eye className="w-6 h-6 text-blue-500" />} label="Visitors" value={stats.visitors} color="blue" to="/visitors" />
        <StatCard icon={<Bell className="w-6 h-6 text-purple-500" />} label="Notifications" value={stats.unread} color="purple" to="/notifications" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main: Suggested Matches */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-800">💕 Suggested Matches</h2>
            <Link to="/matches" className="text-sm text-red-700 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {suggestedMatches.slice(0, 4).map(p => <ProfileCard key={p.id} profile={p} />)}
          </div>
          {!user.isPremium && (
            <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Upgrade to Premium</p>
                  <p className="text-xs text-gray-500">View contact numbers, chat, and get more matches</p>
                </div>
                <Link to="/subscription" className="ml-auto shrink-0 bg-yellow-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-yellow-600 transition-colors">
                  Upgrade
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pending Interests */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" /> Interests Received
              </h3>
              <Link to="/interests" className="text-xs text-red-700 font-semibold">View All</Link>
            </div>
            {pendingInterests.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No pending interests</p>
            ) : (
              <div className="space-y-3">
                {pendingInterests.slice(0, 3).map(interest => (
                  <InterestItem key={interest.id} interest={interest} />
                ))}
              </div>
            )}
          </div>

          {/* Recent Visitors */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-500" /> Recent Visitors
              </h3>
              <span className="text-xs text-gray-400">{recentVisitors.length} visited</span>
            </div>
            {recentVisitors.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No recent visitors</p>
            ) : (
              <div className="space-y-3">
                {recentVisitors.slice(0, 4).map(v => (
                  <div key={v.id} className="flex items-center gap-3">
                    <img src={v.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(v.name)}&background=c0392b&color=fff`} alt={v.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{v.name}</p>
                      <p className="text-xs text-gray-400">{v.age} yrs • {v.city}</p>
                    </div>
                    <Link to={`/profile/${v.id}`} className="shrink-0 text-xs text-red-700 border border-red-200 px-2 py-1 rounded hover:bg-red-50 transition-colors">
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Bell className="w-4 h-4 text-purple-500" /> Notifications
              </h3>
              <Link to="/notifications" className="text-xs text-red-700 font-semibold">View All</Link>
            </div>
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No new notifications</p>
            ) : (
              <div className="space-y-3">
                {notifications.slice(0, 4).map(n => (
                  <div key={n.id} className={`flex items-start gap-2 p-2 rounded-lg text-sm ${!n.isRead ? 'bg-red-50' : ''}`}>
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.isRead ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                    <p className="text-gray-700 text-xs leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, to }) {
  const colors = { red: 'bg-red-50 border-red-100', yellow: 'bg-yellow-50 border-yellow-100', blue: 'bg-blue-50 border-blue-100', purple: 'bg-purple-50 border-purple-100' };
  return (
    <Link to={to} className={`card p-4 ${colors[color]} hover:shadow-md transition-shadow flex items-center gap-3`}>
      <div className="bg-white rounded-lg p-2.5 shadow-sm">{icon}</div>
      <div>
        <p className="text-2xl font-black text-gray-800">{value}</p>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
      </div>
    </Link>
  );
}

function InterestItem({ interest }) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
      <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center shrink-0">
        <Heart className="w-4 h-4 text-red-600 fill-red-600" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-600 truncate">{interest.message || 'Sent you an interest'}</p>
        <p className="text-xs text-gray-400">{new Date(interest.createdAt).toLocaleDateString('en-IN')}</p>
      </div>
      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full shrink-0">New</span>
    </div>
  );
}

function PageLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="animate-pulse space-y-4">
        <div className="h-32 bg-gray-200 rounded-2xl"></div>
        <div className="grid grid-cols-4 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>)}</div>
      </div>
    </div>
  );
}
