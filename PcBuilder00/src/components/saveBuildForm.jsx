import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
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
  const [inputData, setInputData] = useState({});

  //** conditional Renderring
  const [checkedItem, setCheckedItem] = useState({ contactInfoBool: false });
  const handleCheckBoxChange = (e) => {
    if (!checkedItem.contactInfoBool) {
      setCustNameInput("");
      setCustTelInput("");
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
        sellerName: sellerNameInput,
        sellerTel: sellerTelInput,
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

    //* ตัวอย่างการใช้ค่า inputData ที่อัพเดตใหม่

    const isEmpty = partData.map((item) => item.listItems).filter((item2) => item2.length != 0);
    if (isEmpty != 0) {
      dispatch(saveSet({ updatedInputData, partData }));
      const dataForUpdate = { ...updatedInputData, partData };

      updateData(dataForUpdate)
        .unwrap()
        .then((response) => {
          console.log("บันทึกสำเร็จ");
          setsRefetch();
          return response;
        })
        .catch((error) => {
          console.error("บันทึกไม่สำเร็จ", error.data.response);
        });
    }

    setSetNameInput("");
    //todo setsellerNameInput("");
    //todo setsellerTelInput("");
    setCustNameInput("");
    setCustTelInput("");

    handleClose();
  };

  //** SetName Input ไม่ต้องมี valid
  const [setNameInput, setSetNameInput] = useState("");
  //** sellerName Input ไม่ต้องมี valid
  const [sellerNameInput, setsellerNameInput] = useState("");
  //** sellerTel Input ไม่ต้องมี valid
  const [sellerTelInput, setsellerTelInput] = useState("");
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
      setBtnSwitch(true);
    } else if ($10DigitPattern.test(value)) {
      setBtnSwitch(true);
    } else {
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
    } else if (e.target.id === "sellerNameInput") {
      setsellerNameInput(value);
    } else if (e.target.id === "setName") {
      setSetNameInput(value);
    } else if (e.target.id === "sellerTelInput") {
      setsellerTelInput(value);
    }
  };

  useEffect(() => {
    validate(custTelInput);
  }, [custTelInput, checkedItem]);

  const custDigitDisplay = custTelInput.length > 1 ? "digits" : "digit";
  const sellerDigitDisplay = sellerTelInput.length > 1 ? "digits" : "digit";

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

      <Dialog open={open} onClose={handleClose} style={{ zoom: "115%" }}>
        <DialogContent sx={{ width: "auto" }}>
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
              ตั้งชื่อ เซ็ต คอมประกอบ
            </DialogContentText>
            <TextField
              sx={{ mt: "0px" }}
              autoFocus
              margin="dense"
              id="setName"
              label="Set Name"
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
                            (Current {custDigitDisplay}: {custTelInput.length})
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
                    id="sellerNameInput"
                    label="ชื่อผู้ขาย "
                    fullWidth
                    variant="standard"
                    value={sellerNameInput}
                    onChange={handleChange}
                    error={false}
                  />

                  <TextField
                    margin="dense"
                    id="sellerTelInput"
                    label={
                      <Box>
                        เบอร์ติดต่อ{" "}
                        {sellerTelInput.length !== 0 ? (
                          <>
                            (Current {sellerDigitDisplay}: {sellerTelInput.length})
                          </>
                        ) : (
                          ""
                        )}
                      </Box>
                    }
                    fullWidth
                    variant="standard"
                    value={sellerTelInput}
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
