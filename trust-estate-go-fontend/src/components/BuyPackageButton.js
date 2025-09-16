// src/components/BuyPackageButton.js
import React from "react";
import api, { endpoints } from "../services/api";

function BuyPackageButton({ packageId }) {
  const handleBuy = async () => {
    try {
      // Gọi backend để tạo order
      const res = await api.post(endpoints.createPayment(packageId));
      const { approvalLink } = res.data;

      if (approvalLink) {
        // Redirect sang PayPal cho user login/approve
        window.location.href = approvalLink;
      } else {
        alert("Không lấy được approval link!");
      }
    } catch (err) {
      console.error("Lỗi tạo order:", err);
      alert("Có lỗi khi tạo order!");
    }
  };

  return <button onClick={handleBuy}>Mua gói {packageId}</button>;
}

export default BuyPackageButton;
