import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

import Backdrop from "../backdrop/Backdrop";

import "./Modal.css";

/* Seperate component that defines the content of the model */
const ModalOverlay = (props) => {
  /* Creates model content based on the props passed to the component */
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
      </form>
      <footer className={`modal__footer ${props.footerClass}`}>
        <h2>{props.footer}</h2>
      </footer>
    </div>
  );
  /* Creates a portal and return the modal content so it can be displayed outside parent components DOM hierarchy */
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  /* useRef hook for referencing the CSSTransition node */
  const nodeRef = useRef();

  /* Render the modal and backdrop components based on the props passed */
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        nodeRef={nodeRef}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};
export default Modal;
