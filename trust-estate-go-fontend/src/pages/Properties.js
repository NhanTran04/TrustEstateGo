import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Menu, Building, X, Search } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import PropertyFilter from '../components/PropertyFilter';
import { useProperty } from '../contexts/PropertyContext';

const Properties = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get("categoryId");
    console.log(categoryId);
    const {
        properties,
        pagination = {},
        searchQuery,
        selectedCategory,
        handleSaveProperty,
        savedProperties,
        setSearchQuery,
        setSelectedCategory,
        refetchProperties,
        loading,
        error,
        categories = [] // lấy từ context
    } = useProperty();

    useEffect(() => {
        if (categoryId) {
            setSelectedCategory(Number(categoryId));
        } else {
            setSelectedCategory(null); // hoặc 0
        }
    }, [categoryId]);


    const handlePageChange = (newPage) => {
        refetchProperties(newPage);
    };

    const handleFilterChange = () => {
        refetchProperties(1);
    };

    const getCategoryTitle = () => {
        const category = categories.find(c => c.id === selectedCategory);
        if (!category) {
            return {
                title: "Bất động sản",
                subtitle: "Khám phá bất động sản phù hợp nhu cầu của bạn"
            };
        }

        if (category.name.toLowerCase().includes("bán")) {
            return {
                title: "Nhà đất bán",
                subtitle: "Khám phá các BĐS bán chất lượng cao từ chủ đầu tư uy tín"
            };
        }

        if (category.name.toLowerCase().includes("thuê")) {
            return {
                title: "Nhà đất cho thuê",
                subtitle: "Khám phá các BĐS cho thuê phù hợp nhu cầu của bạn"
            };
        }

        return {
            title: category.name,
            subtitle: "Danh sách bất động sản"
        };
    };

    const { title, subtitle } = getCategoryTitle();

    if (loading) {
        return (
            <div style={{ paddingTop: '100px' }} className="container">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ paddingTop: '100px' }} className="container">
                <div className="alert alert-danger text-center">
                    {error}
                </div>
            </div>
        );
    }

    const totalResults = pagination?.total || properties.length;
    const currentPage = pagination?.page || 1;
    const totalPages = pagination?.totalPages || 1;

    return (
        <div style={{ paddingTop: '100px' }}>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold text-dark mb-3">{title}</h2>
                    <p className="text-muted">{subtitle}</p>
                </div>

                <PropertyFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    onFilterChange={handleFilterChange}
                />

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="fw-bold mb-1">Tìm thấy {totalResults} kết quả</h4>
                        <p className="text-muted mb-0">Trang {currentPage} / {totalPages}</p>
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
                                refetchProperties(1);
                            }}
                        >
                            <X size={16} className="me-2" />
                            Xóa bộ lọc
                        </button>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-5">
                        <nav>
                            <ul className="pagination pagination-lg">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link rounded-pill me-2"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                </li>

                                {[...Array(totalPages)].map((_, index) => {
                                    const pageNumber = index + 1;
                                    if (
                                        pageNumber === 1 ||
                                        pageNumber === totalPages ||
                                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                    ) {
                                        return (
                                            <li key={pageNumber} className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                                                <button
                                                    className="page-link rounded-pill mx-1"
                                                    onClick={() => handlePageChange(pageNumber)}
                                                >
                                                    {pageNumber}
                                                </button>
                                            </li>
                                        );
                                    } else if (
                                        pageNumber === currentPage - 2 ||
                                        pageNumber === currentPage + 2
                                    ) {
                                        return (
                                            <li key={pageNumber} className="page-item disabled">
                                                <span className="page-link rounded-pill mx-1">...</span>
                                            </li>
                                        );
                                    }
                                    return null;
                                })}

                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link rounded-pill ms-2"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        <ChevronRight size={16} />
                                    </button>
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
