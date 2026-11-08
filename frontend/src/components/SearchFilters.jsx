import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

const AGE_OPTIONS = Array.from({ length: 33 }, (_, i) => i + 18);
const HEIGHT_OPTIONS = ["4'8\"","4'9\"","4'10\"","4'11\"","5'0\"","5'1\"","5'2\"","5'3\"","5'4\"","5'5\"","5'6\"","5'7\"","5'8\"","5'9\"","5'10\"","5'11\"","6'0\"","6'1\"","6'2\"","6'3\"","6'4\""];

export default function SearchFilters({ onSearch, initialFilters = {} }) {
  const [filters, setFilters] = useState({
    gender: initialFilters.gender || 'Female',
    ageMin: initialFilters.ageMin || 18,
    ageMax: initialFilters.ageMax || 40,
    religion: initialFilters.religion || '',
    caste: initialFilters.caste || '',
    maritalStatus: initialFilters.maritalStatus || '',
    education: initialFilters.education || '',
    occupation: initialFilters.occupation || '',
    city: initialFilters.city || '',
    state: initialFilters.state || '',
    income: initialFilters.income || '',
    diet: initialFilters.diet || '',
  });
  const [advanced, setAdvanced] = useState(false);

  const update = (key, val) => setFilters(prev => ({ ...prev, [key]: val }));

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  const handleReset = () => {
    const defaults = { gender: 'Female', ageMin: 18, ageMax: 40, religion: '', caste: '', maritalStatus: '', education: '', occupation: '', city: '', state: '', income: '', diet: '' };
    setFilters(defaults);
    onSearch(defaults);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-red-700" />
        <h3 className="font-bold text-gray-800">Search Filters</h3>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        {/* Gender */}
        <FilterGroup label="Looking for">
          <div className="flex gap-2">
            {['Male', 'Female'].map(g => (
              <button key={g} type="button"
                onClick={() => update('gender', g)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
                  filters.gender === g ? 'bg-red-700 text-white border-red-700' : 'border-gray-300 text-gray-600 hover:border-red-300'
                }`}>{g}</button>
            ))}
          </div>
        </FilterGroup>

        {/* Age Range */}
        <FilterGroup label={`Age: ${filters.ageMin} – ${filters.ageMax} yrs`}>
          <div className="flex gap-2">
            <select value={filters.ageMin} onChange={e => update('ageMin', +e.target.value)} className="flex-1 input-field text-xs py-2">
              {AGE_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <span className="self-center text-gray-400">to</span>
            <select value={filters.ageMax} onChange={e => update('ageMax', +e.target.value)} className="flex-1 input-field text-xs py-2">
              {AGE_OPTIONS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </FilterGroup>

        {/* Religion */}
        <FilterGroup label="Religion">
          <select value={filters.religion} onChange={e => update('religion', e.target.value)} className="input-field text-sm py-2">
            <option value="">Any</option>
            {['Hindu', 'Muslim', 'Christian', 'Jain', 'Buddhist', 'Sikh'].map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </FilterGroup>

        {/* Marital Status */}
        <FilterGroup label="Marital Status">
          <select value={filters.maritalStatus} onChange={e => update('maritalStatus', e.target.value)} className="input-field text-sm py-2">
            <option value="">Any</option>
            {['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </FilterGroup>

        {/* Advanced toggle */}
        <button type="button" onClick={() => setAdvanced(!advanced)} className="flex items-center gap-1 text-sm text-red-700 font-medium">
          {advanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {advanced ? 'Hide' : 'More'} Filters
        </button>

        {advanced && (
          <div className="space-y-4 border-t pt-4">
            <FilterGroup label="Education">
              <select value={filters.education} onChange={e => update('education', e.target.value)} className="input-field text-sm py-2">
                <option value="">Any</option>
                {['SSC/HSC', 'Diploma', 'B.A.', 'B.Com', 'B.Sc.', 'B.E./B.Tech.', 'MBBS', 'B.Ed.', 'M.A.', 'M.Com.', 'M.Sc.', 'M.E./M.Tech.', 'MBA', 'MCA', 'PhD'].map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </FilterGroup>

            <FilterGroup label="State">
              <select value={filters.state} onChange={e => update('state', e.target.value)} className="input-field text-sm py-2">
                <option value="">Any State</option>
                {['Maharashtra', 'Karnataka', 'Goa', 'Gujarat', 'Telangana', 'Andhra Pradesh', 'Delhi', 'Punjab', 'Other'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </FilterGroup>

            <FilterGroup label="City">
              <input type="text" value={filters.city} onChange={e => update('city', e.target.value)} placeholder="Enter city..." className="input-field text-sm py-2" />
            </FilterGroup>

            <FilterGroup label="Annual Income">
              <select value={filters.income} onChange={e => update('income', e.target.value)} className="input-field text-sm py-2">
                <option value="">Any</option>
                {['Below 2 Lakhs', '2-4 Lakhs', '4-6 Lakhs', '6-8 Lakhs', '8-10 Lakhs', '10-15 Lakhs', '15-20 Lakhs', '20-30 Lakhs', '30+ Lakhs'].map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </FilterGroup>

            <FilterGroup label="Diet">
              <select value={filters.diet} onChange={e => update('diet', e.target.value)} className="input-field text-sm py-2">
                <option value="">Any</option>
                {['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Jain Vegetarian'].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </FilterGroup>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button type="submit" className="flex-1 bg-red-700 text-white py-2.5 rounded-lg font-semibold hover:bg-red-800 transition-colors">
            Search
          </button>
          <button type="button" onClick={handleReset} className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-500">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

function FilterGroup({ label, children }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
