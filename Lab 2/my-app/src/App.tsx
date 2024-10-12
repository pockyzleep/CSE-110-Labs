import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
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
      <div className="app-container">
        <div className="note-individual">
          <button>x</button>
          <h2> 1st Note Title </h2>
          <p> 1st Note Content </p>
          <p> 1st Note Label </p>
        </div>
      </div>
    </form>
  );
}

export default App;
