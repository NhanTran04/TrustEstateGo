import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { api, endpoints } from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: '',
        userType: 'USER'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post(endpoints.register, formData);
            const { token, ...userData } = response.data;

            login(userData, token);
            navigate('/');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center" style={{ paddingTop: '100px', paddingBottom: '50px', backgroundColor: '#f8f9ff' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-7">
                        <div className="card border-0 shadow-lg rounded-4">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <div className="bg-info rounded-circle d-inline-flex p-3 mb-3">
                                        <User className="text-white" size={32} />
                                    </div>
                                    <h2 className="fw-bold text-info">Đăng ký tài khoản</h2>
                                    <p className="text-muted">Tham gia cộng đồng TrustEstateGo ngay hôm nay</p>
                                </div>

                                {error && (
                                    <div className="alert alert-danger rounded-3" role="alert">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-semibold">Họ</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <User size={18} className="text-primary" />
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control border-start-0"
                                                    placeholder="Nhập họ"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-semibold">Tên</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <User size={18} className="text-primary" />
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control border-start-0"
                                                    placeholder="Nhập tên"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Email</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <Mail size={18} className="text-primary" />
                                            </span>
                                            <input
                                                type="email"
                                                className="form-control border-start-0"
                                                placeholder="example@email.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Số điện thoại</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <Phone size={18} className="text-primary" />
                                            </span>
                                            <input
                                                type="tel"
                                                className="form-control border-start-0"
                                                placeholder="0901234567"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Loại tài khoản</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <Shield size={18} className="text-primary" />
                                            </span>
                                            <select
                                                className="form-select border-start-0"
                                                value={formData.userType}
                                                onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                                            >
                                                <option value="USER">🏠 Người mua/thuê</option>
                                                <option value="SELLER">🏢 Chủ nhà/Môi giới</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Tên đăng nhập</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <User size={18} className="text-primary" />
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control border-start-0"
                                                placeholder="Nhập tên đăng nhập"
                                                value={formData.username}
                                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-semibold">Mật khẩu</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <Lock size={18} className="text-primary" />
                                                </span>
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    className="form-control border-start-0 pe-5"
                                                    placeholder="Nhập mật khẩu"
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-3"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    style={{ zIndex: 5 }}
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-semibold">Xác nhận mật khẩu</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <Lock size={18} className="text-primary" />
                                                </span>
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    className="form-control border-start-0 pe-5"
                                                    placeholder="Nhập lại mật khẩu"
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-3"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    style={{ zIndex: 5 }}
                                                >
                                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-check mb-4">
                                        <input className="form-check-input" type="checkbox" id="terms" required />
                                        <label className="form-check-label text-muted" htmlFor="terms">
                                            Tôi đồng ý với <a href="#" className="text-primary text-decoration-none">Điều khoản sử dụng</a> và <a href="#" className="text-primary text-decoration-none">Chính sách bảo mật</a>
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-info btn-lg w-100 fw-bold rounded-3 shadow-sm text-white"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Đang tạo tài khoản...
                                            </>
                                        ) : 'Tạo tài khoản'}
                                    </button>
                                </form>

                                <div className="text-center mt-4">
                                    <span className="text-mutted">Đã có tài khoản? </span>
                                    <Link to="/login" className="fw-semibold text-primary text-decoration-none">
                                        Đăng nhập ngay
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;