import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Alert, Button } from 'react-bootstrap';
import { Clock, CheckCircle, AlertTriangle, XOctagon, FileText, User } from 'lucide-react';
import { authApi, endpoints } from '../services/api';
// import { useNavigate } from 'react-router-dom'; // nếu cần điều hướng

const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    try {
        const date = new Date(isoString);
        return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    } catch {
        return isoString;
    }
};

const Reports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true); // Bắt đầu là true để hiển thị Spinner
    const [error, setError] = useState(null);

    const fetchReports = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await authApi().get(endpoints.reports);
            setReports(res.data.result.content);

        } catch (err) {
            console.error("Lỗi tải lịch sử báo cáo:", err);
            setError("Không thể tải lịch sử khiếu nại. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);
    const ReportItem = ({ report }) => {
        const statusIcon = report.status
            ? <CheckCircle size={16} className="text-success me-1" />
            : <Clock size={16} className="text-warning me-1" />;

        const statusText = report.status ? "Đã xử lý" : "Đang chờ xử lý";
        const statusVariant = report.status ? "success" : "warning";

        return (
            <Card className="mb-3 shadow-sm">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col xs={12} md={4}>
                            <div className="d-flex align-items-center">
                                <img
                                    src={report.propertyImage || 'https://via.placeholder.com/150x100?text=No+Image'}
                                    alt={report.propertyTitle}
                                    style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                                    className="me-3"
                                />
                                <div>
                                    <h6 className="mb-0 text-primary">{report.propertyTitle || 'Không rõ tiêu đề'}</h6>
                                    <small className="text-muted">ID BĐS: #{report.propertyId}</small>
                                </div>
                            </div>
                        </Col>

                        <Col xs={12} md={4} className="mt-2 mt-md-0">
                            <p className="mb-1 small fw-bold d-flex align-items-center">
                                <FileText size={14} className="me-1 text-info" /> Lý do:
                            </p>
                            <p className="mb-0 small text-wrap" style={{ maxHeight: '40px', overflow: 'hidden' }} title={report.reason}>
                                {report.reason}
                            </p>
                        </Col>

                        <Col xs={6} md={2} className="mt-2 mt-md-0">
                            <p className="mb-1 small fw-bold">Thời gian:</p>
                            <small className="text-muted">{formatDateTime(report.createdAt)}</small>
                        </Col>
                        <Col xs={6} md={2} className="text-end mt-1 mt-md-0 pe-3">
                            <Badge bg={statusVariant} className="p-2">
                                {statusText}
                            </Badge>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Đang tải lịch sử khiếu nại...</p>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h2 className="mb-4 d-flex align-items-center">
                <XOctagon size={28} className="me-3 text-danger" />
                Lịch sử Khiếu nại (Report History)
            </h2>
            <p className="text-muted mb-4">Tổng cộng: <Badge bg="secondary">{reports.length}</Badge> báo cáo</p>

            {error && <Alert variant="danger">{error}</Alert>}

            {reports.length === 0 && !error ? (
                <div className="text-center py-5">
                    <AlertTriangle size={32} className="text-info mb-3" />
                    <h4>Chưa có khiếu nại nào</h4>
                    <p className="text-muted">Bạn chưa gửi bất kỳ khiếu nại nào về bất động sản.</p>
                </div>
            ) : (
                <div className="report-list">
                    {reports.map(report => (
                        <ReportItem key={report.id} report={report} />
                    ))}
                </div>
            )}
        </Container>
    );
};

export default Reports;