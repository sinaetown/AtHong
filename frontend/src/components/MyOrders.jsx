import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Button,
} from "@mui/material";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_BASE_URL}/member/myOrders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("내 주문 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`${API_BASE_URL}/order/${orderId}/canceled`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("주문이 취소되었습니다.");
      fetchOrders(); // 주문 목록 다시 불러오기
    } catch (err) {
      console.error("주문 취소 실패:", err);
      alert("주문 취소에 실패했어요.");
    }
  };

  if (orders.length === 0)
    return <Typography>주문 내역이 없습니다.</Typography>;

  return (
    <Box>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>주문 정보</TableCell>
              <TableCell>상품명</TableCell>
              <TableCell>수량</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) =>
              order.orderItems.map((item, idx) => (
                <TableRow key={`${order.id}-${item.id}-${idx}`}>
                  {idx === 0 ? (
                    <TableCell rowSpan={order.orderItems.length}>
                      주문 ID: {order.id} <br />
                      상태: {order.orderStatus} <br />
                      날짜: {new Date(order.createdTime).toLocaleString()}
                      <br />
                      {order.orderStatus === "ORDERED" && (
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          sx={{ mt: 1 }}
                          onClick={() => handleCancelOrder(order.id)}
                        >
                          주문 취소
                        </Button>
                      )}
                    </TableCell>
                  ) : null}
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell />
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default MyOrders;
