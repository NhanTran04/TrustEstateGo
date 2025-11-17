import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, Shield, Home } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { api, endpoints } from '../services/api.js';
import { FaAddressCard } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        avatar: '',
        confirmPassword: '',
        roleId: 2
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

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
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key !== 'confirmPassword' && value !== null && value !== '') {
                    data.append(key, value);
                }
            });

            const response = await api.post(endpoints.register, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const { token, ...userData } = response.data;
            login(userData, token);
            navigate('/login');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center position-relative py-5"
            style={{
                backgroundImage: `url(https://cloud.famproperties.com/fam/blog/1451-164339.jpeg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                imageRendering: '-webkit-optimize-contrast',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
            }}
        >
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    pointerEvents: 'none',
                }}
            ></div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-4">
                        <div
                            className="card border-0 shadow-lg rounded-4 overflow-hidden"
                            style={{
                                background: 'rgba(0, 0, 0, 0.45)',
                                backdropFilter: 'blur(10px)',
                                WebkitBackdropFilter: 'blur(12px)',
                                borderRadius: '20px',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
                            }}
                        >
                            {/* Header với gradient */}
                            <div className="card-header border-0 text-center pt-4 pb-3">
                                <div className="d-inline-flex align-items-center justify-content-center mb-3">
                                    <div className="bg-white rounded-circle d-flex align-items-center justify-content-center p-3 shadow">
                                        <Home className="text-primary" size={32} />
                                    </div>
                                </div>

                            </div>

                            <div className="card-body p-4">
                                {error && (
                                    <div className="alert alert-danger rounded-3 border-0 shadow-sm" role="alert">
                                        <i className="fas fa-exclamation-circle me-2"></i>
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-7 mb-3">
                                            <label className="form-label fw-semibold text-white">Họ</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-white border-end-0 ps-3">
                                                    <User size={18} className="text-primary" />
                                                </span>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    className="form-control border-start-0 py-2"
                                                    placeholder="Nhập họ"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    required
                                                    style={{ borderColor: '#e0e0e0' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-5 mb-3">
                                            <label className="form-label fw-semibold text-white">Tên</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-white border-end-0 ps-3">
                                                    <User size={18} className="text-primary" />
                                                </span>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    className="form-control border-start-0 py-2"
                                                    placeholder="Nhập tên"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                    style={{ borderColor: '#e0e0e0' }}
                                                />
                                            </div>
                                        </div>
                                    </div>



                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-white">Số điện thoại</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 ps-3">
                                                <Phone size={18} className="text-primary" />
                                            </span>
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="form-control border-start-0 py-2"
                                                placeholder="0901234567"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                style={{ borderColor: '#e0e0e0' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-white">Email</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 ps-3">
                                                <Mail size={18} className="text-primary" />
                                            </span>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control border-start-0 py-2"
                                                placeholder="example@email.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                style={{ borderColor: '#e0e0e0' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-white">Tên đăng nhập</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 ps-3">
                                                <User size={18} className="text-primary" />
                                            </span>
                                            <input
                                                type="text"
                                                name="username"
                                                className="form-control border-start-0 py-2"
                                                placeholder="Nhập tên đăng nhập"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                                style={{ borderColor: '#e0e0e0' }}
                                            />
                                        </div>
                                    </div>


                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-white">Loại tài khoản</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 ps-3">
                                                <Shield size={18} className="text-primary" />
                                            </span>
                                            <select
                                                name="roleId"
                                                className="form-select border-start-0 py-2"
                                                value={formData.roleId}
                                                onChange={handleChange}
                                                style={{ borderColor: '#e0e0e0' }}
                                            >
                                                <option value={2}>🏠 Người mua/thuê</option>
                                                <option value={3}>🏢 Chủ nhà/Môi giới</option>
                                            </select>
                                        </div>


                                        {/* <div className="col-md-6 mb-3">
                                            <label className="form-label fw-semibold text-white">Ảnh đại diện</label>
                                            <input
                                                type="file"
                                                name="avatar"
                                                className="form-control py-2"
                                                accept="image/*"
                                                onChange={handleChange}
                                                style={{ borderColor: '#e0e0e0' }}
                                            />
                                        </div> */}
                                    </div>





                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-semibold text-white">Mật khẩu</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-white border-end-0 ps-3">
                                                    <Lock size={18} className="text-primary" />
                                                </span>
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    name="password"
                                                    className="form-control border-start-0 py-2 pe-5"
                                                    placeholder="Nhập mật khẩu"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                    style={{ borderColor: '#e0e0e0' }}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-3 border-0"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    style={{ zIndex: 5, color: '#6c757d' }}
                                                >
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-semibold text-white">Xác nhận mật khẩu</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-white border-end-0 ps-3">
                                                    <Lock size={18} className="text-primary" />
                                                </span>
                                                <input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    name="confirmPassword"
                                                    className="form-control border-start-0 py-2 pe-5"
                                                    placeholder="Nhập lại mật khẩu"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    required
                                                    style={{ borderColor: '#e0e0e0' }}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-3 border-0"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    style={{ zIndex: 5, color: '#6c757d' }}
                                                >
                                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100 fw-bold rounded-3 shadow-sm py-3 mt-2"
                                        disabled={loading}
                                        style={{
                                            background: 'linear-gradient(45deg, black, cornflowerblue)',
                                            border: 'none'
                                        }}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Đang tạo tài khoản...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-user-plus me-2"></i>
                                                Tạo tài khoản
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="text-center mt-4">
                                    <span className="text-white small">Đã có tài khoản? </span>
                                    <Link to="/login" className="fw-bold text-primary text-decoration-none">
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