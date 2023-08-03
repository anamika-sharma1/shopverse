import React from "react";
import curr from "../../images/payment.png";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>Women</span>
          <span>Men</span>
          <span>Shoes</span>
          <span>Accessories</span>
          <span>New Arrivals</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            error architecto dolorem. Fugiat commodi incidunt qui ut quasi magni
            tenetur quia quos, cupiditate voluptatem.
          </span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic
            numquam, nihil corrupti accusantium, laudantium est earum eaque
            quaerat illum tempora libero ab, doloremque perferendis velit quidem
            vel dolorum eveniet quas veniam provident.
          </span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <div className="logo">AS Store</div>
          <div className="copyright">
            &copy; Copyright 2023. All Rights Reserved
          </div>
        </div>
        <div className="right">
          <img src={curr} alt="Currency" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
