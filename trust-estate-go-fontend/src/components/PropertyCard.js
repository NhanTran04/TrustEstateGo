import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Home, Building, Eye, Calendar, Star, Heart, Share2, Edit, Trash2, Bed } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { formatPrice, formatDate, formatArea, getPropertyTypeLabel } from '../utils/Formatter';

const PropertyCard = ({ property, onSave, isSaved, showActions = false, onEdit, onDelete }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [localSaved, setLocalSaved] = useState(isSaved);

    const handleSave = async () => {
        if (!user) {
            alert('Vui lòng đăng nhập để lưu bất động sản');
            navigate('/login');
            return;
        }
        try {
            await onSave(property.id);
            setLocalSaved(!localSaved);
        } catch (err) {
            console.error('Error saving property:', err);
        }
    };

    const handleViewDetails = () => {
        navigate(`/property/${property.id}`);
    };

    const mainImage = property.images?.[0] || property.imageUrl || 'https://via.placeholder.com/400x250?text=Ảnh+BDS';
    const categoryName = property.category?.name || property.categoryName || 'Bất động sản';
    const location = property.location || property.address || 'Địa điểm không xác định';
    const area = property.area || property.squareArea;
    const bedrooms = property.bedroom || property.bedrooms;
    const createdAt = property.createdAt || property.postedDate;

    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 border-0 shadow-sm hover-shadow-lg transition-all rounded-3 overflow-hidden">
                <div className="position-relative overflow-hidden">
                    <img
                        src={mainImage}
                        className="card-img-top hover-scale transition-all"
                        style={{ height: '220px', objectFit: 'cover' }}
                        alt={property.title}
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x250?text=Ảnh+BDS';
                        }}
                    />

                    <div className="position-absolute top-0 start-0 m-3">
                        <span className="badge fw-semibold px-3 py-2 rounded-pill shadow-sm"
                            style={{ backgroundColor: 'rgba(13, 110, 253, 0.9)', backdropFilter: 'blur(10px)' }}>
                            {categoryName}
                        </span>

                    </div>

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

                    {/* {showActions && (
                        <div className="position-absolute bottom-0 end-0 m-3 d-flex gap-2">
                            <button className="btn btn-sm btn-warning rounded-circle shadow-sm"
                                onClick={() => onEdit(property.id)}
                                style={{ width: '36px', height: '36px' }}>
                                <Edit size={14} />
                            </button>
                            <button className="btn btn-sm btn-danger rounded-circle shadow-sm"
                                onClick={() => onDelete(property.id)}
                                style={{ width: '36px', height: '36px' }}>
                                <Trash2 size={14} />
                            </button>
                        </div>
                    )} */}

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
                        <small className="text-truncate">{location}</small>
                    </div>

                    <p className="card-text text-muted small flex-grow-1 mb-3" style={{ lineHeight: '1.4' }}>
                        {property.description?.substring(0, 100)}...
                    </p>

                    <div className="mb-3">
                        <div className="row g-2 small">
                            <div className="col-6">
                                <div className="d-flex align-items-center bg-light rounded-2 p-2">
                                    <Building size={14} className="me-2 text-primary" />
                                    <span className="fw-semibold">{formatArea(area)}</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d-flex align-items-center bg-light rounded-2 p-2">
                                    <Bed size={14} className="me-2 text-success" />
                                    <span className="fw-semibold">{bedrooms || 'N/A'} PN</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d-flex align-items-center bg-light rounded-2 p-2">
                                    <Home size={14} className="me-2 text-info" />
                                    <span className="fw-semibold">{property.interior || 0}</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d-flex align-items-center bg-light rounded-2 p-2">
                                    <Calendar size={14} className="me-2 text-warning" />
                                    <span className="fw-semibold">{formatDate(createdAt)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-top pt-3 mt-auto">
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold text-primary h5 mb-0" style={{ fontSize: '1.25rem' }}>
                                {formatPrice(property.price)}
                                <small className="text-muted d-block fs-6">
                                    {property.propertyType?.label}
                                </small>
                            </span>
                            <div className="d-flex align-items-center">

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