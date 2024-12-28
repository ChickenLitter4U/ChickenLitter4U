const express = require("express");
const cors = require("cors");
const app = express();

// Allow cross-origin requests
app.use(cors());
app.use(express.json());

// In-memory array to store listings
let listings = []; // Each listing will include an ID

// Get all listings
app.get("/api/listings", (req, res) => {
  res.json(listings);
});

// Add a new listing
app.post("/api/listings", (req, res) => {
  const { item, quantity } = req.body;

  // Add a new listing with a unique ID
  const newListing = {
    id: Date.now(), // Unique ID based on timestamp
    item,
    quantity,
  };
  listings.push(newListing);
  res.status(201).send("Listing added");
});

// Delete a listing by ID
app.delete("/api/listings/:id", (req, res) => {
  const id = parseInt(req.params.id);
  listings = listings.filter((listing) => listing.id !== id);
  res.send("Listing deleted");
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
