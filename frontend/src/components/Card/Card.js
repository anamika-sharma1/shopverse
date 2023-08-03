import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";
import image from "../../images/image-not-available-high-resolution-color-logo.png";

const Card = (props) => {
  const item = props.item;
  // console.log(item);
  return (
    <Link className="link" to={`/product/${item?.id_product}`}>
      <div className="card">
        {item?.isNew === 1 && <div className="status">New Season</div>}
        <div className="images">
          <img className="img-m" src={item?.img || image} alt="img1" />
          <img className="img-e" src={item?.img2 || image} alt="img2" />
        </div>
        <h3>{item?.title}</h3>
        <div className="prices">
          <div className="oldPrice">${item?.oldPrice || item?.price + 20}</div>
          <div className="Price">${item?.price}</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
