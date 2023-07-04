import React, { useEffect, useState } from "react";
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
  InputAdornment,
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
import SearchIcon from "@mui/icons-material/Search";
import {
  useGetPostsQuery,
  useGetDbItemQuery,
  useGetSetsQuery,
  useDeleteResourceMutation,
} from "../features/api/dataApiSlice";
import { addProduct, resetCustomized } from "../slices/cutomizeSliceNoApi";

export default function SetList() {
  const partData = useSelector((state) => state.noApiCustomize.partData);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  let searchResult = "";
  let displayDataList = false;

  //* นำ api มาใช้
  const { data: dataJson, error, isLoading, isSuccess } = useGetSetsQuery();
  const [sortedData, setSortedData] = useState([]);

  const { data } = useGetDbItemQuery();
  const posts = data.recordset;

  const [openSubTables, setOpenSubTables] = useState([]);

  const sortData = (data) => {
    const mutableData = [...data];
    return mutableData.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
  };

  //* Function SearchSets
  const [query, setQuery] = useState("");
  const handleSearch = (e) => {
    if (query.length > 0) {
      console.log("searchว่า: ", query);
      const searchResult = sortData(dataJson).filter((item) => item.setName.includes(query));
      console.log("กดsearch แล้วได้ไรมา", searchResult);
      setSortedData(searchResult);
    } else {
      setSortedData(sortData(dataJson));
    }
  };

  useEffect(() => {
    if (dataJson) {
      setSortedData(sortData(dataJson));
    }
    if (!open) {
      setQuery("");
    }
  }, [isSuccess, dataJson, open]);

  // onclick เปิด Dialog //
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);

    const updatedState = openSubTables.map(() => false);
    setOpenSubTables([]);
  };

  //* Function กดเลือกSet
  const handleSelect = (e, index1) => {
    console.log("handleSelect clicked!!");
    e.stopPropagation();
    dispatch(resetCustomized());
    console.log("กดเลือกไรมา", sortedData[index1]);
    const itemsSet = sortedData[index1].partData.flatMap((category) =>
      category.listItems.map((item) => item)
    );

    const itemsSetID = itemsSet.map((item) => item.id);
    const amountPerItem = itemsSet.map((item) => item.selectAmount);
    const itemsToAdd = posts
      .filter((item) => itemsSetID.includes(item.id))
      .map((item, index) => ({ ...item, selectAmount: amountPerItem[index] }));

    itemsToAdd.map((item) => dispatch(addProduct(item)));
    setOpen(false);
  };

  //* Function ConfirmDelete
  const [idDelete, setIdDelete] = useState();
  const confirmDelete = (id) => {
    setOpentAlert(false);
    console.log("ลบแล้วเรียบร้อย: ", idDelete);
    deleteResource(idDelete);
  };

  //* Function DeleteSet
  const [deleteResource, response] = useDeleteResourceMutation();
  const handleDelete = (e, index, id) => {
    e.stopPropagation();
    setIdDelete(id);
    setOpentAlert(true);
  };

  //* Delete Alert!!
  const [openAlert, setOpentAlert] = useState(false);

  //* render jsx
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

      <Dialog open={open} onClose={handleClose} maxWidth="lg" sx={{ height: "900px" }}>
        <DialogTitle
          sx={{
            backgroundColor: "#414151",
            fontSize: 18,
            color: "#e6e6e6",
            px: "10px",
            pt: "20px",
            pb: "5px",
            minWidth: "1180px",
            position: "-webkit-sticky",
          }}
        >
          เลือก Set
        </DialogTitle>
        <TableContainer component={Paper} sx={{ width: "1200px", height: "700px" }}>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2, marginInline: 2 }}>
            <TextField
              fullWidth
              sx={{}}
              // size="normal"
              placeholder="ค้นหาเซ็ตคอมประกอบ"
              type="search"
              id="input-with-icon-textfield"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              // label={`Product ${currentCategory}`}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ bgcolor: "#F0F0F0", py: "4.07px" }} />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <Box ml={2} style={{ display: "flex", alignItems: "end" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  height: "27.5px",
                  borderRadius: "0px",
                  backgroundColor: "#42528A",
                }}
                onClick={handleSearch}
              >
                ค้นหา
              </Button>
            </Box>
          </Box>
          <Table stickyHeader sx={{ maxWidth: "lg", width: "lg" }}>
            <TableHead sx={{ width: "" }}>
              <TableRow sx={{ width: "max" }}>
                <TableCell style={{ width: 1 }}></TableCell>
                <TableCell align="center" colSpan={1} style={{ width: 38, paddingInline: 1 }}>
                  ID
                </TableCell>
                <TableCell style={{ width: 80, paddingInline: 1 }}></TableCell>
                <TableCell align="left" colSpan={1}>
                  SetName
                </TableCell>
                <TableCell align="right" colSpan={1} style={{ width: 80 }}>
                  SaveDate
                </TableCell>
                <TableCell colSpan={1} style={{ width: 80 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* ต้องเอา API มาแทนค่าตรงนี้ */}
              {isLoading ? (
                <>Loading</>
              ) : (
                <React.Fragment>
                  {sortedData.map((item, index) => {
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
                          <TableCell align="center" sx={{ paddingInline: 3 }}>
                            {item.id}
                          </TableCell>
                          <TableCell style={{ width: "auto", paddingInline: 1 }} size="small">
                            <Box className="resetBtn">
                              <Button
                                fullWidth
                                disableRipple={true}
                                sx={{ p: 0.75, backgroundColor: "#42528A" }}
                                onClick={(e) => handleSelect(e, index)}
                                variant="contained"
                              >
                                Select
                              </Button>
                            </Box>
                          </TableCell>
                          <TableCell align="left">{item.setName}</TableCell>
                          <TableCell align="right">
                            {new Date(item.timeStamp).toLocaleDateString("th-TH")}
                          </TableCell>
                          <TableCell>
                            <Box className="resetBtn">
                              <Button
                                fullWidth
                                disableRipple={true}
                                sx={{ p: 0.75 }}
                                onClick={(e) => handleDelete(e, index, item.id)}
                                variant="contained"
                                color="error"
                              >
                                Delete
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
                                  Items List
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell
                                        sx={{ width: 38, paddingInline: 1 }}
                                        align="center"
                                      >
                                        No.
                                      </TableCell>
                                      <TableCell sx={{ width: 11 }}>Code</TableCell>
                                      <TableCell align="left" sx={{ minWidth: 7 }}>
                                        Description
                                      </TableCell>
                                      <TableCell>Stock</TableCell>
                                      <TableCell>AMT</TableCell>
                                      <TableCell align="right">SRP</TableCell>
                                      <TableCell align="right">Price</TableCell>
                                      <TableCell>TotalPrice</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {item.partData.map((item2, index2) =>
                                      item2.listItems.map((item3, index3) => {
                                        i += 1;
                                        return (
                                          <TableRow key={index3}>
                                            <TableCell
                                              align="center"
                                              component="th"
                                              scope="row"
                                              sx={{ width: 38, paddingInline: 1 }}
                                            >
                                              {i}
                                            </TableCell>
                                            <TableCell sx={{ width: 100 }}>{item3.code}</TableCell>
                                            <TableCell sx={{ width: 580 }}>
                                              {item3.productDescription}
                                            </TableCell>
                                            <TableCell></TableCell>
                                            <TableCell align="right">
                                              {item3.selectAmount}
                                            </TableCell>
                                            <TableCell align="right">
                                              {posts
                                                .find((post, postIDX) => {
                                                  if (post.id === item3.id) {
                                                    return post.srp.toLocaleString();
                                                  }
                                                })
                                                ?.srp.toLocaleString()}
                                            </TableCell>

                                            <TableCell align="right">
                                              {posts
                                                .find((post, postIDX) => {
                                                  if (post.id === item3.id) {
                                                    return post.promotionPrice;
                                                  }
                                                })
                                                ?.promotionPrice.toLocaleString()}
                                            </TableCell>

                                            <TableCell align="right">
                                              {posts.find((post, postIDX) => {
                                                if (post.id === item3.id) {
                                                  const totalPrice =
                                                    post.promotionPrice * item3.selectAmount;

                                                  return totalPrice;
                                                } else {
                                                  // console.log("ไม่ตรง", post.id, item3.id);
                                                }
                                              })?.promotionPrice * item3.selectAmount}
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
                  <Dialog
                    open={openAlert}
                    onClose={() => {
                      setOpentAlert(false);
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"ต้องการลบเซ็ต DIY เซ็ตนี้จริงหรือไม่?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Set ที่กำลังจะลบ คือ (ดึงชื่อ Set จาก ปุ่ม Delete)
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setOpentAlert(false)} size="large" variant="contained">
                        ช้าก่อนไอน้อง
                      </Button>
                      <Button
                        onClick={confirmDelete}
                        autoFocus
                        size="large"
                        variant="contained"
                        color="error"
                      >
                        ลบดิ
                      </Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              )}
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
