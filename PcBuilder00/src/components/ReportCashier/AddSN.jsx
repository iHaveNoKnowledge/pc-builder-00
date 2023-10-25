import * as React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Dialog,
  IconButton,
  Typography,
  Slide,
  Box,
  Divider,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import TableDocumentCashier from "./TableDocumentCashier";
import { PDFViewer } from "@react-pdf/renderer";
import CloseIcon from "@mui/icons-material/Close";
import { theme } from "../SetList";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import "./AddSN.css";
import { setSN } from "../../slices/reportSlice";

const AddSN = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [open, setOpen] = React.useState(false);
  const [openPrint, setOpenPrint] = React.useState(false);

  const [inputData, setInputData] = React.useState({
    buildedName: "",
    customerName: "",
    customerTel: "",
    salerName: "",
  });
  const [selectedItem, setSelectedItem] = React.useState({
    partData: [
      {
        category: "CPU",
        typeMax: 1,
        typeAmount: 0,
        listItems: [
          {
            id: "1",
            code: "CR6-001042",
            description:
              "GIGABYTE AORUS RADEON RX6900XT XTREME WATERFORCE WB 16GB GDDR6 256 bit CL 19-31/8/22",
            selectAmount: 1,
            srp: 77900.0,
            promotionPrice: 77900.0,
          },
        ],
      },
      {
        category: "Mainboard",
        typeMax: 1,
        typeAmount: 0,
        listItems: [
          {
            id: "5",
            code: "CR4-000751",
            description: "GIGABYTE Z590 AORUS TACHYON DDR4 LGA1200 CL 19-31/8/22",
            selectAmount: 1,
            srp: 16100.0,
            promotionPrice: 7990,
          },
        ],
      },
      {
        category: "RAM",
        typeMax: 4,
        typeAmount: 0,
        listItems: [
          {
            id: "21",
            code: "ME1-000994",
            description: "KINGSTON FURY IMPACT 8GB (8X1/3200) DDR4 (KF432S20IB/8) NB",
            selectAmount: 3,
            srp: 1000,
            promotionPrice: 950,
          },
          {
            id: "292",
            code: "ME1-000993",
            description: "KINGSTON FURY BEAST16GB (8X2/3200) DDR4 (KF432C16BBK2/16)",
            selectAmount: 2,
            srp: 2190,
            promotionPrice: 1990,
          },
        ],
      },
    ],
  });

  //* onclick เปิด Form ////////////////////////////////////////////////////////////////////
  const handleClickOpen = () => {
    setOpen(true);
  };

  //* onclick ปิด Form ////////////////////////////////////////////////////////////////////
  const handleClose = () => {
    setOpen(false);
  };
  //* onclick สำหรับกด save  ////////////////////////////////////////////////////////////////////
  const handleSave = () => {
    handleClose();
    handlePrintClickOpen();
  };

  //* onclick เปิด PrintPage ////////////////////////////////////////////////////////////////////
  const handlePrintClickOpen = () => {
    setOpenPrint(true);
  };

  //* onclick ปิด PrintPage ////////////////////////////////////////////////////////////////////
  const handlePrintClose = () => {
    setOpenPrint(false);
  };

  let totalPrice = 0;

  //* ทำตัวแปรสำหรับเก็บค่าเพื่อออกเอกสาร////////////////////////////////////////////////////////// itemList
  let itemList = [];
  const { partData, itemsList } = useSelector((state) => state.customize);
  console.log("partDataReport2 มีค่าว่าไร: ", itemList);
  itemList = [...itemsList];
  // itemsList.partData.map((item1) => {
  //   item1.listItems.map((item2) => {
  //     itemList = [...itemList, item2];
  //   });
  // });
  console.log("itemList = [...itemsList]", itemList);

  itemList.forEach((item) => {
    const times = item.selectAmount;
    const newItem = Object.assign({}, item);
    newItem.sn = Array(times).fill("");
    itemList[itemList.indexOf(item)] = newItem;
  });

  const onSubmit = () => {
    itemList = itemList.map((item1, index1) => {
      const updatedSN = item1.sn.map((sn, snIndex) => {
        console.log("ได้ไร", watch(`Item${index1}SN${snIndex}`));
        return watch(`Item${index1}SN${snIndex}`);
      });

      return { ...item1, sn: updatedSN };
    });
    console.log("สุดท้ายได้ไร: ", itemList);
    dispatch(setSN(itemList));
  };

  const handleChange = (event, index, index2) => {
    const value = event.target.value;
    setValue(`Item${index}SN${index2}`, value);
  };

  //** EnterNewLine
  const textFieldsRef = React.useRef([]);

  const handleKeyDown = (event, currentIndex, parentIndex) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const nextIndex = currentIndex + 1;
      if (nextIndex < textFieldsRef.current[parentIndex].length) {
        textFieldsRef.current[parentIndex][nextIndex].focus();
      } else {
        const nextParentIndex = parentIndex + 1;
        if (nextParentIndex < textFieldsRef.current.length) {
          textFieldsRef.current[nextParentIndex][0].focus();
        }
      }
    }
  };

  const handleTextFieldRef = (textField, index, parentIndex) => {
    if (!textFieldsRef.current[parentIndex]) {
      textFieldsRef.current[parentIndex] = [];
    }
    textFieldsRef.current[parentIndex][index] = textField;
  };

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
        sx={{
          height: "27.5px",
          borderRadius: "0px",
          backgroundColor: "#ff8d29",
          color: "#303030",
          // borderLeft: "7px solid #414151",
        }}
      >
        Add SN
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="none">
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ borderLeft: "10px solid #414151" }}>
          <DialogContent sx={{ width: "71vw", minWidth: "700px", padding: "0" }}>
            {/* <DialogContentText>Enter Your Build Name</DialogContentText> */}
            <DialogContentText
              sx={{
                backgroundColor: "#414151",
                fontSize: 24,
                color: "#e6e6e6",
                px: "10px",
                overflow: "hidden",
              }}
            >
              Add S/N
            </DialogContentText>
            <DialogContent
              sx={{
                backgroundColor: "#4141",
                flexDirection: "column",
                overflowY: "scroll",
                height: "74vh",
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
                <Box sx={{ ...inlineOrder }}>No.</Box>
                <Box sx={{ ...inlineCode }}>Code</Box>
                <Box sx={{ ...inlineDescr }}>Description</Box>
                <Box sx={{ ...inlineQTY }}>QTY</Box>
                <Box sx={{ ...inlinePrice }}>Price</Box>
                <Box sx={{ ...inlineTotal }}>Total</Box>
              </Box>
              <Divider />

              {itemList.map((item, index) => {
                totalPrice += item.srp * item.selectAmount;
                return (
                  <React.Fragment key={index}>
                    <Box
                      // container
                      sx={{
                        display: "flex",
                        textAlign: "center",
                        my: "10px",
                        fontSize: 14,
                        overflow: "auto",
                      }}
                    >
                      <Box sx={{ ...inlineOrder }}>{index + 1}</Box>
                      <Box sx={{ ...inlineCode }}>{item.code}</Box>
                      <Box sx={{ ...inlineDescr }}>{item.productDescription}</Box>
                      <Box sx={{ ...inlineQTY }}>{item.selectAmount}</Box>
                      <Box sx={{ ...inlinePrice }}>{item.srp}</Box>
                      <Box sx={{ ...inlineTotal }}>
                        {item.srp * item.selectAmount} {item.sn}
                      </Box>
                    </Box>

                    {/* S/N Part */}
                    <Box sx={{ maxHeight: "150px" }}>
                      {item.sn.map((item2, index2) => {
                        return (
                          <React.Fragment key={index2}>
                            <Box
                              // container
                              sx={{
                                display: "flex",
                                textAlign: "center",
                                my: "4.5px",
                                ml: "3.8vw",
                              }}
                            >
                              <TextField
                                size="small"
                                id="filled-basic"
                                label="S/N"
                                variant="filled"
                                sx={{ zoom: "80%", width: "450px" }}
                                onKeyDown={(event) => handleKeyDown(event, index2, index)}
                                inputRef={(textField) =>
                                  handleTextFieldRef(textField, index2, index)
                                }
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
              })}
            </DialogContent>

            <DialogContent>
              {/* ท้ายตารางสรุปรวมยอด */}
              <Box sx={{ display: "flex", mt: "10px" }}>
                <Box sx={{ flexGrow: 9.5, textAlign: "end", mr: "5px" }}>
                  <Box>รวมเงิน</Box>
                  <Box>ภาษีมูลค่าเพิ่ม</Box>
                  <Box>รวมทั้งสิ้น(รวมภาษี)</Box>
                </Box>
                <Box sx={{ flexGrow: 0.5, textAlign: "end" }}>
                  <Box>
                    {(totalPrice - totalPrice * (7 / 107))
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Box>
                  <Box>
                    {(totalPrice * (7 / 107)).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Box>
                  <Box>{totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Box>
                </Box>
              </Box>
            </DialogContent>
          </DialogContent>
          {/* ปุ่มด้านล่างสุดนอกตาราง */}
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="error">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" color="success" type="submit">
              Save and Print
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      {/* เดะ สร้าง state มา toggle ตรงนี้ */}
      <Dialog fullScreen open={openPrint}>
        <DialogContent>
          <AppBar sx={{ backgroundColor: "#ff8d29", color: "#303030" }}>
            <Toolbar sx={{ minHeight: "0px" }}>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Print Cashier Report / สำหรับ แคชเชียร์
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handlePrintClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent sx={{ mt: "25px" }}>
            <TableDocumentCashier />
          </DialogContent>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export const inlineOrder = { width: "6%", textAlign: "center" };
export const inlineCode = { width: "15%", textAlign: "left" };
export const inlineDescr = { width: "57%", flexGrow: 1, textAlign: "left" };
export const inlineQTY = { width: "4%", textAlign: "center", paddingInline: "5px" };
export const inlinePrice = { width: "10%", textAlign: "right", paddingInline: "5px" };
export const inlineTotal = { width: "10%", textAlign: "right", paddingInline: "5px" };

export default AddSN;
