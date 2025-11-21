import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Tag, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    page: 1
  });
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [popularTags, setPopularTags] = useState([]);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'programming', label: 'Programming' },
    { value: 'web_development', label: 'Web Development' },
    { value: 'mobile_apps', label: 'Mobile Apps' },
    { value: 'design', label: 'Design' },
    { value: 'writing', label: 'Writing' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'tutorials', label: 'Tutorials' },
    { value: 'tips', label: 'Tips & Tricks' }
  ];

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchPopularTags();
  }, [filters]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      params.append('page', filters.page);
      params.append('limit', '9');

      const response = await api.get(`/blog?${params}`);
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/blog/meta/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPopularTags = async () => {
    try {
      const response = await api.get('/blog/meta/tags');
      setPopularTags(response.data.slice(0, 10));
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, page: 1 }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Knowledge Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, tutorials, and tips for freelancers and clients
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <form onSubmit={handleSearch} className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </form>

                <div className="flex items-center gap-2">
                  <Filter className="text-gray-400 w-5 h-5" />
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value, page: 1 }))}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {categoryOptions.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Blog Posts */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded mb-4"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                  <article key={post._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                    {post.featuredImage && (
                      <div className="h-48 bg-gray-200 overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                          {post.category.replace('_', ' ')}
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {post.readTime} min read
                        </div>
                      </div>
                      
                      <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="hover:text-teal-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{post.author?.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {post.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
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
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.name}
                    onClick={() => setFilters(prev => ({ ...prev, category: category.name, page: 1 }))}
                    className="flex items-center justify-between w-full text-left p-2 rounded hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-700 capitalize">
                      {category.name.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <button
                    key={tag.name}
                    onClick={() => setFilters(prev => ({ ...prev, search: tag.name, page: 1 }))}
                    className="inline-flex items-center gap-1 bg-gray-100 hover:bg-teal-100 text-gray-700 hover:text-teal-700 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    <Tag className="w-3 h-3" />
                    {tag.name}
                    <span className="text-xs text-gray-500">({tag.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get the latest articles and tips delivered to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;