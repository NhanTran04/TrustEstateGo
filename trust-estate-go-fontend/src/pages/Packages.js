import React, { useEffect, useState } from "react";
import { authApi, endpoints } from "../services/api.js";
import '../styles/Package.css'

const Packages = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const res = await authApi().get(endpoints.packages);
                setPackages(res.data.result);
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
            approvalLink
                ? window.location.href = approvalLink
                : alert("Không lấy được link thanh toán!");
        } catch (err) {
            console.error("Error creating order:", err);
            alert("Tạo đơn thanh toán thất bại!");
        }
    };

    return (
        <div className="container py-5">
            {/* Header Section */}
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-gradient">Gói Dịch Vụ</h1>
                <p className="lead text-muted">Lựa chọn gói dịch vụ phù hợp với nhu cầu của bạn</p>
            </div>

            {/* Packages Grid */}
            <div className="row g-4">
                {packages.map((pkg, index) => (
                    <div className="col-lg-4 col-md-6" key={pkg.id}>
                        <div className={`card package-card h-100 border-0 shadow-lg transition-all hover-lift ${index % 3 === 0 ? 'gradient-primary' :
                            index % 3 === 1 ? 'gradient-secondary' : 'gradient-success'
                            }`}>
                            <div className="card-body p-4 d-flex flex-column position-relative">
                                {/* Decorative Icon */}
                                <div className="icon-wrapper mb-3">
                                    <i className={`bi ${index % 3 === 0 ? 'bi-star-fill' :
                                        index % 3 === 1 ? 'bi-award' : 'bi-lightning-charge'
                                        } display-5 text-white opacity-75`}></i>
                                </div>

                                <h4 className="card-title fw-bold text-white mb-3">{pkg.name}</h4>

                                <p className="card-text text-white-70 mb-4 flex-grow-1">{pkg.description}</p>

                                <div className="feature-list mb-4">
                                    <div className="d-flex align-items-center mb-2">
                                        <i className="bi bi-clock text-white me-2"></i>
                                        <span className="text-white">Thời hạn: {pkg.duration} ngày</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-check-circle text-white me-2"></i>
                                        <span className="text-white">Hỗ trợ 24/7</span>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="price-section mb-4">
                                    <h3 className="text-white fw-bold display-6">
                                        {pkg.price.toLocaleString()} VND
                                    </h3>
                                </div>

                                {/* Buy Button */}
                                <button
                                    className="btn btn-light btn-lg w-100 fw-bold text-dark rounded-pill py-3"
                                    onClick={() => handleBuy(pkg.id)}
                                >
                                    Mua Ngay <i className="bi bi-arrow-right ms-2"></i>
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