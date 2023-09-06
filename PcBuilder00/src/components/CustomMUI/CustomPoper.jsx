import React, { useState } from "react";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

export const CustomPopper = (props) => {
  const { open, anchorEl, options, onSelect } = props;
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    onSelect(options[index]);
    console.log("ได้ไรออกมาไหม: ", options[index]);
  };

  return (
    <Box>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
        <Paper>
          <List>
            {options.map((option, index) => (
              <ListItem
                key={option.BR_CODE}
                onMouseOver={() => setSelectedIndex(index)}
                //   onClick={(event) => handleListItemClick(event, index)}
                onClick={() => console.log("กดข้างใน: ", index)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "lightgray",
                  },
                }}
              >
                <ListItemText primary={option.BR_CODE} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
    </Box>
  );
};
