import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
} from "@mui/material";

function Dashboard({ currentUser }) {
  const [wills, setWills] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    // Fetch the list of wills
    const fetchWills = async () => {
      console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/wills?email=${currentUser.email}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWills(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching wills:", error);
      }
    };

    fetchWills();
  }, [currentUser]);

  const handleCreateWill = async () => {
    if (!currentUser) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/wills`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content, email: currentUser.email }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newWill = await response.json();
      setWills([...wills, newWill]);
      setTitle("");
      setContent("");
    } catch (error) {
      setError(error.message);
      console.error("Error creating will:", error);
    }
  };

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome to your dashboard!
        </Typography>
        <Box mb={4}>
          <Typography variant="h6" gutterBottom>
            Create a New Will
          </Typography>
          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateWill}
            style={{ marginTop: "16px" }}
          >
            Create Will
          </Button>
        </Box>
        <Typography variant="h6" gutterBottom>
          Your Wills
        </Typography>
        {wills.length === 0 ? (
          <Typography variant="body1">No wills found.</Typography>
        ) : (
          <Grid container spacing={2}>
            {wills.map((will) => (
              <Grid item xs={12} sm={6} md={4} key={will._id}>
                <Box
                  border={1}
                  borderColor="grey.300"
                  borderRadius={2}
                  padding={2}
                  marginBottom={2}
                  boxShadow={3}
                >
                  <Typography variant="h6">{will.title}</Typography>
                  <Typography variant="body1">{will.content}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default Dashboard;
