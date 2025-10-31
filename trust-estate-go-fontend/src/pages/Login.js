import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Home } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { api, endpoints } from '../services/api.js';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import backgroundURL from '../assets/background_form.png'

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const { loginGoogle } = useAuth();
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

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const idToken = credentialResponse.credential;
            const decoded = jwtDecode(idToken);
            const res = await api.post(`${endpoints.google}?idToken=${idToken}`);
            const { token, user } = res.data;
            loginGoogle(token, user);
            navigate("/");
        } catch (err) {
            console.error("Lỗi đăng nhập Google:", err);
            setError("Tài khoản chưa được tạo trong hệ thống hoặc token không hợp lệ.");
        }
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center position-relative"
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

            <div className="container" >
                <div className="row justify-content-center" >
                    <div className="col-md-6 col-lg-5 col-xl-4">
                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden ">
                            {/* Header với gradient */}
                            <div className="card-header bg-transparent border-0 text-center pt-4 pb-3">
                                <div className="d-inline-flex align-items-center justify-content-center mb-3">
                                    <div className="bg-white rounded-circle d-flex align-items-center justify-content-center p-3 shadow">
                                        <Home className="text-primary" size={32} />
                                    </div>
                                </div>
                            </div>

                            <div className="card-body p-4" style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
                                {error && (
                                    <div className="alert alert-danger rounded-3 border-0 shadow-sm" role="alert">
                                        <i className="fas fa-exclamation-circle me-2"></i>
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3" style={{ opacity: 1 }}>
                                        <label className="form-label fw-semibold text-dark">Tên đăng nhập</label>
                                        <div className="input-group input-group-lg">
                                            <span className="input-group-text bg-white border-end-0 ps-3">
                                                <User size={20} className="text-primary" />
                                            </span>
                                            <input
                                                type="text"
                                                className="form-control border-start-0 py-2"
                                                placeholder="Nhập tên đăng nhập"
                                                value={formData.username}
                                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                required
                                                style={{ borderColor: '#e0e0e0' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-dark">Mật khẩu</label>
                                        <div className="input-group input-group-lg">
                                            <span className="input-group-text bg-white border-end-0 ps-3">
                                                <Lock size={20} className="text-primary" />
                                            </span>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control border-start-0 py-2 pe-5"
                                                placeholder="Nhập mật khẩu"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                required
                                                style={{ borderColor: '#e0e0e0' }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-link position-absolute end-0 top-50 translate-middle-y me-3 border-0"
                                                onClick={() => setShowPassword(!showPassword)}
                                                style={{ zIndex: 5, color: '#6c757d' }}
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="rememberMe"
                                                style={{ backgroundColor: 'rgb(13 110 253)', borderColor: '#667eea' }}
                                            />
                                            <label className="form-check-label small text-dark" htmlFor="rememberMe">
                                                Ghi nhớ đăng nhập
                                            </label>
                                        </div>
                                        <a href="#" className="small text-primary text-decoration-none fw-semibold">
                                            Quên mật khẩu?
                                        </a>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg w-100 fw-bold rounded-3 shadow-sm py-3 mb-3"
                                        disabled={loading}
                                        style={{
                                            background: 'linear-gradient(70deg, rgb(30, 56, 203), rgb(119 190 227))',
                                            border: 'none'
                                        }}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Đang đăng nhập...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-sign-in-alt me-2"></i>
                                                Đăng nhập
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="text-center mt-3">
                                    <span className="text-muted">Chưa có tài khoản? </span>
                                    <Link to="/register" className="fw-bold text-primary text-decoration-none">
                                        Đăng ký ngay
                                    </Link>
                                </div>

                                <div className="position-relative text-center my-4">
                                    <hr className="text-muted" />
                                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">
                                        Hoặc tiếp tục với
                                    </span>
                                </div>

                                <div className="text-center">
                                    <GoogleLogin
                                        onSuccess={handleGoogleLogin}
                                        onError={() => setError("Đăng nhập Google thất bại.")}
                                        theme="filled_blue"
                                        size="large"
                                        text="continue_with"
                                        shape="rectangular"
                                    />
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