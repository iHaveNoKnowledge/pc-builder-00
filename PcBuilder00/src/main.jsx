import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { store } from "./store";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSliceDb, apiPutSets } from "./features/api/dataApiSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import Preview from "./components/pdfTest/pdfTest";
import PdfText2 from "./components/pdfTest/PdfText2";
import PdfTest3Wysiwyg from "./components/pdfTest/pdfTest3wysiwyg";

const THEME = createTheme({
  typography: {
    fontFamily: ["'Chakra Petch', sans-serif"].join(","),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider api={(apiSliceDb, apiPutSets)}>
      <Provider store={store}>
        <ThemeProvider theme={THEME}>
          <BrowserRouter>
            {/* <CssBaseline /> */}
            <Routes>
              <Route path="" element={<App />} />
              <Route path="/pdfTest" element={<PdfText2 />} />
              <Route path="/pdfTest3" element={<PdfTest3Wysiwyg />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);
