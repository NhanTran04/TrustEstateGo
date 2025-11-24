import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Home, Building, Eye, Calendar, Star, Heart, Share2, Edit, Trash2, Bed } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { formatPrice, formatDate, formatArea, getPropertyTypeLabel } from '../utils/Formatter';
import { MdReportGmailerrorred } from 'react-icons/md';
import { authApi, endpoints } from '../services/api';
import { Modal, Form, Button, Card } from 'react-bootstrap';

const PropertyCard = ({ property, onSave, isSaved, showActions = false, onEdit, onDelete }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [localSaved, setLocalSaved] = useState(isSaved);
    const [showReportModal, setShowReportModal] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (localSaved !== isSaved) {
            setLocalSaved(isSaved);
        }
    }, [isSaved, localSaved]);

    const handleSave = async (e) => {
        e.stopPropagation();
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

    const handleReportSubmit = async (e) => {
        e.preventDefault(); // Ngăn form submit mặc định

        if (!user) {
            alert('Vui lòng đăng nhập để khiếu nại bất động sản');
            navigate('/login');
            return;
        }

        if (!reportReason.trim()) {
            alert('Vui lòng nhập lý do khiếu nại.');
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await authApi().post(endpoints.properties + `/${property.id}` + "/reports", {
                reason: reportReason.trim(),
            });

            console.log('Report submitted successfully:', res.data);
            alert('Khiếu nại của bạn đã được gửi thành công. Cảm ơn phản hồi của bạn!');
            setShowReportModal(false);
            setReportReason('');
        } catch (err) {
            console.error('Lỗi khiếu nại bất động sản:', err);
            alert('Đã xảy ra lỗi khi gửi khiếu nại. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleShowReportModal = (e) => {
        e.stopPropagation();
        setShowReportModal(true);
    };

    const handleCloseReportModal = () => {
        setShowReportModal(false);
        setReportReason('');
    };

    const handleViewDetails = () => {
        navigate(`/property/${property.id}`);
    };

    const mainImage = property.images?.[0];
    const categoryName = property.category?.name || property.categoryName || 'Bất động sản';
    const location = property.location || property.address || 'Địa điểm không xác định';
    const area = property.area || property.squareArea;
    const bedrooms = property.bedroom || property.bedrooms;
    const createdAt = property.createdAt || property.postedDate;

    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div
                className="card h-100 border-0 shadow-sm hover-shadow-lg transition-all rounded-3 overflow-hidden"
                onClick={handleViewDetails}
                style={{ cursor: 'pointer' }}
            >
                <div className="position-relative overflow-hidden">
                    <img
                        src={mainImage}
                        className="card-img-top hover-scale transition-all"
                        style={{ height: '220px', objectFit: 'contain' }}
                        alt={property.title}
                    // onError={(e) => {
                    //     e.target.src = 'https://via.placeholder.com/400x250?text=Ảnh+BDS';
                    // }}
                    />

                    <div className="position-absolute top-0 start-0 m-3">
                        <span className="badge fw-semibold px-3 py-2 rounded-0 shadow-sm"
                            style={{ backgroundColor: 'deepskyblue', backdropFilter: 'blur(10px)' }}>
                            {categoryName}
                        </span>

                    </div>

                    <div className="position-absolute top-0 end-0 m-3 d-flex flex-column gap-2">
                        <button
                            className={`btn btn-sm rounded-circle shadow-sm ${localSaved ? 'btn-danger' : 'btn-light'}`}
                            onClick={(e) => handleSave(e)}
                            style={{ width: '40px', height: '40px', backdropFilter: 'blur(10px)' }}
                        >
                            <Heart size={16} fill={localSaved ? 'currentColor' : 'none'} />
                        </button>
                        <button
                            className="btn btn-sm btn-light rounded-circle shadow-sm"
                            onClick={handleShowReportModal}
                            style={{ width: '40px', height: '40px', backdropFilter: 'blur(10px)' }}
                        >
                            <MdReportGmailerrorred size={16} />
                        </button>
                    </div>

                    {showActions && (
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
                    )}

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
                            <span className="fw-bold text-dark h5 mb-0" style={{ fontSize: '1.25rem' }}>
                                {formatPrice(property.price)}
                                <small className="text-muted d-block fs-6">
                                    {property.propertyType?.label}
                                </small>
                            </span>
                            <div className="d-flex align-items-center">

                                <button
                                    className="btn btn-dark btn-sm fw-semibold rounded-0 px-3"
                                    style={{ background: "linear-gradient(45deg, black, cornflowerblue)" }}
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showReportModal} onHide={handleCloseReportModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold text-danger">
                        <MdReportGmailerrorred size={20} className="me-2" />
                        Khiếu nại Bất động sản
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleReportSubmit}>
                    <Modal.Body>
                        <p className="text-muted small">
                            Vui lòng cho biết lý do bạn khiếu nại bài đăng này ({property.title}).
                            Thông tin của bạn sẽ được giữ kín.
                        </p>
                        <Form.Group controlId="reportReason">
                            <Form.Label className="fw-semibold">Lý do khiếu nại:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={reportReason}
                                onChange={(e) => setReportReason(e.target.value)}
                                placeholder="Ví dụ: Nội dung sai sự thật, lừa đảo, hình ảnh không đúng..."
                                required
                                disabled={isSubmitting}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseReportModal} disabled={isSubmitting}>
                            Hủy
                        </Button>
                        <Button
                            variant="danger"
                            type="submit"
                            disabled={isSubmitting || !reportReason.trim()}
                        >
                            {isSubmitting ? 'Đang gửi...' : 'Gửi Khiếu nại'}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default PropertyCard;