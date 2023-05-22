import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ReportDocument from "./components/ReportDocument";
import "./index.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./features/api/dataApiSlice";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";

const THEME = createTheme({
  typography: {
    fontFamily: ["'Chakra Petch', sans-serif"].join(","),
  },
});

const viewerStyle = {
  display: "block",
  margin: "0 auto",
  width: "70vw",
  height: "90vh",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <Provider store={store}>
        <ThemeProvider theme={THEME}>
          <BrowserRouter>
            <Routes>
              <Route path="/build" element={<App />}></Route>
              <Route
                path="/print"
                element={
                  <>
                    <div>print</div>
                    <a href="/build">กดดิ</a>
                    <PDFViewer style={viewerStyle}>
                      <ReportDocument />
                    </PDFViewer>
                  </>
                }
              ></Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);
