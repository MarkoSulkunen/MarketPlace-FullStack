/* This module exports functions related to API calls to product database */

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: getProducts
 DESCRIPTION: Makes API call to fetch all products from the server.

 Input: None
 Output: Returns a promise that resolves to an array of all products
*********************************************************************/
export const getProducts = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
  return await res.json();
};

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: getProductsById
 DESCRIPTION: Makes API call to fetch products by user id

 Input: userId, token
 Output: Returns a promise that resolves to an array of products by user id
*********************************************************************/
export const getProductsById = async (userId, token) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/products?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await res.json();
};

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: createProduct
 DESCRIPTION: Makes API call to create a new product

 Input: name, price, info, location, owner, contact, image, token, userId
 Output: Returns a promise that resovles to the created product object
*********************************************************************/
export const createProduct = async ({
  name,
  price,
  info,
  location,
  owner,
  contact,
  image,
  token,
  userId,
}) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      price,
      info,
      location,
      owner: owner,
      contact: contact,
      image,
      userId,
    }),
  });

  return await res.json();
};

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: deleteProduct
 DESCRIPTION: Makes API vall to delete a product

 Input: id, token
 Output: Returns a promise that resolves to the deleted product object
*********************************************************************/
export const deleteProduct = async ({ id, token }) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not delete product.");
  }
  return data;
};

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: editProduct
 DESCRIPTION: Makes API call to edit an existing product.

 Input: id, token, editedProduct
 Output: Returns a promise that resolves to the edited product object
*********************************************************************/
export const editProduct = async ({ id, token, editedProduct }) => {
  console.log("Request sent to editProduct endpoint with params:", { id });
  console.log("Request body:", editedProduct);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(editedProduct),
  });
  console.log("Response from server:", response);
  const data = await response.json();

  console.log("Response from editProduct endpoint:", data);

  try {
    const parsedData = JSON.parse(data);
    console.log("Response from editProduct endpoint:", parsedData);
    if (!response.ok) {
      throw new Error(parsedData.message || "Could not edit product.");
    }
    return parsedData;
  } catch (error) {
    console.error("editProductMutation error", error);
    return undefined;
  }
};
