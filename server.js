const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory array to store listings
let listings = [];

// Get all listings
app.get("/api/listings", (req, res) => {
  res.json(listings);
});

// Add a new listing
app.post("/api/listings", (req, res) => {
  const {
    sellerName,
    phone,
    address,
    city,
    state,
    zip,
    quantity,
    description,
    location,
    date,
    imageUrl,
  } = req.body;

  const newListing = {
    id: Date.now(), // Unique ID for each listing
    sellerName,
    phone,
    address,
    city,
    state,
    zip,
    quantity,
    description,
    location,
    date,
    imageUrl,
  };

  listings.push(newListing);
  res.status(201).send("Listing added");
});

// Delete a listing by ID
app.delete("/api/listings/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  listings = listings.filter((listing) => listing.id !== id);
  res.send("Listing deleted");
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
