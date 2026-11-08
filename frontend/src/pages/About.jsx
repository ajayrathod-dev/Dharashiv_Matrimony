import React from 'react';
import { Heart, ShieldCheck, Users, Award, MapPin } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-widest text-red-700 font-bold bg-red-50 px-3 py-1 rounded-full border border-red-100">
          About Dharashiv Matrimony
        </span>
        <h1 className="text-3xl font-extrabold text-gray-800 mt-4 mb-3">
          Connecting Hearts Across the Dharashiv & Marathwada Community
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Established to bring families and eligible brides & grooms together with trusted, verified, and culturally aligned profiles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card p-6 bg-white border border-gray-100 shadow-sm text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-red-700" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Community Centric</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Tailored specifically for families in and around Dharashiv (Osmanabad), Pune, Mumbai, Solapur, Latur and across Maharashtra.
          </p>
        </div>

        <div className="card p-6 bg-white border border-gray-100 shadow-sm text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6 text-red-700" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">100% Verified Profiles</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Every profile goes through verification of phone numbers, family details, and credentials before listing.
          </p>
        </div>

        <div className="card p-6 bg-white border border-gray-100 shadow-sm text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-red-700" />
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Trusted Matchmaking</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Over 10,000+ successful marriages with personalized filters for education, profession, horoscope, and lifestyle.
          </p>
        </div>
      </div>

      <div className="card p-8 bg-gradient-to-r from-red-700 to-rose-800 text-white rounded-2xl shadow">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="text-red-100 text-sm sm:text-base leading-relaxed">
            To make life partner search simple, dignified, secure, and accessible to every family, respecting Maharashtrian cultural heritage and modern aspirations.
          </p>
        </div>
      </div>
    </div>
  );
}

