import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
import "./Products.scss";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { BASE_URL } from "../../base_url";

const Products = () => {
  const catId = parseInt(useParams().id);

  const [cat, setCat] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortPrice, setSortPrice] = useState("asc");
  const [selectSubCats, setSelectedSubCats] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/getCategory/${catId}`);
        setCat(res?.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory();
  }, [catId]);

  useEffect(() => {
    const getSubCategories = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/get_category_subcategory/${catId}`
        );
        setSubCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSubCategories();
  }, [catId]);

  // const { data, error, loading } = useFetch(
  //   `/categories?populate=*&[filters][id][$eq]=${catId}`
  // );

  // const obj = data[0];
  // const subCatArray = obj?.attributes?.sub_categories.data;

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectSubCats, value]
        : selectSubCats.filter((item) => item !== value)
    );
  };

  return (
    <div className="app">
      <Navbar />

      <div className="products">
        <div className="left">
          <div className="filterItem">
            <h2>Product Type</h2>
            {subCategories?.map((subCat, index) => {
              const item = subCat[0];
              return (
                <div className="itemType" key={index}>
                  <input
                    type="checkbox"
                    value={item?.id_subCategory}
                    id={item?.id_subCategory}
                    onChange={handleChange}
                  />
                  <label htmlFor={item?.id_subCategory}>{item?.title}</label>
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
          <img src={cat?.img} alt="imageCategories" />
          <div className="info">
            <span>
              <b>Category</b>: {cat?.title}
            </span>
            <span>
              <b>Description</b>: {cat?.desc}
            </span>
          </div>
          <List
            catId={catId}
            maxPrice={maxPrice}
            sort={sortPrice}
            subCats={selectSubCats}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
