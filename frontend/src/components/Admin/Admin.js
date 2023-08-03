import React, { useRef, useState } from "react";
import axios from "axios";
import "./Admin.scss";
import FileBase from "react-file-base64";
import { BASE_URL } from "../../base_url";

const Admin = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirm_password = useRef();
  const [img, setImg] = useState("");

  const handleForm = async (e) => {
    // console.log("in");
    console.log(password.current.value, confirm_password.current.value);
    e.preventDefault();
    if (password.current.value === confirm_password.current.value) {
      let obj = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        img: img?.base64 || img,
      };
      try {
        await axios.post(`${BASE_URL}/addAdmin`, obj);
        // console.log(res);
        window.location.href = "/";
      } catch (error) {
        console.log(error);
      }
    } else {
      //   console.log(password.current.value, confirm_password.current.value);
      confirm_password.current.setCustomValidity("Passwords don't match");
    }
  };

  return (
    <div className="signup">
      <div className="signup-wrapper">
        <form className="signup-box-wrapper" onSubmit={handleForm}>
          <input
            className="input"
            type="text"
            placeholder="Username"
            ref={username}
            required
          />
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
          <input
            className="input"
            type="password"
            placeholder="Confirm Password"
            ref={confirm_password}
            required
          />
          <div
            className="input"
            style={{ display: "flex", gap: "5px", fontSize: "17px" }}
          >
            <label>Image :</label>
            <FileBase
              type="file"
              multiple={false}
              onDone={(base64) => {
                setImg(base64);
              }}
            />
          </div>
          <button type="submit" className="signup-btn">
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
