import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { makeStyles, CardActionArea } from "@material-ui/core";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
// import {makeStyles} from "@mui/material/legacy/styles";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
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

// const CustomPagination = ({ currentPage, totalPages, onChange, isLoading }) => {
//   const [pageGroup, setPageGroup] = useState(1);
//   const pagesPerGroup = 5; // จำนวนหน้าต่อกลุ่ม

//   const handlePageChange = (event, page) => {
//     onChange(event, page);
//     const newPageGroup = Math.ceil(page / pagesPerGroup);
//     setPageGroup(newPageGroup);
//   };

//   const startPage = (pageGroup - 1) * pagesPerGroup + 1;
//   const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

//   const renderPagination = () => {
//     if (isLoading) {
//       // แสดงหมายเลขหน้าเป็นลำดับต่อไป
//       return (
//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={onChange}
//           siblingCount={0}
//           boundaryCount={1}
//           showFirstButton
//           showLastButton
//           renderItem={(item) => <Pagination {...item} component="div" />}
//         />
//       );
//     } else {
//       // แสดงหมายเลขหน้าตามปกติ
//       return (
//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={onChange}
//           showFirstButton
//           showLastButton
//         />
//       );
//     }
//   };

//   return (
//     <Stack spacing={2}>
//       {renderPagination()}

//       {totalPages > pagesPerGroup && (
//         <Pagination
//           count={Math.ceil(totalPages / pagesPerGroup)}
//           page={pageGroup}
//           onChange={(_, page) => setPageGroup(page)}
//           showFirstButton
//           showLastButton
//           renderItem={(item) => <Pagination {...item} component="div" />}
//         />
//       )}

//       <div>
//         Showing pages {startPage}-{endPage} of {totalPages}
//       </div>
//     </Stack>
//   );
// };

// const BigPaginationTest = () => {
//   const [page, setPage] = useState(1);
//   const [displayData, setDisplayData] = useState([]);
//   const [totalPages, setTotalPages] = useState(0);

//   const { data, isLoading, isError } = useGetDbItem2Query(page);

//   useEffect(() => {
//     if (data) {
//       console.log("testlimitedBig", data.recordset, "totalitem: ", data.totalItems);
//       setDisplayData(data.recordset);
//       setTotalPages(Math.ceil(data.totalItems / 6));
//     }
//   }, [data]);

//   const handlePageChange = (event, page) => {
//     setPage(page);
//   };

//   if (isLoading) {
//     return <div>กำลังโหลด.....</div>;
//   }

//   if (isError) {
//     return <div>เอ๋อเหรอ</div>;
//   }

//   return (
//     <div>
//       {displayData ? (
//         displayData.map((item, index) => {
//           return <div key={index}>{item.PRODUCT_CODE}</div>;
//         })
//       ) : (
//         <>ว่างป่าว</>
//       )}
//       <div>จำนวนหน้าทั้งหมด: {totalPages}</div>
//       <Pagination count={totalPages} page={page} onChange={handlePageChange} />
//       <CustomPagination
//         currentPage={page}
//         totalPages={totalPages}
//         isLoading={isLoading}
//         onChange={handlePageChange}
//       />
//     </div>
//   );
// };

function PostCard({ items }) {
  //* useState!!!!!!!!!!!!!!!!!!!
  // const [curItem, setCurItem] = useState(items.recordset);
  const [curItem, setCurItem] = useState(items);
  console.log("curItemใช้ได้ยัง :", curItem);
  //* dispatchZone!!!!!!!!!
  const dispatch = useDispatch();

  //* useSelector!!!!!!!!!!!!!!!!!!!!!
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    setCurItem(products);
  }, [products]);
  // *นี่คือ dispatch ข้างในบรรจุ action
  const handleChange = (
    id,
    title,
    category,
    socket,
    typeRam,
    slot,
    img,
    count,
    promotionPrice,
    srp,
    max,
    code,
    productDescription
  ) => {
    dispatch(
      addProduct({
        id,
        title,
        category,
        socket,
        typeRam,
        img,
        count,
        promotionPrice,
        srp,
        slot,
        max,
        code,
        productDescription,
      })
    );
    if (category === "Mainboard") {
      dispatch(setMax(slot));
    }
    dispatch(updateSumAmount());
    dispatch(updateSumPrices());
    console.log(`productDescription: ${productDescription}
    count: ${count}
    typeRam: ${typeRam}
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
    if (item.category === "Mainboard") {
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
    if (item.category === "CPU") {
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
    if (item.category === "RAM") {
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
      return item.category === "CPU";
      //กรณีที่เลือกเมนบอร์ด ทำให้ "socket_mb" ไม่ใช่ค่าว่าง ให้คืนค่าสินค้าที่มีประเภท CPU ทุกตัว แต่ทุกตัวที่คืนมาต้องมีค่า socket ตาม  socket_mb
    } else if (socket_mb !== "") {
      return item.category === "CPU" && item.socket === socket_mb;
    } else {
      alert("ผีหลอกแล้วมวั้ง");
    }
  });

  //* กรองสินค้าMB
  const mainBoard_display = curItem.filter((item) => {
    if (socket_CPU === "" && typeRAM_RAM === "") {
      return item.category === "Mainboard";
    } else if (socket_CPU === "" && typeRAM_RAM !== "") {
      console.log(`CPUยังไม่เลือก แต่เลือก RAM`);
      return item.category === "Mainboard" && item.typeRam === typeRAM_RAM;
    } else if (socket_CPU !== "" && typeRAM_RAM === "") {
      return item.category === "Mainboard" && item.socket === socket_CPU;
    } else {
      return (
        item.category === "Mainboard" && item.socket === socket_CPU && item.typeRam === typeRAM_RAM
      );
    }
  });

  //* กรองสินค้าRAM
  const RAM_display = curItem.filter((item) => {
    if (typeRAM_mb === "") {
      return item.category === "RAM";
    } else {
      return item.category === "RAM" && item.typeRam === typeRAM_mb;
    }
  });

  //* arrayของสินค้าที่ไม่ต้องมีเงื่อนไข ไม่มีการกรอง
  const unconditionProduct = curItem.filter(
    (item) => item.category !== "CPU" && item.category !== "Mainboard" && item.category !== "RAM"
  );

  //* นำ display ทั้งหมดที่มีการกรองและไม่มีการกรอง มารวมกัน
  const combinedProduct = unconditionProduct.concat(CPU_display, mainBoard_display, RAM_display);
  console.log("RAM_display:", RAM_display);
  console.log("combinedProduct:", combinedProduct);

  //* นำ displayed ทั้งหมดมา filter เฉพาะ ประเภทที่ user เลือก
  const showProduct = combinedProduct.filter((item) => item.category === category);
  const searchedShowProduct = showProduct.filter((item) => {
    return (
      item.code.toLowerCase().includes(textSearch.toLowerCase()) ||
      (item.socket && item.socket.toLowerCase().includes(textSearch.toLowerCase()))
    );
  });

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
  }, [category, parts]);

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
          const maxCardHeight = Math.max(...productPaginated.map((card) => card.height));
          console.log("maxCardHeight", maxCardHeight);
          return (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card sx={{ boxShadow: "2px 2px 2px 1px rgba(92, 92, 92, 0.5)" }}>
                <Card
                  onClick={(e) => {
                    handleChange(
                      item.id,
                      item.title,
                      item.category,
                      item.socket,
                      item.typeRam,
                      item.slot,
                      item.img,
                      item.countItem,
                      item.promotionPrice,
                      item.srp,
                      item.max,
                      item.code,
                      item.productDescription
                    );
                  }}
                >
                  <CardMedia
                    component="img"
                    src={item.img}
                    alt={item.title}
                    title={item.title}
                    sx={{ height: "200px", objectFit: "contain" }}
                    onLoad={handleImageLoad}
                  />
                  {isLoading && <span>Loading...</span>}
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
                    </Box>
                    {/* <Typography
                    variant="body2"
                    color="text.secondary"
                  >5555</Typography> */}
                  </CardContent>
                </Card>
                <CardActions>
                  <Button size="small">Like</Button>
                  <Button size="small">Fav</Button>
                </CardActions>
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

      {/* <Bottom /> */}
      <Box>{/* <BigPaginationTest /> */}</Box>
    </>
  );
}

//****************************  ส่วนนี้เป็นส่วน dynamic display based on api state/////////////////////////////////
function SelectionProto01() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.category);
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const products = useSelector((state) => state.products.products);
  const startPage = (currentPage - 1) * 6;
  const pageEnd = currentPage * 6;
  console.log("category:", startPage, pageEnd, 6, category);
  ///* เอา ค่า boolean status api มา ในหลายๆกรณี
  // const {
  //   data, //dataที่ได้จาก api เก็บไว้ในตัวแปร posts
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  //   refetch,
  // } = useGetDbItemQuery(
  //   { startPage, pageEnd, perPage: 10, category },
  //   {
  //     refetchOnMountOrArgChange: true,
  //   }
  // );
  const { isLoading, isSuccess, isError, error } = useGetDbItemQuery(
    { startPage, pageEnd, perPage: 10, category },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // const { data: posts, loading: isLoading, error: isError } = useSelector(
  //   (state) => state.products
  // );

  // useEffect(() => {
  //   dispatch(apiSlice.endpoints.getPosts({ startPage, pageEnd, peraPage: 10, category }));
  //   // useGetPostsQuery({ startPage, pageEnd, peraPage: 10, category });
  // }, [dispatch]);

  let postContent;

  //** กรณีกำลังโหลด
  if (isLoading) {
    ///* ให้เก็บหน้า html ไว้ใน postContent ดังนี้เอาไว้ return ภายหลัง
    postContent = (
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
    postContent = <PostCard items={products} />;
    // postContent = <>สำเร็จ</>;

    //** กรณีError
  } else if (isError) {
    ///* postContent เก็บ div ก้อนนึง ทำหน้าที่โชว alert
    postContent = (
      <div>
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{error}</Alert>
        </Stack>
        <div>Error</div>
      </div>
    );
  }
  ///* อะไรเกิดขึ้นมันจะมา return เพื่อแสดงผลตรงนี้
  return <div>{postContent}</div>;
}
export default SelectionProto01;
