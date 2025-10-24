import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { api, endpoints } from '../services/api.js';
import { BsGenderAmbiguous, BsGenderTrans } from 'react-icons/bs';
import { TbAddressBook } from 'react-icons/tb';
import { FaAddressCard, FaBirthdayCake } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        // gender: '',
        // birthday: '',
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
                                                    name="lastName"
                                                    className="form-control border-start-0"
                                                    placeholder="Nhập họ"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
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
                                                    name="firstName"
                                                    className="form-control border-start-0"
                                                    placeholder="Nhập tên"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
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
                                                name="email"
                                                className="form-control border-start-0"
                                                placeholder="example@email.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Địa chỉ</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <FaAddressCard size={18} className="text-primary" />
                                            </span>
                                            <input
                                                type="text"
                                                name="address"
                                                className="form-control border-start-0"
                                                placeholder="Nhập địa chỉ"
                                                value={formData.address}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-semibold">Giới tính</label>

                                            <select
                                                name="gender"
                                                className="form-select"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">-- Chọn giới tính --</option>
                                                <option value={true}>Nam</option>
                                                <option value={false}>Nữ</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label fw-semibold">Ngày sinh</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <FaBirthdayCake size={18} className="text-primary" />
                                                </span>
                                                <input
                                                    type="date"
                                                    name="birthday"
                                                    className="form-control"
                                                    value={formData.birthday}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div> */}

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Số điện thoại</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <Phone size={18} className="text-primary" />
                                            </span>
                                            <input
                                                type="tel"
                                                name="phone"
                                                className="form-control border-start-0"
                                                placeholder="0901234567"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Ảnh đại diện</label>
                                        <input
                                            type="file"
                                            name="avatar"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Loại tài khoản</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                <Shield size={18} className="text-primary" />
                                            </span>
                                            <select
                                                className="form-select border-start-0"
                                                value={formData.roleId}
                                                onChange={handleChange}
                                            >
                                                <option value={2}>🏠 Người mua/thuê</option>
                                                <option value={3}>🏢 Chủ nhà/Môi giới</option>
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
                                                name="username"
                                                className="form-control border-start-0"
                                                placeholder="Nhập tên đăng nhập"
                                                value={formData.username}
                                                onChange={handleChange}
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
                                                    name="password"
                                                    className="form-control border-start-0 pe-5"
                                                    placeholder="Nhập mật khẩu"
                                                    value={formData.password}
                                                    onChange={handleChange}
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
                                                    name="confirmPassword"
                                                    className="form-control border-start-0 pe-5"
                                                    placeholder="Nhập lại mật khẩu"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
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