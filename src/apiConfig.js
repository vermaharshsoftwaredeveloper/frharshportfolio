// src/apiConfig.js
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
export const API_BASE_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5001';
