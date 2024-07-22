import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Will Creator
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Create and manage your wills easily and securely.
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/signup")}
            style={{ marginRight: "10px" }}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
