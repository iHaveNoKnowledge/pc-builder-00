import React, { useState, useEffect } from "react";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const CustomPopper = (props) => {
  const { open, anchorEl, options, onSelect, children } = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [styleComponent, setStyleComponent] = useState({ width: 0 });

  console.log("children: ", children);
  //! รับค่าความกว้่างของ element ต้นทาง เพื่อ anchor แต่มันสามารถเขียนง่ายๆได้จากการรับ prop anchorEl.clientWidth จบ
  const anchorElRect = anchorEl.getBoundingClientRect();
  useEffect(() => {
    setStyleComponent((prev) => {
      return { ...prev, width: anchorElRect.width };
    });
  }, [anchorElRect]);

  const style = {
    overflow: "auto",
    minHeight: "10vh",
    height: "500px",
    width: styleComponent,
    left: 0,
  };

  return (
    <ListItem>
      <Popper
        sx={style}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        modifiers={[
          {
            name: "flip",
            enabled: false,
            options: {
              altBoundary: false,
              rootBoundary: "document",
              padding: 8,
            },
          },
          {
            name: "preventOverflow",
            enabled: false,
            options: {
              altAxis: false,
              altBoundary: false,
              tether: false,
              rootBoundary: "document",
              padding: 8,
            },
          },
        ]}
      >
        {children}
      </Popper>
    </ListItem>
  );
};
