import React, { useContext, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";

import Card from "../../shared/components/card/ProductCard";
import Button from "../../shared/components/button/Button";
import Modal from "../../shared/components/modal/Modal";

import { AuthContext } from "../../shared/context/auth-context";
import { deleteProduct, editProduct } from "../api/products";
import { Link } from "react-router-dom";

import "./ProductItem.css";

const ProductItem = (props) => {
  const auth = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: props.name,
    price: props.price,
    info: props.info,
    image: props.image,
    location: props.location,
  });

  const [isOwner, setIsOwner] = useState(false);

  // Setting isPwner state variable based on the authentication user id
  useEffect(() => {
    if (auth.userId === props.userId) {
      setIsOwner(true);
    }
  }, [auth.userId, props.userId]);

  // Handel function for confirmation modal
  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  // Handler function for edit modal
  const showEditHandler = () => setShowEditModal(true);
  const cancelEditHandler = () => setShowEditModal(false);

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: onEditChangeHandler
 DESCRIPTION: Handles the input change for the edit product form.
*********************************************************************/
  const onEditChangeHandler = (event) => {
    setEditedProduct({
      ...editedProduct,
      [event.target.name]: event.target.value,
    });
  };

  // Mutation function for editing a product
  const editProductMutation = useMutation(editProduct, {
    onSuccess: (data) => {
      console.log(data);
      console.log("editProductMutation success");
      queryClient.invalidateQueries("products");
      setShowEditModal(false);
      window.location.reload();
    },
    onError: (error) => {
      console.log(error);
      console.log(error.message);
      console.log("editProductMutation error");
      console.log(error.response);
      console.log(error.request);
      console.log(error.config);
      queryClient.invalidateQueries("products");
      window.location.reload();
    },
  });

  // Mutation function for deleting a product
  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: (data) => {
      console.log(data);
      console.log("success");
      queryClient.invalidateQueries("products");
      window.location.reload();
    },
    onError: (error) => {
      console.log(error.message);
      console.log("error");
      queryClient.invalidateQueries("products");
      window.location.reload();
    },
  });

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: deleteConfirmedHandler
 DESCRIPTION: Handles the confirmation of deleting a product.
*********************************************************************/
  const deleteConfirmedHandler = () => {
    setShowConfirmationModal(false);
    deleteProductMutation.mutate(
      { id: props.id, token: auth.token },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  };

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: editConfirmedHandler
 DESCRIPTION: Handles the confirmation of editing a product.
*********************************************************************/
  const editConfirmedHandler = () => {
    console.log("editConfirmedHandler called");
    setShowEditModal(false);
    editProductMutation.mutate(
      { id: props.id, token: auth.token, editedProduct },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  };

  return (
    <>
      <Modal
        show={showConfirmationModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelConfirmationHandler}>
              CANCEL
            </Button>
            <Button danger onClick={deleteConfirmedHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>Do you really want to delete this product?</p>
      </Modal>

      <Modal
        show={showEditModal}
        header="Edit Product"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelEditHandler}>
              CANCEL
            </Button>
            <Button onClick={editConfirmedHandler}>SAVE</Button>
          </React.Fragment>
        }
      >
        <form>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={onEditChangeHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              min="0.01"
              step="0.01"
              value={editedProduct.price}
              onChange={onEditChangeHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="info">Info</label>
            <textarea
              name="info"
              rows="5"
              value={editedProduct.info}
              onChange={onEditChangeHandler}
            />
          </div>
          <div className="form-control">
            <label htmlFor="image">Image</label>
            <input
              type="text"
              name="image"
              value={editedProduct.image}
              onChange={onEditChangeHandler}
            />
          </div>
        </form>
      </Modal>
      <Card className="product-item">
        <div className="product-item__info">
          <h3>Owner: {props.owner}</h3>
          <div className="product-item__image">
            <img src={props.image} />
          </div>
          <h2>{props.name}</h2>
          <p>{props.info}</p>
          <p>{props.price}€</p>
          <p>Location: {props.location}</p>
          <h3>
            Contact:{" "}
            <Link
              to="#"
              onClick={(e) => {
                window.location.href = "mailto:" + props.contact;
                e.preventDefault();
              }}
            >
              {props.contact}
            </Link>
          </h3>
        </div>
        {auth.isLoggedIn && isOwner && (
          <div className="product-item__actions">
            <Button inverse onClick={showEditHandler}>
              EDIT
            </Button>
            <Button danger onClick={showConfirmationHandler}>
              DELETE
            </Button>
          </div>
        )}
      </Card>
    </>
  );
};

export default ProductItem;
