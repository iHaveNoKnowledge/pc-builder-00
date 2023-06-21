import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./BottomComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { saveSet } from "../slices/reportSlice";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { makeStyles } from "@mui/material/styles";

const useStyles = makeStyles({
  disabledFormControlLabel: {
    pointerEvents: "none", // ปิดการใช้งานการตอบสนองเหตุการณ์
    opacity: 0.5, // กำหนดค่าความทึบของสีสำหรับ FormControlLabel ที่ถูกปิดใช้งาน
    cursor: "not-allowed", // เปลี่ยนสไตล์เคอร์เซอร์เป็นแบบไม่อนุญาตให้ใช้งาน
  },
});

export default function SaveBuildBtn() {
  const partData = useSelector((state) => state.noApiCustomize.partData);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState({
    // setName: "",
    // customerName: "",
    // customerTel: "",
    // salerName: "",
  });
  const { setName, customerName, customerTel, salerName } = inputData;

  //** onclick เปิด Form ////////////////////////////////////////////////////////////////////
  const handleClickOpen = () => {
    setOpen(true);
  };

  //** onclick ปิด Form ////////////////////////////////////////////////////////////////////
  const handleClose = () => {
    setOpen(false);
  };
  //** onclick สำหรับกด save SPEC ////////////////////////////////////////////////////////////////////
  const handleSave = () => {
    console.log("กด Save!!", inputData);
    const updatedInputData = {
      setName: setNameInput,
      customerName: custNameInput,
      customerTel: custTelInput,
      salerName: salerNameInput,
    };
    console.log("ค่ามาไหม", inputData);
    setInputData(updatedInputData);

    //* ตัวอย่างการใช้ค่า inputData ที่อัพเดตใหม่
    console.log("บันทึกไรมา", updatedInputData.setName);
    dispatch(saveSet({ updatedInputData, partData }));

    setSetNameInput("");
    setSalerNameInput("");
    setCustNameInput("");
    setCustTelInput("");

    handleClose();
  };

  //** SetName Input ไม่ต้องมี valid
  const [setNameInput, setSetNameInput] = useState("");
  //** SalerName Input ไม่ต้องมี valid
  const [salerNameInput, setSalerNameInput] = useState("");
  //** CustName Input ไม่ต้องมี valid
  const [custNameInput, setCustNameInput] = useState("");
  //** Phone Num Input Validation///////////////////////////////
  const [custTelInput, setCustTelInput] = useState("");
  const [btnSwitch, setBtnSwitch] = useState(false);

  const validate = (value) => {
    const $9DigitPattern = /^0[2,3,4,5,7]\d{7}$/;
    const $10DigitPattern = /^(06|08|09)\d{8}$/;
    if (checkedItem.isCustomer != true) {
      setBtnSwitch(true);
    } else if ($9DigitPattern.test(value)) {
      console.log("เบอร์บ้าน");
      setBtnSwitch(true);
    } else if ($10DigitPattern.test(value)) {
      console.log("เบอร์มือถือ");
      setBtnSwitch(true);
    } else {
      console.log("ไม่ใช่เบอร์ละ");
      setBtnSwitch(false);
    }

    return "";
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const patternInt = /^[0-9\b]+$/;
    const dataValidation = patternInt.test(value);

    if (e.target.id === "cusTelInput") {
      console.log("แกกำลังกรอกเบอร์โทรศัพท์ ");
      if (value === "" || dataValidation) {
        setCustTelInput(value);
        // setInputData((prev) => {
        //   return { ...prev, customerTel: value };
        // });
      }
    } else if (e.target.id === "custNameInput") {
      console.log("แกกำลังกรอกชื่อลูกค้า");
      setCustNameInput(value);
    } else if (e.target.id === "salerNameInput") {
      setSalerNameInput(value);
    } else if (e.target.id === "setName") {
      setSetNameInput(value);
    }
  };

  //** conditional Renderring
  const [checkedItem, setCheckedItem] = useState({});
  const handleCheckBoxChange = (e) => {
    if (!checkedItem.isCustomer) {
      setCustNameInput("");
      setSalerNameInput("");
      setCustTelInput("");
    }
    setCheckedItem({
      ...checkedItem,
      [e.target.name]: e.target.checked,
    });
  };

  useEffect(() => {
    validate(custTelInput);
  }, [custTelInput, checkedItem]);

  const digitDisplay = custTelInput.length > 1 ? "digits" : "digit";

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
        Save Set
      </Button>
      {/* <Box>State inspector: {inputData ? JSON.stringify(inputData) : "ว่าง"}</Box> */}

      <Dialog open={open} onClose={handleClose} style={{ zoom: "115%" }}>
        {/* <DialogTitle>Subscribe</DialogTitle> */}
        <DialogContent sx={{ width: "auto" }}>
          {/* <DialogContentText>Enter Your Build Name</DialogContentText> */}
          <Box mb={1}>
            <DialogContentText
              sx={{
                backgroundColor: "#414151",
                fontSize: 18,
                color: "#e6e6e6",
                px: "10px",
                pt: "5px",
              }}
            >
              ระบุชื่อ Set คอมประกอบ ที่ต้องการ
            </DialogContentText>
            <TextField
              sx={{ mt: "0px" }}
              autoFocus
              margin="dense"
              id="setName"
              label={`{db.setName? db.setName : db.builedDefName }`}
              fullWidth
              variant="filled"
              value={setNameInput}
              onChange={handleChange}
            />
          </Box>
          <Box mb={1}>
            <FormGroup sx={{ flexDirection: "row" }}>
              <FormControlLabel
                sx={{ whiteSpace: "pre" }}
                control={
                  <Checkbox
                    onChange={handleCheckBoxChange}
                    checked={checkedItem.isCustomer}
                    name="isCustomer"
                  />
                }
                label="ข้อมูลลูกค้า"
              />
            </FormGroup>
          </Box>
          {checkedItem.isCustomer && (
            <>
              <DialogContent sx={{ borderLeft: "10px solid #0033E6", backgroundColor: "#4141" }}>
                <DialogContentText
                  sx={{
                    backgroundColor: "#414151",
                    fontSize: 18,
                    color: "#e6e6e6",
                    px: "10px",
                    pt: "5px",
                  }}
                >
                  ข้อมูลติดต่อลูกค้า
                </DialogContentText>
                <Box mb={2}>
                  <TextField
                    autoFocus
                    multiline
                    maxRows={4}
                    margin="dense"
                    id="custNameInput"
                    label="ชื่อ"
                    fullWidth
                    variant="standard"
                    value={custNameInput}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    id="cusTelInput"
                    label={
                      <Box>
                        เบอร์ติดต่อ{" "}
                        {custTelInput.length !== 0 ? (
                          <>
                            Current {digitDisplay}: {custTelInput.length}
                          </>
                        ) : (
                          ""
                        )}
                      </Box>
                    }
                    fullWidth
                    variant="standard"
                    value={custTelInput}
                    onChange={handleChange}
                  />
                </Box>

                <Box>
                  <DialogContentText
                    sx={{
                      backgroundColor: "#414151",
                      fontSize: 18,
                      color: "#e6e6e6",
                      px: "10px",
                      pt: "5px",
                    }}
                  >
                    ผู้ขาย
                  </DialogContentText>

                  <TextField
                    margin="dense"
                    id="salerNameInput"
                    label="ชื่อผู้ขาย"
                    fullWidth
                    variant="standard"
                    value={salerNameInput}
                    onChange={handleChange}
                    error={false}
                  />
                </Box>
              </DialogContent>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Cancel
          </Button>
          <Button disabled={!btnSwitch} onClick={handleSave} variant="contained" color="success">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
