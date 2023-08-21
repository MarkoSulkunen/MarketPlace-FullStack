import { useRef, useContext } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useHistory } from "react-router-dom";

import "./AddProduct.css";

import Input from "../../shared/components/input/Input";
import Button from "../../shared/components/button/Button";
import { AuthContext } from "../../shared/context/auth-context";

import { createProduct } from "../api/products";

import { getUserById } from "../../users/api/users";

const AddProduct = () => {
  // Creating refs to acces input values
  const nameRef = useRef();
  const priceRef = useRef();
  const infoRef = useRef();
  const imageRef = useRef();
  const locationRef = useRef();

  // Accessing authentication and user data from the AuthContext
  const auth = useContext(AuthContext);
  const { userId } = useContext(AuthContext);

  // Accessing history object to manipulate the history stack
  const history = useHistory();

  // Creating a query client to make queries to the server
  const queryClient = useQueryClient();

  // Fetching user data
  const { isLoading, error, data } = useQuery(
    ["usersData", userId],
    () => getUserById(userId),
    { enabled: !!userId }
  );

  console.log("isLoading:", isLoading);
  console.log("error:", error);
  console.log("user data:", data);

  // Creating mutation to add a product
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
      history.push("/");
    },
  });

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: productSubmitHandler
 DESCRIPTION:
     Gets input values from refs and sends a mutation to the server
     to add the product to the database.
     Called when user submits form to add a new product.
*********************************************************************/
  const productSubmitHandler = (event) => {
    event.preventDefault();
    createProductMutation.mutate({
      name: nameRef.current.value,
      price: priceRef.current.value,
      info: infoRef.current.value,
      location: locationRef.current.value,
      owner: data?.name,
      contact: data?.email,
      image: imageRef.current.value,
      token: auth.token,
      userId: auth.userId,
    });
  };

  return (
    <form className="product-form" onSubmit={productSubmitHandler}>
      <Input ref={nameRef} type="text" label="Name" id="product-name" />
      <Input ref={priceRef} type="text" label="Price" id="product-price" />
      <Input ref={infoRef} type="text" label="Info" id="product-info" />
      <Input
        ref={locationRef}
        type="text"
        label="Location"
        id="product-location"
      />
      <Input ref={imageRef} type="text" label="Image Link" id="product-image" />
      <Button type="submit">Add Product</Button>
    </form>
  );
};

export default AddProduct;
