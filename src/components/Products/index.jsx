import React from "react";
import products from "./products";
import Carousel from "react-grid-carousel";

const Products = () => {
  return (
    <div
      className="productContainer"
      // style={{
      //   display: "flex",
      // }}
    >
      <div className="block-title text-center">
        <p>What We’re Offering</p>
        <h2>Insurance products</h2>
      </div>
      <Carousel cols={4} rows={1} gap={20} loop>
        {products.map((product, index) => {
          return (
            <Carousel.Item key={index}>
              <ProductCard
                key={index}
                img={product.img}
                text={product.text}
                title={product.title}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
  return;
};

export default Products;

function ProductCard({ img, text, title }) {
  return (
    <>
      {/* <div className="container"> */}
      <div
        className="productCard"
        // style={{ width: "18rem" }}
      >
        <div className="card-body">
          <img src={img} alt="logo" height="60px" width="60px" />
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
