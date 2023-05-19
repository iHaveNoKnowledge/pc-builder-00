import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./features/api/dataApiSlice";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

const THEME = createTheme({
  typography: {
    fontFamily: ["'Chakra Petch', sans-serif"].join(","),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <Provider store={store}>
        <ThemeProvider theme={THEME}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />}></Route>
              <Route
                path="/print"
                element={
                  <>
                    <div>print</div>
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
