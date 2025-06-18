import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import OrderDetailsDialog from "../components/OrderDetails";
import OrderList from "../components/OrderList";
import { useSnackbar } from "notistack"; // ✅ 알림 훅

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const { enqueueSnackbar } = useSnackbar(); // ✅ 알림 함수
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_BASE_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("주문 목록 불러오기 실패:", err);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const eventSource = new EventSource(`${API_BASE_URL}/sse/connect`);

    eventSource.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
      enqueueSnackbar(`🛎️ ${event.data}`, {
        variant: "default",
        autoHideDuration: 5000,
        anchorOrigin: { vertical: "bottom", horizontal: "left" },
        style: {
          backgroundColor: "#fff8dc", // 옅은 노랑
          color: "#0077B6", // 빨강 텍스트
          fontWeight: "bold",
          fontSize: "1.1rem",
          borderRadius: "12px",
          padding: "16px 24px",
          fontFamily: "Jua, sans-serif", // ✅ Jua 폰트 적용
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        },
      });
    };

    eventSource.onerror = (err) => {
      console.error("❌ SSE 연결 오류:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setOrderDialogOpen(true);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        주문 목록
      </Typography>
      <OrderList orders={orders} onViewDetails={handleViewOrderDetails} />
      <OrderDetailsDialog
        open={orderDialogOpen}
        onClose={() => setOrderDialogOpen(false)}
        order={selectedOrder}
      />
    </Container>
  );
};

export default AdminOrdersPage;
