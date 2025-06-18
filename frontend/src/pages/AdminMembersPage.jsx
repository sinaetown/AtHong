import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import MemberList from "../components/MemberList";
import MemberOrderDetails from "../components/MemberOrderDetails";

const AdminMembersPage = () => {
  const [members, setMembers] = useState([]);
  const [selectedMemberOrders, setSelectedMemberOrders] = useState([]);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`${API_BASE_URL}/members`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMembers(res.data);
      } catch (err) {
        console.error("회원 목록 불러오기 실패:", err);
      }
    };
    fetchMembers();
  }, []);

  const handleViewOrders = async (memberId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_BASE_URL}/member/${memberId}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedMemberOrders(res.data.result);
      setOrderDialogOpen(true);
    } catch (err) {
      console.error("회원 주문 목록 불러오기 실패:", err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        회원 목록
      </Typography>
      <MemberList members={members} onViewOrders={handleViewOrders} />
      <MemberOrderDetails
        open={orderDialogOpen}
        onClose={() => setOrderDialogOpen(false)}
        orders={selectedMemberOrders}
      />
    </Container>
  );
};

export default AdminMembersPage;
