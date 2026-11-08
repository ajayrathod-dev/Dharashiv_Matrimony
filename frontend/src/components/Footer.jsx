import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-red-700 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <span className="text-white font-bold text-lg">Dharashiv</span>
                <span className="text-red-400 font-bold text-lg ml-1">Matrimony</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              India's most trusted matrimonial platform for the Dharashiv community. Find your perfect life partner today.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors text-xs font-bold text-white">f</a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors text-xs font-bold text-white">in</a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors text-xs font-bold text-white">ig</a>
              <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors text-xs font-bold text-white">yt</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink to="/register" label="Register Free" />
              <FooterLink to="/login" label="Login" />
              <FooterLink to="/search" label="Search Profiles" />
              <FooterLink to="/subscription" label="Premium Plans" />
              <FooterLink to="/matches" label="Recommended Matches" />
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2 text-sm">
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/contact" label="Contact Us" />
              <FooterLink to="/about" label="Privacy Policy" />
              <FooterLink to="/about" label="Terms of Service" />
              <FooterLink to="/contact" label="Help & FAQ" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span>Dharashiv (Osmanabad), Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-400 shrink-0" />
                <span>support@dharashivmatrimony.com</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-red-900/30 rounded-lg border border-red-800/30">
              <p className="text-xs text-gray-400">Helpline Hours</p>
              <p className="text-sm text-white font-medium">Mon–Sat: 9 AM – 6 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © 2026 Dharashiv Matrimony. All rights reserved. Made with <Heart className="w-3 h-3 inline text-red-500 fill-red-500" /> in Maharashtra.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link to="/about" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link to="/about" className="hover:text-gray-300 transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-gray-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }) {
  return (
    <li>
      <Link to={to} className="text-gray-400 hover:text-white transition-colors">
        {label}
      </Link>
    </li>
  );
}
