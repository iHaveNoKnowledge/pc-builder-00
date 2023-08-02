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
import "./saveBuildForm.css";
import { useUpdateDataMutation } from "../features/api/dataApiSlice";
import { useGetSetsQuery } from "../features/api/dataApiSlice";

export default function SaveBuildBtn() {
  const partData = useSelector((state) => state.noApiCustomize.partData);
  const [updateData, { isLoading, isError, error }] = useUpdateDataMutation();

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [inputData, setInputData] = useState({
    // setName: "",
    // customerName: "",
    // customerTel: "",
    // salerName: "",
  });
  const { setName, customerName, customerTel, salerName } = inputData;

  //** conditional Renderring
  const [checkedItem, setCheckedItem] = useState({ contactInfoBool: false });
  const handleCheckBoxChange = (e) => {
    // console.log("พังไหม");

    if (!checkedItem.contactInfoBool) {
      setCustNameInput("");
      setCustTelInput("");
      //todo setSalerNameInput("");
      //todo setSalerTelInput("");
    }
    setCheckedItem((prev) => {
      return { ...checkedItem, [e.target.name]: e.target.checked };
    });
  };

  //** onclick เปิด Form ////////////////////////////////////////////////////////////////////
  const handleClickOpen = () => {
    setOpen(true);
  };

  //** onclick ปิด Form ////////////////////////////////////////////////////////////////////
  const handleClose = () => {
    setOpen(false);
  };
  //** onclick สำหรับกด save SPEC ////////////////////////////////////////////////////////////////////
  const { refetch: setsRefetch } = useGetSetsQuery();
  const handleSave = () => {
    console.log("กด Save!!", inputData);
    let updatedInputData;
    if (checkedItem.contactInfoBool) {
      updatedInputData = {
        setName: setNameInput,
        customerName: custNameInput,
        customerTel: custTelInput,
        salerName: salerNameInput,
        salerTel: salerTelInput,
      };
    } else {
      updatedInputData = {
        setName: setNameInput,
        customerName: "",
        customerTel: "",
        sellerName: "",
        sellerTel: "",
      };
    }

    setInputData(updatedInputData);
    console.log("Stateหลัง add", inputData);
    //* ตัวอย่างการใช้ค่า inputData ที่อัพเดตใหม่
    console.log("บันทึกไรมา", updatedInputData.setName);
    const isEmpty = partData.map((item) => item.listItems).filter((item2) => item2.length != 0);
    if (isEmpty != 0) {
      dispatch(saveSet({ updatedInputData, partData }));
      const dataForUpdate = { ...updatedInputData, partData };
      console.log("สำหรับยัดลง DB", dataForUpdate);
      updateData(dataForUpdate)
        .unwrap()
        .then((response) => {
          console.log(response);
          setsRefetch();
          return response;
        })
        .catch((error) => {
          console.log(error.data.response);
        });
    } else {
      console.log("ไปเลือกสินค้ามาก่อน", isEmpty);
    }

    setSetNameInput("");
    //todo setSalerNameInput("");
    //todo setSalerTelInput("");
    setCustNameInput("");
    setCustTelInput("");

    handleClose();
  };

  //** SetName Input ไม่ต้องมี valid
  const [setNameInput, setSetNameInput] = useState("");
  //** SalerName Input ไม่ต้องมี valid
  const [salerNameInput, setSalerNameInput] = useState("");
  //** SalerTel Input ไม่ต้องมี valid
  const [salerTelInput, setSalerTelInput] = useState("");
  //** CustName Input ไม่ต้องมี valid
  const [custNameInput, setCustNameInput] = useState("");
  //** CustTel Num Input Validation///////////////////////////////
  const [custTelInput, setCustTelInput] = useState("");
  const [btnSwitch, setBtnSwitch] = useState(false);

  const validate = (value) => {
    const $9DigitPattern = /^0[2,3,4,5,7]\d{7}$/;
    const $10DigitPattern = /^(06|08|09)\d{8}$/;
    if (checkedItem.contactInfoBool != true) {
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
      }
    } else if (e.target.id === "custNameInput") {
      console.log("แกกำลังกรอกชื่อลูกค้า");
      setCustNameInput(value);
    } else if (e.target.id === "salerNameInput") {
      setSalerNameInput(value);
    } else if (e.target.id === "setName") {
      setSetNameInput(value);
    } else if (e.target.id === "salerTelInput") {
      setSalerTelInput(value);
    }
  };

  useEffect(() => {
    validate(custTelInput);
  }, [custTelInput, checkedItem]);

  const custDigitDisplay = custTelInput.length > 1 ? "digits" : "digit";
  const salerDigitDisplay = salerTelInput.length > 1 ? "digits" : "digit";

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
              ตั้งชื่อ Set คอมประกอบ
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
                    checked={checkedItem.contactInfoBool}
                    name="contactInfoBool"
                  />
                }
                label="ข้อมูลการติดต่อ"
              />
            </FormGroup>
          </Box>
          <Box sx={{ position: "relative" }}>
            <Box className={!checkedItem.contactInfoBool ? "disableElement" : ""}></Box>
            <>
              <DialogContent
                sx={{ borderLeft: "10px solid #0033E6", backgroundColor: "#4141", zIndex: "-1" }}
              >
                <Box
                  sx={{
                    backgroundColor: "#414151",
                    fontSize: 18,
                    color: "#e6e6e6",
                    px: "10px",
                    pt: "5px",
                  }}
                >
                  ข้อมูลติดต่อลูกค้า
                </Box>
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
                            Current {custDigitDisplay}: {custTelInput.length}
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
                    label="ชื่อผู้ขาย (ถ้ามีLogin ควร Auto)"
                    fullWidth
                    variant="standard"
                    value={salerNameInput}
                    onChange={handleChange}
                    error={false}
                  />

                  <TextField
                    margin="dense"
                    id="salerTelInput"
                    label={
                      <Box>
                        เบอร์ติดต่อ (ถ้ามีLogin ควร Auto)
                        {salerTelInput.length !== 0 ? (
                          <>
                            Current {salerDigitDisplay}: {salerTelInput.length}
                          </>
                        ) : (
                          ""
                        )}
                      </Box>
                    }
                    fullWidth
                    variant="standard"
                    value={salerTelInput}
                    onChange={handleChange}
                  />
                </Box>
              </DialogContent>
            </>
          </Box>
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
