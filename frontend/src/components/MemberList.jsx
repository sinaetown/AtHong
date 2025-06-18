import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

const MemberList = ({ members, onViewOrders }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>회원 ID</TableCell>
          <TableCell>이메일</TableCell>
          <TableCell>이름</TableCell>
          <TableCell>주문 조회</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell>{member.id}</TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>{member.name}</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                onClick={() => onViewOrders(member.id)}
              >
                주문 조회
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MemberList;
