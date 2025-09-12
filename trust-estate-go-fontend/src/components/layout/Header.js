import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Plus, User, Bell, LogOut, Building, X, Menu } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    const getCurrentPage = () => {
        const path = location.pathname;
        if (path === '/') return 'home';
        if (path === '/properties') return 'properties';
        if (path === '/rentals') return 'rentals';
        if (path === '/saved') return 'saved';
        if (path === '/profile') return 'profile';
        return 'home';
    };

    const currentPage = getCurrentPage();

    return (
        <nav className="navbar navbar-expand-lg sticky-top shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)' }}>
            <div className="container-fluid px-4">
                <button
                    className="navbar-brand btn btn-link text-decoration-none fw-bold d-flex align-items-center p-0"
                    onClick={() => navigate('/')}
                    style={{ fontSize: '1.5rem' }}
                >
                    <div className="d-flex align-items-center">
                        <div className="bg-primary rounded-3 p-2 me-3 shadow-sm">
                            <Home className="text-white" size={24} />
                        </div>
                        <span className="text-primary">TrustEstateGo</span>
                    </div>
                </button>

                <button
                    className="navbar-toggler border-0 shadow-sm"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className={`collapse navbar-collapse ${showMobileMenu ? 'show' : ''}`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {[
                            { key: 'home', label: 'Trang chủ', path: '/' },
                            { key: 'properties', label: 'Mua bán', path: '/properties' },
                            { key: 'rentals', label: 'Cho thuê', path: '/rentals' },
                        ].map(item => (
                            <li key={item.key} className="nav-item mx-1">
                                <button
                                    className={`nav-link btn btn-link text-decoration-none fw-semibold px-3 py-2 rounded-pill transition-all ${currentPage === item.key ? 'bg-primary text-white shadow-sm' : 'text-dark hover-bg-light'
                                        }`}
                                    onClick={() => navigate(item.path)}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                        {user && (
                            <li className="nav-item mx-1">
                                <button
                                    className={`nav-link btn btn-link text-decoration-none fw-semibold px-3 py-2 rounded-pill ${currentPage === 'saved' ? 'bg-primary text-white shadow-sm' : 'text-dark'
                                        }`}
                                    onClick={() => navigate('/saved')}
                                >
                                    Đã lưu
                                </button>
                            </li>
                        )}
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        {user ? (
                            <>
                                <button
                                    className="btn btn-outline-primary fw-semibold rounded-pill px-4 shadow-sm"
                                    onClick={() => {/* Xử lý đăng tin */ }}
                                >
                                    <Plus size={16} className="me-2" />
                                    Đăng tin
                                </button>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-primary dropdown-toggle d-flex align-items-center fw-semibold rounded-pill px-4 shadow-sm"
                                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                                    >
                                        <User size={16} className="me-2" />
                                        {user.firstName} {user.lastName}
                                    </button>
                                    {showUserDropdown && (
                                        <ul className="dropdown-menu dropdown-menu-end show shadow-lg border-0 rounded-3" style={{ minWidth: '220px' }}>
                                            <li>
                                                <button
                                                    className="dropdown-item d-flex align-items-center py-2 rounded-2 m-1"
                                                    onClick={() => {
                                                        navigate('/profile');
                                                        setShowUserDropdown(false);
                                                    }}
                                                >
                                                    <User size={16} className="me-3 text-primary" />
                                                    Hồ sơ cá nhân
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="dropdown-item d-flex align-items-center py-2 rounded-2 m-1"
                                                    onClick={() => {
                                                        // navigate('/my-properties');
                                                        setShowUserDropdown(false);
                                                    }}
                                                >
                                                    <Building size={16} className="me-3 text-success" />
                                                    BĐS của tôi
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="dropdown-item d-flex align-items-center py-2 rounded-2 m-1"
                                                    onClick={() => {
                                                        // navigate('/notifications');
                                                        setShowUserDropdown(false);
                                                    }}
                                                >
                                                    <Bell size={16} className="me-3 text-warning" />
                                                    Thông báo
                                                </button>
                                            </li>
                                            <li><hr className="dropdown-divider mx-2" /></li>
                                            <li>
                                                <button className="dropdown-item text-danger d-flex align-items-center py-2 rounded-2 m-1" onClick={logout}>
                                                    <LogOut size={16} className="me-3" />
                                                    Đăng xuất
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-outline-primary fw-semibold rounded-pill px-4"
                                    onClick={() => navigate('/login')}
                                >
                                    Đăng nhập
                                </button>
                                <button
                                    className="btn btn-primary fw-semibold rounded-pill px-4 shadow-sm"
                                    onClick={() => navigate('/register')}
                                >
                                    Đăng ký
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;