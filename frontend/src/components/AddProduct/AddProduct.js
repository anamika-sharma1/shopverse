import React, { useState, useRef, useEffect, useCallback } from "react";
import FileBase from "react-file-base64";
import axios from "axios";
import "./AddProduct.scss";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { BASE_URL } from "../../base_url";

const AddProduct = () => {
  const [img, setImg] = useState("");
  const [img2, setImg2] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [type, setType] = useState("3");
  const title = useRef();
  const desc = useRef();
  const price = useRef();
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categories_subcategories, setCategories_Subcategories] = useState([]);
  const [subCategory, setSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);

  useEffect(() => {
    const get_cat_sub_comb = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/getAll_category_subcategory`);
        setCategories_Subcategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    get_cat_sub_comb();
  }, []);

  const getSubCategories_from_Categories = useCallback(
    (catId) => {
      catId = Number(catId);
      const arr = categories_subcategories?.filter(
        (item) => item.id_category === catId
      );
      return arr;
    },
    [categories_subcategories]
  );

  useEffect(() => {
    // console.log("in");
    if (category !== null) {
      // console.log("inside of in");
      const arr = getSubCategories_from_Categories(category);
      setSubCategories(
        arr.map((item) => {
          return item.id_subCategory;
        })
      );
    }
  }, [category, getSubCategories_from_Categories]);

  useEffect(() => {
    const get_cat_sub_comb = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/categories`);
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    get_cat_sub_comb();
  }, []);

  useEffect(() => {
    const get_cat_sub_comb = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/subCategories`);
        setAllSubCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    get_cat_sub_comb();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    // console.log("iiinnnn");
    // console.log(
    //   category,
    //   subCategory,
    //   title.current.value,
    //   desc.current.value,
    //   img.base64,
    //   img2.base64,
    //   isNew,
    //   type,
    //   price.current.value
    // );
    if (!category || !subCategory || !img || !img2) {
      // console.log("anamika");
      alert("All fields are mandatory");
    } else {
      try {
        await axios.post(`${BASE_URL}/addProduct`, {
          title: title.current.value,
          desc: desc.current.value,
          img: img?.base64 || img,
          img2: img2?.base64 || img,
          price: price.current.value,
          isNew: isNew,
          type: type,
          category: category,
          subCategory: subCategory,
        });
        window.location.href = "/";
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getSubCatTitle = (subCat) => {
    const i = allSubCategories.find((item) => item.id_subCategory === subCat);
    return i.title;
  };

  return (
    <div className="app">
      <Navbar />

      <div className="addProduct">
        <span className="add">ADD PRODUCT</span>
        <form className="addProductForm" onSubmit={handleAddProduct}>
          <div className="addProductItem">
            <label htmlFor="title">Title: </label>
            <input type="text" id="title" ref={title} required />
          </div>
          <div className="addProductItem">
            <label htmlFor="desc">Description: </label>
            <input type="text" id="desc" ref={desc} required />
          </div>
          <div className="addProductItem">
            <label>Image 1:</label>
            <FileBase
              type="file"
              multiple={false}
              onDone={(base64) => {
                setImg(base64);
              }}
              required
            />
          </div>
          <div className="addProductItem">
            <label>Image 2:</label>
            <FileBase
              type="file"
              multiple={false}
              onDone={(base64) => {
                setImg2(base64);
              }}
              required
            />
          </div>
          <div className="addProductItem">
            <label htmlFor="price">Price: </label>
            <input type="text" id="price" ref={price} required />
          </div>
          <div className="addProductItem">
            <label htmlFor="isNew">New: </label>
            <div className="subItem">
              <label htmlFor="true">True</label>
              <input
                type="radio"
                name="new"
                value={true}
                id="true"
                onClick={(e) => setIsNew(e.target.value)}
                required
              />
            </div>
            <div className="subItem">
              <label htmlFor="false">False</label>
              <input
                type="radio"
                name="new"
                value={false}
                id="false"
                onClick={(e) => setIsNew(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="addProductItem">
            <label htmlFor="type">Type: </label>
            <div className="subItem">
              <label htmlFor="trending">Trending</label>
              <input
                type="radio"
                name="typeProduct"
                value={"1"}
                id="trending"
                onClick={(e) => setType(e.target.value)}
                required
              />
            </div>
            <div className="subItem">
              <label htmlFor="featuring">Featuring</label>
              <input
                type="radio"
                name="typeProduct"
                value={"2"}
                id="featuring"
                onClick={(e) => setType(e.target.value)}
                required
              />
            </div>
            <div className="subItem">
              <label htmlFor="normal">Normal</label>
              <input
                type="radio"
                name="typeProduct"
                value={"3"}
                id="normal"
                onClick={(e) => setType(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="addProductItem">
            <label htmlFor="cat">Category: </label>
            <select
              id="cat"
              name="cat"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              {categories?.map((category, index) => {
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
          <div className="addProductItem">
            <label htmlFor="subCat">Subcategory: </label>
            {subCategories.length > 0 ? (
              <select
                id="subCat"
                name="subCat"
                onChange={(e) => setSubCategory(e.target.value)}
              >
                {subCategories?.map((category, index) => {
                  return (
                    <option value={category} key={index}>
                      {getSubCatTitle(category)}
                    </option>
                  );
                })}
                <option value={0} selected="true" disabled="true" hidden>
                  Choose Sub-Category
                </option>
              </select>
            ) : (
              <span
                style={{
                  color: "gray",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Select Category first
              </span>
            )}
          </div>
          <button type="submit">Add Product</button>
          {/* <ToastContainer /> */}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
