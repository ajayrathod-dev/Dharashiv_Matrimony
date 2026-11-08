import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Users, Star, ArrowRight, CheckCircle, UserPlus, MessageCircle, Award, MapPin } from 'lucide-react';
import { getUsers, getTestimonials } from '../api';
import ProfileCard from '../components/ProfileCard';

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getUsers({ _limit: 6 }), getTestimonials()])
      .then(([usersRes, testRes]) => {
        setProfiles(usersRes.data);
        setTestimonials(testRes.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #7b1113 0%, #c0392b 40%, #8e44ad 80%, #2980b9 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-300 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            #1 Matrimonial Portal for Dharashiv Community
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            Find Your Perfect
            <span className="block text-yellow-300">Life Partner</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Connecting the Dharashiv community for generations. Join thousands of happy couples who found love here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register" className="bg-white text-red-700 px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl">
              Register Free <ArrowRight className="inline w-5 h-5 ml-1" />
            </Link>
            <Link to="/login" className="border-2 border-white text-white px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
              Browse Profiles
            </Link>
          </div>

          {/* Stats bar */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto border border-white/20">
            <div className="grid grid-cols-3 divide-x divide-white/20">
              <StatItem value="50,000+" label="Profiles" />
              <StatItem value="10,000+" label="Marriages" />
              <StatItem value="98%" label="Verified" />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">How It Works</h2>
            <p className="text-gray-500 text-lg">Your journey to finding love in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard num="01" icon={<UserPlus className="w-8 h-8" />} title="Create Profile" desc="Register and create your detailed matrimonial profile with photos, preferences and family details." color="red" />
            <StepCard num="02" icon={<Search className="w-8 h-8" />} title="Search & Match" desc="Use advanced filters to find matches based on location, caste, education, profession and more." color="purple" />
            <StepCard num="03" icon={<Heart className="w-8 h-8" />} title="Connect & Meet" desc="Send interest, chat with matches and meet your perfect partner with family approval." color="green" />
          </div>
        </div>
      </section>

      {/* Featured Profiles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Featured Profiles</h2>
              <p className="text-gray-500 mt-1">Explore verified profiles from our community</p>
            </div>
            <Link to="/login" className="hidden md:flex items-center gap-2 text-red-700 font-semibold hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-52 bg-gray-200"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.map(p => <ProfileCard key={p.id} profile={p} />)}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/register" className="btn-primary inline-flex items-center gap-2">
              View All Profiles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <BigStat value="50,000+" label="Happy Members" />
            <BigStat value="10,000+" label="Success Stories" />
            <BigStat value="150+" label="Cities Covered" />
            <BigStat value="15+" label="Years of Trust" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">❤️ Success Stories</h2>
            <p className="text-gray-500 text-lg">Thousands of couples found love through Dharashiv Matrimony</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-2">
                    <img src={t.husbandPhoto} alt={t.husbandName} className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                    <img src={t.wifePhoto} alt={t.wifeName} className="w-12 h-12 rounded-full border-2 border-white object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{t.husbandName} & {t.wifeName}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" /> {t.location} • {t.marriedDate}
                    </div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed italic">"{t.message}"</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <Heart className="w-3 h-3 fill-green-600" /> Married via Dharashiv Matrimony
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #c0392b, #8e44ad)' }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Find Your Partner?</h2>
          <p className="text-white/80 text-lg mb-8">Join thousands of members from the Dharashiv community. Register free today!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-red-700 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg">
              Start Your Journey Free
            </Link>
            <Link to="/login" className="border-2 border-white text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-all">
              Already a Member? Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatItem({ value, label }) {
  return (
    <div className="text-center px-4">
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-white/70">{label}</div>
    </div>
  );
}

function StepCard({ num, icon, title, desc, color }) {
  const colors = {
    red: 'bg-red-50 text-red-700 border-red-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
    green: 'bg-green-50 text-green-700 border-green-100'
  };
  return (
    <div className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="text-4xl font-black text-gray-100 mb-2">{num}</div>
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 ${colors[color]}`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function BigStat({ value, label }) {
  return (
    <div>
      <div className="text-4xl font-black mb-1">{value}</div>
      <div className="text-white/70 text-sm font-medium">{label}</div>
    </div>
  );
}
