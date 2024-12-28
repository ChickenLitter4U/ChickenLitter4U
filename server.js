const express = require("express");
const cors = require("cors");
const app = express();

// Allow cross-origin requests
app.use(cors());

// Allow JSON in POST requests
app.use(express.json());

// In-memory array to store listings
let listings = [];

// Return all listings
app.get("/api/listings", (req, res) => {
  res.json(listings);
});

// Add a new listing
app.post("/api/listings", (req, res) => {
  listings.push(req.body);
  res.status(201).send("Listing added");
});

// Delete a listing by index
app.delete("/api/listings/:index", (req, res) => {
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
