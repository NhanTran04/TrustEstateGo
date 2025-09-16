import React, { useState, useEffect, createContext, useContext } from 'react';
import { api, authApi, endpoints } from '../services/api';
import { Navigate, useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (token) {
            if (savedUser) {
                setUser(JSON.parse(savedUser)); // hiển thị ngay user cũ
            }
            fetchCurrentUser(); // cập nhật dữ liệu mới từ server
        } else {
            setLoading(false);
        }
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const response = await authApi().get(endpoints.currentUser);
            setUser(response.data.result);
            localStorage.setItem("user", JSON.stringify(response.data.result));
        } catch (err) {
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (loginData) => {
        try {
            const response = await api.post(endpoints.login, loginData);
            const { token, user: userData } = response.data;

            const allowedRoles = ["USER", "SELLER"];
            const hasValidRole = userData.roles?.some(r => allowedRoles.includes(r.name));

            if (!hasValidRole) {
                return {
                    success: false,
                    error: "Tài khoản của bạn không có quyền đăng nhập vào hệ thống."
                };
            }

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);


            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.message || 'Đăng nhập thất bại'
            };
        }
    };

    useEffect(() => {
        const checkTokenExpiration = () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    const expirationTime = payload.exp * 1000;
                    if (Date.now() >= expirationTime) {
                        logout();
                    }
                } catch (err) {
                    console.error('Error checking token expiration:', err);
                }
            }
        };

        // Check mỗi phút
        const interval = setInterval(checkTokenExpiration, 60000);
        return () => clearInterval(interval);
    }, []);


    // Thay thế hàm logout hiện tại bằng:
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        navigate('/'); // Thêm điều hướng về trang chủ
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;