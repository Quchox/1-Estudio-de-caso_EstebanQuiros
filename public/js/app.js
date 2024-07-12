document.addEventListener('DOMContentLoaded', () => {
  const notesGrid = document.getElementById('notesGrid');
  const createNoteButton = document.getElementById('createNote');

  const fetchNotes = async () => {
    const response = await fetch('/api/notes');
    const notes = await response.json();
    renderNotes(notes);
  };

  const renderNotes = (notes) => {
    notesGrid.innerHTML = '';
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.className = 'note';
      noteElement.innerHTML = `
        <h2>${note.title}</h2>
        <p>${note.content}</p>
        <small>Created at: ${note.createdAt}</small>
        <small>Updated at: ${note.updatedAt}</small>
      `;
      notesGrid.appendChild(noteElement);
    });
  };

  createNoteButton.addEventListener('click', () => {
    // Handle create note
    const title = prompt('Enter note title:');
    const content = prompt('Enter note content:');
    if (title && content) {
      createNote({ title, content });
    }
  });

  const createNote = async (note) => {
    const response = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note)
    });
    const newNote = await response.json();
    fetchNotes();
  };

  fetchNotes();
});
