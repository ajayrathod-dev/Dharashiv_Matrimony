import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const STEPS = ['Basic Info', 'Background', 'Education', 'Preferences'];

const HEIGHTS = ["4'8\"","4'9\"","4'10\"","4'11\"","5'0\"","5'1\"","5'2\"","5'3\"","5'4\"","5'5\"","5'6\"","5'7\"","5'8\"","5'9\"","5'10\"","5'11\"","6'0\"","6'1\"","6'2\"","6'3\"","6'4\""];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: '', gender: 'Male', dob: '', email: '', password: '', phone: '',
    religion: 'Hindu', caste: '', motherTongue: 'Marathi', maritalStatus: 'Never Married',
    height: "5'6\"", complexion: 'Fair', diet: 'Non-Vegetarian',
    education: '', occupation: '', income: '', workLocation: '', nativePlace: 'Dharashiv', city: '', state: 'Maharashtra',
    aboutMe: '',
    partnerPreferences: { ageMin: 22, ageMax: 32, religion: ['Hindu'], caste: ['Any'], maritalStatus: ['Never Married'] }
  });

  const update = (key, val) => setData(prev => ({ ...prev, [key]: val }));
  const updatePref = (key, val) => setData(prev => ({ ...prev, partnerPreferences: { ...prev.partnerPreferences, [key]: val } }));

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep(s => s + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await register({ ...data, age: new Date().getFullYear() - new Date(data.dob).getFullYear() });
      toast.success('Account created! Welcome to Dharashiv Matrimony!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-red-700 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Create Your Profile</h1>
          <p className="text-gray-500 mt-1">Find your perfect match on Dharashiv Matrimony</p>
        </div>

        {/* Progress */}
        <div className="flex items-center mb-8">
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  i < step ? 'bg-green-500 text-white' : i === step ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className="text-xs mt-1 text-gray-500 hidden sm:block">{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded transition-all ${i < step ? 'bg-green-400' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="card p-6">
          <form onSubmit={handleNext} className="space-y-4">
            {step === 0 && (
              <>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Basic Information</h2>
                <Field label="Full Name *">
                  <input name="name" value={data.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" className="input-field" required />
                </Field>
                <Field label="Profile For">
                  <div className="flex gap-2">
                    {['Male', 'Female'].map(g => (
                      <button key={g} type="button" onClick={() => update('gender', g)}
                        className={`flex-1 py-2.5 text-sm font-semibold rounded-lg border transition-colors ${data.gender === g ? 'bg-red-700 text-white border-red-700' : 'border-gray-300 text-gray-600 hover:border-red-300'}`}>
                        {g === 'Male' ? '👨 ' : '👩 '}{g}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Date of Birth *">
                  <input type="date" value={data.dob} onChange={e => update('dob', e.target.value)} className="input-field" required max={new Date(Date.now() - 18*365*24*3600*1000).toISOString().split('T')[0]} />
                </Field>
                <Field label="Email Address *">
                  <input type="email" value={data.email} onChange={e => update('email', e.target.value)} placeholder="your@email.com" className="input-field" required />
                </Field>
                <Field label="Password *">
                  <input type="password" value={data.password} onChange={e => update('password', e.target.value)} placeholder="Min. 6 characters" className="input-field" required minLength={6} />
                </Field>
                <Field label="Mobile Number *">
                  <input type="tel" value={data.phone} onChange={e => update('phone', e.target.value)} placeholder="10-digit mobile number" className="input-field" required pattern="[0-9]{10}" />
                </Field>
                <Field label="Tell us about yourself">
                  <textarea value={data.aboutMe} onChange={e => update('aboutMe', e.target.value)} rows={3} placeholder="A short description about yourself..." className="input-field resize-none" />
                </Field>
              </>
            )}

            {step === 1 && (
              <>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Religion & Background</h2>
                <Field label="Religion *">
                  <select value={data.religion} onChange={e => update('religion', e.target.value)} className="input-field" required>
                    {['Hindu', 'Muslim', 'Christian', 'Jain', 'Buddhist', 'Sikh', 'Other'].map(r => <option key={r}>{r}</option>)}
                  </select>
                </Field>
                <Field label="Caste *">
                  <input value={data.caste} onChange={e => update('caste', e.target.value)} placeholder="Enter your caste" className="input-field" required />
                </Field>
                <Field label="Mother Tongue">
                  <select value={data.motherTongue} onChange={e => update('motherTongue', e.target.value)} className="input-field">
                    {['Marathi', 'Hindi', 'English', 'Kannada', 'Telugu', 'Other'].map(l => <option key={l}>{l}</option>)}
                  </select>
                </Field>
                <Field label="Marital Status *">
                  <select value={data.maritalStatus} onChange={e => update('maritalStatus', e.target.value)} className="input-field" required>
                    {['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Height">
                  <select value={data.height} onChange={e => update('height', e.target.value)} className="input-field">
                    {HEIGHTS.map(h => <option key={h}>{h}</option>)}
                  </select>
                </Field>
                <Field label="Complexion">
                  <select value={data.complexion} onChange={e => update('complexion', e.target.value)} className="input-field">
                    {['Very Fair', 'Fair', 'Wheatish', 'Wheatish Brown', 'Dark'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Diet">
                  <select value={data.diet} onChange={e => update('diet', e.target.value)} className="input-field">
                    {['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Jain Vegetarian'].map(d => <option key={d}>{d}</option>)}
                  </select>
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Education & Career</h2>
                <Field label="Education *">
                  <select value={data.education} onChange={e => update('education', e.target.value)} className="input-field" required>
                    <option value="">Select...</option>
                    {['SSC/HSC', 'Diploma', 'B.A.', 'B.Com', 'B.Sc.', 'B.E./B.Tech.', 'MBBS', 'B.Ed.', 'LL.B.', 'M.A.', 'M.Com.', 'M.Sc.', 'M.E./M.Tech.', 'MBA', 'MCA', 'PGDM', 'PhD'].map(e => <option key={e}>{e}</option>)}
                  </select>
                </Field>
                <Field label="Occupation *">
                  <input value={data.occupation} onChange={e => update('occupation', e.target.value)} placeholder="e.g. Software Engineer" className="input-field" required />
                </Field>
                <Field label="Annual Income">
                  <select value={data.income} onChange={e => update('income', e.target.value)} className="input-field">
                    <option value="">Prefer not to say</option>
                    {['Below 2 Lakhs', '2-4 Lakhs', '4-6 Lakhs', '6-8 Lakhs', '8-10 Lakhs', '10-15 Lakhs', '15-20 Lakhs', '20-30 Lakhs', '30+ Lakhs'].map(i => <option key={i}>{i}</option>)}
                  </select>
                </Field>
                <Field label="Work Location">
                  <input value={data.workLocation} onChange={e => update('workLocation', e.target.value)} placeholder="City where you work" className="input-field" />
                </Field>
                <Field label="Native Place">
                  <input value={data.nativePlace} onChange={e => update('nativePlace', e.target.value)} placeholder="Native city/village" className="input-field" />
                </Field>
                <Field label="Current City">
                  <input value={data.city} onChange={e => update('city', e.target.value)} placeholder="City where you live" className="input-field" />
                </Field>
                <Field label="State">
                  <select value={data.state} onChange={e => update('state', e.target.value)} className="input-field">
                    {['Maharashtra', 'Karnataka', 'Goa', 'Gujarat', 'Telangana', 'Andhra Pradesh', 'Delhi', 'Punjab', 'Other'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-lg font-bold text-gray-800 mb-4">Partner Preferences</h2>
                <div className="p-4 bg-red-50 rounded-lg border border-red-100 mb-4">
                  <p className="text-sm text-red-700">Tell us what you're looking for in your life partner</p>
                </div>
                <Field label={`Partner Age Range: ${data.partnerPreferences.ageMin} – ${data.partnerPreferences.ageMax} years`}>
                  <div className="flex items-center gap-3">
                    <input type="range" min={18} max={60} value={data.partnerPreferences.ageMin} onChange={e => updatePref('ageMin', +e.target.value)} className="flex-1 accent-red-700" />
                    <span className="text-sm font-medium w-8">{data.partnerPreferences.ageMin}</span>
                    <span className="text-gray-400">to</span>
                    <input type="range" min={18} max={60} value={data.partnerPreferences.ageMax} onChange={e => updatePref('ageMax', +e.target.value)} className="flex-1 accent-red-700" />
                    <span className="text-sm font-medium w-8">{data.partnerPreferences.ageMax}</span>
                  </div>
                </Field>
                <Field label="Partner Religion">
                  <select className="input-field" defaultValue="Hindu">
                    {['Hindu', 'Any', 'Muslim', 'Christian', 'Jain'].map(r => <option key={r}>{r}</option>)}
                  </select>
                </Field>
                <Field label="Marital Status Acceptable">
                  <div className="flex flex-wrap gap-2">
                    {['Never Married', 'Divorced', 'Widowed'].map(s => (
                      <button key={s} type="button"
                        onClick={() => {
                          const cur = data.partnerPreferences.maritalStatus || [];
                          const updated = cur.includes(s) ? cur.filter(x => x !== s) : [...cur, s];
                          updatePref('maritalStatus', updated);
                        }}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                          (data.partnerPreferences.maritalStatus || []).includes(s) ? 'bg-red-700 text-white border-red-700' : 'border-gray-300 text-gray-600'
                        }`}>{s}</button>
                    ))}
                  </div>
                </Field>
                <Field label="Preferred States">
                  <select className="input-field">
                    {['Maharashtra', 'Any', 'Karnataka', 'Goa'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </Field>

                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm text-green-700 font-medium">🎉 You're almost done!</p>
                  <p className="text-xs text-green-600 mt-1">After registration, you can further refine your preferences from your dashboard.</p>
                </div>
              </>
            )}

            <div className="flex gap-3 pt-2">
              {step > 0 && (
                <button type="button" onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
              <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 bg-red-700 text-white py-2.5 rounded-lg font-bold hover:bg-red-800 transition-colors disabled:opacity-60">
                {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : null}
                {step === 3 ? '🎉 Create Account' : <>Next <ArrowRight className="w-4 h-4" /></>}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <Link to="/login" className="text-red-700 font-semibold hover:text-red-800">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-700 block mb-1.5">{label}</label>
      {children}
    </div>
  );
}
