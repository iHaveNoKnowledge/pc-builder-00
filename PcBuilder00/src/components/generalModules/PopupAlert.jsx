import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

// options
const AlertContent1 = () => {
  return (
    <>
      <AlertTitle>แจ้งเตือน</AlertTitle>
      <h2>กรุณาเลือกสินค้าอย่างน้อย 1 อย่างเป็นต้นไป</h2>
    </>
  );
};

//Selecter
const selector = {
  selected: <AlertContent1 />,
};

const displayComponents = (obj, propertyName) => {
  if (obj.hasOwnProperty(propertyName)) {
    return obj[propertyName];
  } else {
    return <>No alert type</>;
  }
};

//Exporter
export const PopupAlert = ({ type }) => {
  return <Alert severity="warning">{displayComponents(selector, type)}</Alert>;
};

export default PopupAlert;
