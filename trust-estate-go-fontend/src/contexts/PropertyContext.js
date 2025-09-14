import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { api, authApi, endpoints } from '../services/api';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const PropertyContext = createContext();

export const useProperty = () => {
    const context = useContext(PropertyContext);
    if (!context) {
        throw new Error('useProperty must be used within PropertyProvider');
    }
    return context;
};

export const PropertyProvider = ({ children }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [savedProperties, setSavedProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 0
    });

    // Fetch properties từ API
    const fetchProperties = useCallback(async (page = 1, extraFilters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                page: page - 1, // Spring Data JPA page bắt đầu từ 0
                size: pagination.limit,// Spring Data JPA dùng 'size' thay vì 'limit'
                search: searchQuery || undefined,
                categoryId: selectedCategory || undefined,
                ...filters,
                ...extraFilters
            };

            const response = await api.get(endpoints.properties, { params });

            if (response.data.result?.content) {
                setProperties(response.data.result.content);
                setPagination({
                    page: response.data.result.pageNumber + 1,
                    limit: response.data.result.pageSize,
                    total: response.data.result.totalElements,
                    totalPages: response.data.result.totalPages
                });
            } else {
                setProperties([]);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Không thể tải danh sách bất động sản';
            setError(errorMessage);
            console.error('Error fetching properties:', err);
            setProperties([]);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, selectedCategory, filters, pagination.limit]);

    // Fetch saved properties từ API
    const fetchSavedProperties = useCallback(async () => {
        if (!user) {
            setSavedProperties([]);
            return;
        }

        try {
            const response = await authApi().get(endpoints.propertySave);
            setSavedProperties(response.data.map(item => item.propertyId));
        } catch (err) {
            console.error('Error fetching saved properties:', err);
            setSavedProperties([]);
        }
    }, [user]);

    // Xử lý save property với API
    const handleSaveProperty = useCallback(async (propertyId) => {
        if (!user) {
            alert('Vui lòng đăng nhập để lưu bất động sản');
            navigate('/login');
            return;
        }

        try {
            if (savedProperties.includes(propertyId)) {
                await authApi().delete(`${endpoints.propertySave}/${propertyId}`);
                setSavedProperties(prev => prev.filter(id => id !== propertyId));
            } else {
                await authApi().post(endpoints.propertySave, { propertyId });
                setSavedProperties(prev => [...prev, propertyId]);
            }
        } catch (err) {
            console.error('Error saving property:', err);
            if (err.response?.status === 401) {
                alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
                navigate('/login');
            } else {
                alert('Có lỗi xảy ra khi lưu bất động sản');
            }
        }
    }, [savedProperties, user, navigate]);

    useEffect(() => {
        fetchProperties();
        if (user) {
            fetchSavedProperties();
        }
    }, [fetchProperties, fetchSavedProperties, user]);

    // QUAN TRỌNG: THÊM PAGINATION VÀO VALUE OBJECT
    const value = {
        properties,
        savedProperties,
        searchQuery,
        selectedCategory,
        loading,
        error,
        pagination,
        setProperties,
        setSavedProperties,
        setSearchQuery,
        setSelectedCategory,
        handleSaveProperty,
        refetchProperties: fetchProperties,
        setPagination // THÊM SETTER CHO PAGINATION (nếu cần)
    };

    return (
        <PropertyContext.Provider value={value}>
            {children}
        </PropertyContext.Provider>
    );
};