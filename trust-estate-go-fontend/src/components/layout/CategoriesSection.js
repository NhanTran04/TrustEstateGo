import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Home, Award, User, ArrowRight } from 'lucide-react';
import { useProperty } from '../../contexts/PropertyContext';

const CategoriesSection = () => {
    const navigate = useNavigate();
    const { setSelectedCategory } = useProperty();

    const categories = [
        {
            icon: Building,
            name: 'Chung cư',
            description: 'Căn hộ cao cấp, tiện nghi hiện đại',
            count: '2,500+',
            color: 'primary',
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        },
        {
            icon: Home,
            name: 'Nhà phố',
            description: 'Nhà phố, shophouse, townhouse',
            count: '1,800+',
            color: 'success',
            gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)'
        },
        {
            icon: Award,
            name: 'Biệt thự',
            description: 'Villa sang trọng, không gian rộng rãi',
            count: '450+',
            color: 'warning',
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        },
        {
            icon: User,
            name: 'Phòng trọ',
            description: 'Phòng trọ, ký túc xá giá hợp lý',
            count: '3,200+',
            color: 'info',
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        }
    ];

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
        navigate('/properties');
    };

    return (
        <section className="py-5 bg-light">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold text-dark mb-3">Danh mục bất động sản</h2>
                    <p className="text-muted lead">Khám phá các loại hình bất động sản phù hợp với nhu cầu của bạn</p>
                </div>

                <div className="row">
                    {categories.map((category, index) => {
                        const IconComponent = category.icon;
                        return (
                            <div key={index} className="col-lg-3 col-md-6 mb-4">
                                <div
                                    className="category-card hover-lift cursor-pointer"
                                    onClick={() => handleCategoryClick(category.name)}
                                >
                                    <div
                                        className="icon-wrapper mb-3"
                                        style={{ background: category.gradient }}
                                    >
                                        <IconComponent size={32} className="text-white" />
                                    </div>
                                    <h5 className="fw-bold text-dark mb-2">{category.name}</h5>
                                    <p className="text-muted small mb-3">{category.description}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className={`badge bg-${category.color} bg-opacity-10 text-${category.color} px-3 py-2 rounded-pill`}>
                                            {category.count} tin
                                        </span>
                                        <ArrowRight size={16} className="text-primary" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;