import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@mui/material/";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Divider, Alert } from "@mui/material";
import { addProduct, setMax, updateSummations } from "../slices/cutomizeSliceNoApi";
import "./Selection.css";
import UserFilter from "./UserFilter";
import { useGetDbItemQuery } from "../features/api/dataApiSlice";
import { getCategorizedData } from "../slices/userFilterSlice";
import Bottom from "./BottomComponent";
import { setDefault, setPageNum } from "../slices/paginationSlice";
import { changeCategory } from "../slices/categorySlice";
import Popup from "./generalModules/popup01";

//* ------------------------------------------------Display*-----------------------------------------------------------------------------------------
function PostCard({ items, totalRows }) {
  //* useState!!!!!!!!!!!!!!!!!!!
  const [curItem, setCurItem] = useState(items);
  console.log("curItemใช้ได้ยัง :", curItem);
  //* dispatchZone!!!!!!!!!
  const dispatch = useDispatch();

  //* useSelector!!!!!!!!!!!!!!!!!!!!!
  const products = useSelector((state) => state.products.products);

  //* ตรงนี้ขาดไม่ได้
  useEffect(() => {
    setCurItem(products);
  }, [products]);

  // *นี่คือ dispatch ข้างในบรรจุ action
  const handleChange = (item) => {
    dispatch(addProduct(item));
    if (category === "mb") {
      dispatch(setMax(item.slot));
    }
    dispatch(updateSummations());
    console.log(`productDescription: ${item.productDescription}
    count: ${item.countItem}
    typeRam: ${item.typeRam}
    `);
  };

  //* useSelector!!!!!!!!!!!!!!!
  const category = useSelector((state) => state.category.category);
  const parts = useSelector((state) => state.noApiCustomize.partData);
  const filters = useSelector((state) => state.userFilter.filtersSet);
  const expression = useSelector((state) => state.userFilter.expression);
  const textSearch = useSelector((state) => state.userFilter.textSearch);

  //* เงื่อนไขcompatibility
  ///หาเงื่อนไข จากการเลือก mainboard
  let socket_mb, typeRAM_mb;
  parts.find((item) => {
    if (item.category.toLowerCase() === "mb") {
      if (item.listItems.length !== 0) {
        socket_mb = item.listItems[0].socket;
        typeRAM_mb = item.listItems[0].typeRam;
      } else {
        socket_mb = "";
        typeRAM_mb = "";
      }
      return item.listItems[0];
    }
  });

  ///* หาเงื่อนไข จากการเลือก CPU
  let socket_CPU;
  parts.find((item) => {
    if (item.category.toLowerCase() === "cpu") {
      if (item.listItems.length !== 0) {
        socket_CPU = item.listItems[0].socket;
      } else {
        socket_CPU = "";
      }
      return item;
    }
  });

  ///* หาเงื่อนไข จากการเลือก RAM
  let typeRAM_RAM;
  parts.find((item) => {
    if (item.category.toLowerCase().replace(" ", "") === "ram") {
      if (item.listItems.length !== 0) {
        typeRAM_RAM = item.listItems[0].typeRam;
      } else {
        typeRAM_RAM = "";
      }
      return item.listItems[0];
    }
  });

  ///**  สำหรับโชวสินค้าให้เลือกตามหมวดหมู่
  //* กรองเอาเฉพาะสินค้าCPU
  const CPU_display = curItem.filter((item) => {
    //ตรวจสอบว่า เมนบอร์ดตอนนี้ถูกเลือกหรือยัง ถ้าถูกเลือกแล้ว จะทำให้ CPU ที่โชว์นั้นต้องโชว์อย่างมีเงื่อนไข
    if (socket_mb === "") {
      //กรณียังที่ไม่ได้เลือกเมนบอร์ด ให้คืนค่าสินค้าสินค้าทุกตัวที่มีประเภทเป็น CPU
      return item.category.toLowerCase().replace(" ", "") === "cpu";
      //กรณีที่เลือกเมนบอร์ด ทำให้ "socket_mb" ไม่ใช่ค่าว่าง ให้คืนค่าสินค้าที่มีประเภท CPU ทุกตัว แต่ทุกตัวที่คืนมาต้องมีค่า socket ตาม  socket_mb
    } else if (socket_mb !== "") {
      return item.category.toLowerCase().replace(" ", "") === "cpu" && item.socket === socket_mb;
    } else {
      alert("ผีหลอกแล้วมวั้ง");
    }
  });

  //* กรองสินค้าMB
  const mainBoard_display = curItem.filter((item) => {
    if (socket_CPU === "" && typeRAM_RAM === "") {
      return item.category.toLowerCase().replace(" ", "") === "mb";
    } else if (socket_CPU === "" && typeRAM_RAM !== "") {
      console.log(`CPUยังไม่เลือก แต่เลือก RAM`);
      return item.category.toLowerCase().replace(" ", "") === "mb" && item.typeRam === typeRAM_RAM;
    } else if (socket_CPU !== "" && typeRAM_RAM === "") {
      return item.category.toLowerCase().replace(" ", "") === "mb" && item.socket === socket_CPU;
    } else {
      return (
        item.category.toLowerCase().replace(" ", "") === "mb" &&
        item.socket === socket_CPU &&
        item.typeRam === typeRAM_RAM
      );
    }
  });

  //* กรองสินค้าRAM
  const RAM_display = curItem.filter((item) => {
    if (typeRAM_mb === "") {
      return item.category.toLowerCase().replace(" ", "") === "ram";
    } else {
      return item.category.toLowerCase().replace(" ", "") === "ram" && item.typeRam === typeRAM_mb;
    }
  });

  //* arrayของสินค้าที่ไม่ต้องมีเงื่อนไข ไม่มีการกรอง
  const unconditionProduct = curItem.filter(
    (item) =>
      item.category.toLowerCase().replace(" ", "") !== "cpu" &&
      item.category.toLowerCase().replace(" ", "") !== "mb" &&
      item.category.toLowerCase().replace(" ", "") !== "ram"
  );

  //* นำ display ทั้งหมดที่มีการกรองและไม่มีการกรอง มารวมกัน
  const combinedProduct = unconditionProduct.concat(CPU_display, mainBoard_display, RAM_display);
  console.log("RAM_display:", RAM_display);
  console.log("combinedProduct:", combinedProduct);

  //* นำ displayed ทั้งหมดมา filter เฉพาะ ประเภทที่ user เลือก
  console.log("combinedProduct[0].category:", combinedProduct, category);
  const showProduct = combinedProduct.filter(
    (item) => item.category.toLowerCase().replace(" ", "") === category
  );
  const searchedShowProduct = showProduct.filter((item) => {
    return (
      item.code.toLowerCase().includes(textSearch.toLowerCase()) ||
      (item.socket && item.socket.toLowerCase().includes(textSearch.toLowerCase())) ||
      item.productDescription.toLowerCase().includes(textSearch.toLowerCase())
    );
  });
  console.log("บรรทัดที่ 180 category: ", category);
  //* นำ flter มา filter showproduct
  const filterProducts = (products, selectedOpts, expression) => {
    const filteredProducts = products.filter((product) => eval(expression));
    return filteredProducts;
  };
  const { selectedOptionState: selectedOpts } = filters.find(
    (filterCategory) => filterCategory.name === category.toLowerCase()
  );

  const showProductWithFilter = filterProducts(searchedShowProduct, selectedOpts, expression);

  //* pagination////
  const curPageNum2 = useSelector((state) => state.pagination.currentPage);
  const [curPageNum, setCurPageNum] = useState(1);
  const cardsPerPage = 9;
  const totalPages = Math.ceil(showProductWithFilter.length / cardsPerPage);

  console.log(
    "จำนวนหน้าcurItem:",
    curItem.length,
    "จำนวนหน้า: ",
    showProductWithFilter.length,
    "ตอนนี้อยู่",
    curPageNum2,
    "totalPages:",
    totalPages
  );
  const handleChangePage = (pageNum) => {
    dispatch(setPageNum(pageNum));
  };

  const productPaginated = showProductWithFilter.slice(
    (curPageNum2 - 1) * cardsPerPage,
    curPageNum2 * cardsPerPage
  );
  //* useEffect //ถ้าuseEffect รับ showProduct ตัวนี้ไป param2 มันจะ inf loop จนพัง
  useEffect(() => {
    dispatch(getCategorizedData({ showProduct, category }));

    if (curPageNum2 > totalPages) {
      console.log("หน้าปัจจุบัน", curPageNum2, ">", totalPages);
      setCurPageNum(1);
      dispatch(setDefault());
    }
  }, [category, parts, products]);

  //* imgLoading
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [stockByBranchs, setstockByBranchs] = useState();
  const togglePopup = (e, index) => {
    console.log("เลข index:", productPaginated[index]);
    setstockByBranchs(productPaginated[index]);
    setIsOpen(!isOpen);
  };

  //** หน้าเว็บ
  return (
    <>
      <UserFilter />
      <Grid container spacing="10" columns={{ xs: 4, sm: 12, md: 12 }}>
        {productPaginated.map((item, index) => {
          const pngPath = `/images/${item.compatible.toLowerCase().split(" ", 1)}.png`;
          const jpgPath = `/images/${item.compatible.toLowerCase()}.jpg`;
          const maxCardHeight = Math.max(...productPaginated.map((card) => card.height));
          console.log("maxCardHeight", maxCardHeight);
          return (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card sx={{ boxShadow: "2px 2px 2px 1px rgba(92, 92, 92, 0.5)" }}>
                <Card>
                  {isLoading ? (
                    isLoading && (
                      <CardMedia
                        component="img"
                        src={jpgPath || pngPath}
                        // image={logoHeader}
                        alt={item.title}
                        title={item.title}
                        sx={{ height: "200px", objectFit: "contain" }}
                      />
                    )
                  ) : (
                    <CardMedia
                      component="img"
                      src={item.img}
                      alt={item.title}
                      title={item.title}
                      sx={{ height: "200px", objectFit: "contain" }}
                      onLoad={handleImageLoad}
                    />
                  )}
                  {!isLoading && !item.img && <span>ไม่มีภาพ</span>}

                  <CardContent sx={{ height: "165px" }}>
                    <Box
                      sx={{
                        display: "flex",
                        bgcolor: "background.paper",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          flexGrow: "1",
                          fontSize: "1.2rem",
                          fontWeight: "bolder",
                        }}
                      >
                        {item.code}
                      </Typography>

                      <Button
                        sx={{ textDecoration: "underline", padding: 0 }}
                        onClick={(e) => togglePopup(e, index)}
                        // display="block"
                        // gutterBottom
                      >
                        Stock: {item.QTY.reduce((acc, QTYItem) => acc + QTYItem, 0)}
                      </Button>
                    </Box>
                    <Typography
                      textOverflow="clip"
                      variant="body2"
                      sx={{ height: "80px", overflowY: "auto" }}
                    >
                      {item.productDescription}
                      {JSON.stringify(item.QTY)}
                    </Typography>
                    <Divider sx={{ pt: 1 }} />
                    <Box sx={{ display: "flex" }}>
                      <ListItemText
                        sx={{ fontSize: "2rem" }}
                        primary={
                          <>
                            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bolder" }}>
                              {item.promotionPrice
                                ? "฿ " + item.promotionPrice.toLocaleString() + ".-"
                                : "฿ " + item.srp + ".-"}
                            </Typography>
                          </>
                        }
                        secondary={
                          item.promotionPrice ? (
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline", fontSize: "0.9rem" }}
                                component="span"
                                variant="caption"
                                color="text.secondary"
                              >
                                ราคาปกติ ฿ {item.srp.toLocaleString()}.-
                              </Typography>
                            </React.Fragment>
                          ) : (
                            <></>
                          )
                        }
                      />
                      <Button
                        sx={{ height: "35px", alignSelf: "center", backgroundColor: "#42528A" }}
                        variant="contained"
                        onClick={(e) => {
                          handleChange(item);
                        }}
                      >
                        เลือก
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Card>
            </Grid>
          );
        })}
        {isOpen && (
          <div style={popupStyle}>
            <div style={popupContentStyle}>
              <h2>รายการสินค้าตามสาขา</h2>
              <p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>สาขา</div>
                  <div>จำนวน</div>
                </div>
                <hr style={{ padding: "1px", border: "1px solid grey" }} />
                {stockByBranchs.BRANCH_CODE.map((item, index) => {
                  return (
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>{item}</div>
                        <div>{stockByBranchs.QTY[index]}</div>
                      </div>
                      {index > 0 && <hr />}
                    </div>
                  );
                })}
              </p>

              <button style={closePopupButtonStyle} onClick={togglePopup}>
                Close
              </button>
            </div>
          </div>
        )}
      </Grid>

      <Stack className="pagination-card" spacing={2} alignItems="center" sx={{ mt: "6px" }}>
        {totalPages ? (
          <Typography>
            Page:{curPageNum2} / {totalPages}
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
          page={curPageNum2}
        />
      </Stack>

      <Bottom />
    </>
  );
}

//****************************  ส่วนนี้เป็นส่วน dynamic display based on api state/////////////////////////////////
function SelectionProto01() {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category.category);
  if (!category) dispatch(changeCategory("cpu"));
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const { products, totalRows, loading, error } = useSelector((state) => state.products);
  const partData = useSelector((state) => state.noApiCustomize.partData);
  const startPage = (currentPage - 1) * 6;
  const pageEnd = currentPage * 6;
  const { dbCategory } = partData.find((item) => item.category === category);

  const { isLoading, isSuccess, isError } = useGetDbItemQuery(
    { dbCategory, currentPage },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  let cardContent;

  //** กรณีกำลังโหลด
  if (loading) {
    ///* ให้เก็บหน้า html ไว้ใน cardContent ดังนี้เอาไว้ return ภายหลัง
    cardContent = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
    //** กรณีโหลดสำเร็จ
  } else if (products) {
    console.log("data เป็นไง", products, "postsได้ยัง: ", products);

    cardContent = <PostCard items={products} totalRows={totalRows} />;

    //** กรณีError
  } else if (error) {
    ///* cardContent เก็บ div ก้อนนึง ทำหน้าที่โชว alert
    cardContent = (
      <div>
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
        <div>Error</div>
      </div>
    );
  }
  ///* อะไรเกิดขึ้นมันจะมา return เพื่อแสดงผลตรงนี้
  return <div>{cardContent}</div>;
}

export default SelectionProto01;

const popupStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "1000",
};

const popupContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
};

const closePopupButtonStyle = {
  marginTop: "10px",
  padding: "5px 10px",
  backgroundColor: "#ccc",
  border: "none",
  cursor: "pointer",
};
