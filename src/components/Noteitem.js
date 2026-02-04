import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="card text-center col-md-4 my-2 notes">
          <div className="card-header">Title: {note.title}</div>
          <div className="card-header">Tag: {note.tag}</div>
          <div className="card-body">
            <h5 className="card-title">Description:</h5>
            <p className="card-text">{note.description}</p>
          </div>
          <div className="card-footer text-body-secondary">
            <i
              className="far fa-trash-alt mx-2"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Note Deleted Succefully", "success");
              }}
            ></i>
            <i
              className="far fa-edit mx-2"
              onClick={() => {
                updateNote(note, note._id);
              }}
            ></i>
      </div>
    </div>
  );
};

export default Noteitem;
