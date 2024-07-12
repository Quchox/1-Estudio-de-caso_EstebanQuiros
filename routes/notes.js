const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let notes = [];

router.get('/', (req, res) => {
  res.json(notes);
});

router.get('/:id', (req, res) => {
  const note = notes.find(note => note.id === req.params.id);
  if (!note) return res.status(404).json({ message: 'Note not found' });
  res.json(note);
});

router.post('/', (req, res) => {
  const { title, content, tags } = req.body;
  if (!title || !content) return res.status(400).json({ message: 'Title and content are required' });
  
  const newNote = {
    id: uuidv4(),
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: tags || []
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

router.put('/:id', (req, res) => {
  const { title, content, tags } = req.body;
  const note = notes.find(note => note.id === req.params.id);
  if (!note) return res.status(404).json({ message: 'Note not found' });

  if (title) note.title = title;
  if (content) note.content = content;
  note.tags = tags || note.tags;
  note.updatedAt = new Date().toISOString();

  res.json(note);
});

router.delete('/:id', (req, res) => {
  notes = notes.filter(note => note.id !== req.params.id);
  res.status(204).end();
});

module.exports = router;
