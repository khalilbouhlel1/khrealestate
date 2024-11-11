import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear user data and redirect to login
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  updateProfile: async (formData) => {
    const response = await api.put('/user/update-profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const propertyAPI = {
  getUserProperties: async () => {
    const response = await api.get('/property/user');
    return response.data;
  },

  getAllProperties: async (filters = {}) => {
    try {
      const queryString = new URLSearchParams(filters).toString();
      const response = await api.get(`/property/all?${queryString}`);
      return response.data;
    } catch (error) {
      console.error('Get properties error:', error.response?.data || error.message);
      throw error;
    }
  },

  getPropertyById: async (id) => {
    const response = await api.get(`/property/${id}`);
    return response.data;
  },

  createProperty: async (formData) => {
    try {
      const response = await api.post('/user/add-property', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return response.data;
    } catch (error) {
      console.error('Property creation error:', error.response?.data || error.message);
      throw error;
    }
  },

  updateProperty: async (id, formData) => {
    const response = await api.put(`/property/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  deleteProperty: async (id) => {
    const response = await api.delete(`/property/${id}`);
    return response.data;
  },

  getWishlist: async () => {
    const response = await api.get('/property/wishlist');
    return response.data;
  },

  toggleWishlist: async (propertyId) => {
    const response = await api.post(`/property/${propertyId}/wishlist`);
    return response.data;
  },

  showInterest: async (propertyId) => {
    const response = await api.post(`/property/${propertyId}/interest`);
    return response.data;
  }
};

export default api;
