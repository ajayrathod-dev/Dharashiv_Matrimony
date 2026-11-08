import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, MapPin, Briefcase, GraduationCap, Star, CheckCircle, MessageCircle, Phone, Eye, ArrowLeft, Users, Calendar, Ruler, Utensils, Share2 } from 'lucide-react';
import { getUserById, sendInterest, addShortlist, getInterests, addProfileView } from '../api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function ProfileView() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interestStatus, setInterestStatus] = useState(null); // null, 'pending', 'accepted', 'declined'
  const [shortlisted, setShortlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    if (!id) return;
    Promise.all([
      getUserById(id),
      user ? getInterests({ fromUserId: user.id, toUserId: id }) : Promise.resolve({ data: [] }),
    ]).then(([profileRes, interestRes]) => {
      setProfile(profileRes.data);
      if (interestRes.data.length > 0) setInterestStatus(interestRes.data[0].status);
      // Record profile view
      if (user && user.id !== id) {
        addProfileView({ viewerId: user.id, viewedId: id, createdAt: new Date().toISOString() }).catch(() => {});
      }
    }).catch(() => navigate('/matches')).finally(() => setLoading(false));
  }, [id, user]);

  const handleInterest = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      await sendInterest({ fromUserId: user.id, toUserId: id, status: 'pending', message: 'I am interested in your profile.', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
      setInterestStatus('pending');
      toast.success('Interest sent successfully!');
    } catch { toast.error('Could not send interest'); }
  };

  const handleShortlist = async () => {
    if (!user) { navigate('/login'); return; }
    try {
      if (shortlisted) {
        setShortlisted(false);
        toast.success('Removed from shortlist');
      } else {
        await addShortlist({ userId: user.id, shortlistedUserId: id, createdAt: new Date().toISOString() });
        setShortlisted(true);
        toast.success('Added to shortlist!');
      }
    } catch { toast.error('Something went wrong'); }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="w-10 h-10 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!profile) return <div className="text-center py-20"><p>Profile not found</p></div>;

  const isOwn = user?.id === id;
  const age = profile.age || (new Date().getFullYear() - new Date(profile.dob).getFullYear());

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Photo & Quick Info */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card overflow-hidden">
            <div className="relative">
              <img
                src={profile.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&size=400&background=c0392b&color=fff`}
                alt={profile.name}
                className="w-full h-72 object-cover"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                {profile.isPremium && <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-0.5 rounded-full font-semibold">⭐ Premium</span>}
                {profile.isVerified && <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Verified</span>}
              </div>
              {profile.isOnline && <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded-full"><div className="w-2 h-2 bg-green-400 rounded-full"></div> Online</div>}
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h1 className="text-xl font-bold text-gray-800">{profile.name}</h1>
                <span className="text-sm text-gray-400">{profile.profileId}</span>
              </div>
              <p className="text-gray-500 text-sm mb-3">{age} yrs • {profile.height} • {profile.maritalStatus}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <InfoBadge text={profile.religion} />
                <InfoBadge text={profile.caste} />
                <InfoBadge text={profile.motherTongue} />
              </div>
              <div className="text-xs text-gray-400 flex items-center gap-1 mb-4">
                <MapPin className="w-3 h-3" /> {profile.city}, {profile.state}
              </div>

              {/* Actions */}
              {!isOwn && (
                <div className="space-y-2">
                  <button onClick={handleInterest} disabled={!!interestStatus} className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
                    interestStatus === 'pending' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200 cursor-default' :
                    interestStatus === 'accepted' ? 'bg-green-50 text-green-700 border border-green-200 cursor-default' :
                    'bg-red-700 text-white hover:bg-red-800'
                  }`}>
                    <Heart className="w-4 h-4" />
                    {interestStatus === 'pending' ? 'Interest Sent' : interestStatus === 'accepted' ? '✓ Interest Accepted' : 'Send Interest'}
                  </button>
                  <button onClick={handleShortlist} className={`w-full py-2.5 rounded-lg font-semibold text-sm border transition-colors flex items-center justify-center gap-2 ${shortlisted ? 'bg-red-50 text-red-700 border-red-200' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                    <Star className={`w-4 h-4 ${shortlisted ? 'fill-red-500 text-red-500' : ''}`} /> {shortlisted ? 'Shortlisted' : 'Shortlist'}
                  </button>
                  {user?.isPremium ? (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                      <p className="text-xs text-green-700 font-semibold mb-1 flex items-center gap-1"><Phone className="w-3 h-3" /> Contact</p>
                      <p className="text-sm font-bold text-gray-800">+91 {profile.contactInfo?.phone || '***** *****'}</p>
                    </div>
                  ) : (
                    <Link to="/subscription" className="block w-full py-2.5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg font-semibold text-sm text-center hover:opacity-90 transition-opacity">
                      ⭐ View Contact
                    </Link>
                  )}
                  <div className="flex gap-2">
                    <Link to="/inbox" className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                      <MessageCircle className="w-4 h-4" /> Message
                    </Link>
                    <button className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-1">
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>
                </div>
              )}

              {isOwn && (
                <Link to="/edit-profile" className="block w-full py-2.5 bg-red-700 text-white rounded-lg font-semibold text-sm text-center hover:bg-red-800 transition-colors">
                  Edit My Profile
                </Link>
              )}
            </div>
          </div>

          {/* Profile Completeness */}
          <div className="card p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-semibold text-gray-700">Profile Score</span>
              <span className="font-bold text-red-700">{profile.profileCompleteness}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-red-600 rounded-full" style={{ width: `${profile.profileCompleteness}%` }}></div>
            </div>
          </div>
        </div>

        {/* Right: Detailed Info */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tabs */}
          <div className="card">
            <div className="flex border-b border-gray-100 overflow-x-auto">
              {['about', 'education', 'family', 'preferences'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-3.5 text-sm font-semibold capitalize whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'border-red-700 text-red-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  {tab === 'preferences' ? 'Partner Prefs' : tab}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === 'about' && (
                <div className="space-y-5">
                  {profile.aboutMe && (
                    <div>
                      <h3 className="font-bold text-gray-700 mb-2">About Me</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{profile.aboutMe}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-gray-700 mb-3">Basic Details</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <DetailItem label="Age" value={`${age} Years`} />
                      <DetailItem label="Height" value={profile.height} />
                      <DetailItem label="Complexion" value={profile.complexion} />
                      <DetailItem label="Body Type" value={profile.bodyType} />
                      <DetailItem label="Diet" value={profile.diet} />
                      <DetailItem label="Smoking" value={profile.smoking} />
                      <DetailItem label="Drinking" value={profile.drinking} />
                      <DetailItem label="Mother Tongue" value={profile.motherTongue} />
                    </div>
                  </div>
                  {profile.hobbies?.length > 0 && (
                    <div>
                      <h3 className="font-bold text-gray-700 mb-2">Hobbies & Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.hobbies.map(h => <span key={h} className="bg-red-50 text-red-700 text-xs px-3 py-1 rounded-full border border-red-100">{h}</span>)}
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-gray-700 mb-3">Location</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <DetailItem label="Native Place" value={profile.nativePlace} />
                      <DetailItem label="Living In" value={profile.city} />
                      <DetailItem label="State" value={profile.state} />
                      <DetailItem label="Country" value={profile.country} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-bold text-gray-700 mb-3">Education & Career</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <DetailItem label="Education" value={profile.education} />
                      <DetailItem label="College/University" value={profile.educationDetail} />
                      <DetailItem label="Occupation" value={profile.occupation} />
                      <DetailItem label="Employer" value={profile.employer} />
                      <DetailItem label="Annual Income" value={profile.income} />
                      <DetailItem label="Work Location" value={profile.workLocation} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'family' && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-bold text-gray-700 mb-3">Family Details</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <DetailItem label="Father's Name" value={profile.familyDetails?.fatherName} />
                      <DetailItem label="Father's Occupation" value={profile.familyDetails?.fatherOccupation} />
                      <DetailItem label="Mother's Name" value={profile.familyDetails?.motherName} />
                      <DetailItem label="Mother's Occupation" value={profile.familyDetails?.motherOccupation} />
                      <DetailItem label="Siblings" value={profile.familyDetails?.siblings} />
                      <DetailItem label="Family Type" value={profile.familyDetails?.familyType} />
                      <DetailItem label="Family Status" value={profile.familyDetails?.familyStatus} />
                      <DetailItem label="Family Values" value={profile.familyDetails?.familyValues} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && profile.partnerPreferences && (
                <div className="space-y-5">
                  <div>
                    <h3 className="font-bold text-gray-700 mb-3">Partner Preferences</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <DetailItem label="Age" value={`${profile.partnerPreferences.ageMin} – ${profile.partnerPreferences.ageMax} yrs`} />
                      <DetailItem label="Height" value={`${profile.partnerPreferences.heightMin || 'Any'} – ${profile.partnerPreferences.heightMax || 'Any'}`} />
                      <DetailItem label="Religion" value={profile.partnerPreferences.religion?.join(', ')} />
                      <DetailItem label="Caste" value={profile.partnerPreferences.caste?.join(', ')} />
                      <DetailItem label="Marital Status" value={profile.partnerPreferences.maritalStatus?.join(', ')} />
                      <DetailItem label="Education" value={profile.partnerPreferences.education?.join(', ')} />
                      <DetailItem label="Income" value={profile.partnerPreferences.income} />
                      <DetailItem label="State" value={profile.partnerPreferences.state?.join(', ')} />
                      <DetailItem label="Diet" value={profile.partnerPreferences.diet?.join(', ')} />
                      <DetailItem label="Smoking" value={profile.partnerPreferences.smoking} />
                      <DetailItem label="Drinking" value={profile.partnerPreferences.drinking} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  if (!value) return null;
  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
      <p className="text-sm text-gray-800 font-semibold">{value}</p>
    </div>
  );
}

function InfoBadge({ text }) {
  if (!text) return null;
  return <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{text}</span>;
}
