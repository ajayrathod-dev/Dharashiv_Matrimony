import React, { useEffect, useState } from 'react';
import { Heart, Star, MapPin, Calendar, PlusCircle, Quote } from 'lucide-react';
import { getTestimonials } from '../api';
import toast from 'react-hot-toast';

export default function SuccessStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newStory, setNewStory] = useState({
    husbandName: '',
    wifeName: '',
    marriedDate: '',
    location: '',
    message: '',
    photo: ''
  });

  useEffect(() => {
    getTestimonials()
      .then(res => setStories(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const added = {
      id: String(stories.length + 1),
      husbandName: newStory.husbandName,
      wifeName: newStory.wifeName,
      husbandPhoto: newStory.photo || 'https://randomuser.me/api/portraits/men/15.jpg',
      wifePhoto: newStory.photo || 'https://randomuser.me/api/portraits/women/15.jpg',
      message: newStory.message,
      marriedDate: newStory.marriedDate || 'Recently',
      location: newStory.location || 'Dharashiv'
    };
    setStories([added, ...stories]);
    setShowModal(false);
    toast.success('Your marriage story was submitted! Congratulations! 💍🎉');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold border border-red-100 mb-3">
          <Heart className="w-3.5 h-3.5 fill-red-600" />
          Real Couples, Real Love
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
          Dharashiv Matrimony Success Stories
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mt-2">
          Over 10,000+ happy couples found their life partners through our platform. Read their inspirational journeys below.
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="mt-5 btn-primary inline-flex items-center gap-2 text-sm"
        >
          <PlusCircle className="w-4 h-4" /> Share Your Story
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card animate-pulse h-80 bg-gray-100"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map(story => (
            <div
              key={story.id}
              className="card bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-6"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-3 shrink-0">
                    <img
                      src={story.husbandPhoto}
                      alt={story.husbandName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <img
                      src={story.wifePhoto}
                      alt={story.wifeName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-800 text-base leading-tight truncate">
                      {story.husbandName} & {story.wifeName}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-400" /> {story.location}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-red-400" /> Married {story.marriedDate}
                    </p>
                  </div>
                </div>

                <div className="flex gap-0.5 mb-3 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="w-6 h-6 text-red-100 absolute -top-2 -left-2 -z-0 opacity-60" />
                  <p className="text-sm text-gray-600 leading-relaxed italic relative z-10">
                    "{story.message}"
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-green-700 font-semibold bg-green-50/60 px-3 py-1.5 rounded-lg">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-green-600" /> Verified Match
                </span>
                <span className="text-gray-400 font-normal">Dharashiv Matrimony</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Share story modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="card bg-white max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-xl font-bold text-gray-800 mb-1">Share Your Wedding Story</h3>
            <p className="text-xs text-gray-500 mb-4">Did you meet your spouse on Dharashiv Matrimony? Inspire other members!</p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Groom's Name</label>
                  <input
                    required
                    type="text"
                    value={newStory.husbandName}
                    onChange={e => setNewStory({ ...newStory, husbandName: e.target.value })}
                    className="input-field text-xs py-2"
                    placeholder="e.g. Amit Patil"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Bride's Name</label>
                  <input
                    required
                    type="text"
                    value={newStory.wifeName}
                    onChange={e => setNewStory({ ...newStory, wifeName: e.target.value })}
                    className="input-field text-xs py-2"
                    placeholder="e.g. Pooja Shinde"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Wedding Date / Month</label>
                  <input
                    required
                    type="text"
                    value={newStory.marriedDate}
                    onChange={e => setNewStory({ ...newStory, marriedDate: e.target.value })}
                    className="input-field text-xs py-2"
                    placeholder="e.g. November 2025"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">City / Location</label>
                  <input
                    required
                    type="text"
                    value={newStory.location}
                    onChange={e => setNewStory({ ...newStory, location: e.target.value })}
                    className="input-field text-xs py-2"
                    placeholder="e.g. Dharashiv"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Photo URL (Optional)</label>
                <input
                  type="text"
                  value={newStory.photo}
                  onChange={e => setNewStory({ ...newStory, photo: e.target.value })}
                  className="input-field text-xs py-2"
                  placeholder="https://example.com/couple.jpg"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">Your Story & Message</label>
                <textarea
                  required
                  rows={3}
                  value={newStory.message}
                  onChange={e => setNewStory({ ...newStory, message: e.target.value })}
                  className="input-field text-xs py-2 resize-none"
                  placeholder="Tell us how you connected and your journey together..."
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 text-xs font-semibold text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-semibold text-white bg-red-700 hover:bg-red-800 rounded-lg shadow"
                >
                  Publish Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
