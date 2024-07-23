import React from "react";
import { Container, Typography, Box, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Styled HeroSection with background image and overlay
const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage:
    'url("https://plus.unsplash.com/premium_photo-1661667206690-8f60fce9e5f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEJhY2tncm91bmQlMjBJbWFnZSUyMG9mJTIwZmF0aGVyJTIwZGF1Z2h0ZXJ8ZW58MHx8MHx8fDA%3D")', // Replace with your chosen URL
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  position: "relative",
  textAlign: "center",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay with 50% opacity
    zIndex: 1,
  },
}));

// Styled Typography with text shadow
const StyledTypography = styled(Typography)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Text shadow for better readability
}));

// Styled Buttons
const StyledButton = styled(Button)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  margin: theme.spacing(1),
}));

function Home() {
  const navigate = useNavigate();

  return (
    <HeroSection>
      <Container maxWidth="md">
        <Box>
          <StyledTypography variant="h3" component="h1" gutterBottom>
            Welcome to Will Creator
          </StyledTypography>
          <StyledTypography variant="h6" component="p" gutterBottom>
            Create and manage your wills easily and securely.
          </StyledTypography>
          <Box mt={4}>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </StyledButton>
            <StyledButton
              variant="contained"
              color="secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </StyledButton>
          </Box>
        </Box>
      </Container>
    </HeroSection>
  );
}

export default Home;
