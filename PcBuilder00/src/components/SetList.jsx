import React, { useEffect, useState, useRef } from "react";
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
  Stack,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import "./BottomComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { addInfo } from "../slices/reportSlice";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import {
  useGetDbItemQuery,
  useLazyGetSetsQuery,
  useDeleteResourceMutation,
} from "../features/api/dataApiSlice";
import { addProduct, resetCustomized, updateSummations } from "../slices/cutomizeSliceNoApi";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#42528A",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff8d29",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          paddingTop: "13.9px",
          paddingBottom: "13.9px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: "27.5px",
          borderRadius: "0px",
          fontFamily: "Chakra Petch",
          "&:hover": {
            backgroundColor: "##3a516b",
            color: "#FFF",
          },
        },
      },
    },
  },
});

export default function SetList() {
  const partData = useSelector((state) => state.customize.partData);
  // const products = useSelector((state) => state.products.products);
  // const { sets, totalRows, loading } = useSelector((state) => state.sets);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  let searchResult = "";

  //* นำ api มาใช้
  const [
    getSetsData,
    { data: sets, error, isLoading, isSuccess, isUninitialized },
  ] = useLazyGetSetsQuery();
  const [sortedData, setSortedData] = useState([]);
  const [rows, setRows] = useState(0);

  useEffect(() => {
    if (open) {
      setSortedData(sets.updatedRecordset);
      setRows(sets.totalRows);
    }
  }, [open, sets]); //เมื่อเปิด กับ เมื่อค่า sets มีการเปลี่ยนแปลง ซึ่งความเปลี่ยนแปลง redux monitor ให้

  const [openSubTables, setOpenSubTables] = useState([]);

  //* เพิ่มความเนียนของ subtable transition
  const [isAnimating, setIsAnimating] = useState(false);
  const isTransition = { transition: "none" };

  //* -------------------------------FUNCTIONS------------------------------------------------------
  //* Function SearchSets
  const searchTxt = useRef();
  const handleSearch = (e) => {
    if (searchTxt.current.value.length > 0) {
      const txt = searchTxt.current.value;
      const searchResult = sortedData.filter((item) => item.setName.includes(txt));
      console.log("กดsearch แล้วได้ไรมา", searchResult);
      setSortedData(searchResult);
    } else {
      setSortedData(sets?.updatedRecordset);
    }
  };

  //* function Fetch
  const [productsData, setProductsData] = useState(null);
  const [loadingAxios, setLoadingAxios] = useState(false);
  const fetchData = async () => {
    try {
      setLoadingAxios(true);
      const response = await axios.get(`${import.meta.env.VITE_APP_DB_API_PUBLIC}/testProducts`);
      setProductsData(response.data);
      setLoadingAxios(false);
    } catch (error) {
      console.error("Error fetching axios:", error);
      setLoadingAxios(false);
    }
  };

  const posts = productsData?.data;

  // onclick เปิด Dialog
  const handleClickOpen = () => {
    setOpen(true);
    getSetsData();
    fetchData();
  };

  const handleClose = (e) => {
    setOpen(false);
    e.stopPropagation();

    const updatedState = openSubTables.map(() => false);
    setOpenSubTables([]);
  };

  //* Function กดเลือกSet
  const handleSelect = (e, index1, curPageNum) => {
    e.stopPropagation();
    console.log(
      "handleSelect clicked!!",
      "indexnum:",
      index1,
      "indexpage:",
      curPageNum - 1,
      "ArrayIndex",
      (curPageNum - 1) * 10 + index1
    );
    const arrIdx = (curPageNum - 1) * 10 + index1;
    dispatch(resetCustomized());
    const { setName, customerName, customerTel, sellerName, sellerTel } = sortedData[arrIdx];
    console.log("กดเลือกไรมา", sortedData[arrIdx]);
    const itemsSet = sortedData[arrIdx].partData.flatMap((category) =>
      category.listItems.map((item) => item)
    );
    console.log("itemsSet: ", itemsSet);
    const itemsSetID = itemsSet.map((item) => item.id);
    const amountPerItem = itemsSet.map((item) => item.selectAmount);
    const itemsToAdd = posts
      .filter((item) => itemsSetID.includes(item.id))
      .map((item, index) => ({ ...item, selectAmount: amountPerItem[index] }));

    itemsToAdd.map((item) => dispatch(addProduct(item)));
    dispatch(updateSummations());
    dispatch(addInfo({ setName, customerName, customerTel, sellerName, sellerTel }));

    setOpenSubTables([]);
  };

  useEffect(() => {
    setOpen(false);
  }, [partData]);

  //* Function ConfirmDelete
  const [idDelete, setIdDelete] = useState();
  const confirmDelete = (id) => {
    setOpentAlert(false);
    console.log("ลบแล้วเรียบร้อย: ", idDelete);
    deleteResource(idDelete);
  };

  //* Function DeleteSet
  const [deleteResource, response] = useDeleteResourceMutation();
  const [deleteSet, setDeleteSet] = useState({ setName: "", id: "" });
  const handleDelete = (e, index, id, curPageNum) => {
    const setIdx = (curPageNum - 1) * 10 + index;
    e.stopPropagation();
    setIdDelete(id);
    setOpentAlert(true);
    getSetsData();
    setDeleteSet((prev) => {
      return {
        ...prev,
        setName: sortedData[setIdx].setName
          ? sortedData[setIdx].setName
          : sortedData[setIdx].DefaultName,
        id,
      };
    });
  };

  //* Delete Alert!!
  const [openAlert, setOpentAlert] = useState(false);

  //* pagination////------------------------------------------------------
  const [curPageNum, setCurPageNum] = useState(1);
  const cardsPerPage = 10;
  const totalPages = Math.ceil(sortedData.length / cardsPerPage);
  const handleChangePage = (pageNum) => {
    setIsAnimating(true);
    setCurPageNum(pageNum);
    setOpenSubTables([]);
  };

  const dataPaginated = sortedData.slice(
    (curPageNum - 1) * cardsPerPage,
    curPageNum * cardsPerPage
  );

  //* dataที่ใช้pagination เปลี่ยนไปต้องเกิด effect
  useEffect(() => {
    if (curPageNum > totalPages) {
      setCurPageNum(1);
    }
  }, [dataPaginated]);

  //* render jsx
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
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
              minWidth: "1180px",
              position: "-webkit-sticky",
            }}
          >
            เลือก Set
          </DialogTitle>
          <TableContainer component={Paper}>
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2, marginInline: 2 }}>
              <TextField
                fullWidth
                placeholder="ค้นหาเซ็ตคอมประกอบ"
                type="search"
                id="input-with-icon-textfield"
                inputRef={searchTxt}
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
                <Button type="submit" variant="contained" onClick={handleSearch}>
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
                    Set Name
                  </TableCell>
                  <TableCell align="left" colSpan={1} style={{ width: 80 }}>
                    ชื่อลูกค้า
                  </TableCell>
                  <TableCell align="left" colSpan={1} style={{ width: 80 }}>
                    เบอร์
                  </TableCell>
                  <TableCell align="left" colSpan={1} style={{ width: 80 }}>
                    Created At
                  </TableCell>
                  <TableCell colSpan={1} style={{ width: 80 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* ต้องเอา API มาแทนค่าตรงนี้ */}
                {isLoading && <CircularProgress />}
                {sets && (
                  <React.Fragment>
                    {dataPaginated?.map((item, index) => {
                      const isOpen = openSubTables[index];

                      let i = 0;
                      return (
                        <React.Fragment key={index}>
                          <TableRow
                            onClick={() => {
                              const updatedOpenSubTables = [...openSubTables];
                              updatedOpenSubTables[index] = !isOpen;
                              setIsAnimating(false);
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
                                  setIsAnimating(false);
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
                                  onClick={(e) => handleSelect(e, index, curPageNum)}
                                  variant="contained"
                                >
                                  Select
                                </Button>
                              </Box>
                            </TableCell>
                            <TableCell align="left">
                              {item.setName ? item.setName : item.DefaultName}
                            </TableCell>
                            <TableCell align="left">
                              {item.customerName ? item.customerName : "-"}
                            </TableCell>
                            <TableCell align="left">
                              {item.customerTel ? item.customerTel : "-"}
                            </TableCell>
                            <TableCell align="right">
                              {new Date(item.timeStamp).toLocaleDateString("th-TH")}
                              {"_"}
                              {new Date(item.timeStamp).toLocaleTimeString("th-TH", {
                                timeZone: "UTC",
                              })}
                            </TableCell>
                            <TableCell>
                              <Box className="resetBtn">
                                <Button
                                  fullWidth
                                  disableRipple={true}
                                  sx={{ p: 0.75 }}
                                  onClick={(e) => handleDelete(e, index, item.id, curPageNum)}
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
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                              <Collapse
                                in={isOpen}
                                timeout="auto"
                                unmountOnExit
                                sx={isAnimating ? isTransition : {}}
                              >
                                {loadingAxios ? (
                                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    <CircularProgress />
                                  </Box>
                                ) : (
                                  <Box sx={{ margin: 1, width: "inherit" }}>
                                    <Typography variant="h6" gutterBottom component="div">
                                      รายการสินค้า
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
                                              <TableRow key={index3} sx={{ height: "515" }}>
                                                <TableCell
                                                  align="center"
                                                  component="th"
                                                  scope="row"
                                                  sx={{
                                                    width: 38,
                                                    paddingInline: 1,
                                                  }}
                                                >
                                                  {i}
                                                </TableCell>
                                                <TableCell sx={{ width: 100 }}>
                                                  {item3.code}
                                                </TableCell>
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
                                                  {(
                                                    posts.find((post, postIDX) => {
                                                      if (post.id === item3.id) {
                                                        const totalPrice =
                                                          post.promotionPrice * item3.selectAmount;

                                                        return totalPrice.toLocaleString();
                                                      } else {
                                                      }
                                                    })?.promotionPrice * item3.selectAmount
                                                  ).toLocaleString()}
                                                </TableCell>
                                              </TableRow>
                                            );
                                          })
                                        )}
                                      </TableBody>
                                    </Table>
                                  </Box>
                                )}
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
                      <DialogTitle id="alert-dialog-title" variant="h5">
                        {"ต้องการลบเซ็ต DIY เซ็ตนี้จริงหรือไม่?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description" variant="h6">
                          Set ที่กำลังจะลบ คือ: "{deleteSet.setName}", ID: "{deleteSet.id}"
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={() => setOpentAlert(false)}
                          size="large"
                          variant="contained"
                        >
                          ยกเลิก
                        </Button>
                        <Button
                          onClick={confirmDelete}
                          autoFocus
                          size="large"
                          variant="contained"
                          color="error"
                        >
                          ยืนยัน
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </React.Fragment>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack className="pagination-card" spacing={2} alignItems="center" sx={{ mt: "6px" }}>
            {totalPages ? (
              <Typography>
                Page:{curPageNum} / {totalPages}
              </Typography>
            ) : (
              ""
            )}
            <Pagination
              style={{ marginTop: "8px" }}
              count={totalPages}
              variant="outlined"
              shape="rounded"
              onChange={(event, pageNum) => handleChangePage(pageNum)}
              defaultPage={1}
              page={curPageNum}
            />
          </Stack>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="error">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}
