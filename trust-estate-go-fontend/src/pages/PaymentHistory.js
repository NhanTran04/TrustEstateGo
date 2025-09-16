import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Container } from "react-bootstrap";
import dayjs from "dayjs";
import { authApi, endpoints } from "../services/api";

const PaymentHistory = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await authApi().post(`${endpoints.payments}/history`);
                setPayments(res.data);
            } catch (err) {
                setError("Không thể tải lịch sử thanh toán");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center py-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (error) {
        return (
            <Container className="py-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h3 className="mb-4 fw-bold text-primary">📜 Lịch sử thanh toán</h3>
            {payments.length === 0 ? (
                <Alert variant="info">Bạn chưa có thanh toán nào.</Alert>
            ) : (
                <Table bordered hover responsive className="shadow-sm">
                    <thead className="table-primary">
                        <tr>
                            <th>#</th>
                            <th>Gói</th>
                            <th>Giá</th>
                            <th>Phương thức</th>
                            <th>Ngày thanh toán</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((p, index) => (
                            <tr key={p.id}>
                                <td>{index + 1}</td>
                                <td>{p.packageName}</td>
                                <td>{p.packagePrice?.toLocaleString()} ₫</td>
                                <td>{p.paymentMethod || "N/A"}</td>
                                <td>
                                    {p.paidAt
                                        ? dayjs(p.paidAt).format("DD/MM/YYYY HH:mm")
                                        : "Chưa thanh toán"}
                                </td>
                                <td>
                                    {p.isPay ? (
                                        <span className="badge bg-success">Đã thanh toán</span>
                                    ) : (
                                        <span className="badge bg-warning text-dark">
                                            Chưa thanh toán
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default PaymentHistory;
