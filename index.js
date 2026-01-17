const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory data store
let resources = [
  { id: 1, name: 'Sample Resource', description: 'Initial item' }
];

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// GET - Retrieve all resources
app.get('/resources', (req, res) => {
  res.json(resources);
});

// GET - Retrieve a single resource by ID
app.get('/resources/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const resource = resources.find(r => r.id === id);
  if (!resource) return res.status(404).json({ error: 'Resource not found' });
  res.json(resource);
});

// POST - Create a new resource
app.post('/resources', (req, res) => {
  const newResource = {
    id: resources.length > 0 ? Math.max(...resources.map(r => r.id)) + 1 : 1,
    ...req.body
  };
  resources.push(newResource);
  res.status(201).json(newResource);
});

// PUT/PATCH - Update an existing resource
app.put('/resources/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = resources.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ error: 'Resource not found' });

  resources[index] = { ...resources[index], ...req.body, id };
  res.json(resources[index]);
});

// DELETE - Remove a resource
app.delete('/resources/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = resources.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).json({ error: 'Resource not found' });

  const deleted = resources.splice(index, 1);
  res.status(200).json(deleted[0]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});