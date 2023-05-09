import { useState } from "react";
import "./App.css";
import CustomizationProto01 from "./components/CustomizationProto01";
import CustomizationProto02 from "./components/CustomizationProto02";
import SelectionProto01 from "./components/SelectionProto01";
import ReportA4 from "./components/Documents/ReportA4";
import { Box, Container, Grid } from "@mui/material";
import { Route, Routes, BrowserRouter, NavLink, useNavigate } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";

function App() {
  // ReactPDF.renderToStream(<ReportA4 />);
  return (
    <BrowserRouter>
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

            <Grid>
              <PDFViewer style={{ width: "775px", height: "800px" }}>
                <ReportA4 />
              </PDFViewer>
            </Grid>
          </Grid>
          {/* <PostsList /> เอาไว้เทสดึง api */}
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
