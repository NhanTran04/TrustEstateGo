import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { authApi, endpoints } from "../services/api.js";

function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("processing"); // "processing", "success", "error"
    const called = useRef(false); // chặn gọi API nhiều lần

    useEffect(() => {
        const capturePayment = async () => {
            if (called.current) return; // chỉ chạy 1 lần
            called.current = true;

            const orderId = searchParams.get("token");
            if (!orderId) {
                setStatus("error");
                return;
            }

            try {
                const res = await authApi().post(`${endpoints.payments}/capture/${orderId}`);
                console.log("Capture thành công:", res.data);
                setStatus("success");
            } catch (err) {
                console.error("Capture lỗi:", err?.response?.data || err.message);
                // chỉ set error nếu chưa success
                if (status !== "success") setStatus("error");
            }
        };

        capturePayment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container text-center mt-5">
            {status === "processing" && (
                <>
                    <div className="spinner-border text-primary mb-3" role="status"></div>
                    <h4>Đang xử lý thanh toán...</h4>
                </>
            )}
            {status === "success" && (
                <div className="alert alert-success">
                    <h4>Thanh toán thành công!</h4>
                    <p>Bạn đã mua gói dịch vụ thành công.</p>
                </div>
            )}
            {status === "error" && (
                <div className="alert alert-danger">
                    <h4>Thanh toán thất bại!</h4>
                    <p>Đơn hàng không hợp lệ hoặc đã được xử lý trước đó.</p>
                </div>
            )}
        </div>
    );
}

export default PaymentSuccess;
