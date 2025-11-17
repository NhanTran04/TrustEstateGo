import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../../assets/logo_.png';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="text-light py-5 mt-5" style={{ background: "linear-gradient(45deg, black, midnightblue)" }}>
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <div style={{ padding: '10px' }}>
              <img src={logo} alt="TrustEstateGo Logo" style={{ height: '80px', width: 'auto', display: 'block' }} />
            </div>

            <p className="mb-4">
              Nền tảng bất động sản hàng đầu Việt Nam, kết nối hàng triệu người với ngôi nhà mơ ước.
              Uy tín - Chất lượng - Minh bạch.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="btn btn-outline-light rounded-circle" style={{ width: '44px', height: '44px' }}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="btn btn-outline-light rounded-circle" style={{ width: '44px', height: '44px' }}>
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="btn btn-outline-light rounded-circle" style={{ width: '44px', height: '44px' }}>
                <i className="fab fa-zalo"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-3">
            <h6 className="text-warning fw-bold mb-3">Dành cho khách hàng</h6>
            <ul className="list-unstyled">
              {[
                { label: 'Mua bán', path: '/properties' },
                { label: 'Cho thuê', path: '/rentals' },
              ].map(item => (
                <li key={item.path} className="mb-2">
                  <button
                    className="btn btn-link text-light p-0 text-decoration-none"
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-2 col-md-3">
            <h6 className="text-warning fw-bold mb-3">Dành cho chủ nhà</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-light text-decoration-none">Đăng tin</a></li>
              <li className="mb-2"><a href="#" className="text-light text-decoration-none">Gói dịch vụ</a></li>
              <li className="mb-2"><a href="#" className="text-light text-decoration-none">Quản lý tin</a></li>
              <li className="mb-2"><a href="#" className="text-light text-decoration-none">Báo cáo</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3">
            <h6 className="text-warning fw-bold mb-3">Hỗ trợ</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-light text-decoration-none">Về chúng tôi</a></li>
              <li className="mb-2"><a href="#" className="text-light text-decoration-none">Liên hệ</a></li>
              <li className="mb-2"><a href="#" className="text-light text-decoration-none">Điều khoản</a></li>
              <li className="mb-2"><a href="#" className="text-light text-decoration-none">Bảo mật</a></li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3">
            <h6 className="text-warning fw-bold mb-3">Liên hệ</h6>
            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <Mail size={16} className="me-2 text-primary" />
                <small>info@trustestatego.vn</small>
              </div>
              <div className="d-flex align-items-center mb-2">
                <Phone size={16} className="me-2 text-primary" />
                <small>1900 xxxx</small>
              </div>
              <div className="d-flex align-items-center">
                <MapPin size={16} className="me-2 text-primary" />
                <small>TP. Hồ Chí Minh, Việt Nam</small>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4 opacity-25" />
      </div>
    </footer>
  );
};

export default Footer;