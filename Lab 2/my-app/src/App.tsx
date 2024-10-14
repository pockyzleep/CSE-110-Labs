import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Label, Note } from "./types/types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ClickCounter } from "./starterFiles/hooksExercise";

function App() {
  return (
    <div className="container">
      <form className="note-form">
        <div>
          <input placeholder="Note Title"></input>
        </div>

        <div>
          <textarea></textarea>
        </div>

        <div>
          <button type="submit">Create Note</button>
        </div>
      </form>
      <div className="notes-grid">
        {dummyNotesList.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button>x</button>
            </div>
            <h2> {note.title} </h2>
            <p> {note.content} </p>
            <p> {note.label} </p>
          </div>
        ))}
        <ClickCounter />
      </div>
    </div>
  );
}

export default App;
