import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { List, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./BottomComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { saveSet } from "../slices/reportSlice";

export default function SetList() {
  const partData = useSelector((state) => state.noApiCustomize.partData);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [inputData, setInputData] = React.useState({});

  ////onclick เปิด Dialog ////////////////////////////////////////////////////////////////////
  const handleClickOpen = () => {
    setOpen(true);
  };

  ////onclick ปิด Dialog ////////////////////////////////////////////////////////////////////
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          height: "27.5px",
          borderRadius: "0px",
          backgroundColor: "#42528A",
        }}
      >
        Set List
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="none">
        <DialogTitle
          sx={{
            backgroundColor: "#414151",
            fontSize: 18,
            color: "#e6e6e6",
            px: "10px",
            pt: "20px",
            pb: "5px",
            width: "1000px",
          }}
        >
          เลือก Set
        </DialogTitle>
        <List>
          <DialogContent
            sx={{
              borderLeft: "10px solid #0033E6",
              backgroundColor: "#4141",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                fontSize: 16,
                color: "#3d3d3d",
                textAlign: "center",
              }}
            >
              <Box sx={{ flexGrow: 0.2, width: "4.5%" }}>No.</Box>
              <Box sx={{ flexGrow: 0.3, width: "14%" }}>SetName</Box>
              <Box sx={{ flexGrow: 1, width: "50.5%" }}>Components</Box>
              <Box sx={{ flexGrow: 0.2, width: "7%" }}>SaveDate</Box>
              <Box sx={{ flexGrow: 0.2, width: "11%" }}>Price</Box>
              <Box sx={{ flexGrow: 0.2, width: "13%" }}>Total</Box>
            </Box>
            <Divider />

            {/* {itemList.map((item, index) => {
              totalPrice += item.srp * item.selectAmount;
              return (
                <React.Fragment key={index}>
                  <Box
                    // container
                    sx={{ display: "flex", textAlign: "center", my: "10px", fontSize: 14 }}
                  >
                    <Box sx={{ flexGrow: 0.2, width: "4.5%" }}>{index + 1}</Box>
                    <Box sx={{ flexGrow: 0.3, width: "14%" }}>{item.code}</Box>
                    <Box sx={{ flexGrow: 1, width: "50.5%" }}>{item.description}</Box>
                    <Box sx={{ flexGrow: 0.2, width: "7%" }}>{item.selectAmount}</Box>
                    <Box sx={{ flexGrow: 0.2, width: "11%" }}>{item.srp}</Box>
                    <Box sx={{ flexGrow: 0.2, width: "13%" }}>
                      {item.srp * item.selectAmount} {item.sn}
                    </Box>
                  </Box>

                  
                  <Box sx={{ overflow: "auto", maxHeight: "150px" }}>
                    {item.sn.map((item2, index2) => {
                      return (
                        <React.Fragment key={index2}>
                          <Box
                            // container
                            sx={{
                              display: "flex",
                              textAlign: "center",
                              my: "4.5px",
                              ml: "5.5vw",
                            }}
                          >
                            <TextField
                              size="small"
                              id="filled-basic"
                              label="S/N"
                              variant="filled"
                              sx={{ zoom: "80%", width: "450px" }}
                              onKeyDown={(event) => handleKeyDown(event, index2, index, item2)}
                              inputRef={(textField) => handleTextFieldRef(textField, index2, index)}
                              {...register(`Item${index}SN${index2}`)}
                              onChange={(event) => handleChange(event, index, index2)}
                            />
                            <Box>{item2}</Box>
                          </Box>
                        </React.Fragment>
                      );
                    })}
                  </Box>
                  <Divider />
                </React.Fragment>
              );
            })} */}
          </DialogContent>
        </List>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained" color="success">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
