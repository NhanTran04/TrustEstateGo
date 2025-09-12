import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Menu, Building, X, Search } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import PropertyFilter from '../components/PropertyFilter';
import { useProperty } from '../contexts/PropertyContext';

const Properties = () => {
    const navigate = useNavigate();
    const {
        properties,
        searchQuery,
        selectedCategory,
        handleSaveProperty,
        savedProperties,
        setSearchQuery,
        setSelectedCategory
    } = useProperty();

    return (
        <div style={{ paddingTop: '100px' }}>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold text-dark mb-3">Nhà đất bán</h2>
                    <p className="text-muted">Khám phá các BDS bán chất lượng cao từ chủ đầu tư uy tín</p>
                </div>

                <PropertyFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="fw-bold mb-1">Tìm thấy {properties.length} kết quả</h4>
                        <p className="text-muted mb-0">Sắp xếp theo độ phù hợp</p>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <select className="form-select border-0 bg-light rounded-pill" style={{ width: 'auto' }}>
                            <option>📅 Mới nhất</option>
                            <option>💰 Giá thấp đến cao</option>
                            <option>💰 Giá cao đến thấp</option>
                            <option>📐 Diện tích lớn nhất</option>
                            <option>👁️ Lượt xem nhiều nhất</option>
                        </select>

                        <div className="btn-group" role="group">
                            <input type="radio" className="btn-check" name="viewType" id="gridView" defaultChecked />
                            <label className="btn btn-outline-primary rounded-pill" htmlFor="gridView">
                                <Building size={16} />
                            </label>
                            <input type="radio" className="btn-check" name="viewType" id="listView" />
                            <label className="btn btn-outline-primary rounded-pill" htmlFor="listView">
                                <Menu size={16} />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {properties.map(property => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            onSave={handleSaveProperty}
                            isSaved={savedProperties.includes(property.id)}
                        />
                    ))}
                </div>

                {properties.length === 0 && (
                    <div className="text-center py-5">
                        <div className="bg-light rounded-circle p-4 d-inline-block mb-4">
                            <Search size={48} className="text-muted" />
                        </div>
                        <h5 className="text-dark mb-3">Không tìm thấy bất động sản phù hợp</h5>
                        <p className="text-muted mb-4">Thử điều chỉnh bộ lọc tìm kiếm để có kết quả tốt hơn</p>
                        <button
                            className="btn btn-primary px-4 py-2 rounded-pill"
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('');
                            }}
                        >
                            <X size={16} className="me-2" />
                            Xóa bộ lọc
                        </button>
                    </div>
                )}

                {properties.length > 0 && (
                    <div className="d-flex justify-content-center mt-5">
                        <nav>
                            <ul className="pagination pagination-lg">
                                <li className="page-item disabled">
                                    <span className="page-link rounded-pill me-2">
                                        <ChevronLeft size={16} />
                                    </span>
                                </li>
                                <li className="page-item active">
                                    <span className="page-link rounded-pill mx-1 btn-primary border-0">1</span>
                                </li>
                                <li className="page-item">
                                    <a className="page-link rounded-pill mx-1 text-dark" href="#">2</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link rounded-pill mx-1 text-dark" href="#">3</a>
                                </li>
                                <li className="page-item">
                                    <span className="text-muted mx-2">...</span>
                                </li>
                                <li className="page-item">
                                    <a className="page-link rounded-pill mx-1 text-dark" href="#">10</a>
                                </li>
                                <li className="page-item">
                                    <a className="page-link rounded-pill ms-2" href="#">
                                        <ChevronRight size={16} />
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Properties;