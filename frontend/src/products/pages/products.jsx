import React from "react";
import { useQuery } from "react-query";

import ProductList from "../components/ProductList";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";

import { getProducts } from "../api/products";

const Products = () => {
  const { isLoading, error, data } = useQuery("productsData", getProducts);
  console.log(data);
  if (isLoading)
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );

  if (error) return "An error has occurred: " + error.message;
  // Renders the ProductList component with products data
  return <ProductList items={data} />;
};

export default Products;
