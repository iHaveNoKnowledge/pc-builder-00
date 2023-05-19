import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import "./BottomComponent.css";
import SaveBuildBtn from "./saveBuildForm";

function Bottom() {
  return (
    <Box className="mainCardBottom">
      <Box>
        <SaveBuildBtn variant="contained" className="colorBtn" />
      </Box>

      <Box>
        <Button variant="contained" className="colorBtn">
          Report
        </Button>
      </Box>

      <Box>
        <Button variant="contained" className="colorBtn">
          Add S/N
        </Button>
      </Box>
    </Box>
  );
}

export default Bottom;
