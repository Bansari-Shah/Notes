import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = input;
      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      setNotes([...notes, input]);
    }

    setInput("");
  };

  const deleteNote = (index) => {
    const filteredNotes = notes.filter((_, i) => i !== index);
    setNotes(filteredNotes);
  };

  const editNote = (index) => {
    setInput(notes[index]);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h1>📝 Notes App</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Write your note..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addNote}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p>No notes yet</p>
        ) : (
          notes.map((note, index) => (
            <div className="note" key={index}>
              <p>{note}</p>
              <div className="buttons">
                <button onClick={() => editNote(index)}>Edit</button>
                <button onClick={() => deleteNote(index)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;