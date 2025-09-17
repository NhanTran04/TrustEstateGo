import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endpoints = {
    login: "/auth/login",
    register: "/auth/register",
    currentUser: "/users/current-user",
    users: "/users",
    properties: "/properties",
    categories: "/categories",
    packages: "/packages",
    propertySave: "/property-saves",
    reports: "/reports",
    reviews: "/reviews",
    propertyTypes: "/property-types",
    payments: "/payments",
    chatRoom: (sellerId) => `/chat/room/${sellerId}`,
    chatRooms: "/chat/rooms",
    chatMessages: (roomId) => `/chat/messages/${roomId}`, // GET
    ws: "http://localhost:8080/trustestatego/ws",
    // stats: "/stats"
};

// Tạo instance của axios cho API không cần token
export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// API có token (user đã đăng nhập)
export const authApi = () => {
    const token = localStorage.getItem("token");
    const instance = axios.create({
        baseURL: BASE_URL,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    // Thêm interceptor cho lỗi 401
    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                console.log("Token expired or invalid, redirecting to login");
                localStorage.removeItem("token");
                localStorage.removeItem("user");

            }
            return Promise.reject(error);
        }
    );

    return instance;
};

// Thêm response interceptor cho api (không bắt buộc)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);