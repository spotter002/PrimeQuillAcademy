import React, { useState, useEffect } from 'react';
import { Download, Eye, Star, Filter, Search } from 'lucide-react';
import api from '../services/api';

const Samples = () => {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    page: 1
  });
  const [totalPages, setTotalPages] = useState(1);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'web_development', label: 'Web Development' },
    { value: 'mobile_apps', label: 'Mobile Apps' },
    { value: 'design', label: 'Design' },
    { value: 'writing', label: 'Writing' },
    { value: 'programming', label: 'Programming' },
    { value: 'marketing', label: 'Marketing' }
  ];

  useEffect(() => {
    fetchSamples();
  }, [filters]);

  const fetchSamples = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      params.append('page', filters.page);
      params.append('limit', '12');

      const response = await api.get(`/samples?${params}`);
      setSamples(response.data.samples);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching samples:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (sampleId) => {
    try {
      const response = await api.get(`/samples/${sampleId}`);
      // In a real implementation, you'd handle the file download
      console.log('Download sample:', response.data);
    } catch (error) {
      console.error('Error downloading sample:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, page: 1 }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Work Samples & Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore high-quality work samples from our talented freelancers across various categories
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search samples..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value, page: 1 }))}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Samples Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {samples.map(sample => (
              <div key={sample._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {sample.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {sample.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                    {sample.category.replace('_', ' ')}
                  </span>
                  {sample.academicLevel && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {sample.academicLevel}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    {sample.pages && (
                      <span>{sample.pages} pages</span>
                    )}
                    {sample.words && (
                      <span>{sample.words} words</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{sample.rating || 0}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Download className="w-4 h-4" />
                    <span>{sample.downloadCount} downloads</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-1 text-sm text-teal-600 hover:bg-teal-50 rounded">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button
                      onClick={() => handleDownload(sample._id)}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-teal-600 text-white hover:bg-teal-700 rounded"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setFilters(prev => ({ ...prev, page: i + 1 }))}
                  className={`px-3 py-2 rounded ${
                    filters.page === i + 1
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Samples?</h2>
            <p className="text-gray-600">Quality guaranteed work from verified professionals</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">All samples are reviewed and verified for quality</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Download</h3>
              <p className="text-gray-600">Download samples immediately after viewing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Preview Available</h3>
              <p className="text-gray-600">Preview samples before downloading</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Samples;