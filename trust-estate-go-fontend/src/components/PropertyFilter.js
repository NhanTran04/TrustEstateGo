import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { useProperty } from '../contexts/PropertyContext';
import { useNavigate } from 'react-router-dom';

const PropertyFilter = ({ searchQuery, setSearchQuery }) => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        location: '',
    });

    const navigate = useNavigate();

    const { searchProperties } = useProperty();

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    const applyFilters = async () => {
        try {
            await searchProperties(1, {
                keyword: searchQuery,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice,
                location: filters.location,
            });

            // Cập nhật query trên URL
            const params = new URLSearchParams();
            if (searchQuery) params.set("keyword", searchQuery);
            if (filters.minPrice) params.set("minPrice", filters.minPrice);
            if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
            if (filters.location) params.set("location", filters.location);

            navigate(`/properties?${params.toString()}`);
        } catch (err) {
            console.error("Error applying filters:", err);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            applyFilters();
        }
    };

    return (
        <div className="card border-0 shadow-lg rounded-4 mb-5">
            <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="fw-bold mb-0 d-flex align-items-center">
                        <Filter className="text-primary me-2" size={20} />
                        Tìm kiếm bất động sản
                    </h5>
                    <button
                        className="btn btn-outline-primary btn-sm rounded-pill"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                    >
                        {showAdvanced ? 'Thu gọn' : 'Nâng cao'}
                    </button>
                </div>

                {/* Hàng đầu tiên: Tiêu đề, Giá, Địa chỉ, nút tìm kiếm */}
                <div className="row g-3">
                    {/* Title */}
                    <div className="col-md-3">
                        <div className="input-group">
                            <span className="input-group-text bg-light border-0">
                                <Search size={16} className="text-primary" />
                            </span>
                            <input
                                type="text"
                                className="form-control border-0 bg-light"
                                placeholder="Tiêu đề..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>

                    {/* Price */}
                    <div className="col-md-4 d-flex gap-2">
                        <div className="input-group">
                            <span className="input-group-text bg-light border-0">💰</span>
                            <input
                                type="number"
                                className="form-control border-0 bg-light"
                                placeholder="Giá từ"
                                value={filters.minPrice}
                                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-0">💰</span>
                            <input
                                type="number"
                                className="form-control border-0 bg-light"
                                placeholder="Đến"
                                value={filters.maxPrice}
                                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="col-md-3">
                        <div className="input-group">
                            <span className="input-group-text bg-light border-0">📍</span>
                            <input
                                type="text"
                                className="form-control border-0 bg-light"
                                placeholder="Địa chỉ"
                                value={filters.location}
                                onChange={(e) => handleFilterChange('location', e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>

                    {/* Button search */}
                    <div className="col-md-2">
                        <button
                            className="btn btn-primary w-100 rounded-pill d-flex align-items-center justify-content-center"
                            onClick={applyFilters}
                        >
                            <Search size={18} className="me-2" />
                            Tìm kiếm
                        </button>
                    </div>
                </div>

                {/* Advanced filters */}
                {showAdvanced && (
                    <div className="row g-3 mt-3 pt-3 border-top">
                        <div className="col-md-3">
                            <select
                                className="form-select border-0 bg-light"
                            // value={filters.bedrooms}
                            // onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                            >
                                <option value="">🛏️ Phòng ngủ</option>
                                <option value="1">1 phòng</option>
                                <option value="2">2 phòng</option>
                                <option value="3">3 phòng</option>
                                <option value="4+">4+ phòng</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <select
                                className="form-select border-0 bg-light"
                            // value={filters.bathrooms}
                            // onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                            >
                                <option value="">🚿 Phòng tắm</option>
                                <option value="1">1 phòng</option>
                                <option value="2">2 phòng</option>
                                <option value="3+">3+ phòng</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <select
                                className="form-select border-0 bg-light"
                            // value={filters.direction}
                            // onChange={(e) => handleFilterChange('direction', e.target.value)}
                            >
                                <option value="">🧭 Hướng nhà</option>
                                <option value="dong">Đông</option>
                                <option value="tay">Tây</option>
                                <option value="nam">Nam</option>
                                <option value="bac">Bắc</option>
                                <option value="dong-nam">Đông Nam</option>
                                <option value="tay-nam">Tây Nam</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <select
                                className="form-select border-0 bg-light"
                            // value={filters.constructionYear}
                            // onChange={(e) => handleFilterChange('constructionYear', e.target.value)}
                            >
                                <option value="">🏗️ Năm xây dựng</option>
                                <option value="2020+">Sau 2020</option>
                                <option value="2015-2020">2015-2020</option>
                                <option value="2010-2015">2010-2015</option>
                                <option value="-2010">Trước 2010</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PropertyFilter;
