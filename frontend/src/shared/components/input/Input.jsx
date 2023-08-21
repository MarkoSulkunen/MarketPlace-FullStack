import { forwardRef } from "react";
import "./Input.css";

/* Defining new functional component that accepts props and ref */
const Input = forwardRef((props, ref) => {
  return (
    /* Component returns div that contains label and input */
    <div className="form-control">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={ref}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
});

export default Input;
