import React, { useState, useRef } from "react";
import FileBase from "react-file-base64";
import axios from "axios";
import "./AddCategory.scss";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { BASE_URL } from "../../base_url";

const AddCategory = () => {
  const [img, setImg] = useState();
  const title = useRef();
  const desc = useRef();

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/addCategory`, {
        title: title.current.value,
        desc: desc.current.value,
        img: img.base64,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <Navbar />

      <div className="addProduct">
        <span className="add">ADD Category</span>
        <form className="addProductForm" onSubmit={handleAddCategory}>
          <div className="addProductItem">
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" ref={title} />
          </div>
          <div className="addProductItem">
            <label htmlFor="desc">Description: </label>
            <input type="text" id="desc" ref={desc} />
          </div>
          <div className="addProductItem">
            <label>Image 1:</label>
            <FileBase
              type="file"
              multiple={false}
              onDone={(base64) => {
                setImg(base64);
              }}
            />
          </div>
          <button type="submit">Add Category</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddCategory;
