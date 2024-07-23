import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

function CreateWill() {
  const [willText, setWillText] = useState("");
  const [message, setMessage] = useState(""); // State for the message
  const [isError, setIsError] = useState(false); // State to indicate if the message is an error

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/wills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: willText }),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage("Will created successfully");
      setIsError(false);
      setWillText(""); // Clear the input field after successful creation
    } else {
      setMessage(`Error: ${data.message}`);
      setIsError(true);
    }
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Will
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Will Text"
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={10}
            value={willText}
            onChange={(e) => setWillText(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Will
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

export default CreateWill;
