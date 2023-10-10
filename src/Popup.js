import React from "react";
import './popup.css'
 
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box text-dark ">
        <span className="close-icon text-danger" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;