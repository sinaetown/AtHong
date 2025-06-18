import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";

const MyInfo = () => {
  const [info, setInfo] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_BASE_URL}/member/myInfo`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInfo(res.data);
      } catch (err) {
        console.error("내 정보 불러오기 실패:", err);
      }
    };

    fetchInfo();
  }, []);

  if (!info) return <Typography>로딩 중...</Typography>;

  return (
    <Box>
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          내 정보
        </Typography>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>항목</TableCell>
              <TableCell>내용</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>이름</TableCell>
              <TableCell>{info.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>이메일</TableCell>
              <TableCell>{info.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>도시</TableCell>
              <TableCell>{info.city}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>거리</TableCell>
              <TableCell>{info.street}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>우편번호</TableCell>
              <TableCell>{info.zipcode}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default MyInfo;
