import React from "react";
import { useQuery, useQueryClient } from "react-query";
import ProductItem from "./ProductItem";
import { getProducts } from "../api/products";

import "./ProductList.css";

const ProductList = ({ items }) => {
  // Querying products data
  const { data: products, isLoading } = useQuery("products", getProducts, {
    refetchOnWindowFocus: false,
  });

  // Checking if items prop exists and using it as the product list if it does, otherwise using products from the API
  const productList = items.length > 0 ? items : products;

  return (
    <>
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <ul className="product-list">
          {productList.map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              info={product.info}
              owner={product.owner}
              contact={product.contact}
              location={product.location}
              image={product.image}
              userId={product.userId}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default ProductList;
