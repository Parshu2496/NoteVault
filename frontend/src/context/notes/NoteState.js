import React, { useState } from "react";
import NoteContext from "./NoteContext";
const host = process.env.REACT_APP_HOST;

const NoteState = (props) => {
  const notesinitial = [];
  const [notes, setnotes] = useState(notesinitial);

  // Get all notes
  const getnotes = async () => {
    // API call
    const response = await fetch(`${host}api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const Json = await response.json();
    setnotes(Json);
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log("Adding a new note");
    const note = await response.json();
    setnotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = async (id) => {
    await fetch(`${host}api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const updatednote = await response.json();
    setnotes((prevNotes) =>
      prevNotes.map((note) => (note._id === id ? updatednote : note)),
    );
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getnotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
