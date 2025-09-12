import React from 'react';
import { Search, CheckCircle } from 'lucide-react';
import { useProperty } from '../../contexts/PropertyContext';

const HeroSection = () => {
    const { setSearchQuery } = useProperty();

    return (
        <section className="hero-section d-flex align-items-center p-3"
            style={{
                background: "lightBlue",
                minHeight: "400px"
            }}
        >
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 animate-slide-in">
                        <h1 className="display-3 fw-bold text-white mb-4">
                            Tìm kiếm ngôi nhà
                            <span className="d-block text-warning">mơ ước của bạn</span>
                        </h1>
                        <p className="lead text-white mb-4 opacity-90">
                            Khám phá hơn 10,000+ bất động sản chất lượng cao từ các chủ đầu tư uy tín.
                            Chúng tôi cam kết mang đến cho bạn trải nghiệm tìm kiếm nhà tốt nhất.
                        </p>

                        <div className="d-flex gap-3 mb-5">
                            <div className="d-flex align-items-center text-white">
                                <div className="bg-white bg-opacity-25 rounded-pill p-2 me-2">
                                    <CheckCircle size={16} />
                                </div>
                                <span>Miễn phí tư vấn</span>
                            </div>
                            <div className="d-flex align-items-center text-white">
                                <div className="bg-white bg-opacity-25 rounded-pill p-2 me-2">
                                    <CheckCircle size={16} />
                                </div>
                                <span>Pháp lý rõ ràng</span>
                            </div>
                            <div className="d-flex align-items-center text-white">
                                <div className="bg-white bg-opacity-25 rounded-pill p-2 me-2">
                                    <CheckCircle size={16} />
                                </div>
                                <span>Hỗ trợ 24/7</span>
                            </div>
                        </div>

                        <div className="search-hero animate-fade-in">
                            <div className="row g-3">
                                <div className="col-md-8">
                                    <div className="input-group input-group-lg">
                                        <span className="input-group-text bg-white border-0 text-primary">
                                            <Search size={20} />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control border-0 shadow-none"
                                            placeholder="Nhập tên dự án, địa điểm bạn muốn tìm..."
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            style={{ fontSize: '1rem' }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-warning btn-lg w-100 fw-bold rounded-pill">
                                        <Search size={18} className="me-2" />
                                        Tìm kiếm ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 text-center animate-float">
                        <img
                            src="https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/474080YcJ/anh-nha-anh-sang_115813641.jpg"
                            className="img-fluid rounded-4 shadow-lg"
                            alt="Real Estate"
                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;