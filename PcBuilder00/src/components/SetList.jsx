import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Collapse,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./BottomComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { saveSet } from "../slices/reportSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useGetPostsQuery } from "../features/api/dataApiSlice";
import { addProduct, resetCustomized } from "../slices/cutomizeSliceNoApi";

export default function SetList() {
  const partData = useSelector((state) => state.noApiCustomize.partData);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  // onclick เปิด Dialog //
  const handleClickOpen = () => {
    setOpen(true);
  };

  // !onclick ปิด Dialog //
  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
    const updatedState = openSubTables.map(() => false);
    // setOpenSubTables(updatedState);
    setOpenSubTables([]);
  };

  const handleSelect = (e, index1) => {
    e.stopPropagation();
    dispatch(resetCustomized());
    const itemsSet = itemList[index1].partData.flatMap((category) =>
      category.listItems.map((item) => item)
    );

    const itemsSetID = itemsSet.map((item) => item.id);

    const amountPerItem = itemsSet.map((item) => item.selectAmount);

    const itemsToAdd = posts
      .filter((item) => itemsSetID.includes(item.id))
      .map((item, index) => ({ ...item, selectAmount: amountPerItem[index] }));

    itemsToAdd.map((item) => dispatch(addProduct(item)));
  };

  const itemList = [
    {
      id: "1",
      timeStamp: "July 21, 1983 01:15:00",
      setName: "Inwza007",
      partData: [
        {
          category: "CPU",
          typeMax: 1,
          typeAmount: 0,
          listItems: [
            {
              id: "9",
              code: "CU2-000009",
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
              id: "14",
              code: "CR4-000014",
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
              id: "22",
              code: "ME1-000022",
              description: "KINGSTON FURY IMPACT 8GB (8X1/3200) DDR4 (KF432S20IB/8) NB",
              selectAmount: 2,
              srp: 1000,
              promotionPrice: 950,
            },
            {
              id: "23",
              code: "ME1-000023",
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
      id: "2",
      timeStamp: "Thursday, May 17 2023, 5:13:36 pm",
      setName: "Inwza008",
      partData: [
        {
          category: "CPU",
          typeMax: 1,
          typeAmount: 0,
          listItems: [
            {
              id: "11",
              code: "CU2-000011",
              description:
                "GIGABYTE AORUS RADEON RX6900XT XTREME WATERFORCE WB 16GB GDDR6 256 bit CL 19-31/8/22",
              selectAmount: 1,
              srp: 77900.0,
              promotionPrice: 77900.0,
            },
            {
              id: "12",
              code: "CU2-000012",
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
              id: "15",
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
              id: "24",
              code: "ME1-000994",
              description: "KINGSTON FURY IMPACT 8GB (8X1/3200) DDR4 (KF432S20IB/8) NB",
              selectAmount: 2,
              srp: 1000,
              promotionPrice: 950,
            },
            {
              id: "25",
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
      id: "3",
      timeStamp: "May 19 2023, 5:13:37 pm",
      setName: "PuadKhee",
      partData: [
        {
          category: "CPU",
          typeMax: 1,
          typeAmount: 0,
          listItems: [
            {
              id: "9",
              code: "CU2-000009",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non eros dapibus, maximus tellus sollicitudin, iaculis ligula. Nullam ullamcorper metus sit amet orci consectetur interdum. Aliquam nec erat congue, facilisis.",
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
              id: "15",
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
              id: "24",
              code: "ME1-000994",
              description: "KINGSTON FURY IMPACT 8GB (8X1/3200) DDR4 (KF432S20IB/8) NB",
              selectAmount: 2,
              srp: 1000,
              promotionPrice: 950,
            },
            {
              id: "25",
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
      id: "4",
      timeStamp: "May 18 2023",
      setName: "Kimochi",
      partData: [
        {
          category: "CPU",
          typeMax: 1,
          typeAmount: 0,
          listItems: [
            {
              id: "11",
              code: "CU2-000011",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
              id: "15",
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
              id: "24",
              code: "ME1-000994",
              description: "KINGSTON FURY IMPACT 8GB (8X1/3200) DDR4 (KF432S20IB/8) NB",
              selectAmount: 2,
              srp: 1000,
              promotionPrice: 950,
            },
            {
              id: "25",
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
      id: "5",
      timeStamp: "May 18 2023, 5:13:43 pm",
      setName: "NekoNyanNyan",
      partData: [
        {
          category: "CPU",
          typeMax: 1,
          typeAmount: 0,
          listItems: [
            {
              id: "12",
              code: "CU2-000012",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non eros dapibus, maximus tellus sollicitudin, iaculis ligula.",
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
              id: "15",
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
              id: "24",
              code: "ME1-000994",
              description: "KINGSTON FURY IMPACT 8GB (8X1/3200) DDR4 (KF432S20IB/8) NB",
              selectAmount: 2,
              srp: 1000,
              promotionPrice: 950,
            },
            {
              id: "25",
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

  const sortedItemList = itemList.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
  const { data: posts } = useGetPostsQuery();

  const openSubTableRefs = React.useRef([]);
  const [openSubTables, setOpenSubTables] = React.useState([]);
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

      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle
          sx={{
            backgroundColor: "#414151",
            fontSize: 18,
            color: "#e6e6e6",
            px: "10px",
            pt: "20px",
            pb: "5px",
            width: "1181px",
            position: "-webkit-sticky",
          }}
        >
          เลือก Set
        </DialogTitle>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ maxWidth: "lg" }}>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 1 }}></TableCell>
                <TableCell align="left" colSpan={1} style={{ width: 38 }}>
                  ID
                </TableCell>
                <TableCell align="left" colSpan={1}>
                  SetName
                </TableCell>
                <TableCell align="right" colSpan={1} style={{ width: 80 }}>
                  SaveDate
                </TableCell>
                <TableCell style={{ width: 80 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedItemList.map((item, index) => {
                const isOpen = openSubTables[index];
                let i = 0;
                return (
                  <React.Fragment key={index}>
                    <TableRow
                      onClick={() => {
                        const updatedOpenSubTables = [...openSubTables];
                        updatedOpenSubTables[index] = !isOpen;
                        console.log("isOpenคือไร:", isOpen);
                        setOpenSubTables(updatedOpenSubTables);
                      }}
                      hover
                    >
                      <TableCell style={{ backgroundColor: "#414151" }}>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => {
                            const updatedOpenSubTables = [...openSubTables];
                            updatedOpenSubTables[index] = !isOpen;
                            setOpenSubTables(updatedOpenSubTables);
                          }}
                          sx={{ color: "white" }}
                        >
                          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">{item.id}</TableCell>
                      <TableCell align="left">{item.setName}</TableCell>
                      <TableCell align="right">
                        {new Date(item.timeStamp).toLocaleDateString("th-TH")}
                      </TableCell>
                      <TableCell style={{ width: "auto" }} size="small">
                        <Box className="resetBtn">
                          <Button
                            fullWidth
                            disableRipple={true}
                            sx={{ p: 0, backgroundColor: "#42528A" }}
                            onClick={(e) => handleSelect(e, index)}
                            variant="contained"
                          >
                            Select
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                    {/* subtableZone */}
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={isOpen} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                              ListItem
                            </Typography>
                            <Table size="small" aria-label="purchases">
                              <TableHead>
                                <TableRow>
                                  <TableCell>No.</TableCell>
                                  <TableCell sx={{ minWidth: 75 }}>Code</TableCell>
                                  <TableCell align="left">Description</TableCell>
                                  <TableCell>AMT</TableCell>
                                  <TableCell>StockAMT</TableCell>
                                  <TableCell>SRP</TableCell>
                                  <TableCell>Price</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {item.partData.map((item2, index2) =>
                                  item2.listItems.map((item3, index3) => {
                                    i += 1;
                                    return (
                                      <TableRow key={index3}>
                                        <TableCell component="th" scope="row">
                                          {i}
                                        </TableCell>
                                        <TableCell>{item3.code}</TableCell>
                                        <TableCell>{item3.description}</TableCell>
                                        <TableCell align="right">{item3.selectAmount}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                          {posts
                                            .find((post, postIDX) => {
                                              if (post.id === item3.id) {
                                                return post.srp.toLocaleString();
                                              }
                                            })
                                            ?.srp.toLocaleString()}
                                        </TableCell>

                                        <TableCell>
                                          {posts
                                            .find((post, postIDX) => {
                                              if (post.id === item3.id) {
                                                return post.promotionPrice;
                                              }
                                            })
                                            ?.promotionPrice.toLocaleString()}
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })
                                )}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
