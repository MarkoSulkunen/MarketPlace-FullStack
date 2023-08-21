import React, { useContext } from "react";
import { useQuery } from "react-query";

import ProductList from "../components/ProductList";
import LoadingSpinner from "../../shared/components/loadingspinner/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

import { getProductsById } from "../api/products";

const MyProducts = () => {
  // Retrieve userId and token from AuthContext
  const { userId, token } = useContext(AuthContext);

  // Calls getProductsById API endpont using userId and token as parameters
  const { isLoading, error, data } = useQuery(
    ["productsData", userId],
    () => getProductsById(userId, token),
    { enabled: !!userId }
  );

  console.log(data);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div>An error has occurred: {error.message}</div>;
  }

  // Filters the data array to only show the products owned by authenticated user
  const userProducts = data.filter((product) => product.userId === userId);

  // Renders the ProductList component with filtered userProducts data
  return <ProductList items={userProducts} />;
};

export default MyProducts;
