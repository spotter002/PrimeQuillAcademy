import axios from 'axios';

// Set base URL for axios
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Add auth token to requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Job API
export const jobAPI = {
  create: (jobData) => axios.post('/jobs', jobData),
  confirm: (jobId, useRefinement) => axios.put(`/jobs/${jobId}/confirm`, { useRefinement }),
  getAll: () => axios.get('/jobs'),
  getById: (id) => axios.get(`/jobs/${id}`),
  update: (id, data) => axios.put(`/jobs/${id}`, data),
  delete: (id) => axios.delete(`/jobs/${id}`)
};

// Application API
export const applicationAPI = {
  apply: (jobId, applicationData) => axios.post(`/applications/${jobId}/apply`, applicationData),
  getForJob: (jobId) => axios.get(`/applications/${jobId}/applications`),
  getMy: () => axios.get('/applications/my-applications'),
  updateStatus: (id, status) => axios.put(`/applications/${id}/status`, { status })
};

// Invoice API
export const invoiceAPI = {
  getById: (id) => axios.get(`/invoices/${id}`),
  getPDF: (id) => axios.get(`/invoices/${id}/pdf`),
  pay: (id) => axios.post(`/invoices/${id}/pay`),
  getAll: () => axios.get('/invoices')
};

// Message API
export const messageAPI = {
  send: (messageData) => axios.post('/messages', messageData),
  getForJob: (jobId) => axios.get(`/messages?jobId=${jobId}`),
  markRead: (id) => axios.put(`/messages/${id}/read`)
};

// Admin API
export const adminAPI = {
  getUsers: () => axios.get('/admin/users'),
  getJobs: () => axios.get('/admin/jobs'),
  getAnalytics: () => axios.get('/admin/analytics'),
  updateUserRole: (id, role) => axios.put(`/admin/users/${id}/role`, { role }),
  deleteUser: (id) => axios.delete(`/admin/users/${id}`)
};

// AI API
export const aiAPI = {
  refine: (ideaText, files, metadata) => axios.post('/ai/refine', { ideaText, files, metadata })
};

// Settings API
export const settingsAPI = {
  getUserSettings: () => axios.get('/api/settings/user'),
  updateUserSettings: (section, data) => axios.put('/api/settings/user', { section, data }),
  getPlatformSettings: () => axios.get('/api/settings/platform'),
  updatePlatformSettings: (section, data) => axios.put('/api/settings/platform', { section, data })
};

// Samples API
export const samplesAPI = {
  getAll: (params) => axios.get('/api/samples', { params }),
  getById: (id) => axios.get(`/api/samples/${id}`),
  create: (data) => axios.post('/api/samples', data),
  update: (id, data) => axios.put(`/api/samples/${id}`, data),
  delete: (id) => axios.delete(`/api/samples/${id}`)
};

// Bids API
export const bidsAPI = {
  getForJob: (jobId) => axios.get(`/api/bids/job/${jobId}`),
  getMy: (params) => axios.get('/api/bids/my-bids', { params }),
  create: (data) => axios.post('/api/bids', data),
  update: (id, data) => axios.put(`/api/bids/${id}`, data),
  accept: (id) => axios.put(`/api/bids/${id}/accept`),
  withdraw: (id) => axios.put(`/api/bids/${id}/withdraw`)
};

// Tools API
export const toolsAPI = {
  getAll: (params) => axios.get('/api/tools', { params }),
  getBySlug: (slug) => axios.get(`/api/tools/${slug}`),
  wordCounter: (data) => axios.post('/api/tools/word-counter', data),
  wordsToPages: (data) => axios.post('/api/tools/words-to-pages', data),
  thesisGenerator: (data) => axios.post('/api/tools/thesis-generator', data),
  readingTime: (data) => axios.post('/api/tools/reading-time', data),
  priceCalculator: (data) => axios.post('/api/tools/price-calculator', data)
};

// Blog API
export const blogAPI = {
  getAll: (params) => axios.get('/api/blog', { params }),
  getBySlug: (slug) => axios.get(`/api/blog/${slug}`),
  getRelated: (slug) => axios.get(`/api/blog/${slug}/related`),
  getCategories: () => axios.get('/api/blog/meta/categories'),
  getTags: () => axios.get('/api/blog/meta/tags'),
  create: (data) => axios.post('/api/blog', data),
  update: (id, data) => axios.put(`/api/blog/${id}`, data),
  delete: (id) => axios.delete(`/api/blog/${id}`)
};

// Default API object with all endpoints
const api = {
  get: (url, config) => axios.get(`/api${url}`, config),
  post: (url, data, config) => axios.post(`/api${url}`, data, config),
  put: (url, data, config) => axios.put(`/api${url}`, data, config),
  delete: (url, config) => axios.delete(`/api${url}`, config),
  
  // Include all specific APIs
  jobs: jobAPI,
  applications: applicationAPI,
  invoices: invoiceAPI,
  messages: messageAPI,
  admin: adminAPI,
  ai: aiAPI,
  settings: settingsAPI,
  samples: samplesAPI,
  bids: bidsAPI,
  tools: toolsAPI,
  blog: blogAPI
};

export default api;