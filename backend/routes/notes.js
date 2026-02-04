const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Route 1:  Get all the notes. Get requests
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});

// Route 2:Add a new note. Post requests
router.post(
  "/addnote",
  fetchuser,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id
      });
      const saveNote = await note.save();
      res.send(saveNote);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: "Some error occured" });
    }
  },
);

// Route 3:  updating an existing notes
router.put(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      var newnote = {};
      if(title) newnote.title = title;
      if(description) newnote.description = description;
      if(tag) newnote.tag = tag;

    // Find the note
    var note = await Note.findById(req.params.id)
    if(!note) return res.status(404).json("Not found")
    
    if(note.user.toString()!==req.user.id) {
        return res.status(401).send("Not Allowed")
    }
    
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.json(note);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: "Some error occured" });
    }
  },
);
// Route 4:  Deleting an existing notes
router.delete(
  "/delete/:id",
  fetchuser,
  async (req, res) => {
    try {
    // Find the note
    var note = await Note.findById(req.params.id)
    if(!note) return res.status(404).json("Not found")
    if(note.user.toString()!==req.user.id) {
        return res.status(401).send("Not Allowed")
    }
    const status = await note.deleteOne()
    res.json(status);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ error: "Some error occured" });
    }
  },
);

module.exports = router;
