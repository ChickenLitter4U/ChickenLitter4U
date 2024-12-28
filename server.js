const express = require("express");
const cors = require("cors");
const app = express();

// Allow cross-origin requests
app.use(cors());

// Allow JSON in POST requests
app.use(express.json());

// In-memory arrays to store users and listings
const users = []; // Store users in memory
let listings = [];

// A simple token for demo purposes (for all users)
const VALID_TOKEN = "abc123";

// Sign-Up endpoint (adds a new user)
app.post("/api/signup", (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  // Add new user
  users.push({ username, password });
  res.status(201).send("User signed up successfully");
});

// Login endpoint (returns a token)
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // Return a token
  res.json({ token: VALID_TOKEN });
});

// Middleware to check for valid token
function checkAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token !== VALID_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// Return all listings (public access)
app.get("/api/listings", (req, res) => {
  res.json(listings);
});

// Add a new listing (requires authentication)
app.post("/api/listings", checkAuth, (req, res) => {
  listings.push(req.body);
  res.status(201).send("Listing added");
});

// Delete a listing by index (requires authentication)
app.delete("/api/listings/:index", checkAuth, (req, res) => {
  const idx = parseInt(req.params.index);
  if (listings[idx]) {
    listings.splice(idx, 1);
    return res.send("Listing deleted");
  }
  res.status(404).send("Not found");
});

// Pick a port, or use what's in the environment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
