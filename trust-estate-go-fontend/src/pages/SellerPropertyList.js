// SellerPropertyList.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi, endpoints } from '../services/api.js';
import useAuth from '../hooks/useAuth';
import PropertyCard from '../components/PropertyCard';

const SellerPropertyList = () => {
    const { user } = useAuth();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [pagination, setPagination] = useState({
        page: 1,
        totalPages: 0,
        totalElements: 0
    });
    const navigate = useNavigate();
    const [allowPost, setAllowPost] = useState(true);

    // Load properties
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                setLoading(true);
                const params = {
                    page: pagination.page - 1,
                    size: 12,
                    search: searchTerm || undefined,
                    isActive: statusFilter || undefined,
                };
                const response = await authApi().get(endpoints.sellerProperties, { params });
                if (response.data.result?.content) {
                    setProperties(response.data.result.content);
                    setPagination(prev => ({
                        ...prev,
                        page: response.data.result.pageNumber + 1,
                        totalPages: response.data.result.totalPages,
                        totalElements: response.data.result.totalElements
                    }));
                } else {
                    setProperties([]);
                }
            } catch (error) {
                console.error("Error fetching properties:", error);
                alert("Không thể tải danh sách bài đăng");
                setProperties([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, [searchTerm, statusFilter, pagination.page]);

    useEffect(() => {
        const fetchAllowPost = async () => {
            try {
                const res = await authApi().get(endpoints.properties + "/allow-post");
                setAllowPost(res.data.result);
            } catch (error) {
                console.error("Error fetching properties allowpost:", error);
            }
        };
        fetchAllowPost();
    }, []);


    // Edit property
    const handleEdit = (propertyId) => {
        navigate(`/my-properties/${propertyId}`);
    };

    return (
        <div className="min-vh-100 bg-light py-4">
            <div className="container">
                {/* Header */}
                <div className="row align-items-center mb-2">
                    <div className="col-lg-6">
                        <h1 className="h2 fw-bold text-dark mb-1">Quản lý bài đăng</h1>
                        <p className="text-muted mb-0">
                            <span className="badge bg-info bg-opacity-10 text-info me-2">
                                {pagination.totalElements}
                            </span>
                            bài đăng đã tạo
                        </p>
                    </div>

                    <div className="col-lg-6 text-lg-end">
                        {/* <Link to="/properties/create" className="btn btn-primary btn-lg shadow-sm">
                            + Tạo bài đăng mới
                        </Link> */}
                        <Link
                            to={allowPost ? "/properties/create" : "#"}
                            className={`btn btn-primary btn-lg shadow-sm ${allowPost ? "" : "opacity-50 cursor-not-allowed"
                                }`}
                            onClick={(e) => {
                                if (!allowPost) e.preventDefault();
                            }}
                        >
                            + Tạo bài đăng mới
                        </Link>

                    </div>

                </div>
                {allowPost ? (
                    <div className="text-end mb-4" >
                        <span className='p-1'>
                            <span style={{ color: "red", fontWeight: "bold" }}>Note: </span>
                            Bạn được miễn phí 3 bài đăng nếu bạn chưa đăng tin nào
                        </span>
                    </div>
                ) : (<div className="text-end mb-4" >
                    <span style={{ background: "gold" }} className='p-1'>
                        <span style={{ color: "red", fontWeight: "bold" }}>Note: </span>
                        Bạn đã hết lượt đăng tin miễn phí và phải mua gói để đăng tin
                    </span>
                </div>)}



                {/* Search & Filter */}
                {/* <div className="row g-3 mb-4">
                    <div className="col-md-6">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm theo tiêu đề, địa chỉ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <select
                            className="form-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">Tất cả trạng thái</option>
                            <option value="true">Đang hiển thị</option>
                            <option value="false">Đã ẩn</option>
                        </select>
                    </div>
                </div> */}

                {/* Properties List */}
                {loading ? (
                    <p className="text-center">Đang tải...</p>
                ) : properties.length === 0 ? (
                    <p className="text-center">Chưa có bài đăng nào</p>
                ) : (
                    <div className="row g-4">
                        {properties.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                showActions={true}
                                // onEdit={() => handleEdit(property.id)}
                                onSave={() => { }} // Seller không cần Save
                                isSaved={false}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                        <nav>
                            <ul className="pagination">
                                {Array.from({ length: pagination.totalPages }, (_, i) => (
                                    <li
                                        key={i}
                                        className={`page-item ${pagination.page === i + 1 ? 'active' : ''}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                setPagination((prev) => ({ ...prev, page: i + 1 }))
                                            }
                                        >
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )}
            </div>
        </div >
    );
};

export default SellerPropertyList;
