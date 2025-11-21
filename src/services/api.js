import axios from 'axios';

// Set base URL for axios
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'https://primequillacademy.onrender.com';

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
  getUserSettings: () => axios.get('/settings/user'),
  updateUserSettings: (section, data) => axios.put('/settings/user', { section, data }),
  getPlatformSettings: () => axios.get('/settings/platform'),
  updatePlatformSettings: (section, data) => axios.put('/settings/platform', { section, data })
};

// Samples API
export const samplesAPI = {
  getAll: (params) => axios.get('/samples', { params }),
  getById: (id) => axios.get(`/samples/${id}`),
  create: (data) => axios.post('/samples', data),
  update: (id, data) => axios.put(`/samples/${id}`, data),
  delete: (id) => axios.delete(`/samples/${id}`)
};

// Bids API
export const bidsAPI = {
  getForJob: (jobId) => axios.get(`/bids/job/${jobId}`),
  getMy: (params) => axios.get('/bids/my-bids', { params }),
  create: (data) => axios.post('/bids', data),
  update: (id, data) => axios.put(`/bids/${id}`, data),
  accept: (id) => axios.put(`/bids/${id}/accept`),
  withdraw: (id) => axios.put(`/bids/${id}/withdraw`)
};

// Tools API
export const toolsAPI = {
  getAll: (params) => axios.get('/tools', { params }),
  getBySlug: (slug) => axios.get(`/tools/${slug}`),
  wordCounter: (data) => axios.post('/tools/word-counter', data),
  wordsToPages: (data) => axios.post('/tools/words-to-pages', data),
  thesisGenerator: (data) => axios.post('/tools/thesis-generator', data),
  readingTime: (data) => axios.post('/tools/reading-time', data),
  priceCalculator: (data) => axios.post('/tools/price-calculator', data)
};

// Blog API
export const blogAPI = {
  getAll: (params) => axios.get('/blog', { params }),
  getBySlug: (slug) => axios.get(`/blog/${slug}`),
  getRelated: (slug) => axios.get(`/blog/${slug}/related`),
  getCategories: () => axios.get('/blog/meta/categories'),
  getTags: () => axios.get('/blog/meta/tags'),
  create: (data) => axios.post('/blog', data),
  update: (id, data) => axios.put(`/blog/${id}`, data),
  delete: (id) => axios.delete(`/blog/${id}`)
};

// Default API object with all endpoints
const api = {
  get: (url, config) => axios.get(url, config),
  post: (url, data, config) => axios.post(url, data, config),
  put: (url, data, config) => axios.put(url, data, config),
  delete: (url, config) => axios.delete(url, config),
  
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