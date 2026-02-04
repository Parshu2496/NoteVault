import React, { useContext,useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import "../style/main.css"
const AddNotes = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setnote] = useState({ title: "", description: "", tag: "Default" });
  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setnote({ title: "", description: "", tag: "Default"})
    props.showAlert("Note added Succefully","success")
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <h1 className= "Add">Add a Note</h1>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Notes Title
          </label>
          <input
            type="text"
            placeholder = "Minimun length should be 5 characters"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            minLength = {5}
                    required
            onChange={onChange}
            value = {note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            placeholder = "Tag"
            name="tag"
            aria-describedby="emailHelp"
            value = {note.tag}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
          placeholder = "Minimun length should be 5 characters"
            type="text"
            minLength = {5}
                    required
            className="form-control"
            name="description"
            id="description"
            onChange={onChange}
            value = {note.description}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleclick}
            disabled = {note.title.length<5||note.description.length<5}
          >
            Add Note
          </button>
        </div>
      </form>
      </>
  );
};

export default AddNotes;
