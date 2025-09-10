// src/services/api.js
const API_BASE_URL = 'http://localhost:8080/api';

// Axios interceptor để handle authentication
import axios from 'axios';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for authentication
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
        return Promise.reject(error.response?.data || error);
    }
);

// Property API calls
export const propertyAPI = {
    // GET /api/properties - Get all properties with pagination
    getProperties: (page = 0, size = 12) => {
        return api.get(`/properties?page=${page}&size=${size}`);
    },

    // GET /api/properties/{propertyId} - Get property by ID
    getPropertyById: (propertyId) => {
        return api.get(`/properties/${propertyId}`);
    },

    // GET /api/properties/users/{userId} - Get properties by user ID
    getPropertiesByUserId: (userId, page = 0, size = 12) => {
        return api.get(`/properties/users/${userId}?page=${page}&size=${size}`);
    },

    // GET /api/properties/search - Search properties
    searchProperties: (params, page = 0, size = 12) => {
        const searchParams = new URLSearchParams({
            page,
            size,
            ...params
        });
        return api.get(`/properties/search?${searchParams}`);
    },

    // POST /api/properties - Create property (with multipart form data)
    createProperty: (propertyData) => {
        const formData = new FormData();

        // Add text fields
        Object.keys(propertyData).forEach(key => {
            if (key !== 'images' && propertyData[key] !== null && propertyData[key] !== undefined) {
                formData.append(key, propertyData[key]);
            }
        });

        // Add image files
        if (propertyData.images) {
            propertyData.images.forEach((image, index) => {
                formData.append(`images`, image);
            });
        }

        return api.post('/properties', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // PUT /api/properties/{propertyId} - Update property
    updateProperty: (propertyId, propertyData) => {
        const formData = new FormData();

        Object.keys(propertyData).forEach(key => {
            if (key !== 'images' && propertyData[key] !== null && propertyData[key] !== undefined) {
                formData.append(key, propertyData[key]);
            }
        });

        if (propertyData.images) {
            propertyData.images.forEach((image) => {
                formData.append(`images`, image);
            });
        }

        return api.put(`/properties/${propertyId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // DELETE /api/properties/{propertyId} - Delete property
    deleteProperty: (propertyId) => {
        return api.delete(`/properties/${propertyId}`);
    }
};

// User API calls
export const userAPI = {
    // GET /api/users/{userId} - Get user by ID
    getUserById: (userId) => {
        return api.get(`/users/${userId}`);
    },

    // POST /api/users - Create user
    createUser: (userData) => {
        const formData = new FormData();

        Object.keys(userData).forEach(key => {
            if (key !== 'avatar' && userData[key] !== null && userData[key] !== undefined) {
                formData.append(key, userData[key]);
            }
        });

        if (userData.avatar) {
            formData.append('avatar', userData.avatar);
        }

        return api.post('/users', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    // PUT /api/users/{userId} - Update user
    updateUser: (userId, userData) => {
        const formData = new FormData();

        Object.keys(userData).forEach(key => {
            if (key !== 'avatar' && userData[key] !== null && userData[key] !== undefined) {
                if (Array.isArray(userData[key])) {
                    userData[key].forEach(item => formData.append(key, item));
                } else {
                    formData.append(key, userData[key]);
                }
            }
        });

        if (userData.avatar) {
            formData.append('avatar', userData.avatar);
        }

        return api.put(`/users/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
};

// Category API calls
export const categoryAPI = {
    // GET /api/categories - Get all categories
    getCategories: () => {
        return api.get('/categories');
    }
};

// Package API calls
export const packageAPI = {
    // GET /api/packages - Get all packages
    getPackages: () => {
        return api.get('/packages');
    },

    // GET /api/packages/{packageId} - Get package by ID
    getPackageById: (packageId) => {
        return api.get(`/packages/${packageId}`);
    }
};

// Property Save API calls
export const propertySaveAPI = {
    // GET /api/property_save/users/{userId} - Get saved properties by user
    getSavedProperties: (userId) => {
        return api.get(`/property_save/users/${userId}`);
    },

    // POST /api/property_save/{propertyId}/users/{userId} - Toggle save property
    toggleSaveProperty: (propertyId, userId) => {
        return api.post(`/property_save/${propertyId}/users/${userId}`);
    }
};

// Review API calls
export const reviewAPI = {
    // GET /api/reviews/users/{buyerId} - Get reviews by buyer ID
    getReviewsByBuyerId: (buyerId, page = 0, size = 10) => {
        return api.get(`/reviews/users/${buyerId}?page=${page}&size=${size}`);
    },

    // GET /api/reviews/{sellerId} - Get reviews by seller ID
    getReviewsBySellerId: (sellerId, page = 0, size = 10) => {
        return api.get(`/reviews/${sellerId}?page=${page}&size=${size}`);
    },

    // POST /api/reviews - Create review
    createReview: (reviewData) => {
        return api.post('/reviews', reviewData);
    }
};

// Report API calls
export const reportAPI = {
    // GET /api/reports/users/{userId} - Get reports by user ID
    getReportsByUserId: (userId, page = 0, size = 10) => {
        return api.get(`/reports/users/${userId}?page=${page}&size=${size}`);
    },

    // POST /api/reports/{propertyId}/users/{userId} - Create report
    createReport: (propertyId, userId, reportData) => {
        return api.post(`/reports/${propertyId}/users/${userId}`, reportData);
    }
};

// Helper functions for error handling
export const handleAPIError = (error) => {
    console.error('API Error:', error);

    if (error.message) {
        return error.message;
    }

    switch (error.code) {
        case 400:
            return 'Dữ liệu không hợp lệ';
        case 401:
            return 'Bạn cần đăng nhập để thực hiện hành động này';
        case 403:
            return 'Bạn không có quyền thực hiện hành động này';
        case 404:
            return 'Không tìm thấy dữ liệu';
        case 500:
            return 'Lỗi server. Vui lòng thử lại sau';
        default:
            return 'Có lỗi xảy ra. Vui lòng thử lại';
    }
};