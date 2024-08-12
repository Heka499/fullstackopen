import { useState } from "react";

interface Note {
  id: string;
  content: string;
}

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", content: "test note" },
  ]);

  const addNote = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const noteToAdd = {
      content: newNote,
      id: String(notes.length + 1),
    };
    setNotes(notes.concat(noteToAdd));
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
