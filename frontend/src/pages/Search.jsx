import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { getUsers } from '../api';
import SearchFilters from '../components/SearchFilters';
import ProfileCard from '../components/ProfileCard';

export default function Search() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (filters) => {
    setLoading(true);
    setSearched(true);
    try {
      const params = { gender: filters.gender };
      if (filters.religion) params.religion = filters.religion;
      if (filters.maritalStatus) params.maritalStatus = filters.maritalStatus;
      if (filters.state) params.state = filters.state;
      if (filters.city) params.city = filters.city;
      
      const res = await getUsers(params);
      let filtered = res.data.filter(u => u.age >= filters.ageMin && u.age <= filters.ageMax);
      if (filters.diet) filtered = filtered.filter(u => u.diet === filters.diet);
      setResults(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <SearchIcon className="w-6 h-6 text-red-700" /> Search Profiles
        </h1>
        <p className="text-gray-500 text-sm mt-1">Find your perfect match using our advanced search</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <SearchFilters onSearch={handleSearch} />
        </div>

        <div className="lg:col-span-3">
          {!searched ? (
            <div className="flex flex-col items-center justify-center h-80 text-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <SearchIcon className="w-10 h-10 text-red-300" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Start Your Search</h3>
              <p className="text-gray-400 text-sm mt-1 max-w-xs">Use the filters on the left to find your perfect match</p>
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => <div key={i} className="card animate-pulse"><div className="h-52 bg-gray-200"></div><div className="p-4 space-y-2"><div className="h-4 bg-gray-200 rounded w-3/4"></div><div className="h-3 bg-gray-200 rounded w-1/2"></div></div></div>)}
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No profiles match your search criteria.</p>
              <p className="text-gray-400 text-sm mt-1">Try broadening your filters.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">{results.length} profile{results.length !== 1 ? 's' : ''} found</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {results.map(p => <ProfileCard key={p.id} profile={p} />)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
