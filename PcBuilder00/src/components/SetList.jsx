import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  List,
  Divider,
  Collapse,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
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

  const itemList = [
    {
      id: 1,
      timeStamp: "July 21, 1983 01:15:00",
      setName: "Inwza007",
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
              selectAmount: 2,
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
    },
    {
      id: 2,
      timeStamp: "Thursday, May 17 2023, 5:13:36 pm",
      setName: "Inwza008",
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
            {
              id: "13",
              code: "CR6-001043",
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
              selectAmount: 2,
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
    },
    {
      id: 3,
      timeStamp: "May 19 2023, 5:13:37 pm",
      setName: "PuadKhee",
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
              selectAmount: 2,
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
    },
    {
      id: 4,
      timeStamp: "May 18 2023",
      setName: "Kimochi",
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
              selectAmount: 2,
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
    },
    {
      id: 5,
      timeStamp: "May 18 2023, 5:13:43 pm",
      setName: "NekoNyanNyan",
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
              selectAmount: 2,
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
    },
  ];

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
            </Box>
            <Divider />

            {itemList.map((item, index) => {
              let i = 0;
              return (
                <React.Fragment key={index}>
                  <Box
                    // container
                    sx={{ display: "flex", textAlign: "center", my: "10px", fontSize: 14 }}
                  >
                    <Box sx={{ flexGrow: 0.2, width: "4.5%" }}>{item.id}</Box>
                    <Box sx={{ flexGrow: 0.3, width: "14%" }}>{item.setName}</Box>
                    <Box sx={{ flexGrow: 1, width: "50.5%" }}>
                      {item.partData.map((item2) => (
                        <>
                          {item2.listItems.map((item3, index3) => {
                            return (
                              <Box
                                component="span"
                                sx={{ textOverflow: "ellipsis", overflow: "hidden" }}
                              >
                                {`${item2.category}: ${item3.code} `}
                              </Box>
                            );
                          })}
                        </>
                      ))}
                    </Box>
                    <Box sx={{ flexGrow: 0.2, width: "7%" }}>
                      {new Date(item.timeStamp).toLocaleDateString("th-TH")}
                    </Box>
                  </Box>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Typography variant="h6" gutterBottom component="div">
                          ListItem
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>No.</TableCell>
                              <TableCell>Code</TableCell>
                              <TableCell>Description</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {item.partData.map((item2, index2) => {
                              return item2.listItems.map((item3, index3) => {
                                i += 1;
                                return (
                                  <>
                                    <TableRow key={index3}>
                                      <TableCell component="th" scope="row">
                                        {i}
                                      </TableCell>
                                      <TableCell>{item3.code}</TableCell>
                                      <TableCell>{item3.description}</TableCell>
                                    </TableRow>
                                  </>
                                );
                              });
                            })}
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                  {/* <Box sx={{ overflow: "auto", maxHeight: "150px" }}>
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
                  </Box> */}
                  <Divider />
                </React.Fragment>
              );
            })}
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
