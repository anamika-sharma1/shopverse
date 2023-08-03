import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./AddSubCategory.scss";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { BASE_URL } from "../../base_url";

const AddSubCategory = () => {
  const title = useRef();
  const [category, setCategory] = useState("Choose Category");
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/categories`);
        setAllCategories(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const handleAddSubCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/addSubCategory`, {
        title: title.current.value,
        category: category,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="addProduct">
        <span className="add">ADD Sub Category</span>
        <form className="addProductForm" onSubmit={handleAddSubCategory}>
          <div className="addProductItem">
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" ref={title} />
          </div>
          <div className="addProductItem">
            <label htmlFor="selectCategory">Category</label>
            <select
              id="selectCategory"
              onChange={(e) => setCategory(e.target.value)}
            >
              {allCategories?.map((category, index) => {
                return (
                  <option value={category?.id_category} key={index}>
                    {category?.title}
                  </option>
                );
              })}
              <option value={0} selected="true" disabled="true" hidden>
                Choose Category
              </option>
            </select>
          </div>
          <button type="submit">Add Category</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddSubCategory;
