import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Home, Building, Eye, Calendar, Star, Heart, Share2, Edit, Trash2 } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { formatPrice } from '../utils/Formatter';

const PropertyCard = ({ property, onSave, isSaved, showActions = false, onEdit, onDelete }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [localSaved, setLocalSaved] = useState(isSaved);

    const handleSave = () => {
        if (!user) {
            alert('Vui lòng đăng nhập để lưu bất động sản');
            navigate('/login');
            return;
        }
        setLocalSaved(!localSaved);
        onSave(property.id);
    };

    const handleViewDetails = () => {
        // Điều hướng đến trang chi tiết bất động sản
        // navigate(`/property/${property.id}`);
        alert('Tính năng xem chi tiết đang được phát triển');
    };

    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 border-0 shadow-sm hover-shadow-lg transition-all rounded-3 overflow-hidden">
                <div className="position-relative overflow-hidden">
                    <img
                        src={property.images?.[0] || 'https://via.placeholder.com/400x250?text=Ảnh+BDS'}
                        className="card-img-top hover-scale transition-all"
                        style={{ height: '220px', objectFit: 'cover' }}
                        alt={property.title}
                    />

                    {/* Enhanced badges with glassmorphism */}
                    <div className="position-absolute top-0 start-0 m-3">
                        <span className="badge fw-semibold px-3 py-2 rounded-pill shadow-sm"
                            style={{ backgroundColor: 'rgba(13, 110, 253, 0.9)', backdropFilter: 'blur(10px)' }}>
                            {property.propertyType}
                        </span>
                        {property.isHot && (
                            <span className="badge bg-gradient fw-semibold px-3 py-2 rounded-pill shadow-sm ms-2"
                                style={{ background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)' }}>
                                🔥 HOT
                            </span>
                        )}
                    </div>

                    {/* Floating action buttons */}
                    <div className="position-absolute top-0 end-0 m-3 d-flex flex-column gap-2">
                        <button
                            className={`btn btn-sm rounded-circle shadow-sm ${localSaved ? 'btn-danger' : 'btn-light'}`}
                            onClick={handleSave}
                            style={{ width: '40px', height: '40px', backdropFilter: 'blur(10px)' }}
                        >
                            <Heart size={16} fill={localSaved ? 'currentColor' : 'none'} />
                        </button>
                        <button
                            className="btn btn-sm btn-light rounded-circle shadow-sm"
                            style={{ width: '40px', height: '40px', backdropFilter: 'blur(10px)' }}
                        >
                            <Share2 size={16} />
                        </button>
                    </div>

                    {showActions && (
                        <div className="position-absolute bottom-0 end-0 m-3 d-flex gap-2">
                            <button
                                className="btn btn-sm btn-warning rounded-circle shadow-sm"
                                onClick={() => onEdit(property.id)}
                                style={{ width: '36px', height: '36px' }}
                            >
                                <Edit size={14} />
                            </button>
                            <button
                                className="btn btn-sm btn-danger rounded-circle shadow-sm"
                                onClick={() => onDelete(property.id)}
                                style={{ width: '36px', height: '36px' }}
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    )}

                    {/* Gradient overlay for better text readability */}
                    <div className="position-absolute bottom-0 start-0 end-0"
                        style={{ height: '60px', background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                    </div>
                </div>

                <div className="card-body d-flex flex-column p-4">
                    <h6 className="card-title fw-bold mb-2 text-truncate" title={property.title}>
                        {property.title}
                    </h6>

                    <div className="d-flex align-items-center text-muted mb-3">
                        <MapPin size={14} className="me-2 text-primary" />
                        <small className="text-truncate">{property.location}</small>
                    </div>

                    <p className="card-text text-muted small flex-grow-1 mb-3" style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>
                        {property.description?.substring(0, 100)}...
                    </p>

                    {/* Enhanced property details with icons */}
                    <div className="mb-3">
                        <div className="row g-2 small">
                            <div className="col-6">
                                <div className="d-flex align-items-center bg-light rounded-2 p-2">
                                    <Building size={14} className="me-2 text-primary" />
                                    <span className="fw-semibold">{property.area || 'N/A'} m²</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d-flex align-items-center bg-light rounded-2 p-2">
                                    <Home size={14} className="me-2 text-success" />
                                    <span className="fw-semibold">{property.bedrooms || 'N/A'} PN</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d-flex align-items-center bg-light rounded-2 p-2">
                                    <Eye size={14} className="me-2 text-info" />
                                    <span className="fw-semibold">{property.viewCount || 0}</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d-flex align-items-center bg-light rounded-2 p-2">
                                    <Calendar size={14} className="me-2 text-warning" />
                                    <span className="fw-semibold">{new Date(property.createdAt).toLocaleDateString('vi-VN').split('/')[0]}/{new Date(property.createdAt).toLocaleDateString('vi-VN').split('/')[1]}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-top pt-3 mt-auto">
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold text-primary h5 mb-0" style={{ fontSize: '1.25rem' }}>
                                {formatPrice(property.price)}
                            </span>
                            <div className="d-flex align-items-center">
                                <div className="d-flex align-items-center me-3">
                                    <Star size={12} className="text-warning me-1" fill="currentColor" />
                                    <small className="fw-semibold">{property.sellerRating || 5.0}</small>
                                </div>
                                <button
                                    className="btn btn-primary btn-sm fw-semibold rounded-pill px-3"
                                    onClick={handleViewDetails}
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;