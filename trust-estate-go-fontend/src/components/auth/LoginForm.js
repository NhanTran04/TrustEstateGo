import React, { useState } from 'react';
import { User } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const LoginForm = ({ onClose, onSwitchToRegister }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const userData = {
                id: 1,
                firstName: 'Nguyen',
                lastName: 'Van A',
                email: 'user@example.com',
                roles: [{ name: 'USER' }]
            };
            const token = 'mock-jwt-token-' + Date.now();

            login(userData, token);
            setLoading(false);
            onClose();
        }, 1000);
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 rounded-4 shadow-lg">
                    <div className="modal-header border-0 pb-0">
                        <div className="w-100 text-center">
                            <div className="bg-primary rounded-circle d-inline-flex p-3 mb-3">
                                <User className="text-white" size={32} />
                            </div>
                            <h4 className="modal-title fw-bold text-primary">Đăng nhập</h4>
                            <p className="text-muted mb-0">Chào mừng bạn quay lại!</p>
                        </div>
                        <button type="button" className="btn-close position-absolute top-0 end-0 m-3" onClick={onClose}></button>
                    </div>
                    <div className="modal-body px-5 pb-5">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Tên đăng nhập</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg rounded-3 border-2"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    placeholder="Nhập tên đăng nhập"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Mật khẩu</label>
                                <input
                                    type="password"
                                    className="form-control form-control-lg rounded-3 border-2"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="Nhập mật khẩu"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold rounded-3 shadow-sm" disabled={loading}>
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
                            <button className="btn btn-link p-0 fw-semibold text-decoration-none" onClick={onSwitchToRegister}>
                                Đăng ký ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;