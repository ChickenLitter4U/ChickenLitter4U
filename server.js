const express = require("express");
const cors = require("cors");
const app = express();

// Allow cross-origin requests
app.use(cors());
app.use(express.json());

// In-memory array to store listings
let listings = []; // Each listing will include an ID and user details

// Get all listings
app.get("/api/listings", (req, res) => {
  res.json(listings);
});

// Add a new listing
app.post("/api/listings", (req, res) => {
  const { name, phone, address, city, state, zip, item, quantity, description } = req.body;

  const newListing = {
    id: Date.now(), // Unique ID based on timestamp
    name,
    phone,
    address,
    city,
    state,
    zip,
    item,
    quantity,
    description,
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
