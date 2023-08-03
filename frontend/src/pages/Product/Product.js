import React, { useState, useEffect, useContext } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BalanceOutlinedIcon from "@mui/icons-material/BalanceOutlined";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../redux/ContextProvider";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { BASE_URL } from "../../base_url";

const Product = () => {
  const { cartProducts, dispatch } = useContext(CartContext);
  const id = parseInt(useParams().id);
  const [product, setProduct] = useState();
  const [img, setImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/getProductById/${id}`);
        // console.log(res);
        setProduct(res.data[0]);
        let i = [];
        i.push(res.data[0]?.img, res.data[0]?.img2);
        setImages(i);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  //   "data:image/jpeg;base64,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",
  //   "data:image/jpeg;base64,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",

  const handleAddToCart = () => {
    const item = cartProducts.find((p) => p.id_product === product?.id_product);
    if (item) {
      dispatch({
        type: "INCREASE_QUANTITY",
        payload: {
          id_product: item.id_product,
          quantity: quantity,
        },
      });
    } else {
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          id_product: product?.id_product,
          title: product?.title,
          desc: product?.desc,
          price: product?.price,
          img: product?.img,
          quantity,
        },
      });
    }
  };

  return (
    <div className="app">
      <Navbar />

      <div className="product">
        <div className="left">
          <div className="images">
            <img
              src={images[0]}
              alt="img1"
              onClick={() => {
                setImg(0);
              }}
            />
            <img
              src={images[1]}
              alt="img2"
              onClick={() => {
                setImg(1);
              }}
            />
          </div>
          <div className="mainImg">
            <img src={images[img]} alt="mainImg" />
          </div>
        </div>
        <div className="right">
          <h1>{product?.title}</h1>
          <span>${product?.price}</span>
          <p>{product?.desc}</p>
          <div className="quantity">
            <button
              onClick={() => {
                setQuantity((prev) => {
                  if (prev !== 1) return prev - 1;
                  else return 1;
                });
              }}
            >
              -
            </button>
            {quantity}
            <button
              onClick={() => {
                setQuantity((prev) => {
                  return prev + 1;
                });
              }}
            >
              +
            </button>
          </div>
          <button className="addToCart" onClick={handleAddToCart}>
            <AddShoppingCartIcon />
            ADD TO CART
          </button>
          <div className="desires">
            <Link className="link" to="/">
              <FavoriteBorderOutlinedIcon />
              ADD TO WISHLIST
            </Link>
            <Link className="link" to="/">
              <BalanceOutlinedIcon />
              ADD TO COMPARE
            </Link>
          </div>
          <div className="info">
            <div className="vendor">Vendor: Polo</div>
            <div className="productType">Product Type: T-Shirt</div>
            <div className="tag">Tag: T-Shirt, Women, Top</div>
          </div>
          <hr />
          <div className="info">
            <div className="description">DESCRIPTION</div>
            <hr />
            <div className="addInfo">ADDITIONAL INFORMATION</div>
            <hr />
            <div className="faq">FAQ</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;
