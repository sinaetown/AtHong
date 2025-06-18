import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpOpen, setSignUpOpen] = useState(false);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/doLogin`, {
        email,
        password,
      });

      if (res.status === 200 || res.status === 201) {
        const { token, refreshToken, role } = res.data.result;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role", role);
        alert("로그인에 성공했어요!");
        setIsLoggedIn(true);
        navigate("/items");
      } else {
        console.error("예상치 못한 응답 상태", res);
        alert("로그인 실패: 서버에서 오류가 발생했어요.");
      }
    } catch (err) {
      if (err.response) {
        console.error("응답 에러", err.response.data);
        alert("로그인 실패: " + err.response.data.message);
      } else {
        console.error("요청 실패", err);
        alert("로그인 요청에 실패했어요. 네트워크를 확인하세요.");
      }
    }
  };

  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    street: "",
    zipcode: "",
  });

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    console.log(signUpInfo);
    await axios.post(`${API_BASE_URL}/member/create`, signUpInfo);
    alert(`${signUpInfo.name} 님 환영해요!`);
    setSignUpOpen(false);
    navigate("/login");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          로그인
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="이메일"
            fullWidth
            margin="normal"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="비밀번호"
            fullWidth
            margin="normal"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            로그인
          </Button>

          <Button
            variant="text"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => setSignUpOpen(true)}
          >
            아직 회원이 아니신가요? 회원가입
          </Button>
        </Box>
      </Paper>

      {/* ✅ 회원가입 모달 창 */}
      <Dialog open={signUpOpen} onClose={() => setSignUpOpen(false)}>
        <DialogTitle>회원가입</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSignUpSubmit}
            sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="이름"
              required
              value={signUpInfo.name}
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, name: e.target.value })
              }
            />
            <TextField
              label="이메일"
              required
              type="email"
              value={signUpInfo.email}
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, email: e.target.value })
              }
            />
            <TextField
              label="비밀번호"
              required
              type="password"
              value={signUpInfo.password}
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, password: e.target.value })
              }
            />
            <TextField
              label="도시"
              value={signUpInfo.city}
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, city: e.target.value })
              }
            />
            <TextField
              label="거리"
              value={signUpInfo.street}
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, street: e.target.value })
              }
            />
            <TextField
              label="우편번호"
              value={signUpInfo.zipcode}
              onChange={(e) =>
                setSignUpInfo({ ...signUpInfo, zipcode: e.target.value })
              }
            />
            <DialogActions sx={{ p: 0, pt: 1 }}>
              <Button onClick={() => setSignUpOpen(false)}>취소</Button>
              <Button type="submit" variant="contained">
                가입하기
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default LoginPage;
