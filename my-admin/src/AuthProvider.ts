// src/authProvider.ts
import { AuthProvider } from 'react-admin';

const apiUrl = "http://localhost:8080/trustestatego/api";

export const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const request = new Request(`${apiUrl}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'include',
        });

        const response = await fetch(request);

        if (response.status < 200 || response.status >= 300) {
            throw new Error('Sai tài khoản hoặc mật khẩu');
        }

        const data = await response.json();

        const roles = (data.user?.roles || []).map((r: any) => r.name);
        const allowed = roles.includes("ADMIN") || roles.includes("STAFF");

        if (!allowed) {
            throw new Error("Bạn không có quyền truy cập hệ thống");
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        return Promise.resolve();
    },


    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return Promise.resolve();
    },

    checkAuth: () => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        if (!token || !userStr) return Promise.reject();

        const user = JSON.parse(userStr);
        const roles = (user.roles || []).map((r: any) => r.name);
        const allowed = roles.includes("ADMIN") || roles.includes("STAFF");

        return allowed ? Promise.resolve() : Promise.reject();
    },


    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) return Promise.resolve([]);

        const user = JSON.parse(userStr);
        // Lấy danh sách tên role
        const roles = (user.roles || []).map((r: any) => r.name);
        return Promise.resolve(roles);
    },

    getIdentity: () => {
        const user = localStorage.getItem('user');
        return user ? Promise.resolve(JSON.parse(user)) : Promise.reject();
    }
};
