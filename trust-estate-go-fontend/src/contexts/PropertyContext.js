import React, { createContext, useContext, useState, useCallback } from 'react';

const PropertyContext = createContext();

export const useProperty = () => {
    const context = useContext(PropertyContext);
    if (!context) {
        throw new Error('useProperty must be used within PropertyProvider');
    }
    return context;
};

export const PropertyProvider = ({ children }) => {
    const [properties, setProperties] = useState([]);
    const [savedProperties, setSavedProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSaveProperty = useCallback((propertyId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
            // Bạn có thể sử dụng navigate ở đây nếu cần
            alert('Vui lòng đăng nhập để lưu bất động sản');
            return;
        }

        setSavedProperties(prev =>
            prev.includes(propertyId)
                ? prev.filter(id => id !== propertyId)
                : [...prev, propertyId]
        );
    }, []);

    const value = {
        properties,
        savedProperties,
        searchQuery,
        selectedCategory,
        setProperties,
        setSavedProperties,
        setSearchQuery,
        setSelectedCategory,
        handleSaveProperty
    };

    return (
        <PropertyContext.Provider value={value}>
            {children}
        </PropertyContext.Provider>
    );
};