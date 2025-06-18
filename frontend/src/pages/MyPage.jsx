import React, { useState } from "react";
import { Container, Typography, Tabs, Tab, Box, Paper } from "@mui/material";
import MyInfo from "../components/MyInfo";
import MyOrders from "../components/MyOrders";

const MyPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        마이페이지
      </Typography>
      <Paper square>
        <Tabs value={tabIndex} onChange={handleChange} indicatorColor="primary">
          <Tab label="내 정보" />
          <Tab label="내 주문" />
        </Tabs>
      </Paper>

      <Box sx={{ mt: 3 }}>
        {tabIndex === 0 && <MyInfo />}
        {tabIndex === 1 && <MyOrders />}
      </Box>
    </Container>
  );
};

export default MyPage;
