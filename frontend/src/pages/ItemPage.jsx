import React, { useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import ItemList from "../components/ItemList";
import { useNavigate } from "react-router-dom";

const ItemPage = ({
  cartCount,
  setCartCount,
  cartItems,
  setCartItems,
  isLoggedIn,
}) => {
  const [listKey, setListKey] = useState(0); // ✅ 새로고침용 키
  const isAdmin = localStorage.getItem("role") === "ADMIN";
  const navigate = useNavigate();

  const handleRefresh = () => {
    setListKey((prev) => prev + 1); // key를 바꾸면 ItemList가 강제 재렌더링됨
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        전체 상품
      </Typography>

      {/* ✅ 관리자 전용 버튼 */}
      {isAdmin && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => navigate("/items/new")}
        >
          상품 추가
        </Button>
      )}
      <ItemList
        key={listKey} // ✅ 핵심: 강제 리렌더링 트리거
        cartCount={cartCount}
        setCartCount={setCartCount}
        cartItems={cartItems}
        setCartItems={setCartItems}
        isAdmin={isAdmin}
        isLoggedIn={isLoggedIn}
        onRefresh={handleRefresh} // ✅ 버튼 클릭 시 부모에서 refresh
      />
    </Container>
  );
};

export default ItemPage;
