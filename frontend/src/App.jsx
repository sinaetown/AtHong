import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemPage from "./pages/ItemPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import AdminMembersPage from "./pages/AdminMembersPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import MyPage from "./pages/MyPage";
import AdminItemForm from "./pages/AdminItemForm";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

const App = () => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태 유지
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <Router>
          <Header
            cartCount={cartCount}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/items"
              element={
                <ItemPage
                  cartCount={cartCount}
                  setCartCount={setCartCount}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/login"
              element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  setCartCount={setCartCount}
                />
              }
            />
            <Route path="/admin/members" element={<AdminMembersPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/items/new" element={<AdminItemForm />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
