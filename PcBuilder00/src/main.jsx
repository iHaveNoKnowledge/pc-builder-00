import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store, persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./features/api/dataApiSlice";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

const THEME = createTheme({
  typography: {
    fontFamily: ["'Chakra Petch', sans-serif"].join(","),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
                    </>
                  }
                ></Route>
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);
