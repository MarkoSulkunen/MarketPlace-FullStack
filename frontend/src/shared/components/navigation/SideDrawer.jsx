import { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./SideDrawer.css";
const SideDrawer = (props) => {
  /* Create a reference to the DOM node that needs to be animated */
  const nodeRef = useRef();

  /* Create content of the side drawer and wrap it with a CSSTransition */
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <aside className="side-drawer" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );
  /* ReactDOM to create portal and render the content in specified DOM element */
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};
export default SideDrawer;
