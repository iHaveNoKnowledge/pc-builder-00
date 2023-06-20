import { useState, useEffect } from "react";
import "./App.css";
import CustomizationProto01 from "./components/CustomizationProto01";
import CustomizationProto02 from "./components/CustomizationProto02";
import SelectionProto01 from "./components/SelectionProto01";
import ReportA4 from "./components/Documents/ReportA4";
import TestReportA4 from "./components/Documents/testReportA4";
import { Box, Container, Grid } from "@mui/material";
import { Route, Routes, BrowserRouter, NavLink, useNavigate } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import SaveBuildBtn from "./components/saveBuildForm";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.0.25:9000/api/testProducts")
      .then((response) => {
        const x = response.data.recordsets.flat();
        console.log("จากเซิฟ", response.data.recordset);
        setData(x);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="App">
      <Container disableGutters sx={{ height: "auto", maxWidth: "100%" }}>
        {/* outergrid */}
        <Grid container columns={{ xs: 4, sm: 12, md: 12 }} rowHeight={25}>
          {/* TOPPICK QUICK SET ZONE */}
          <Grid item xs={12} sm={12} md={12} sx={{ border: "1px dashed rgba(0, 153, 51,1)" }}>
            <Box sx={{ px: 1 }}>TOPPICK has state fromserver</Box>
          </Grid>

          <Grid item xs={4} sm={4} md={4}>
            {/* <Customization /> */}
            <CustomizationProto02 />
          </Grid>

          <Grid item xs={4} sm={8} md={8}>
            <Box sx={{ pl: 2 }}>
              {/* <Selection /> */}
              {/* <SelectionProto00 /> */}
              <SelectionProto01 />
            </Box>
          </Grid>
        </Grid>
        <div>{JSON.stringify(data)}</div>
      </Container>
    </div>
  );
}

export default App;
