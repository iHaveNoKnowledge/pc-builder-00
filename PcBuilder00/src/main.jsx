import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./components/generalModules/Login";
import { store } from "./store";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSliceDb, apiPutSets } from "./features/api/dataApiSlice";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);
