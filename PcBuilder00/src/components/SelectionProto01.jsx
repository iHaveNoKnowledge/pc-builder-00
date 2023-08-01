import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { makeStyles, CardActionArea } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
// import {makeStyles} from "@mui/material/legacy/styles";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, ButtonGroup } from "@mui/material/";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Divider, Alert } from "@mui/material";
import { addProduct, setMax, updateSumAmount, updateSumPrices } from "../slices/cutomizeSliceNoApi";
import "./Selection.css";
import UserFilter from "./UserFilter";
import {
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useGetDbItemQuery,
  useGetDbItem2Query,
  useGetPhotosQuery,
} from "../features/api/dataApiSlice";
import { getCategorizedData } from "../slices/userFilterSlice";
import Bottom from "./BottomComponent";
import { setDefault, setPageNum } from "../slices/paginationSlice";
import { apiSlice } from "../features/api/dataApiSlice";
import { changeCategory } from "../slices/categorySlice";
import logoHeader from "../assets/itLogo-1.png";

//* ------------------------------------------------Display*-----------------------------------------------------------------------------------------
function PostCard({ totalRows }) {
  //* useSelector!!!!!!!!!!!!!!!!!!!!!
  const products = useSelector((state) => state.products.products);
  //* useState!!!!!!!!!!!!!!!!!!!
  // const [curItem, setCurItem] = useState(items.recordset);
  console.log("บรรทัด39 :");
  const [curItem, setCurItem] = useState(products || []);
  console.log("curItemใช้ได้ยัง :", curItem);
  //* dispatchZone!!!!!!!!!
  const dispatch = useDispatch();

  //* ตรงนี้ขาดไม่ได้
  useEffect(() => {
    setCurItem(products);
    dispatch(getCategorizedData({ showProduct, category }));
  }, [products]);

  // *นี่คือ dispatch ข้างในบรรจุ action
  const handleChange = (item) => {
    dispatch(addProduct(item));
    if (category === "mb") {
      dispatch(setMax(item.slot));
    }
    dispatch(updateSumAmount());
    dispatch(updateSumPrices());
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

  // Find socket and typeRAM from the mainboard
  let socket_mb = "",
    typeRAM_mb = "";
  parts.find((item) => {
    if (item.category.toLowerCase() === "mb" && item.listItems.length !== 0) {
      ({ socket: socket_mb, typeRam: typeRAM_mb } = item.listItems[0]);
      return true;
    }
  });

  // Find socket from the CPU
  let socket_CPU = "";
  parts.find((item) => {
    if (item.category.toLowerCase() === "cpu" && item.listItems.length !== 0) {
      socket_CPU = item.listItems[0].socket;
      return true;
    }
  });

  // Find typeRAM from the RAM
  let typeRAM_RAM = "";
  parts.find((item) => {
    if (item.category.toLowerCase().replace(" ", "") === "ram" && item.listItems.length !== 0) {
      typeRAM_RAM = item.listItems[0].typeRam;
      return true;
    }
  });

  // Filter products based on selected mainboard, CPU, and RAM
  const CPU_display = curItem.filter((item) => {
    if (socket_mb === "") {
      return item.category.toLowerCase().replace(" ", "") === "cpu";
    } else if (socket_mb !== "") {
      return item.category.toLowerCase().replace(" ", "") === "cpu" && item.socket === socket_mb;
    } else {
      alert("ผีหลอกแล้วมวั้ง");
    }
  });

  const mainBoard_display = curItem.filter((item) => {
    if (socket_CPU === "" && typeRAM_RAM === "") {
      return item.category.toLowerCase().replace(" ", "") === "mb";
    } else if (socket_CPU === "" && typeRAM_RAM !== "") {
      return item.category.toLowerCase().replace(" ", "") === "mb" && item.typeRam === typeRAM_RAM;
    } else if (socket_CPU !== "" && typeRAM_RAM === "") {
      return item.category.toLowerCase().replace(" ", "") === "mb" && item.socket === socket_CPU;
    } else if (socket_CPU !== "" && typeRAM_RAM !== "") {
      return (
        item.category.toLowerCase().replace(" ", "") === "mb" &&
        item.socket === socket_CPU &&
        item.typeRam === typeRAM_RAM
      );
    }
  });

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
  const cardsPerPage = 6;
  const totalPages = Math.ceil(totalRows / cardsPerPage);

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
    if (curPageNum2 > totalPages) {
      console.log("หน้าปัจจุบัน", curPageNum2, ">", totalPages);
      setCurPageNum(1);
      dispatch(setDefault());
    }
  }, [curPageNum2]);

  //* imgLoading
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  //** หน้าเว็บ
  return (
    <>
      <UserFilter />
      <Grid container spacing="10" columns={{ xs: 4, sm: 12, md: 12 }}>
        {productPaginated.map((item, index) => {
          const pngPath = `src/assets/${item.compatible.toLowerCase().split(" ", 1)}.png`;
          const jpgPath = `src/assets/${item.compatible.toLowerCase()}.jpg`;
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
                        src={pngPath || jpgPath}
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
                        sx={{ flexGrow: "1", fontSize: "1.2rem", fontWeight: "bolder" }}
                      >
                        {item.code}
                      </Typography>

                      <Typography
                        variant="caption"
                        // display="block"
                        // gutterBottom
                      >
                        Stock: INT
                      </Typography>
                    </Box>
                    <Typography
                      textOverflow="clip"
                      variant="body2"
                      sx={{ height: "100px", overflowY: "auto" }}
                    >
                      {item.productDescription}
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
                    {/* <Typography variant="body2" color="text.secondary">
                      5555
                    </Typography> */}
                  </CardContent>
                </Card>
                {/* <CardActions>
                  <Button size="small">Like</Button>
                  <Button size="small">Fav</Button>
                </CardActions> */}
              </Card>
            </Grid>
          );
        })}
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
      {/* <Box>
        <BigPaginationTest />
      </Box> */}
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
  if (isLoading) {
    ///* ให้เก็บหน้า html ไว้ใน cardContent ดังนี้เอาไว้ return ภายหลัง
    cardContent = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
    //** กรณีโหลดสำเร็จ
  } else if (isSuccess) {
    // const posts = data.recordsets.flat();
    console.log("data เป็นไง", products, "postsได้ยัง: ", products);
    // dispatch(getProducts(posts));
    ///เอา [posts] ซึ่งเป็น array data ที่ได้จากการ fetchจาก endpoints ที่เราเลือก มาใน dataApiSLice เอามาทำการ map() แล้วส่งไป เป็น prop ให้ตัวหลักข้างบนที่เราจะแสดงผล
    cardContent = <PostCard items={products} totalRows={totalRows} />;
    // cardContent = <>สำเร็จ</>;

    //** กรณีError
  } else if (isError) {
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
