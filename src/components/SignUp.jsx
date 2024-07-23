import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State for the message
  const [isError, setIsError] = useState(false); // State to indicate if the message is an error
  const [errors, setErrors] = useState({}); // State for form validation errors
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (!name) newErrors.name = "Name is required";

    // Validate Email
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    // Validate Password
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setMessage("User registered successfully");
      setIsError(false);
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } else {
      setMessage(`Error: ${data.message}`);
      setIsError(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            margin="normal"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </form>
        {message && (
          <Typography
            variant="body1"
            color={isError ? "error" : "primary"}
            style={{ marginTop: "16px" }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default SignUp;
