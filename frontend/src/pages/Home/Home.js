import React from "react";
import Slider from "../../components/Slider/Slider";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Categories from "../../components/Categories/Categories";
import Contact from "../../components/Contact/Contact";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
    <div className="app">
      <Navbar />
      <div>
        <Slider />
        <FeaturedProducts type="featuring" />
        <Categories />
        <FeaturedProducts type="trending" />
        <Contact />
      </div>
      <Footer />
    </div>
  );
};
export default Home;
