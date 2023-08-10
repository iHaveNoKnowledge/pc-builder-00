// Popup.js
import React, { useState } from "react";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={popupContainerStyle}>
      <button style={openPopupButtonStyle} onClick={togglePopup}>
        Open Popup
      </button>
      {isOpen && (
        <div style={popupStyle}>
          <div style={popupContentStyle}>
            <h2>รายการสินค้าตามสาขา</h2>
            <p>This is the content of the popup.</p>
            <button style={closePopupButtonStyle} onClick={togglePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;

//* css
const popupContainerStyle = {
  // textAlign: "center",
  // marginTop: "100px",
};

const openPopupButtonStyle = {
  // padding: "10px 20px",
  // backgroundColor: "#007bff",
  // color: "white",
  // border: "none",
  // cursor: "pointer",
};

const popupStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "1000",
};

const popupContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
};

const closePopupButtonStyle = {
  marginTop: "10px",
  padding: "5px 10px",
  backgroundColor: "#ccc",
  border: "none",
  cursor: "pointer",
};
