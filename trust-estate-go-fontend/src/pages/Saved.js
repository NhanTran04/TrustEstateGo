import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import { useProperty } from '../contexts/PropertyContext';

const Saved = () => {
    const navigate = useNavigate();
    const { properties, savedProperties, handleSaveProperty } = useProperty();

    const savedPropertiesData = properties.filter(p => savedProperties.includes(p.id));

    return (
        <div style={{ paddingTop: '100px' }}>
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold text-dark mb-3">Bất động sản đã lưu</h2>
                    <p className="text-muted">Quản lý danh sách các BDS bạn yêu thích</p>
                </div>

                {savedPropertiesData.length > 0 ? (
                    <div className="row">
                        {savedPropertiesData.map(property => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                onSave={handleSaveProperty}
                                isSaved={true}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-5">
                        <div className="bg-light rounded-circle p-4 d-inline-block mb-4">
                            <Heart size={48} className="text-muted" />
                        </div>
                        <h5 className="text-dark mb-3">Chưa có bất động sản nào được lưu</h5>
                        <p className="text-muted mb-4">Hãy khám phá và lưu những BDS yêu thích của bạn</p>
                        <button
                            className="btn btn-primary px-4 py-2 rounded-pill"
                            onClick={() => navigate('/properties')}
                        >
                            <Search size={16} className="me-2" />
                            Khám phá ngay
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Saved;