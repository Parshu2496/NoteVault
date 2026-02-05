import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/main.css"
const host = process.env.REACT_APP_HOST;
const Signup = (props) => {
  const [Credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [showpass, updateShowPass] = useState(false);

  const onChange = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };

  const PasswordVisibility = () => {
    if (showpass === false) {
      updateShowPass(true);
    } else updateShowPass(false);
  };

  let history = useNavigate();

  const handleSubmit = async (e) => {
    if(Credentials.cpassword!==Credentials.password){
      props.showAlert("Password does not match","danger")
       e.preventDefault();
    }
    else{

      e.preventDefault();
      const { name, email, password } = Credentials;
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password }),
      });
      const state = await response.json();
      console.log(state);
      if(state.success){
        localStorage.setItem("token", state.authtoken);
        history("/");
        props.showAlert("Signup Successfull","success")
      }else{
        props.showAlert(state.error,"danger")
      }
    }
    };
  return (
    <div className="signup">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-2" >
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            name="password"
            type={showpass ? "text" : "password"}
            className="form-control"
            id="password"
            onChange={onChange}
            required
            minLength = {5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type={showpass ? "text" : "password"}
            name="cpassword"
            className="form-control"
            id="cpassword"
            onChange={onChange}
            required
            minLength = {5}
          />
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onClick={PasswordVisibility}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Show Password
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
