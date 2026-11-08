import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Camera, User, Heart, Briefcase, Users, ArrowLeft } from 'lucide-react';
import { updateUser } from '../api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const HEIGHTS = [
  "4'8\"", "4'9\"", "4'10\"", "4'11\"", "5'0\"", "5'1\"", "5'2\"", "5'3\"",
  "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"",
  "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\""
];

const HOBBIES = [
  'Reading', 'Travelling', 'Cooking', 'Music', 'Dancing', 'Sports',
  'Fitness', 'Photography', 'Painting', 'Gardening', 'Movies', 'Yoga', 'Cricket'
];

export default function EditProfile() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('basic');
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || '',
    aboutMe: user?.aboutMe || '',
    height: user?.height || "5'7\"",
    weight: user?.weight || '',
    complexion: user?.complexion || 'Fair',
    bodyType: user?.bodyType || 'Athletic',
    diet: user?.diet || 'Non-Vegetarian',
    smoking: user?.smoking || 'No',
    drinking: user?.drinking || 'No',
    hobbies: user?.hobbies || [],
    religion: user?.religion || 'Hindu',
    caste: user?.caste || '',
    subCaste: user?.subCaste || '',
    motherTongue: user?.motherTongue || 'Marathi',
    education: user?.education || '',
    educationDetail: user?.educationDetail || '',
    occupation: user?.occupation || '',
    employer: user?.employer || '',
    income: user?.income || '',
    workLocation: user?.workLocation || '',
    nativePlace: user?.nativePlace || 'Dharashiv',
    city: user?.city || '',
    state: user?.state || 'Maharashtra',
    photo: user?.photo || '',
    familyDetails: user?.familyDetails || {},
    contactInfo: user?.contactInfo || {}
  });

  const update = (key, val) => setForm(prev => ({ ...prev, [key]: val }));
  const updateFamily = (key, val) => setForm(prev => ({ ...prev, familyDetails: { ...prev.familyDetails, [key]: val } }));
  const updateContact = (key, val) => setForm(prev => ({ ...prev, contactInfo: { ...prev.contactInfo, [key]: val } }));

  const toggleHobby = (hobby) => {
    setForm(prev => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby)
        ? prev.hobbies.filter(h => h !== hobby)
        : [...prev.hobbies, hobby]
    }));
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      await updateUser(user.id, {
        ...form,
        profileCompleteness: Math.min(100, (user.profileCompleteness || 50) + 10)
      });
      await refreshUser();
      toast.success('Profile updated successfully!');
      navigate(`/profile/${user.id}`);
    } catch {
      toast.error('Could not save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: <User className="w-4 h-4" /> },
    { id: 'religion', label: 'Religion & Caste', icon: <Heart className="w-4 h-4" /> },
    { id: 'career', label: 'Education & Work', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'family', label: 'Family & Contact', icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Edit Your Profile</h1>
          <p className="text-gray-500 text-xs sm:text-sm">Keep your details up-to-date to get accurate recommendations</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-red-700 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-800 transition-colors shadow-sm disabled:opacity-60"
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? 'Saving...' : 'Save Profile'}</span>
        </button>
      </div>

      {/* Photo upload section */}
      <div className="card p-6 mb-6 flex flex-col sm:flex-row items-center gap-6 bg-white border border-gray-100">
        <div className="relative group">
          <img
            src={form.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&size=120&background=c0392b&color=fff`}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full object-cover border-4 border-red-50 shadow-sm"
          />
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Camera className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="flex-1 w-full text-center sm:text-left">
          <h3 className="font-bold text-gray-800 text-base">{user?.name}</h3>
          <p className="text-xs text-gray-400 mb-2">{user?.profileId}</p>
          <label className="text-xs font-semibold text-gray-700 block mb-1">Photo Image URL</label>
          <input
            type="text"
            value={form.photo}
            onChange={e => update('photo', e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="input-field text-xs py-2 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="card p-2 h-fit bg-white border border-gray-100 flex lg:flex-col overflow-x-auto">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                activeSection === s.id
                  ? 'bg-red-50 text-red-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {s.icon}
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-3 card p-6 bg-white border border-gray-100 shadow-sm">
          {activeSection === 'basic' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 border-b pb-2 text-sm">Personal Information</h3>
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => update('name', e.target.value)}
                  className="input-field text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">About Me</label>
                <textarea
                  rows={4}
                  value={form.aboutMe}
                  onChange={e => update('aboutMe', e.target.value)}
                  className="input-field text-sm resize-none"
                  placeholder="Share details about your values, personality, and what you are looking for in a partner..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Height</label>
                  <select
                    value={form.height}
                    onChange={e => update('height', e.target.value)}
                    className="input-field text-sm"
                  >
                    {HEIGHTS.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Weight</label>
                  <input
                    type="text"
                    value={form.weight}
                    onChange={e => update('weight', e.target.value)}
                    placeholder="e.g. 68 kg"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Complexion</label>
                  <select
                    value={form.complexion}
                    onChange={e => update('complexion', e.target.value)}
                    className="input-field text-sm"
                  >
                    {['Very Fair', 'Fair', 'Wheatish', 'Wheatish Brown', 'Dark'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Body Type</label>
                  <select
                    value={form.bodyType}
                    onChange={e => update('bodyType', e.target.value)}
                    className="input-field text-sm"
                  >
                    {['Slim', 'Athletic', 'Average', 'Heavy'].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Diet</label>
                  <select
                    value={form.diet}
                    onChange={e => update('diet', e.target.value)}
                    className="input-field text-sm"
                  >
                    {['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Jain Vegetarian'].map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Living City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={e => update('city', e.target.value)}
                    placeholder="e.g. Pune"
                    className="input-field text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">Hobbies & Interests</label>
                <div className="flex flex-wrap gap-2">
                  {HOBBIES.map(hobby => (
                    <button
                      key={hobby}
                      type="button"
                      onClick={() => toggleHobby(hobby)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                        form.hobbies.includes(hobby)
                          ? 'bg-red-700 text-white border-red-700'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {hobby}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'religion' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 border-b pb-2 text-sm">Religion & Community</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Religion</label>
                  <select
                    value={form.religion}
                    onChange={e => update('religion', e.target.value)}
                    className="input-field text-sm"
                  >
                    {['Hindu', 'Muslim', 'Christian', 'Jain', 'Buddhist', 'Sikh', 'Other'].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Caste</label>
                  <input
                    type="text"
                    value={form.caste}
                    onChange={e => update('caste', e.target.value)}
                    placeholder="e.g. Maratha, Brahmin"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Sub-caste (Optional)</label>
                  <input
                    type="text"
                    value={form.subCaste}
                    onChange={e => update('subCaste', e.target.value)}
                    placeholder="e.g. 96 Kuli, Deshastha"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Mother Tongue</label>
                  <select
                    value={form.motherTongue}
                    onChange={e => update('motherTongue', e.target.value)}
                    className="input-field text-sm"
                  >
                    {['Marathi', 'Hindi', 'English', 'Kannada', 'Gujarati'].map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'career' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 border-b pb-2 text-sm">Education & Profession</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Highest Degree</label>
                  <input
                    type="text"
                    value={form.education}
                    onChange={e => update('education', e.target.value)}
                    placeholder="e.g. B.E. Computer Engineering"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">College / University</label>
                  <input
                    type="text"
                    value={form.educationDetail}
                    onChange={e => update('educationDetail', e.target.value)}
                    placeholder="e.g. Pune University"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Occupation</label>
                  <input
                    type="text"
                    value={form.occupation}
                    onChange={e => update('occupation', e.target.value)}
                    placeholder="e.g. Software Engineer"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Organization / Employer</label>
                  <input
                    type="text"
                    value={form.employer}
                    onChange={e => update('employer', e.target.value)}
                    placeholder="e.g. Infosys, TCS"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Annual Income</label>
                  <select
                    value={form.income}
                    onChange={e => update('income', e.target.value)}
                    className="input-field text-sm"
                  >
                    <option value="">Select Range</option>
                    {['Below 2 Lakhs', '2-4 Lakhs', '4-6 Lakhs', '6-8 Lakhs', '8-10 Lakhs', '10-15 Lakhs', '15-20 Lakhs', '20-30 Lakhs', '30+ Lakhs'].map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Work City</label>
                  <input
                    type="text"
                    value={form.workLocation}
                    onChange={e => update('workLocation', e.target.value)}
                    placeholder="e.g. Pune, Mumbai"
                    className="input-field text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'family' && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800 border-b pb-2 text-sm">Family Background & Contact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Father's Name</label>
                  <input
                    type="text"
                    value={form.familyDetails?.fatherName || ''}
                    onChange={e => updateFamily('fatherName', e.target.value)}
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Father's Occupation</label>
                  <input
                    type="text"
                    value={form.familyDetails?.fatherOccupation || ''}
                    onChange={e => updateFamily('fatherOccupation', e.target.value)}
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Mother's Name</label>
                  <input
                    type="text"
                    value={form.familyDetails?.motherName || ''}
                    onChange={e => updateFamily('motherName', e.target.value)}
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Mother's Occupation</label>
                  <input
                    type="text"
                    value={form.familyDetails?.motherOccupation || ''}
                    onChange={e => updateFamily('motherOccupation', e.target.value)}
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Siblings</label>
                  <input
                    type="text"
                    value={form.familyDetails?.siblings || ''}
                    onChange={e => updateFamily('siblings', e.target.value)}
                    placeholder="e.g. 1 Brother (Married)"
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Family Type</label>
                  <select
                    value={form.familyDetails?.familyType || 'Nuclear'}
                    onChange={e => updateFamily('familyType', e.target.value)}
                    className="input-field text-sm"
                  >
                    <option value="Nuclear">Nuclear</option>
                    <option value="Joint">Joint</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Contact Phone Number</label>
                  <input
                    type="tel"
                    value={form.contactInfo?.phone || ''}
                    onChange={e => updateContact('phone', e.target.value)}
                    placeholder="10-digit phone number"
                    className="input-field text-sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

