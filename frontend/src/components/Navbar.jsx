import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Heart, Bell, MessageCircle, User, Menu, X, ChevronDown,
  LogOut, Settings, Star, Search, Home
} from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  if (!user) {
    return (
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-red-700 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-red-700">Dharashiv</span>
              <span className="text-xl font-bold text-gray-800">Matrimony</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-gray-600 hover:text-red-700 font-medium transition-colors px-3 py-2">Login</Link>
              <Link to="/register" className="bg-red-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-800 transition-colors">
                Register Free
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-red-700 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-lg font-bold text-red-700 hidden sm:block">Dharashiv</span>
            <span className="text-lg font-bold text-gray-800 hidden sm:block">Matrimony</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/dashboard" icon={<Home className="w-4 h-4" />} label="Home" active={isActive('/dashboard')} />
            <NavLink to="/matches" icon={<Heart className="w-4 h-4" />} label="Matches" active={isActive('/matches')} />
            <NavLink to="/search" icon={<Search className="w-4 h-4" />} label="Search" active={isActive('/search')} />
            <NavLink to="/inbox" icon={<MessageCircle className="w-4 h-4" />} label="Inbox" active={isActive('/inbox')} />
            <NavLink to="/interests" icon={<Star className="w-4 h-4" />} label="Interests" active={isActive('/interests')} />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Link to="/notifications" className="relative p-2 text-gray-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Link>

            {/* Profile dropdown */}
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <img
                  src={user.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=c0392b&color=fff`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-red-200"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700 max-w-24 truncate">{user.name?.split(' ')[0]}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.profileId}</p>
                    {user.isPremium && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">Premium Member</span>
                    )}
                  </div>
                  <DropdownItem to={`/profile/${user.id}`} icon={<User className="w-4 h-4" />} label="My Profile" />
                  <DropdownItem to="/edit-profile" icon={<Settings className="w-4 h-4" />} label="Edit Profile" />
                  <DropdownItem to="/subscription" icon={<Star className="w-4 h-4" />} label="Upgrade Plan" />
                  <DropdownItem to="/settings" icon={<Settings className="w-4 h-4" />} label="Settings" />
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-500 hover:text-red-700"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            <MobileNavLink to="/dashboard" label="Home" onClick={() => setMobileOpen(false)} />
            <MobileNavLink to="/matches" label="Matches" onClick={() => setMobileOpen(false)} />
            <MobileNavLink to="/search" label="Search" onClick={() => setMobileOpen(false)} />
            <MobileNavLink to="/inbox" label="Inbox" onClick={() => setMobileOpen(false)} />
            <MobileNavLink to="/interests" label="Interests" onClick={() => setMobileOpen(false)} />
            <MobileNavLink to="/shortlist" label="Shortlist" onClick={() => setMobileOpen(false)} />
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ to, icon, label, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        active ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:text-red-700 hover:bg-gray-50'
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function DropdownItem({ to, icon, label }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}

function MobileNavLink({ to, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg mx-2 transition-colors"
    >
      {label}
    </Link>
  );
}
