import * as React from "react";
import { useUpdateByPatternMutation } from "../../features/api/dataApiSlice";

import Button from "@mui/material/Button";

export default function SaveSetByPAT(prop) {
  const [updateData] = useUpdateByPatternMutation();
  return (
    <>
      <Button
        variant="contained"
        onClick={() =>
          console.log(
            "btn Clicked!!",
            prop.data
          )
        }
      >
        SaveByPattern
      </Button>
    </>
  );
}
