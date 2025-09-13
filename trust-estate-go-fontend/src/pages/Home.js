import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Award, Users, Globe } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

import { mockProperties } from '../data/mockData';
import { useProperty } from '../contexts/PropertyContext';
import HeroSection from '../components/layout/HeroSection';
import { authApi, endpoints } from '../services/api';
import PropertyTypeSection from '../components/layout/PropertyTypeSection';

const Home = () => {
    const navigate = useNavigate();
    const { handleSaveProperty, savedProperties, setSearchQuery, setSelectedCategory, properties } = useProperty();
    const [featuredProperties, setFeaturedProperties] = useState([]);
    const [stats, setStats] = useState({
        totalProperties: 0,
        successfulTransactions: 0,
        partners: 0
    });

    useEffect(() => {
        // Lấy featured properties (6 properties đầu tiên)
        if (Array.isArray(properties)) {
            const featured = properties.slice(0, 6);
            setFeaturedProperties(featured);
        } else {
            setFeaturedProperties([]);
        }
    }, [properties]);

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
                        { icon: Award, number: '5,000+', label: 'Giao dịch thành công', color: 'success', bg: 'success' },
                        { icon: Users, number: '500+', label: 'Đối tác uy tín', color: 'warning', bg: 'warning' },
                        { icon: Globe, number: '24/7', label: 'Hỗ trợ khách hàng', color: 'info', bg: 'info' }
                    ].map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={index} className="col-md-3">
                                <div className="card border-0 shadow-sm h-100 text-center hover-lift">
                                    <div className="card-body p-4">
                                        <div className={`bg-${stat.bg} bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3`}>
                                            <IconComponent size={32} className={`text-${stat.color}`} />
                                        </div>
                                        <h3 className={`fw-bold text-${stat.color} mb-2`}>{stat.number}</h3>
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
                        className="btn btn-primary btn-lg fw-semibold rounded-pill px-5"
                        onClick={() => navigate('/properties')}
                    >
                        Xem tất cả bất động sản
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;