import React from "react";
import db, { auth, googleProvider } from "../firebase";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((result) => {
        const newUser = {
          fullname: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };
        navigate("/");
        setUser(newUser);

        localStorage.setItem("user", JSON.stringify(newUser));
        // console.log(db.collection("users").doc);

        db.collection("users").doc(result.user.email).set(newUser);
      })
      .catch((err) => alert(err.message));
    console.log(db.collection("users"));
  };
  return (
    <div className="login">
      <div className="login-container">
        <button className="login-btn" onClick={signInWithGoogle}>
          <img src="./google.png" alt="" />
          sign in with google
        </button>
      </div>
    </div>
  );
}

export default Login;
