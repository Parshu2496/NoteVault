import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/main.css"
const host = process.env.REACT_APP_HOST;


const Login = (props) => {
  const [Credentials, setCredentials] = useState({email:"",password:""});
    const [showpass,updateShowPass] = useState(false)

  const onChange = (e) => {
    setCredentials({...Credentials , [e.target.name] : e.target.value});
  };

  const PasswordVisibility=()=>{
    if(showpass===false){
        updateShowPass(true)
    }
    else updateShowPass(false);
  }

  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        
        },
      body: JSON.stringify( {email:Credentials.email,password: Credentials.password} )
    });
    const state = await response.json()
    if(state.success){
        localStorage.setItem('token',state.authToken)
        props.showAlert("Login Successfull","success")
        history('/')
    }
    else{
        props.showAlert("Invalid Credentials","danger")
    }
};

  return (
    <>
      <div className = "login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={onChange}
              value = {Credentials.email}
              id="email"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type={showpass?"text":"password"}
              className="form-control"
              id="password"
              value = {Credentials.password}
              onChange={onChange}
              name="password"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              onClick={PasswordVisibility}
            />
            <label className="form-check-label" htmlFor="exampleCheck1" >
              Show Password
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
