import React from "react";
import Box from "@mui/material/Box";
import SaveBuildBtn from "./saveBuildForm";
import "./BottomComponent.css";
import ReportDocument from "./ReportDocument";
import SetList from "./SetList";
import AddSN from "./ReportCashier/AddSN";

function Bottom() {
  return (
    <Box className="mainCardBottom">
      <Box>
        <SetList />
      </Box>
      <Box>
        <SaveBuildBtn />
      </Box>

      <Box>
        <ReportDocument />
      </Box>

      <Box>
        <AddSN />
      </Box>
    </Box>
  );
}

export default Bottom;
