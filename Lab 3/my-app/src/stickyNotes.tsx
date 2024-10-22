import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { ClickCounter } from "./starterFiles/hooksExercise";
import { UseTheme } from "./hooks";

export const StickyNotes = () => {
  // vars
  const [likes, setLikes] = useState<string[]>([]);
  const { isDarkMode, modeToggler } = UseTheme(); // refer hooks.tsx
  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.personal,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const [selectedNote, setSelectedNote] = useState<Note>(initialNote);

  // hook foos and handlers
  const toggleLike = (titleOfNote: string) => {
    setLikes((prevLikes) => {
      if (prevLikes.includes(titleOfNote)) {
        return prevLikes.filter((title) => title !== titleOfNote);
      } else {
        return [...prevLikes, titleOfNote];
      }
    });
  };

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("title: ", createNote.title);
    console.log("content: ", createNote.content);
    createNote.id = notes.length + 1;
    setNotes([...notes, createNote]); // can change the order to make note create from the front or end of list line
    setCreateNote(initialNote);
  };

  // can modulate this to go blur if not clicking on it for label when it reselects
  const clickingNoteHandler = (note: Note) => {
    setSelectedNote(note);
  };

  // refer to contenteditable tag, onblur event, and HTML div element
  const editTitleOrContentHandler = (
    event: React.FormEvent<HTMLDivElement>,
    field: keyof Note // this is a type operator s.t. takes obj type and produce a value such string literal of key
  ) => {
    const newContent = event.currentTarget.textContent || "";
    setSelectedNote((prev) => ({ ...prev, [field]: newContent }));
  };

  // did not use contenteditable tag but used the prev exercise skeletal code
  // used label update by setting event.target.value then typecast as Label
  // refer to shorthand e event in the return() sec of App()
  const editLabelHandler = (
    event: React.ChangeEvent<HTMLSelectElement>,
    noteId: number
  ) => {
    const newLabel = event.target.value as Label;
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, label: newLabel } : note
      )
    );
  };

  // refer filter()
  const deleteNoteHandler = (noteId: number) => {
    setNotes((notes) => notes.filter((note) => note.id !== noteId));
  };

  return (
    <div className="header-container">
      <div className="theme-container">
        <button onClick={modeToggler}>{isDarkMode ? "Dark" : "Light"}</button>
      </div>
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            placeholder="Note Title"
            value={createNote.title}
            onChange={(event) =>
              setCreateNote({ ...createNote, title: event.target.value })
            }
            required
          ></input>
        </div>

        <div>
          <textarea
            placeholder="Note Content"
            value={createNote.content}
            onChange={(event) =>
              setCreateNote({ ...createNote, content: event.target.value })
            }
            required
          ></textarea>
        </div>

        <div>
          <select
            value={createNote.label}
            onChange={(event) =>
              setCreateNote({
                ...createNote,
                label: event.target.value as Label,
              })
            }
            required
          >
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>
        <div>
          <button type="submit">Create Note</button>
        </div>
        <div className="favlist">
          <h3>List of favorites:</h3>
          {likes.map((titleOfNote) => (
            <div key={titleOfNote}>{titleOfNote}</div>
          ))}
        </div>
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div
            key={note.id}
            data-testid={`note-${note.id}`}
            className={`note-item ${
              selectedNote.id === note.id ? "selected" : ""
            }`}
            onClick={() => clickingNoteHandler(note)}
          >
            <div className="notes-header">
              <div className="like-button">
                <button onClick={() => toggleLike(note.title)}>
                  {likes.includes(note.title) ? "❤️" : "♡"}
                </button>
              </div>
              <div className="delete-button">
                <button
                  data-testid={`delete-note-${note.id}`}
                  onClick={() => deleteNoteHandler(note.id)}
                >
                  x
                </button>
              </div>
            </div>
            <h2
              data-testid={`note-title-${note.id}`}
              contentEditable={selectedNote.id === note.id}
              onBlur={(e) => editTitleOrContentHandler(e, "title")}
              suppressContentEditableWarning={true}
            >
              {note.title}
            </h2>
            <p
              data-testid={`note-content-${note.id}`}
              contentEditable={selectedNote.id === note.id}
              onBlur={(e) => editTitleOrContentHandler(e, "content")}
              suppressContentEditableWarning={true}
            >
              {note.content}
            </p>
            {selectedNote.id === note.id ? (
              <select
                value={note.label}
                onChange={(e) => editLabelHandler(e, note.id)}
              >
                <option value={Label.personal}>Personal</option>
                <option value={Label.study}>Study</option>
                <option value={Label.work}>Work</option>
                <option value={Label.other}>Other</option>
              </select>
            ) : (
              <p>{note.label}</p>
            )}
          </div>
        ))}
        {/* ClickCounter uses a context hook which bypasses prop inheritance, I set this example from the exercise
              to denote how it can avoid dark-mode */}
        <ClickCounter />
      </div>
    </div>
  );
};

export default StickyNotes;
