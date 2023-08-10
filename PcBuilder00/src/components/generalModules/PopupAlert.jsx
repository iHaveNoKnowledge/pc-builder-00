import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const AlertContent1 = () => {
  return (
    <>
      <AlertTitle>แจ้งเตือน</AlertTitle>
      <h2>กรุณาเลือกสินค้า</h2>
    </>
  );
};

export const PopupAlert = () => {
  return (
    <Alert severity="warning">
      <AlertContent1 />
    </Alert>
  );
};
