import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    toast.success('Your message has been sent! Our team will contact you shortly.');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Get in Touch</h1>
        <p className="text-gray-500 text-sm">Have queries or need help finding a match? We are here to support you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Information */}
        <div className="card p-6 sm:p-8 bg-white border border-gray-100 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Dharashiv Matrimony Support</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">Head Office</h4>
                <p className="text-xs text-gray-500 mt-0.5">Shivaji Chowk, Main Road, Dharashiv (Osmanabad) - 413501, Maharashtra</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">Customer Helpline</h4>
                <p className="text-xs text-gray-500 mt-0.5">+91 98765 43210 / +91 98765 43211</p>
                <p className="text-[11px] text-gray-400">Available Mon - Sat (9:00 AM - 6:00 PM)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-700 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 text-sm">Email Support</h4>
                <p className="text-xs text-gray-500 mt-0.5">support@dharashivmatrimony.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message form */}
        <div className="card p-6 sm:p-8 bg-white border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Send us a Message</h2>
          {sent ? (
            <div className="text-center py-8">
              <p className="text-green-600 font-bold mb-1">Thank you!</p>
              <p className="text-xs text-gray-500">We have received your message and will get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter full name"
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  placeholder="10-digit phone number"
                  className="input-field text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Your Query / Message</label>
                <textarea
                  required
                  rows={3}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we help you?"
                  className="input-field text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-700 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

