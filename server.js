
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

let notes = [];

app.use(bodyParser.json());
app.use(express.static('public'));

// Obtener todas las notas
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Crear una nueva nota
app.post('/api/notes', (req, res) => {
  const note = { ...req.body, _id: uuidv4(), createdAt: new Date(), updatedAt: new Date() };
  notes.push(note);
  res.json(note);
});

// Editar una nota
app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const index = notes.findIndex(note => note._id === id);
  if (index !== -1) {
    notes[index] = { ...notes[index], ...req.body, updatedAt: new Date() };
    res.json(notes[index]);
  } else {
    res.status(404).send('Note not found');
  }
});

// Eliminar una nota
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  notes = notes.filter(note => note._id !== id);
  res.send('Note deleted');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
