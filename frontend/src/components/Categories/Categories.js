import React, { useEffect, useState } from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../base_url";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/categories`);
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getSubCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/subCategories`);
        setSubCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSubCategories();
  }, []);

  const getCat = (name) => {
    let cat = "";
    cat = categories.find((category) => category?.title === name);
    // console.log(cat);
    return cat;
  };

  const getSubCat = (name) => {
    // console.log("in");
    let subCat = "";
    subCat = subCategories.find((category) => category?.title === name);
    // console.log(subCat);
    return subCat;
  };

  return (
    <div className="categories">
      <div className="col">
        <div className="row">
          <img src={getCat("Children")?.img} alt="New Season" />
          <Link
            className="link"
            to={`/products/${getCat("Children")?.id_category}`}
          >
            Children
          </Link>
        </div>
        <div className="row">
          <img src={getCat("Men")?.img} alt="Men" />
          <Link className="link" to={`/products/${getCat("Men")?.id_category}`}>
            Men
          </Link>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <img src={getCat("Women")?.img} alt="Women" />
          <Link
            className="link"
            to={`/products/${getCat("Women")?.id_category}`}
          >
            Women
          </Link>
        </div>
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="col">
            <div className="row">
              <img src={getSubCat("Hat")?.img} alt="Formal" />
              <Link
                className="link"
                to={`/subCategories/${getSubCat("Hat")?.id_subCategory}`}
              >
                Hats
              </Link>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <img src={getSubCat("Formal")?.img} alt="Formal" />
              <Link
                className="link"
                to={`/subCategories/${getSubCat("Formal")?.id_subCategory}`}
              >
                Formal Wear
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <img src={getSubCat("Casual")?.img} alt="Casual" />
          <Link
            className="link"
            to={`/subCategories/${getSubCat("Casual")?.id_subCategory}`}
          >
            Casual Wear
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
