// Import required modules
const express = require("express");
const axios = require("axios"); // Using axios instead of fetch for HTTP requests

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Base URL for the JSONPlaceholder API
const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

// Function to fetch posts
async function fetchPosts(limit) {
  const url = limit ? `${BASE_URL}?_limit=${limit}` : BASE_URL;
  const response = await axios.get(url);
  return response.data;
}

// Function to fetch a post by ID
async function fetchPostById(id) {
  const url = `${BASE_URL}/${id}`;
  const response = await axios.get(url);
  return response.data;
}

// Endpoint to fetch all posts with an optional limit
app.get("/posts", async (req, res) => {
  try {
    const limit = req.query.limit || 30; // Optional query parameter for limiting results
    const posts = await fetchPosts(limit);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// Endpoint to fetch a specific post by ID
app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await fetchPostById(id);
    res.json(post);
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    res.status(500).json({ error: "Error fetching post by ID" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
