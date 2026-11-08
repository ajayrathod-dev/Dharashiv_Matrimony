import React, { useEffect, useState } from 'react';
import { Bell, Heart, Eye, CheckCircle2, Trash2 } from 'lucide-react';
import { getNotifications, markNotificationRead } from '../api';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getNotifications({ userId: user.id })
      .then(res => setNotifications(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const handleMarkRead = async (notif) => {
    try {
      await markNotificationRead(notif.id);
      setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n));
      toast.success('Marked as read');
    } catch {
      toast.error('Could not update notification');
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'interest_received':
      case 'interest_accepted':
        return <Heart className="w-5 h-5 text-red-600 fill-red-100" />;
      case 'profile_view':
        return <Eye className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-purple-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Bell className="w-6 h-6 text-red-700" /> Notifications
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Stay updated with activities on your profile</p>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="card p-12 text-center bg-white border border-gray-100">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-700">No notifications</h3>
          <p className="text-xs text-gray-400 mt-1">You are all caught up with your updates</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div
              key={n.id}
              className={`card p-4 flex items-center justify-between gap-4 transition-all ${
                !n.isRead ? 'bg-red-50/50 border-red-200' : 'bg-white border-gray-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                  {getIcon(n.type)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{n.message}</p>
                  <span className="text-[11px] text-gray-400">
                    {new Date(n.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {n.fromUserId && (
                  <Link
                    to={`/profile/${n.fromUserId}`}
                    className="text-xs text-red-700 font-semibold px-2.5 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                  >
                    View Profile
                  </Link>
                )}
                {!n.isRead && (
                  <button
                    onClick={() => handleMarkRead(n)}
                    title="Mark as read"
                    className="p-1.5 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

