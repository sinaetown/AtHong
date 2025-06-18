import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MemberOrderDetails = ({ open, onClose, orders }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>회원 주문 목록</DialogTitle>
      <DialogContent dividers>
        {orders.length === 0 ? (
          <Typography>주문 내역이 없습니다.</Typography>
        ) : (
          orders.map((order) => (
            <Accordion key={order.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ flexGrow: 1 }}>
                  주문 ID: {order.id}
                </Typography>
                <Typography sx={{ marginLeft: 2 }}>
                  날짜: {new Date(order.createdTime).toLocaleString()}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>상품명</TableCell>
                      <TableCell>수량</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.orderItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.itemName}</TableCell>
                        <TableCell>{item.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>닫기</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberOrderDetails;
