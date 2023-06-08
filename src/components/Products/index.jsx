import React from "react";
import products from "./products";

const Products = () => {
  return (
    <div
      className="productContainer"
      style={{
        display: "flex"
      }}
    >
      {products.map((product, index) => {
        return (
          <ProductCard
            key={index}
            img={product.img}
            text={product.text}
            title={product.title}
          />
        );
      })}
    </div>
  );
  return;
};

export default Products;

function ProductCard({ img, text, title }) {
  return (
    <>
      <div className="container">
        <div className="card" style={{ width: "18rem" }}>
          <img src={img} alt="logo" height="60px" width="60px" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{text}</p>
          </div>
        </div>
      </div>
    </>
  );
}
