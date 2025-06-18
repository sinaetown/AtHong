import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Checkbox,
  FormControlLabel,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const ItemList = ({
  cartCount,
  setCartCount,
  cartItems,
  setCartItems,
  isLoggedIn,
  onRefresh, // ✅ 부모에서 전달받은 refresh 함수
}) => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = localStorage.getItem("role") === "ADMIN";

  const fetchItems = async (type = "", term = "", pageNum = 0) => {
    console.log("📦 fetchItems 호출", { pageNum, type, term }); // ✅ 호출 확인
    try {
      const params = { page: pageNum, size: 3 };
      if (type && term) params[type] = term;
      const res = await axios.get(`${API_BASE_URL}/items`, { params });
      console.log("📊 받아온 items 수:", res.data.length); // ✅ 받아온 데이터 수 확인
      if (pageNum === 0) {
        setItems(res.data);
      } else {
        setItems((prev) => [...prev, ...res.data]);
      }
      setHasMore(res.data.length === 3); // 페이지 크기보다 적으면 마지막 페이지
      setLoading(false);
      console.log(
        "🧺 누적된 items 수:",
        pageNum === 0 ? res.data.length : items.length + res.data.length
      );
    } catch (err) {
      setError("상품을 불러오는 데 실패했어요.");
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(0);
    fetchItems(searchType, searchTerm, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  useEffect(() => {
    if (page > 0) {
      fetchItems(searchType, searchTerm, page);
    }
  }, [page]);

  const handleSearch = () => {
    setPage(0);
    setItems([]);
    setIsSearched(true);
    fetchItems(searchType, searchTerm, 0);
  };

  const handleReset = () => {
    setSearchTerm("");
    setIsSearched(false);
    setItems([]);
    setHasMore(true);
    setLoading(true);
    setPage(0);

    if (onRefresh) onRefresh();
  };

  const handleSelect = (itemId) => {
    const exists = selectedItems.find((item) => item.id === itemId);
    if (exists) {
      setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
    } else {
      setSelectedItems((prev) => [...prev, { id: itemId, count: 1 }]);
    }
  };

  const handleCountChange = (itemId, count) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, count: parseInt(count || 1) } : item
      )
    );
  };

  const handleAddToCart = () => {
    const selectedData = selectedItems.map((selected) => {
      const found = items.find((item) => item.id === selected.id);
      return { ...found, count: selected.count };
    });

    setCartItems([...cartItems, ...selectedData]);
    setCartCount(cartCount + selectedData.length);
    setSelectedItems([]);
  };

  const isSelected = (itemId) =>
    selectedItems.some((item) => item.id === itemId);

  const getCount = (itemId) =>
    selectedItems.find((item) => item.id === itemId)?.count || 1;

  return (
    <>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          select
          label="검색 기준"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          size="small"
          sx={{ width: 120 }}
        >
          <MenuItem value="name">상품명</MenuItem>
          <MenuItem value="category">카테고리</MenuItem>
        </TextField>
        <TextField
          label="검색어 입력"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={handleSearch}>
          검색
        </Button>
        {isSearched && (
          <Button variant="outlined" onClick={handleReset}>
            전체 보기
          </Button>
        )}
      </Box>

      <Box display="flex" flexDirection="column" gap={2}>
        {items.map((item) => (
          <Card
            key={item.id}
            sx={{ display: "flex", alignItems: "center", p: 2 }}
          >
            <CardMedia
              component="img"
              image={`${API_BASE_URL}/item/${item.id}/image`}
              alt={item.name}
              sx={{ width: 150, height: 150, objectFit: "cover", mr: 2 }}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6">{item.name}</Typography>
              {item.stockQuantity <= 0 && (
                <Typography sx={{ color: "red", fontSize: 14, mt: 0.5 }}>
                  품절입니다
                </Typography>
              )}
              <Typography color="text.secondary">{item.category}</Typography>
              <Typography>{item.price}원</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSelected(item.id)}
                    onChange={() => handleSelect(item.id)}
                    disabled={item.stockQuantity <= 0}
                  />
                }
                label="선택"
              />
              {isSelected(item.id) && (
                <TextField
                  label="수량"
                  type="number"
                  value={getCount(item.id)}
                  onChange={(e) => {
                    const inputCount = parseInt(e.target.value || 1);
                    const stock = item.stockQuantity;
                    if (inputCount > stock) {
                      alert(`재고는 ${stock}개까지밖에 없어요 😢`);
                      return;
                    }
                    handleCountChange(item.id, inputCount);
                  }}
                  size="small"
                  sx={{ mt: 1, width: 100 }}
                  inputProps={{ min: 1 }}
                />
              )}
              {isAdmin && (
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={async () => {
                    if (confirm("정말 삭제하시겠어요?")) {
                      try {
                        await axios.delete(
                          `${API_BASE_URL}/item/${item.id}/delete`,
                          {
                            headers: {
                              Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                              )}`,
                            },
                          }
                        );
                        fetchItems(searchType, searchTerm, 0);
                      } catch (err) {
                        alert("삭제에 실패했어요 🥲");
                      }
                    }
                  }}
                >
                  삭제
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* ✅ 무한 스크롤 감시 div */}
      <div ref={ref} style={{ height: 50 }} />

      {loading && (
        <Box mt={4} textAlign="center">
          <CircularProgress />
        </Box>
      )}

      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        {isLoggedIn && (
          <Button
            variant="contained"
            onClick={handleAddToCart}
            disabled={selectedItems.length === 0}
          >
            장바구니에 담기 ({selectedItems.length})
          </Button>
        )}
      </Box>
    </>
  );
};

export default ItemList;
