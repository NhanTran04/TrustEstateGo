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
        localStorage.setItem('token', data.token); // backend trả JWT
        localStorage.setItem('user', JSON.stringify(data.user));
        return Promise.resolve();
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return Promise.resolve();
    },

    checkAuth: () =>
        localStorage.getItem('token') ? Promise.resolve() : Promise.reject(),

    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    getPermissions: () => {
        const user = localStorage.getItem('user');
        return user ? Promise.resolve(JSON.parse(user).roles) : Promise.resolve([]);
    },

    getIdentity: () => {
        const user = localStorage.getItem('user');
        return user ? Promise.resolve(JSON.parse(user)) : Promise.reject();
    }
};
