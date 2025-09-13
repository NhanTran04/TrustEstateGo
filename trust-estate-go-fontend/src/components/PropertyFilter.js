import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { useProperty } from '../contexts/PropertyContext';

const PropertyFilter = ({ searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedPropertyType,
    setSelectedPropertyType,
    onFilterChange }) => {
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [filters, setFilters] = useState({
        priceRange: '',
        areaRange: '',
        bedrooms: '',
        bathrooms: '',
        direction: '',
        constructionYear: ''
    });

    const { refetchProperties } = useProperty();

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    const applyFilters = async () => {
        // Gọi API với các filters
        try {
            await refetchProperties(); // Giả sử context đã xử lý filters
        } catch (err) {
            console.error('Error applying filters:', err);
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

                <div className="row g-3">
                    <div className="col-md-4">
                        <div className="input-group">
                            <span className="input-group-text bg-light border-0">
                                <Search size={16} className="text-primary" />
                            </span>
                            <input
                                type="text"
                                className="form-control border-0 bg-light"
                                placeholder="Tìm theo tên hoặc địa điểm..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* <div className="col-md-2">
                        <select
                            className="form-select border-0 bg-light"
                            value={selectedPropertyType}
                            onChange={(e) => setSelectedPropertyType(e.target.value)}
                        >
                            <option value="">Tất cả loại hình</option>
                            <option value="Chung cư">🏢 Chung cư</option>
                            <option value="Nhà phố">🏠 Nhà phố</option>
                            <option value="Phòng trọ">🏡 Phòng trọ</option>
                            <option value="Biệt thự">🏰 Biệt thự</option>
                        </select>
                    </div> */}

                    <div className="col-md-2">
                        <select className="form-select border-0 bg-light">
                            <option value="">💰 Khoảng giá</option>
                            <option value="0-5">Dưới 5 triệu</option>
                            <option value="5-10">5-10 triệu</option>
                            <option value="10-20">10-20 triệu</option>
                            <option value="20-50">20-50 triệu</option>
                            <option value="50+">Trên 50 triệu</option>
                        </select>
                    </div>

                    <div className="col-md-2">
                        <select className="form-select border-0 bg-light">
                            <option value="">📐 Diện tích</option>
                            <option value="0-30">Dưới 30m²</option>
                            <option value="30-50">30-50m²</option>
                            <option value="50-80">50-80m²</option>
                            <option value="80-100">80-100m²</option>
                            <option value="100+">Trên 100m²</option>
                        </select>
                    </div>

                    <div className="col-md-2">
                        <button className="btn btn-primary w-100 rounded-pill">
                            <Search size={16} className="me-2" />
                            Tìm kiếm
                        </button>
                    </div>
                </div>

                {showAdvanced && (
                    <div className="row g-3 mt-3 pt-3 border-top">
                        <div className="col-md-3">
                            <select className="form-select border-0 bg-light">
                                <option value="">🛏️ Phòng ngủ</option>
                                <option value="1">1 phòng</option>
                                <option value="2">2 phòng</option>
                                <option value="3">3 phòng</option>
                                <option value="4+">4+ phòng</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <select className="form-select border-0 bg-light">
                                <option value="">🚿 Phòng tắm</option>
                                <option value="1">1 phòng tắm</option>
                                <option value="2">2 phòng tắm</option>
                                <option value="3+">3+ phòng tắm</option>
                            </select>
                        </div>

                        <div className="col-md-3">
                            <select className="form-select border-0 bg-light">
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
                            <select className="form-select border-0 bg-light">
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