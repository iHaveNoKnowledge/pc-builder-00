import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { store } from "./store";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSliceDb, apiPutSets } from "./features/api/dataApiSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Preview from "./components/pdfTest/pdfTest";
import PdfText2 from "./components/pdfTest/PdfText2";

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
            <Routes>
              <Route path="" element={<App />} />
              <Route path="/pdfTest" element={<PdfText2 />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);
