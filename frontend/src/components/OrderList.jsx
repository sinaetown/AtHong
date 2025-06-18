import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

const OrderList = ({ orders, onViewDetails }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>주문 ID</TableCell>
          <TableCell>회원 이메일</TableCell>
          <TableCell>총 금액</TableCell>
          <TableCell>주문일</TableCell>
          <TableCell>주문상태</TableCell>
          <TableCell>상세 보기</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.email}</TableCell>
            <TableCell>{order.totalPrice}원</TableCell>
            <TableCell>
              {new Date(order.createdTime).toLocaleString()}
            </TableCell>
            <TableCell>
              {order.orderStatus === "ORDERED" ? "주문 완료" : "주문 취소"}
            </TableCell>
            <TableCell>
              <Button variant="outlined" onClick={() => onViewDetails(order)}>
                상세 보기
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderList;
