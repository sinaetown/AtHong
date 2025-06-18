import React from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Button,
  Box,
  TextField,
} from "@mui/material";
import axios from "axios";

const CartPage = ({ cartItems, setCartItems, setCartCount }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleCountChange = (index, newCount) => {
    const updatedItems = [...cartItems];
    updatedItems[index].count = parseInt(newCount || 1);
    setCartItems(updatedItems);
  };

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      const orderData = cartItems.map((item) => ({
        itemId: item.id,
        count: item.count || 1,
      }));

      const response = await axios.post(
        `${API_BASE_URL}/order/create`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("주문이 완료되었습니다!");
      setCartItems([]); // 장바구니 비우기
      setCartCount(0);
    } catch (err) {
      console.error("주문 실패:", err);
      alert("주문에 실패했어요.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        장바구니
      </Typography>

      {cartItems.length === 0 ? (
        <Typography>장바구니가 비어 있어요.</Typography>
      ) : (
        <>
          <Paper elevation={2}>
            <List>
              {cartItems.map((item, index) => (
                <React.Fragment key={item.id || index}>
                  <ListItem
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <ListItemText
                      primary={item.name}
                      secondary={`${item.price}원`}
                    />
                    <TextField
                      label="수량"
                      type="number"
                      inputProps={{ min: 1 }}
                      value={item.count || 1}
                      onChange={(e) => handleCountChange(index, e.target.value)}
                      sx={{ width: 80 }}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleOrder}>
              주문하기
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default CartPage;
