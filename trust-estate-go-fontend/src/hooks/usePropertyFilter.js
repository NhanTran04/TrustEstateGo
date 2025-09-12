// hooks/usePropertyFilter.js
import { useMemo } from 'react';
import { useProperty } from '../contexts/PropertyContext';

export const usePropertyFilter = () => {
    const { properties, searchQuery, selectedCategory } = useProperty();

    const filteredProperties = useMemo(() => {
        return properties.filter(property => {
            const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = !selectedCategory || property.categoryName === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [properties, searchQuery, selectedCategory]);

    return filteredProperties;
};