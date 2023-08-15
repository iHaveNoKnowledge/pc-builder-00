import React, { lazy, Suspense } from "react";
import { Box, Button } from "@mui/material";
import "./BottomComponent.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./SetList";

const componentsToLazyLoad = [
  { path: () => import("./saveBuildForm"), label: "Save Set" },
  { path: () => import("./SetList"), label: "Set List" },
  { path: () => import("./ReportDocument"), label: "Report" },
  { path: () => import("./ReportCashier/AddSN"), label: "Add SN" },
];

function Bottom() {
  return (
    <ThemeProvider theme={theme}>
      <Box className="mainCardBottom" sx={{ minHeight: "28px", position: "relative" }}>
        {componentsToLazyLoad.map(({ path, label }) => (
          <Suspense
            key={path.toString()}
            fallback={
              <>
                <Button variant="contained" color={label === "Add SN" ? "secondary" : "primary"}>
                  {label}
                </Button>
              </>
            }
          >
            <Box>{React.createElement(lazy(path), { label })}</Box>
          </Suspense>
        ))}
      </Box>
    </ThemeProvider>
  );
}

export default Bottom;
