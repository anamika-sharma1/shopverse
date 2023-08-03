import React, { useContext, useRef } from "react";
import axios from "axios";
import "./Login.scss";
// import { BASE_URL } from "../../base_url";
import { Link } from "react-router-dom";
import { CartContext } from "../../redux/ContextProvider";
import GoogleButton from "react-google-button";
import { auth } from "../../components/google-login/Google";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { BASE_URL } from "../../base_url";

const Login = () => {
  const { dispatch } = useContext(CartContext);
  const email = useRef();
  const password = useRef();

  const handleForm = async (e) => {
    e.preventDefault();
    let obj = {
      email: email.current.value,
      password: password.current.value,
    };
    let res;
    try {
      res = await axios.post(`${BASE_URL}/login`, obj);
      // console.log(res);
      dispatch({
        type: "LOGIN",
        payload: {
          user: res.data,
        },
      });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      dispatch({
        type: "LOGIN_ERROR",
        payload: {
          error: error,
        },
      });
      alert("Invalid Credentials!");
      window.location.reload();
    }
  };

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  const handleGoogleLogin = async (e) => {
    // console.log("in");
    e.preventDefault();
    try {
      const res = await googleSignIn();
      let obj = {
        username: res.user.displayName,
        isAdmin: 0,
        email: res.user.email,
        user_id: res.user.providerData[0].uid,
        img: res.user.reloadUserInfo.photoUrl,
      };
      console.log(res);

      dispatch({
        type: "LOGIN",
        payload: {
          user: obj,
          googleUser: true,
        },
      });
      window.location.href = "/";
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: "LOGIN_ERROR",
        payload: {
          error: error,
        },
      });
    }
  };

  return (
    <div className="signup">
      <div className="signup-wrapper">
        <form className="signup-box-wrapper" onSubmit={handleForm}>
          <input
            className="input"
            type="email"
            placeholder="Email"
            ref={email}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            ref={password}
            required
          />

          <button type="submit" className="signup-btn">
            Login
          </button>
          <GoogleButton onClick={handleGoogleLogin} />
          <span style={{ color: "gray" }}>or</span>
          <Link to="/signup" className="link">
            <button className="login-btn">Signup</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
