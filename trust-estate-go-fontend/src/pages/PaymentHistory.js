import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Container, Card, Badge, Row, Col } from "react-bootstrap";
import dayjs from "dayjs";
import { authApi, endpoints } from "../services/api.js";
import {
    CreditCard,
    Calendar,
    Package,
    DollarSign,
    CheckCircle,
    Clock,
    TrendingUp,
    FileText
} from "lucide-react";
import "../styles/PaymentHistory.css";

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({
        totalPayments: 0,
        totalAmount: 0,
        successPayments: 0
    });

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await authApi().post(`${endpoints.payments}/history`);
                setPayments(res.data);

                // Calculate statistics
                const totalAmount = res.data
                    .filter(p => p.isPay)
                    .reduce((sum, p) => sum + (p.packagePrice || 0), 0);

                const successPayments = res.data.filter(p => p.isPay).length;

                setStats({
                    totalPayments: res.data.length,
                    totalAmount,
                    successPayments
                });
            } catch (err) {
                setError("Không thể tải lịch sử thanh toán");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const getPaymentMethodIcon = (method) => {
        const methodIcons = {
            'momo': '💰',
            'banking': '🏦',
            'credit_card': '💳',
            'zalopay': '💸'
        };
        return methodIcons[method] || '💳';
    };

    const getPaymentMethodText = (method) => {
        const methodTexts = {
            'momo': 'Ví MoMo',
            'banking': 'Chuyển khoản',
            'credit_card': 'Thẻ tín dụng',
            'zalopay': 'ZaloPay'
        };
        return methodTexts[method] || method || 'N/A';
    };

    if (loading) {
        return (
            <div className="payment-history-loading">
                <div className="loading-content">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">Đang tải lịch sử thanh toán...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <Container className="payment-history-container">
                <Alert variant="danger" className="alert-custom">
                    <div className="d-flex align-items-center">
                        <div className="alert-icon">⚠️</div>
                        <div>
                            <h6 className="mb-1">Lỗi tải dữ liệu</h6>
                            <p className="mb-0">{error}</p>
                        </div>
                    </div>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="payment-history-container">
            {/* Header */}
            <div className="payment-header">
                <div className="header-content">

                    <div>
                        <h1 className="page-title">Lịch sử thanh toán</h1>
                        <p className="page-subtitle">Theo dõi tất cả giao dịch của bạn</p>
                    </div>
                    <div className="header-icon">
                        <FileText size={32} />
                    </div>
                </div>
            </div>

            {/* Statistics Cards */}
            {payments.length > 0 && (
                <Row className="stats-row g-3 mb-4">
                    <Col md={4}>
                        <Card className="stat-card total-payments">
                            <Card.Body>
                                <div className="stat-content">
                                    <div className="stat-icon">
                                        <TrendingUp size={24} />
                                    </div>
                                    <div className="stat-info">
                                        <h3 className="stat-number">{stats.totalPayments}</h3>
                                        <p className="stat-label">Tổng giao dịch</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="stat-card success-payments">
                            <Card.Body>
                                <div className="stat-content">
                                    <div className="stat-icon">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div className="stat-info">
                                        <h3 className="stat-number">{stats.successPayments}</h3>
                                        <p className="stat-label">Giao dịch thành công</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="stat-card total-amount">
                            <Card.Body>
                                <div className="stat-content">
                                    <div className="stat-icon">
                                        <DollarSign size={24} />
                                    </div>
                                    <div className="stat-info">
                                        <h3 className="stat-number">
                                            {stats.totalAmount.toLocaleString()} ₫
                                        </h3>
                                        <p className="stat-label">Tổng tiền đã thanh toán</p>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}

            {/* Payment History Table */}
            <Card className="payment-table-card">
                <Card.Header className="table-header">
                    <div className="d-flex align-items-center">
                        <CreditCard size={20} className="me-2" />
                        <h5 className="mb-0">Chi tiết giao dịch</h5>
                    </div>
                    <Badge bg="primary" className="table-badge">
                        {payments.length} giao dịch
                    </Badge>
                </Card.Header>
                <Card.Body className="p-0">
                    {payments.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">💳</div>
                            <h4>Chưa có giao dịch nào</h4>
                            <p>Bạn chưa thực hiện thanh toán nào trong hệ thống</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <Table hover className="payment-table">
                                <thead>
                                    <tr>
                                        <th className="text-center">STT</th>
                                        <th>
                                            <div className="table-header-cell">
                                                <Package size={16} />
                                                <span>Gói dịch vụ</span>
                                            </div>
                                        </th>
                                        <th className="text-end">
                                            <div className="table-header-cell">
                                                <DollarSign size={16} />
                                                <span>Số tiền</span>
                                            </div>
                                        </th>
                                        <th>Phương thức</th>
                                        <th>
                                            <div className="table-header-cell">
                                                <Calendar size={16} />
                                                <span>Thời gian</span>
                                            </div>
                                        </th>
                                        <th className="text-center">Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.map((p, index) => (
                                        <tr key={p.id} className="payment-row">
                                            <td className="text-center">
                                                <div className="payment-index">
                                                    {index + 1}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="package-info">
                                                    <div className="package-name">
                                                        {p.packageName}
                                                    </div>
                                                    {p.packageDescription && (
                                                        <div className="package-description">
                                                            {p.packageDescription}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="text-end">
                                                <div className="amount-cell">
                                                    <span className="amount">
                                                        {p.packagePrice?.toLocaleString()} ₫
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="payment-method">
                                                    <span className="method-icon">
                                                        {getPaymentMethodIcon(p.paymentMethod)}
                                                    </span>
                                                    <span className="method-text">
                                                        {getPaymentMethodText(p.paymentMethod)}
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="date-cell">
                                                    {p.paidAt ? (
                                                        <>
                                                            <div className="date">
                                                                {dayjs(p.paidAt).format("DD/MM/YYYY")}
                                                            </div>
                                                            <div className="time">
                                                                {dayjs(p.paidAt).format("HH:mm")}
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <span className="text-muted">Chưa thanh toán</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                {p.isPay ? (
                                                    <Badge bg="success" className="status-badge success">
                                                        <CheckCircle size={12} className="me-1" />
                                                        Thành công
                                                    </Badge>
                                                ) : (
                                                    <Badge bg="warning" className="status-badge pending">
                                                        <Clock size={12} className="me-1" />
                                                        Chờ thanh toán
                                                    </Badge>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PaymentHistory;