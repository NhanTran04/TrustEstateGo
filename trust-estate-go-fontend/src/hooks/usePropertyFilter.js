import { useMemo } from 'react';
import { useProperty } from '../contexts/PropertyContext';

export const usePropertyFilter = () => {
    const { properties, searchQuery, selectedCategory } = useProperty();

    const filteredProperties = useMemo(() => {
        return properties.filter(property => {
            const matchesSearch = property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                property.description?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = !selectedCategory ||
                property.categoryName === selectedCategory ||
                property.category?.name === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [properties, searchQuery, selectedCategory]);

    return filteredProperties;
};