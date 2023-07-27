import React from "react";
import Box from "@mui/material/Box";
import { AppBar, Toolbar, Button } from "@mui/material";
import SaveBuildBtn from "./saveBuildForm";
import "./BottomComponent.css";
import { useNavigate } from "react-router-dom";
import ReportDocument from "./ReportDocument";
import SetList from "./SetList";
import AddSN from "./ReportCashier/AddSN";
import { useDispatch, useSelector } from "react-redux";

function Bottom() {
  const history = useNavigate();
  return (
    <Box className="mainCardBottom">
      <Box>
        <SetList />
      </Box>
      <Box>
        <SaveBuildBtn
          variant="contained"
          sx={{
            height: "27.5px",
            borderRadius: "0px",
            backgroundColor: "#42528A",
          }}
        />
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
