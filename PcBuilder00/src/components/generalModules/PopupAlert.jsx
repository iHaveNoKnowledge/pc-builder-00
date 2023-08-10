import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export const PopupAlert = () => {
  return (
    <Alert severity="warning">
      <AlertTitle>Warning</AlertTitle>
      This is a warning alert — <strong>check it out!</strong>
    </Alert>
  );
};
