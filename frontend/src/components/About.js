import React from "react";

const About = () => {
  return (
    <div className="container my-4 About">
      <h1 className="mb-3">About NoteVault</h1>

      <p>
        <strong>NoteVault</strong> is a secure, full-stack note-taking application
        that allows users to safely create, manage, and organize their personal
        notes.
      </p>

      <p>
        The application uses authentication to ensure that each user can access
        only their own notes. Users can add, edit, and delete notes in real time
        without refreshing the page, providing a smooth and responsive
        experience.
      </p>

      <p>
        This project was built to understand real-world software development
        practices such as RESTful API design, JWT-based authentication, state
        management using React Context API, and database operations with MongoDB.
      </p>

      <h5 className="mt-4">Key Features</h5>
      <ul>
        <li>Secure user authentication</li>
        <li>Create, update, and delete notes</li>
        <li>User-specific data access</li>
        <li>Fast and responsive UI</li>
        <li>Clean backend API architecture</li>
      </ul>
    </div>
  );
};

export default About;
