import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Award, Users, Globe } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

import { useProperty } from '../contexts/PropertyContext';
import HeroSection from '../components/layout/HeroSection';
import PropertyTypeSection from '../components/layout/PropertyTypeSection';
import ChatBox from '../components/ChatBox';

const Home = () => {
    const navigate = useNavigate();
    const { handleSaveProperty, savedProperties, setSearchQuery, properties, refetchProperties } = useProperty();
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [showButton, setShowButton] = useState(false);
    // const [stats, setStats] = useState({
    //     totalProperties: 0,
    //     successfulTransactions: 0,
    //     partners: 0
    // });

    useEffect(() => {
        if (Array.isArray(properties)) {
            const featured = properties.slice(0, 6);
            setFeaturedProperties(featured);
        } else {
            setFeaturedProperties([]);
        }
    }, [properties]);

    useEffect(() => {
        refetchProperties(1);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 1200);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <div
                className="position-relative overflow-hidden d-flex align-items-center justify-content-center text-white"
                style={{
                    backgroundImage: `url("https://images.mansionglobal.com/im-692933?width=1299&size=1.6&pixel_ratio=1.5")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "500px",
                }}
            >

            </div>

            {/* Hero Section */}
            <HeroSection setSearchQuery={setSearchQuery} />

            {/* Stats Section - sử dụng data từ API */}
            <div className="container py-5">
                <div className="row g-4">
                    {[
                        { icon: Building, number: '10,000+', label: 'Bất động sản', color: 'primary', bg: 'primary' },
                        { icon: Award, number: '5,000+', label: 'Giao dịch thành công', color: 'rgb(72, 215, 149)', bg: 'success' },
                        { icon: Users, number: '500+', label: 'Đối tác uy tín', color: 'warning', bg: 'warning' },
                        { icon: Globe, number: '24/7', label: 'Hỗ trợ khách hàng', color: 'info', bg: 'info' }
                    ].map((stat, index) => {
                        const IconComponent = stat.icon;
                        const isCustomColor = stat.color.startsWith('rgb'); // Kiểm tra có phải màu tùy chỉnh không

                        return (
                            <div key={index} className="col-md-3">
                                <div className="card border-0 shadow-sm h-100 text-center hover-lift">
                                    <div className="card-body p-4">
                                        {/* Nền icon */}
                                        <div
                                            className="rounded-circle d-inline-flex p-3 mb-3 justify-content-center align-items-center"
                                            style={{
                                                backgroundColor: isCustomColor
                                                    ? 'rgba(72, 215, 149, 0.1)' // Nền nhạt cho màu RGB
                                                    : `var(--bs-${stat.bg}-bg-subtle)`,
                                            }}
                                        >
                                            <IconComponent
                                                size={32}
                                                style={{
                                                    color: isCustomColor
                                                        ? stat.color
                                                        : `var(--bs-${stat.color})`,
                                                }}
                                            />
                                        </div>

                                        {/* Số liệu */}
                                        <h3
                                            className="fw-bold mb-2"
                                            style={{
                                                color: isCustomColor
                                                    ? stat.color
                                                    : `var(--bs-${stat.color})`,
                                            }}
                                        >
                                            {stat.number}
                                        </h3>

                                        {/* Nhãn */}
                                        <p className="text-muted mb-0 fw-semibold">{stat.label}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>


            {/* Categories Section */}
            <PropertyTypeSection />

            {/* Featured Properties Section */}
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h2 className="fw-bold text-dark mb-3">Bất động sản nổi bật</h2>
                    <p className="text-muted fs-5">Những lựa chọn hàng đầu được khách hàng yêu thích nhất</p>
                </div>
                <div className="row">
                    {featuredProperties.map(property => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            onSave={handleSaveProperty}
                            isSaved={savedProperties.includes(property.id)}
                        />
                    ))}
                </div>
                <div className="text-center mt-5">
                    <button
                        className="btn btn-dark btn-lg fw-semibold rounded-0 px-5"
                        onClick={() => navigate('/properties')}
                        style={{ background: "linear-gradient(45deg, black, transparent)" }}
                    >
                        Xem tất cả bất động sản
                    </button>
                </div>
            </div>
            <ChatBox />
            {showButton && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    style={{
                        position: "fixed",
                        bottom: "100px",
                        right: "15px",
                        backgroundColor: "deepskyblue",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "70px",
                        height: "70px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 9999,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                        fontSize: '30px'
                    }}
                >
                    <i class="bi bi-arrow-up-circle"></i>
                </button>
            )}
        </div>
    );
};

export default Home;