import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { api, endpoints } from '../services/api';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await login(formData);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center" style={{ paddingTop: '100px', paddingBottom: '50px', backgroundColor: '#f8f9ff' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card border-0 shadow-lg rounded-4">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <div className="bg-info rounded-circle d-inline-flex p-3 mb-3">
                                        <User className="text-white" size={32} />
                                    </div>
                                    <h2 className="fw-bold text-info">Đăng nhập</h2>
                                    <p className="text-muted">Chào mừng bạn quay lại TrustEstateGo</p>
                                </div>

                                {error && (
                                    <div className="alert alert-danger rounded-3" role="alert">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
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

                                    <div className="mb-4">
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

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                                            <label className="form-check-label small" htmlFor="rememberMe">
                                                Ghi nhớ đăng nhập
                                            </label>
                                        </div>
                                        <a href="#" className="small text-primary text-decoration-none">
                                            Quên mật khẩu?
                                        </a>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-info text-white btn-lg w-100 fw-bold rounded-3 shadow-sm"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Đang đăng nhập...
                                            </>
                                        ) : 'Đăng nhập'}
                                    </button>
                                </form>

                                <div className="text-center mt-4">
                                    <span className="text-muted">Chưa có tài khoản? </span>
                                    <Link to="/register" className="fw-semibold text-primary text-decoration-none">
                                        Đăng ký ngay
                                    </Link>
                                </div>

                                <div className="position-relative text-center my-4">
                                    <hr />
                                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
                                        Hoặc đăng nhập với
                                    </span>
                                </div>

                                <div className="row g-2">
                                    <div className="col-6">
                                        <button className="btn btn-outline-secondary w-100 rounded-3">
                                            <i className="fab fa-google me-2"></i>
                                            Google
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button className="btn btn-outline-primary w-100 rounded-3">
                                            <i className="fab fa-facebook me-2"></i>
                                            Facebook
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;