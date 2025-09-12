import React, { useState } from 'react';
import { User, Shield, Camera, CheckCircle, Star, MessageCircle, Bell, Award, Edit } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        birthday: user?.birthday || ''
    });

    const handleSave = () => {
        alert('Cập nhật thông tin thành công!');
        setEditing(false);
    };

    return (
        <div style={{ paddingTop: '100px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card border-0 rounded-4 gradient-card text-center p-4 mb-4">
                            <div className="position-relative d-inline-block mb-4">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                    className="rounded-circle border border-4 border-white shadow"
                                    width="120"
                                    height="120"
                                    style={{ objectFit: 'cover' }}
                                    alt="Avatar"
                                />
                                <button className="btn btn-primary position-absolute bottom-0 end-0 rounded-circle p-2">
                                    <Camera size={16} />
                                </button>
                            </div>

                            <h5 className="fw-bold">{user?.firstName} {user?.lastName}</h5>
                            <p className="text-muted mb-3">{user?.email}</p>

                            <div className="d-flex justify-content-center align-items-center mb-3">
                                <Star className="text-warning me-1" size={16} fill="currentColor" />
                                <Star className="text-warning me-1" size={16} fill="currentColor" />
                                <Star className="text-warning me-1" size={16} fill="currentColor" />
                                <Star className="text-warning me-1" size={16} fill="currentColor" />
                                <Star className="text-warning me-2" size={16} fill="currentColor" />
                                <span className="small fw-bold">4.8 (25 đánh giá)</span>
                            </div>

                            <div className="d-flex justify-content-center gap-2 mb-3">
                                <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill">
                                    <CheckCircle size={14} className="me-1" />
                                    Đã xác thực
                                </span>
                                {user?.roles?.some(role => role.name === 'SELLER') && (
                                    <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                                        <Award size={14} className="me-1" />
                                        Môi giới
                                    </span>
                                )}
                            </div>

                            <button className="btn btn-outline-primary rounded-pill w-100">
                                <MessageCircle size={16} className="me-2" />
                                Nhắn tin
                            </button>
                        </div>

                        <div className="card border-0 rounded-4 gradient-card">
                            <div className="card-header bg-transparent border-0">
                                <h6 className="fw-bold mb-0">Hoạt động</h6>
                            </div>
                            <div className="card-body">
                                <div className="row text-center">
                                    <div className="col-4">
                                        <div className="fw-bold text-primary h5">12</div>
                                        <small className="text-muted">Tin đăng</small>
                                    </div>
                                    <div className="col-4">
                                        <div className="fw-bold text-success h5">8</div>
                                        <small className="text-muted">Đã bán</small>
                                    </div>
                                    <div className="col-4">
                                        <div className="fw-bold text-warning h5">24</div>
                                        <small className="text-muted">Đã lưu</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className="card border-0 rounded-4 gradient-card mb-4">
                            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
                                <h6 className="fw-bold mb-0">Thông tin cá nhân</h6>
                                <button
                                    className={`btn ${editing ? 'btn-success' : 'btn-outline-primary'} btn-sm rounded-pill px-3`}
                                    onClick={() => editing ? handleSave() : setEditing(true)}
                                >
                                    {editing ? (
                                        <>
                                            <CheckCircle size={16} className="me-1" />
                                            Lưu
                                        </>
                                    ) : (
                                        <>
                                            <Edit size={16} className="me-1" />
                                            Chỉnh sửa
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-medium">Họ</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-pill"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            disabled={!editing}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-medium">Tên</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-pill"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            disabled={!editing}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-medium">Email</label>
                                        <input
                                            type="email"
                                            className="form-control rounded-pill"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            disabled={!editing}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-medium">Số điện thoại</label>
                                        <input
                                            type="tel"
                                            className="form-control rounded-pill"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            disabled={!editing}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8 mb-3">
                                        <label className="form-label fw-medium">Địa chỉ</label>
                                        <input
                                            type="text"
                                            className="form-control rounded-pill"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            disabled={!editing}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label fw-medium">Ngày sinh</label>
                                        <input
                                            type="date"
                                            className="form-control rounded-pill"
                                            value={formData.birthday}
                                            onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                                            disabled={!editing}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card border-0 rounded-4 gradient-card">
                            <div className="card-header bg-transparent border-0">
                                <h6 className="fw-bold mb-0 d-flex align-items-center">
                                    <Shield size={18} className="text-primary me-2" />
                                    Đổi mật khẩu
                                </h6>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label fw-medium">Mật khẩu hiện tại</label>
                                        <input type="password" className="form-control rounded-pill" />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label fw-medium">Mật khẩu mới</label>
                                        <input type="password" className="form-control rounded-pill" />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <label className="form-label fw-medium">Xác nhận mật khẩu</label>
                                        <input type="password" className="form-control rounded-pill" />
                                    </div>
                                </div>
                                <button className="btn btn-warning rounded-pill px-4">
                                    <Shield size={16} className="me-2" />
                                    Cập nhật mật khẩu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;