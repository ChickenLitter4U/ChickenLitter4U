const express = require('express');
const app = express();
app.use(express.json());

// Temporary in-memory array to hold listings
let listings = [];

// 1) GET all listings
app.get('/api/listings', (req, res) => {
  res.json(listings);
});

// 2) POST a new listing
app.post('/api/listings', (req, res) => {
  const newListing = { 
    id: Date.now(), 
    ...req.body 
  };
  listings.push(newListing);
  res.json(newListing);
});

// 3) PUT (update) a listing
app.put('/api/listings/:id', (req, res) => {
  const { id } = req.params;
  const index = listings.findIndex(l => l.id == id);
  if (index === -1) {
    return res.status(404).json({ error: 'Listing not found' });
  }
  listings[index] = { ...listings[index], ...req.body };
  res.json(listings[index]);
});

// 4) DELETE a listing
app.delete('/api/listings/:id', (req, res) => {
  const { id } = req.params;
  listings = listings.filter(l => l.id != id);
  res.json({ success: true });
});

// Start the server on port 3000 (or your choice)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
