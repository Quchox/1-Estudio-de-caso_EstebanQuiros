
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
        <div class="note-header">
          <h2>${note.title}</h2>
          <div>
            <button class="btn btn-sm btn-primary edit-note" data-id="${note._id}">Edit</button>
            <button class="btn btn-sm btn-danger delete-note" data-id="${note._id}">Delete</button>
          </div>
        </div>
        <div class="note-body">
          <p>${note.content}</p>
        </div>
        <div class="note-footer">
          <small>Created at: ${note.createdAt}</small><br>
          <small>Updated at: ${note.updatedAt}</small>
        </div>
      `;
      notesGrid.appendChild(noteElement);
    });

    document.querySelectorAll('.edit-note').forEach(button => {
      button.addEventListener('click', (e) => {
        const noteId = e.target.getAttribute('data-id');
        const note = notes.find(n => n._id === noteId);
        const newTitle = prompt('Edit note title:', note.title);
        const newContent = prompt('Edit note content:', note.content);
        if (newTitle !== null && newContent !== null) {
          editNote(noteId, { title: newTitle, content: newContent });
        }
      });
    });

    document.querySelectorAll('.delete-note').forEach(button => {
      button.addEventListener('click', (e) => {
        const noteId = e.target.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this note?')) {
          deleteNote(noteId);
        }
      });
    });
  };

  createNoteButton.addEventListener('click', () => {
    const title = prompt('Enter note title:');
    const content = prompt('Enter note content:');
    if (title && content) {
      createNote({ title, content });
    }
  });

  const createNote = async (note) => {
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note)
    });
    fetchNotes();
  };

  const editNote = async (id, updatedNote) => {
    await fetch(`/api/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedNote)
    });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`/api/notes/${id}`, {
      method: 'DELETE'
    });
    fetchNotes();
  };

  fetchNotes();
});
