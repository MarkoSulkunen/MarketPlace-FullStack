import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    /* if props.asOverlay is truthly, render a div with className loading-spinner__overlay */
    <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
      <div className="lds-dual-ring" data-testid="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
