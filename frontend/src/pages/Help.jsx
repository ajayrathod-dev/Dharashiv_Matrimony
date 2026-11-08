import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Phone, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    q: 'How do I register on Dharashiv Matrimony?',
    a: 'Registration is completely free! Simply click on "Register Free", select who you are creating the profile for, fill in basic details, religion/caste, education, and partner preferences. You can immediately begin browsing profiles.'
  },
  {
    q: 'Is my personal contact information safe?',
    a: 'Yes, your safety and privacy are our top priorities. Your phone number and email are hidden by default and only visible to verified members who hold a valid Premium subscription.'
  },
  {
    q: 'How does Kundali / Gun Milan work on the site?',
    a: 'Each profile includes detailed astrological information including Rashi, Nakshatra, Charan, Gotra, and Manglik status. You can use our integrated Kundali Matching tool to calculate 36 Gun Milan compatibility score instantly.'
  },
  {
    q: 'What are the benefits of upgrading to Premium?',
    a: 'Premium membership allows you to view verified phone numbers, initiate unlimited direct chats, get highlighted placement in search results, and receive assisted match recommendations from our Relationship Manager.'
  },
  {
    q: 'How can I report or block a suspicious profile?',
    a: 'Every profile page includes a "Report Profile" button. Our verification team reviews all reported profiles within 2 hours. You can also block any member to prevent them from messaging or viewing your profile.'
  },
  {
    q: 'Can I generate and download a traditional Biodata (बायोडाटा)?',
    a: 'Yes! Use our "Biodata Generator" tool to automatically generate a beautifully formatted Marathi / English Marriage Biodata ready to share on WhatsApp or print.'
  }
];

export default function Help() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-100 mb-2">
          <HelpCircle className="w-3.5 h-3.5" /> 24x7 Help Center
        </div>
        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Frequently Asked Questions</h1>
        <p className="text-gray-500 text-sm mt-1">Find answers to common questions about your account and search</p>
      </div>

      {/* Accordion */}
      <div className="space-y-3 mb-12">
        {FAQS.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="card bg-white border border-gray-100 shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-gray-800 hover:text-red-700 transition-colors"
              >
                <span className="text-sm sm:text-base">{faq.q}</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-red-700 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Safety Tips Banner */}
      <div className="card p-6 sm:p-8 bg-amber-50/70 border border-amber-200 rounded-2xl mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-base mb-1">Safe Matrimony Guidelines</h3>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-1.5 list-disc pl-4 mt-2">
              <li>Never transfer money or share bank account / OTP details with any member.</li>
              <li>Always involve family elders and parents before meeting a match in person.</li>
              <li>Meet initially in safe, public places such as cafes, restaurants, or community temples.</li>
              <li>Verify background, profession, and family details through known references.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Need more help */}
      <div className="text-center p-6 bg-white border border-gray-100 rounded-2xl card shadow-sm">
        <h3 className="text-lg font-bold text-gray-800 mb-1">Still need assistance?</h3>
        <p className="text-xs text-gray-500 mb-4">Our community support team in Dharashiv is happy to guide you.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn-primary text-xs flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> Contact Helpline
          </Link>
          <a href="tel:+919876543210" className="btn-secondary text-xs flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> Call +91 98765 43210
          </a>
        </div>
      </div>
    </div>
  );
}
