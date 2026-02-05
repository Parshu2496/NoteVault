import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getnotes, editNote } = context;
  let history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getnotes();
    } else {
      history("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const [note, setNote] = useState({
    enoteid: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      enoteid: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = async (e) => {
    editNote(note.enoteid, note.etitle, note.edescription, note.etag);
    e.preventDefault();
    props.showAlert("Note Edited Succefully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="Notes">
        <AddNote showAlert={props.showAlert} />
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          Launch demo modal
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Notes Title
                    </label>
                    <input
                      type="text"
                      value={note.etitle}
                      className="form-control"
                      id="etitle"
                      minLength={5}
                      required
                      name="etitle"
                      aria-describedby="emailHelp"
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      required
                      value={note.etag}
                      className="form-control"
                      id="etag"
                      name="etag"
                      aria-describedby="emailHelp"
                      onChange={onChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      minLength={5}
                      required
                      value={note.edescription}
                      className="form-control"
                      name="edescription"
                      id="edescription"
                      onChange={onChange}
                    />
                  </div>
                  <div className="d-flex justify-content-center"></div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleClick}
                  data-bs-dismiss="modal"
                  disabled={
                    note.etitle.length < 5 || note.edescription.length < 5
                  }
                >
                  Update changes
                </button>
              </div>
            </div>
          </div>
        </div>
          </div>
        <div className="row mx-2 YourNotes">
               <div className="d-flex justify-content-center">
       <h1>Your Notes</h1>
      </div>
          
          <div className="container">
            {notes.length === 0 && "No notes to display"}
          </div>
          {notes.map((note) => {
            return (
              <Noteitem
                showAlert={props.showAlert}
                key={note._id}
                updateNote={updateNote}
                note={note}
              />
            );
          })}
        </div>
    </>
  );
};

export default Notes;
