import React, { useState, useLayoutEffect, useEffect } from "react";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export const CustomPopper = (props) => {
  const { open, anchorEl, options, onSelect, children, isFocus } = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [styleComponent, setStyleComponent] = useState(anchorEl.clientWidth);
  //! รับค่าความกว้่างของ element ต้นทาง เพื่อ anchor แต่มันสามารถเขียนง่ายๆได้จากการรับ prop anchorEl.clientWidth จบ
  const anchorElRect = anchorEl.getBoundingClientRect();

  useEffect(() => {
    if (open && isFocus) {
      setTimeout(() => {
        setStyleComponent(anchorElRect.width);
      }, 75);
    }

    //!ถ้าเปิดอันนี้มันจะ error รัวๆ
    //* แก้ได้ด้วยการใช้ setTimeout มันจะทำให้ error รัวๆไม่เกิดขึ้น แต่ไม่รู้แก้ได้จริงป่าว
  }, [anchorElRect]);
  // }, []);

  const style = {
    overflow: "auto",
    minHeight: "10vh",
    height: "500px",
    width: styleComponent,
  };

  return (
    <ListItem>
      <Popper
        style={style}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        modifiers={[
          {
            name: "flip",
            enabled: false,
            // options: {
            //   altBoundary: true,
            //   rootBoundary: "viewport",
            //   padding: 8,
            // },
          },
          {
            name: "preventOverflow",
            enabled: false,
            // options: {
            //   altAxis: true,
            //   altBoundary: true,
            //   tether: true,
            //   rootBoundary: "document",
            //   padding: 0,
            //   bottom: 0,
            // },
          },
        ]}
      >
        {children}
      </Popper>
    </ListItem>
  );
};
