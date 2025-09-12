import React, { useState } from 'react';
import { User, Shield, Mail, Phone, MapPin, Calendar, Lock } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
// import './Auth.css';

const RegisterForm = ({ onClose, onSwitchToLogin }) => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        username: '', password: '', confirmPassword: '', userType: 'USER'
    });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Mật khẩu không khớp!');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            const userData = {
                id: 1,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                roles: [{ name: formData.userType }]
            };
            const token = 'mock-jwt-token-' + Date.now();

            login(userData, token);
            setLoading(false);
            onClose();
        }, 1000);
    };

    return (
        <div className="modal d-block animate-fade-in" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content border-0 rounded-4 overflow-hidden">
                    <div className="gradient-success text-white p-4 text-center">
                        <div className="bg-white bg-opacity-20 rounded-circle p-3 d-inline-block mb-3">
                            <User size={32} />
                        </div>
                        <h4 className="fw-bold mb-2">Tạo tài khoản mới</h4>
                        <p className="mb-0 opacity-90">Tham gia cộng đồng TrustEstate ngay hôm nay</p>
                    </div>

                    <div className="modal-body p-5">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-medium">Họ</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-0">
                                            <User size={16} />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control border-0 bg-light"
                                            placeholder="Nhập họ"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-medium">Tên</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-0">
                                            <User size={16} />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control border-0 bg-light"
                                            placeholder="Nhập tên"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Email</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0">
                                        <Mail size={16} />
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control border-0 bg-light"
                                        placeholder="example@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Số điện thoại</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0">
                                        <Phone size={16} />
                                    </span>
                                    <input
                                        type="tel"
                                        className="form-control border-0 bg-light"
                                        placeholder="0901234567"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Loại tài khoản</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0">
                                        <Shield size={16} />
                                    </span>
                                    <select
                                        className="form-select border-0 bg-light"
                                        value={formData.userType}
                                        onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                                    >
                                        <option value="USER">🏠 Người mua/thuê</option>
                                        <option value="SELLER">🏢 Chủ nhà/Môi giới</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-medium">Tên đăng nhập</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0">
                                        <User size={16} />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control border-0 bg-light"
                                        placeholder="Nhập tên đăng nhập"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-medium">Mật khẩu</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-0">
                                            <Lock size={16} />
                                        </span>
                                        <input
                                            type="password"
                                            className="form-control border-0 bg-light"
                                            placeholder="Nhập mật khẩu"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-medium">Xác nhận mật khẩu</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-0">
                                            <Lock size={16} />
                                        </span>
                                        <input
                                            type="password"
                                            className="form-control border-0 bg-light"
                                            placeholder="Nhập lại mật khẩu"
                                            value={formData.confirmPassword}
                                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-check mb-4">
                                <input className="form-check-input" type="checkbox" id="terms" required />
                                <label className="form-check-label text-muted" htmlFor="terms">
                                    Tôi đồng ý với <button className="btn btn-link p-0 text-primary">Điều khoản sử dụng</button> và <button className="btn btn-link p-0 text-primary">Chính sách bảo mật</button>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-gradient btn-lg w-100 rounded-pill fw-bold mb-4"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="d-flex align-items-center justify-content-center">
                                        <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                                        Đang tạo tài khoản...
                                    </div>
                                ) : (
                                    'Tạo tài khoản'
                                )}
                            </button>
                        </form>

                        <div className="text-center">
                            <span className="text-muted">Đã có tài khoản? </span>
                            <button className="btn btn-link text-primary p-0 fw-bold text-decoration-none" onClick={onSwitchToLogin}>
                                Đăng nhập ngay
                            </button>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="btn-close position-absolute top-0 end-0 m-3"
                        onClick={onClose}
                        style={{ background: 'rgba(255,255,255,0.8)', borderRadius: '50%', width: '32px', height: '32px' }}
                    ></button>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;