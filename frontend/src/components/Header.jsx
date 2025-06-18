import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = ({ cartCount, isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");

    // 로그인 상태 업데이트
    setIsLoggedIn(false);

    // 홈 페이지로 이동
    navigate("/");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#E0F7FA", // 파스텔 하늘색
        boxShadow: "none",
        borderBottom: "1px solid #B2EBF2",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            to="/"
            style={{
              color: "#0077B6", // 진한 파란색
              textDecoration: "none",
              fontWeight: "bold",
              fontFamily: "'Rubik Iso', cursive", // ✅ 이 줄 추가
              fontSize: "1.8rem", // ✨ 필요 시 더 키울 수 있음
            }}
          >
            At Hong
          </Link>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            component={Link}
            to="/items"
            sx={{
              color: "#0077B6", // 버튼도 진한 파란색
              fontWeight: "bold",
            }}
          >
            상품
          </Button>

          {role === "ADMIN" && (
            <>
              <Button
                component={Link}
                to="/admin/members"
                sx={{ color: "#0077B6", fontWeight: "bold" }}
              >
                회원 조회
              </Button>
              <Button
                component={Link}
                to="/admin/orders"
                sx={{ color: "#0077B6", fontWeight: "bold" }}
              >
                주문 전체 조회
              </Button>
            </>
          )}
          {
            <>
              <Button
                component={Link}
                to="/mypage"
                sx={{ color: "#0077B6", fontWeight: "bold" }}
              >
                마이페이지
              </Button>
            </>
          }

          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              sx={{
                color: "#0077B6",
                fontWeight: "bold",
              }}
            >
              로그아웃
            </Button>
          ) : (
            <Button
              component={Link}
              to="/login"
              sx={{
                color: "#0077B6",
                fontWeight: "bold",
              }}
            >
              로그인
            </Button>
          )}

          <IconButton component={Link} to="/cart" sx={{ color: "#0077B6" }}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
