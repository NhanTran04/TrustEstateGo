import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    MapPin, Home, Building, Eye, Calendar, Star, Heart,
    Share2, ArrowLeft, Bed, Bath, Car, Ruler, CalendarDays,
    Phone, MessageCircle, User, Shield, CheckCircle
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { useProperty } from '../contexts/PropertyContext';
import { formatPrice } from '../utils/Formatter';
import { authApi, endpoints } from '../services/api.js';
import MapView from '../components/MapView.js';

const PropertyDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { handleSaveProperty, savedProperties } = useProperty();
    const [property, setProperty] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPropertyDetail = async () => {
            try {
                const response = await authApi().get(`${endpoints.properties}/${id}`);
                setProperty(response.data.result);
                setIsSaved(savedProperties.includes(response.data.result.id));
            } catch (err) {
                const errorMessage = err.response?.data?.message || 'Không thể tải thông tin bất động sản';
                setError(errorMessage);
                console.error('Error fetching property:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyDetail();
    }, [id, savedProperties]);

    const handleSave = () => {
        if (!user) {
            alert('Vui lòng đăng nhập để lưu bất động sản');
            navigate('/login');
            return;
        }
        handleSaveProperty(property.id);
        setIsSaved(!isSaved);
    };

    const handleContact = async () => {
        if (!user) {
            alert("Vui lòng đăng nhập để nhắn tin");
            return;
        }

        try {
            // gọi API tạo room
            const res = await authApi().post(endpoints.chatRoom(property.userId));
            const room = res.data; // ChatRoomResponse

            // điều hướng sang trang chat, truyền roomId
            navigate(`/chat/${room.id}`);
        } catch (err) {
            console.error("Error creating chat room:", err);
            alert("Không thể mở phòng chat");
        }
    };
    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ paddingTop: '100px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ paddingTop: '100px' }}>
                <div className="alert alert-danger text-center">
                    {error}
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ paddingTop: '100px' }}>
                <div className="text-center">
                    <h3>Không tìm thấy bất động sản</h3>
                    <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
                        Quay về trang chủ
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ paddingTop: '10px', backgroundColor: '#f8f9ff' }}>
            <div className="container">
                {/* Navigation */}
                <div className="mb-4">
                    <button
                        className="btn btn-outline-primary rounded-pill d-flex align-items-center"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft size={18} className="me-2" />
                        Quay lại
                    </button>
                </div>

                <div className="row">
                    {/* Left Column - Images */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body p-0">
                                {/* Main Image */}
                                <div className="position-relative">
                                    <img
                                        src={property.images?.[activeImage]}
                                        className="img-fluid w-100 rounded-top-4"
                                        style={{ height: '400px', objectFit: 'contain' }}
                                        alt={property.title}
                                    />

                                    {/* Save Button */}
                                    <button
                                        className={`btn btn-sm position-absolute top-0 end-0 m-3 rounded-circle ${isSaved ? 'btn-danger' : 'btn-light'}`}
                                        onClick={handleSave}
                                        style={{ width: '50px', height: '50px' }}
                                    >
                                        <Heart size={20} fill={isSaved ? 'currentColor' : 'none'} />
                                    </button>

                                    {/* Share Button */}
                                    <button
                                        className="btn btn-sm btn-light position-absolute top-0 end-0 m-3 rounded-circle me-4"
                                        style={{ width: '50px', height: '50px' }}
                                    >
                                        <Share2 size={20} />
                                    </button>
                                </div>

                                {/* Thumbnails */}
                                {property.images && property.images.length > 1 && (
                                    <div className="p-3">
                                        <div className="d-flex gap-2 overflow-auto">
                                            {property.images.map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={img}
                                                    className={`img-thumbnail cursor-pointer ${activeImage === index ? 'border-primary' : ''}`}
                                                    style={{
                                                        width: '80px',
                                                        height: '60px',
                                                        objectFit: 'cover',
                                                        opacity: activeImage === index ? 1 : 0.7
                                                    }}
                                                    onClick={() => setActiveImage(index)}
                                                    alt={`Thumbnail ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Property Details */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body">
                                <h2 className="fw-bold text-dark mb-3">{property.title}</h2>

                                <div className="d-flex align-items-center text-muted mb-4">
                                    <MapPin size={18} className="text-primary me-2" />
                                    <span>{property.location}</span>
                                </div>

                                {/* Price */}
                                <div className="bg-light rounded-4 p-4 mb-4">
                                    <h3 className="text-primary fw-bold mb-2">{formatPrice(property.price)}</h3>
                                    <p className="text-muted mb-0">
                                        {property.propertyType.value === 'Cho thuê' ? 'Giá thuê' : 'Giá bán'}
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                    <h5 className="fw-bold mb-3">Mô tả chi tiết</h5>
                                    <p className="text-muted" style={{ lineHeight: '1.8' }}>
                                        {property.description}
                                    </p>
                                </div>

                                {/* Property Features */}
                                <div className="row mb-4">
                                    <div className="col-md-6">
                                        <h5 className="fw-bold mb-3">Đặc điểm bất động sản</h5>
                                        <div className="row">
                                            <div className="col-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <Building size={18} className="text-primary me-2" />
                                                    <span className="fw-medium">Diện tích:</span>
                                                </div>
                                                <span className="text-muted">{property.area} m²</span>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <Bed size={18} className="text-primary me-2" />
                                                    <span className="fw-medium">Phòng ngủ:</span>
                                                </div>
                                                <span className="text-muted">{property.bedroom}</span>
                                            </div>

                                            <div className="col-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <Car size={18} className="text-primary me-2" />
                                                    <span className="fw-medium">Chỗ đỗ xe:</span>
                                                </div>
                                                <span className="text-muted">{property.parking || 'Có'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <h5 className="fw-bold mb-3">Thông tin khác</h5>
                                        <div className="row">
                                            <div className="col-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <Ruler size={18} className="text-primary me-2" />
                                                    <span className="fw-medium">Hướng nhà: Đông</span>
                                                </div>
                                                <span className="text-muted">{property.direction}</span>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <Home size={18} className="text-primary me-2" />
                                                    <span className="fw-medium">Nội thất:</span>
                                                </div>
                                                <span className="text-muted">{property.interior}</span>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <CalendarDays size={18} className="text-primary me-2" />
                                                    <span className="fw-medium">Ngày đăng:</span>
                                                </div>
                                                <span className="text-muted">
                                                    {new Date(property.createdAt).toLocaleDateString('vi-VN')}
                                                </span>
                                            </div>
                                            <div className="col-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <Eye size={18} className="text-primary me-2" />
                                                    <span className="fw-medium">Lượt xem:</span>
                                                </div>
                                                <span className="text-muted">{10000}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h5 className="fw-bold mb-3">Tiện nghi</h5>
                                    <div className="row">
                                        {property.amenities && property.amenities.map((amenity, index) => (
                                            <div key={index} className="col-md-4 col-6 mb-2">
                                                <div className="d-flex align-items-center">
                                                    <CheckCircle size={16} className="text-success me-2" />
                                                    <span className="text-muted">{amenity}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact & Seller Info */}
                    <div className="col-lg-4">
                        {/* Contact Card */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4">
                            <div className="card-body">
                                <h5 className="fw-bold mb-3">Liên hệ người bán</h5>

                                {/* Seller Info */}
                                <div className="d-flex align-items-center mb-4">
                                    <img
                                        src={property.userAvatar}
                                        className="rounded-circle me-3"
                                        width="60"
                                        height="60"
                                        alt="Seller"
                                    />
                                    <div>
                                        <h6 className="fw-bold mb-1">{property.userFullName}</h6>
                                        <div className="d-flex align-items-center">
                                            <Star size={14} className="text-warning me-1" fill="currentColor" />
                                            <small className="text-muted">{property.avgUserReview} ({property.countUserReview}đánh giá)</small>
                                        </div>
                                    </div>
                                </div>

                                {/* Verified Badge */}
                                {/* <div className="d-flex align-items-center mb-4">
                                    <Shield size={16} className="text-success me-2" />
                                    <small className="text-success">Đã xác thực danh tính</small>
                                </div> */}

                                {/* Contact Buttons */}
                                <div className="d-grid gap-2">
                                    <button
                                        className="btn btn-outline-primary rounded-pill py-2 fw-semibold"
                                    // onClick={handleContact}
                                    >
                                        <Phone size={18} className="me-2" />
                                        Gọi ngay
                                    </button>
                                    <button
                                        className="btn btn-outline-primary rounded-pill py-2 fw-semibold"
                                        onClick={handleContact}
                                    >
                                        <MessageCircle size={18} className="me-2" />
                                        Nhắn tin
                                    </button>
                                </div>
                            </div>
                        </div>


                        {/* Map Section */}
                        <div className="card border-0 shadow-sm rounded-4 mb-4 mt-4">
                            <div className="card-body">
                                <h5 className="fw-bold mb-3">Vị trí trên bản đồ</h5>
                                <MapView
                                    latitude={property.latitude}
                                    longitude={property.longitude}
                                    title={property.title}
                                    address={property.location}
                                />
                            </div>
                        </div>

                        {/* Safety Tips */}
                        <div className="card border-0 shadow-sm rounded-4">
                            <div className="card-body">
                                <h6 className="fw-bold mb-3">📌 Lưu ý an toàn</h6>
                                <ul className="list-unstyled small text-muted">
                                    <li className="mb-2">• Không chuyển tiền trước khi xem nhà</li>
                                    <li className="mb-2">• Gặp mặt tại địa điểm công cộng</li>
                                    <li className="mb-2">• Kiểm tra kỹ giấy tờ pháp lý</li>
                                    <li className="mb-2">• Báo cáo tin đăng giả mạo</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;