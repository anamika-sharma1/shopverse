import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import "./SubCategories.scss";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { BASE_URL } from "../../base_url";

const SubCategories = () => {
  const subCatId = parseInt(useParams().id);

  const [subCat, setSubCat] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortPrice, setSortPrice] = useState("asc");
  const [selectCats, setSelectedCats] = useState([]);
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    const getSubCategory = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/getSubCategory/${subCatId}`);
        setSubCat(res?.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getSubCategory();
  }, [subCatId]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/get_subcategory_category/${subCatId}`
        );
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, [subCatId]);

  // const { data, error, loading } = useFetch(
  //   `/categories?populate=*&[filters][id][$eq]=${catId}`
  // );

  // const obj = data[0];
  // const subCatArray = obj?.attributes?.sub_categories.data;

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedCats(
      isChecked
        ? [...selectCats, value]
        : selectCats.filter((item) => item !== value)
    );
  };

  return (
    <div className="app">
      <Navbar />

      <div className="products">
        <div className="left">
          <div className="filterItem">
            <h2>Product Type</h2>
            {Categories?.map((subCat, index) => {
              const item = subCat[0];
              return (
                <div className="itemType" key={index}>
                  <input
                    type="checkbox"
                    value={item?.id_category}
                    id={item?.id_category}
                    onChange={handleChange}
                  />
                  <label htmlFor={item?.id_category}>{item?.title}</label>
                </div>
              );
            })}
          </div>
          <div className="filterItem">
            <h2>Price Range</h2>
            <div className="itemType">
              <span>0</span>
              <input
                type="range"
                min={0}
                max={1000}
                // onChange={(e) => {
                //   setMaxPrice(e.target.value);
                // }}
                // onMouseUp={(e) => {
                //   console.log(e.target.value);
                // }}
                onTouchEnd={(e) => {
                  setMaxPrice(e.target.value);
                }}
              />
              <span>{maxPrice}</span>
            </div>
          </div>
          <div className="filterItem">
            <h2>Sort By</h2>
            <div className="itemType">
              <input
                type="radio"
                value="asc"
                name="price"
                onClick={() => {
                  setSortPrice("asc");
                }}
              />
              <label htmlFor="asc">Price (Lowest First)</label>
              <br />
              <input
                type="radio"
                value="desc"
                name="price"
                onClick={() => {
                  setSortPrice("desc");
                }}
              />
              <label htmlFor="desc">Price (Highest First)</label>
            </div>
            {/* <div className="itemType">
            <input
              type="radio"
              value="desc"
              id="desc"
              name="price"
              checked={sortPrice === "desc"}
              onClick={(e) => {
                setSortPrice(e.target.value);
                console.log(sortPrice);
              }}
            />
            <label htmlFor="desc">Price (Highest First)</label>
          </div> */}
          </div>
        </div>
        <div className="right">
          <img src={subCat?.img} alt="imageCategories" />
          <div className="info">
            <span>
              <b>Category</b>: {subCat?.title}
            </span>
          </div>
          <List
            subCatId={subCatId}
            maxPrice={maxPrice}
            sort={sortPrice}
            Cats={selectCats}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubCategories;
