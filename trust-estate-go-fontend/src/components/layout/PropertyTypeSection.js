import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Home, Award, User, ArrowRight } from 'lucide-react';
import { api, authApi, endpoints } from '../../services/api';

const PropertyTypeSection = () => {
    const navigate = useNavigate();
    const [propertyTypes, setPropertyTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPropertyTypes();
    }, []);

    const fetchPropertyTypes = async () => {
        try {
            const response = await api.get(endpoints.propertyTypes);

            if (response.data && response.data.result && Array.isArray(response.data.result)) {
                // THÊM DỮ LIỆU GIẢ VỀ SỐ LƯỢNG
                const propertyTypesWithCount = response.data.result.map((type, index) => {
                    const counts = ['2,500+', '1,800+', '450+', '3,200+'];
                    return {
                        ...type,
                        count: counts[index] || '1,000+'
                    };
                });

                setPropertyTypes(propertyTypesWithCount);
            } else {
                setPropertyTypes([]);
            }
        } catch (err) {
            console.error('Error fetching property types:', err);

        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = () => {
        navigate('/properties');
    };

    const getPropertyTypeIcon = (propertyTypeValue) => {
        switch (propertyTypeValue) {
            case 'APARTMENT': return Building;
            case 'TOWNHOUSE': return Home;
            case 'VILLA': return Award;
            case 'RENTAL_ROOM': return User;
            default: return Building;
        }
    };

    const getCategoryGradient = (index) => {
        const gradients = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
        ];
        return gradients[index % gradients.length];
    };

    if (loading) {
        return (
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (propertyTypes.length === 0) {
        return (
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="text-center">
                        <p className="text-muted">Không có dữ liệu loại hình bất động sản</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-5 bg-light">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold text-dark mb-3">Loại hình bất động sản</h2>
                    <p className="text-muted lead">Khám phá các loại hình bất động sản phù hợp với nhu cầu của bạn</p>
                </div>

                <div className="row">
                    {propertyTypes.map((propertyType, index) => {
                        const IconComponent = getPropertyTypeIcon(propertyType.value);
                        return (
                            <div key={propertyType.value} className="col-lg-3 col-md-6 mb-4">
                                <div
                                    className="category-card hover-lift cursor-pointer"
                                    onClick={handleCategoryClick}
                                >
                                    <div
                                        className="icon-wrapper mb-3"
                                        style={{ background: getCategoryGradient(index) }}
                                    >
                                        <IconComponent size={32} className="text-white" />
                                    </div>
                                    <h5 className="fw-bold text-dark mb-2">{propertyType.label}</h5>
                                    <p className="text-muted small mb-3">{propertyType.description}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
                                            {propertyType.count}
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

export default PropertyTypeSection;