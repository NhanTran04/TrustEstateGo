import React, { useEffect, useState } from "react";
import { authApi, endpoints } from "../services/api.js";

const Packages = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await authApi().get(endpoints.packages);
                setPackages(res.data.result); // tùy backend trả về
            } catch (err) {
                console.error("Error loading packages:", err);
            }
        };

        fetchPackages();
    }, []);

    const handleBuy = async (packageId) => {
        try {
            const res = await authApi().post(`${endpoints.payments}/create/${packageId}`);
            const approvalLink = res.data.approvalLink;

            if (approvalLink) {
                window.location.href = approvalLink; // điều hướng sang PayPal
            } else {
                alert("Không lấy được link thanh toán!");
            }
        } catch (err) {
            console.error("Error creating order:", err);
            alert("Tạo đơn thanh toán thất bại!");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Danh sách gói dịch vụ</h2>
            <div className="row">
                {packages.map((pkg) => (
                    <div className="col-md-4 mb-4" key={pkg.id}>
                        <div className="card shadow-sm h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{pkg.name}</h5>
                                <p className="card-text">{pkg.description}</p>
                                <p className="fw-bold">Thời hạn: {pkg.duration} ngày</p>
                                <p className="fw-bold text-success">
                                    Giá: {pkg.price.toLocaleString()} VND
                                </p>
                                <button
                                    className="btn btn-primary mt-auto"
                                    onClick={() => handleBuy(pkg.id)}
                                >
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Packages;
