import React from "react";

import "./ProductCard.css";

const ProductCard = (props) => {
  return (
    <div className={`productcard ${props.className}`} style={props.style}>
      {props.children}
    </div>
  );
};

export default ProductCard;
