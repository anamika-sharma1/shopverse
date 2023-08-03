import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import "./FeaturedProducts.scss";
import axios from "axios";
import { BASE_URL } from "../../base_url";

const FeaturedProducts = (props) => {
  const type = props.type;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res =
          type === "featuring"
            ? await axios(`${BASE_URL}/getProducts/2`)
            : await axios(`${BASE_URL}/getProducts/1`);
        setProducts(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [type]);
  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} Products</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime esse
          a eos molestiae id quos praesentium, magni sapiente consequuntur culpa
          omnis iste perferendis magnam!
        </p>
      </div>
      <div className="bottom">
        {products?.map((item, index) => {
          return <Card item={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
