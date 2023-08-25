import React, { useEffect } from "react";

import Button from "@mui/material/Button";

export default function SaveSetByPAT(prop) {
  const { updateByPattern } = prop.data;

  const handleSubmit = (e) => {
    console.table("btn Clicked!!", prop.data, e.target);
    updateByPattern(prop.data)
      .unwrap()
      .then((response) => {
        console.log("บันทึกสำเร็จ");

        return response;
      })
      .catch((error) => {
        if (error) {
          console.error("บันทึกไม่สำเร็จ", error);
        } else if (error.request) {
          console.error("Unable to connect to the server.", error);
        } else {
          console.error("An error occurred.", error);
        }
      });
  };
  // useEffect(() => {
  //   updateByPattern(saveDate)
  //     .unwrap()
  //     .then((response) => console.log("API response", response));
  // }, []);

  return (
    <>
      <Button variant="contained" onClick={handleSubmit}>
        Save By Pattern
      </Button>
    </>
  );
}
