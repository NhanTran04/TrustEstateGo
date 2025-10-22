import { useState, useCallback, useEffect } from "react";
import { api, authApi, endpoints } from "../services/api.js";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const useProperty = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [properties, setProperties] = useState([]);
    const [savedProperties, setSavedProperties] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 0,
        total: 0,
        totalPages: 0,
    });

    const fetchProperties = useCallback(
        async (page = 1, extraFilters = {}, isSearch = false) => {
            setLoading(true);
            setError(null);
            try {
                const params = {
                    page: page,
                    size: pagination.limit || 6,
                    ...filters,
                    ...extraFilters,
                };

                if (isSearch) {
                    Object.keys(extraFilters).forEach(key => {
                        if (extraFilters[key] !== "" && extraFilters[key] !== null && extraFilters[key] !== undefined) {
                            params[key] = extraFilters[key];
                        }
                    });
                }

                const url = isSearch
                    ? `${endpoints.properties}/search`
                    : endpoints.properties;

                const response = await api.get(url, { params });

                if (response.data.result?.content) {
                    setProperties(response.data.result.content);
                    setPagination({
                        page: response.data.result.pageNumber + 1,
                        limit: response.data.result.pageSize,
                        total: response.data.result.totalElements,
                        totalPages: response.data.result.totalPages,
                    });
                } else {
                    setProperties([]);
                }
            } catch (err) {
                const errorMessage =
                    err.response?.data?.message || "Không thể tải danh sách bất động sản";
                setError(errorMessage);
                setProperties([]);
            } finally {
                setLoading(false);
            }
        },
        [filters, pagination.limit]
    );

    const refetchProperties = useCallback(
        (page, extraFilters, isSearch = false) => fetchProperties(page, extraFilters, isSearch),
        [fetchProperties]
    );

    const fetchSavedProperties = useCallback(async () => {
        if (!user) {
            setSavedProperties([]);
            return;
        }
        try {
            const response = await authApi().get(endpoints.propertySave);
            setSavedProperties(response.data.result.map((item) => item.propertyId));
        } catch (err) {
            console.error("Error fetching saved properties:", err);
            setSavedProperties([]);
        }
    }, [user]);

    const handleSaveProperty = useCallback(
        async (propertyId) => {
            if (!user) {
                alert("Vui lòng đăng nhập để lưu bất động sản");
                navigate("/login");
                return;
            }
            try {
                await authApi().post(`${endpoints.properties}/${propertyId}`);
                if (savedProperties.includes(propertyId)) {
                    setSavedProperties((prev) => prev.filter((id) => id !== propertyId));
                } else {
                    setSavedProperties((prev) => [...prev, propertyId]);
                }
            } catch (err) {
                console.error("Error saving property:", err);
                if (err.response?.status === 401) {
                    alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
                    navigate("/login");
                } else {
                    alert("Có lỗi xảy ra khi lưu bất động sản");
                }
            }
        },
        [savedProperties, user, navigate]
    );

    useEffect(() => {
        if (user) {
            fetchSavedProperties();
        }
    }, [fetchSavedProperties, user]);

    return {
        properties,
        savedProperties,
        searchQuery,
        loading,
        error,
        pagination,
        categories,
        setProperties,
        setSavedProperties,
        setSearchQuery,
        setFilters,
        setCategories,
        handleSaveProperty,
        refetchProperties,
        searchProperties: (page, extraFilters) => fetchProperties(page, extraFilters, true),
        setPagination,
    };
};
