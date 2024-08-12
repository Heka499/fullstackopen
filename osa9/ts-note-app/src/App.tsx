import { useState, useEffect } from "react";
import { getAllNotes, createNote } from "./services/noteService";
import { Note } from "./types";

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    getAllNotes().then((data) => {
      setNotes(data);
    });
  }, []);

  const addNote = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createNote({ content: newNote }).then((data) => {
      setNotes(notes.concat(data));
    });
    setNewNote("");
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
