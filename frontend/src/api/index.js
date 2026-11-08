import axios from 'axios';

const API_BASE = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('dhv_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Auth ───────────────────────────────────────────
export const login = (email, password) =>
  api.post('/auth/login', { email, password });

export const register = (data) =>
  api.post('/auth/register', data);

// ─── Users / Profiles ───────────────────────────────
export const getUsers = (params = {}) =>
  api.get('/users', { params });

export const getUserById = (id) =>
  api.get(`/users/${id}`);

export const updateUser = (id, data) =>
  api.patch(`/users/${id}`, data);

export const deleteUser = (id) =>
  api.delete(`/users/${id}`);

// ─── Interests ──────────────────────────────────────
export const getInterests = (params = {}) =>
  api.get('/interests', { params });

export const sendInterest = (data) =>
  api.post('/interests', data);

export const updateInterest = (id, data) =>
  api.patch(`/interests/${id}`, data);

// ─── Shortlists ─────────────────────────────────────
export const getShortlists = (params = {}) =>
  api.get('/shortlists', { params });

export const addShortlist = (data) =>
  api.post('/shortlists', data);

export const removeShortlist = (id) =>
  api.delete(`/shortlists/${id}`);

// ─── Messages ───────────────────────────────────────
export const getConversations = (params = {}) =>
  api.get('/conversations', { params });

export const getMessages = (params = {}) =>
  api.get('/messages', { params });

export const sendMessage = (data) =>
  api.post('/messages', data);

export const createConversation = (data) =>
  api.post('/conversations', data);

export const updateConversation = (id, data) =>
  api.patch(`/conversations/${id}`, data);

// ─── Notifications ──────────────────────────────────
export const getNotifications = (params = {}) =>
  api.get('/notifications', { params });

export const markNotificationRead = (id) =>
  api.patch(`/notifications/${id}`, { isRead: true });

// ─── Profile Views ──────────────────────────────────
export const getProfileViews = (params = {}) =>
  api.get('/profileViews', { params });

export const addProfileView = (data) =>
  api.post('/profileViews', data);

// ─── Plans & Subscriptions ───────────────────────────
export const getPlans = () =>
  api.get('/plans');

export const getSubscriptions = (params = {}) =>
  api.get('/subscriptions', { params });

export const createSubscription = (data) =>
  api.post('/subscriptions', data);

// ─── Testimonials ───────────────────────────────────
export const getTestimonials = () =>
  api.get('/testimonials');

export default api;

