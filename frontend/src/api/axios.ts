import axios from 'axios';

// لیست مسیرهایی که نیازی به توکن ندارند
const publicPaths = [
  '/auth/login', 
  '/auth/register', 
  '/auth/forgot-password', 
  '/auth/reset-password', 
  '/auth/verify-email'
];

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // اگر مسیر عمومی است، توکن را اضافه نکن
    const isPublic = publicPaths.some(path => config.url?.includes(path));
    if (isPublic) {
      console.log('🔓 Public path:', config.url);
      return config;
    }

    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token added for:', config.url);
    } else {
      console.log('⚠️ No token for:', config.url);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - نسخه نهایی
api.interceptors.response.use(
  (response) => {
    console.log('✅ Response success:', response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // اگر خطا 401 نباشد یا قبلاً تلاش شده باشد
    if (error.response?.status !== 401 || originalRequest._retry) {
      console.log('❌ Error not 401 or already retried:', error.response?.status);
      return Promise.reject(error);
    }

    // جلوگیری از حلقه بی‌نهایت برای refresh-token
    if (originalRequest.url?.includes('/auth/refresh-token')) {
      console.log('🔄 Refresh token failed, redirecting to login');
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // اگر مسیر عمومی است، خطا را مستقیم برگردان
    const isPublic = publicPaths.some(path => originalRequest.url?.includes(path));
    if (isPublic) {
      console.log('🔓 Public path error:', originalRequest.url);
      return Promise.reject(error);
    }

    console.log('🔄 Attempting to refresh token...');
    originalRequest._retry = true;

    try {
      const response = await api.post('/auth/refresh-token');
      const { accessToken } = response.data;
      
      if (accessToken) {
        console.log('✅ New access token received');
        localStorage.setItem('accessToken', accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } else {
        console.log('❌ No access token in response');
        throw new Error('No access token received');
      }
    } catch (refreshError) {
      console.log('❌ Refresh token failed:', refreshError);
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }
);

export default api;