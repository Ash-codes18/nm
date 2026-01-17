const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory data store as database integration is out of scope
let resources = [
  { id: 1, name: 'Sample Item' }
];

/**
 * GET endpoint for resource retrieval
 */
app.get('/resources', (req, res) => {
  res.status(200).json(resources);
});

/**
 * POST endpoint for data submission
 */
app.post('/resources', (req, res) => {
  const data = req.body;
  
  // Basic assignment for demonstration
  const newResource = {
    id: resources.length + 1,
    ...data
  };

  resources.push(newResource);
  
  res.status(201).json(newResource);
});

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});