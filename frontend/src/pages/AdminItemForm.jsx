import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminItemForm = () => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stockQuantity: "",
    itemImage: null,
  });
  const [previewUrl, setPreviewUrl] = useState(""); // ✅ 미리보기 URL 상태 추가
  const [error, setError] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "itemImage") {
      const file = files[0];
      setForm((prev) => ({ ...prev, itemImage: file }));
      setPreviewUrl(URL.createObjectURL(file)); // ✅ 미리보기 URL 생성
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    try {
      await axios.post(`${API_BASE_URL}/item/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      navigate("/items");
    } catch (err) {
      setError("상품 등록에 실패했어요 😢");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        상품 추가
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="상품명" name="name" onChange={handleChange} />
        <TextField label="카테고리" name="category" onChange={handleChange} />
        <TextField
          label="가격"
          name="price"
          type="number"
          onChange={handleChange}
        />
        <TextField
          label="재고 수량"
          name="stockQuantity"
          type="number"
          onChange={handleChange}
        />
        <Button variant="outlined" component="label">
          이미지 업로드
          <input type="file" name="itemImage" hidden onChange={handleChange} />
        </Button>

        {/* ✅ 이미지 미리보기 */}
        {previewUrl && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">미리보기:</Typography>
            <img
              src={previewUrl}
              alt="preview"
              style={{ width: "150px", height: "auto", borderRadius: 8 }}
            />
          </Box>
        )}

        <Button variant="contained" onClick={handleSubmit}>
          등록
        </Button>
      </Box>
    </Container>
  );
};

export default AdminItemForm;
