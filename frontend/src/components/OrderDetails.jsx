import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

const OrderDetails = ({ open, onClose, order }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>주문 상세 정보</DialogTitle>
      <DialogContent>
        {order?.orderItems?.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>상품명</TableCell>
                <TableCell>수량</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.orderItems.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.itemName}</TableCell>
                  <TableCell>{item.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>주문 상품이 없습니다.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetails;
