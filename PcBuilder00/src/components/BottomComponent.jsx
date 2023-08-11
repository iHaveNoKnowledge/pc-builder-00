import React, { lazy, Suspense } from "react";
import Box from "@mui/material/Box";
import "./BottomComponent.css";

const componentsToLazyLoad = [
  { path: () => import("./saveBuildForm"), label: "Save Build" },
  { path: () => import("./SetList"), label: "Set List" },
  { path: () => import("./ReportDocument"), label: "Report Document" },
  { path: () => import("./ReportCashier/AddSN"), label: "Add SN" },
];

function Bottom() {
  return (
    <Box className="mainCardBottom" sx={{ minHeight: "28px" }}>
      {componentsToLazyLoad.map(({ path, label }) => (
        <Suspense key={path.toString()} fallback={<></>}>
          <Box>{React.createElement(lazy(path), { label })}</Box>
        </Suspense>
      ))}
    </Box>
  );
}

export default Bottom;
