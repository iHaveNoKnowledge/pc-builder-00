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
import { useGetPostsQuery, useGetDbItemQuery } from "../features/api/dataApiSlice";
import { getCategorizedData } from "../slices/userFilterSlice";
import Bottom from "./BottomComponent";
import { setDefault, setPageNum } from "../slices/paginationSlice";

function PostCard({ items }) {
  ////useState!!!!!!!!!!!!!!!!!!!
  const [curItem, setCurItem] = useState(items.recordset);

  ////dispatchZone!!!!!!!!!
  const dispatch = useDispatch();

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

  //* นำ displayed ทั้งหมดมา filter เฉพาะ ประเภทที่ user เลือก
  const showProduct = combinedProduct.filter((item) => item.category === category);
  const searchedShowProduct = showProduct.filter((item) => {
    return (
      item.title.toLowerCase().includes(textSearch.toLowerCase()) ||
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
  const handleChangePage = (pageNum) => {
    setCurPageNum(pageNum);
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
                    // image="https://res.cloudinary.com/itcity-production/image/upload/f_auto,q_auto,w_400/v1654663622/product/product-master/uvmlmnvqxiob28e35bp9.png"
                    image={item.img}
                    title={item.title}
                    sx={{ height: "200px", objectFit: "contain" }}
                  />

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
                              {"฿ " + item.promotionPrice.toLocaleString() + ".-"}
                            </Typography>
                          </>
                        }
                        secondary={
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

      <Bottom />
    </>
  );
}

//****************************  ส่วนนี้เป็นส่วน dynamic display based on api state/////////////////////////////////
function SelectionProto01() {
  ///* เอา ค่า boolean status api มา ในหลายๆกรณี
  const {
    data: posts, //dataที่ได้จาก api เก็บไว้ในตัวแปร posts
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetDbItemQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // useEffect(() => {
  //   const socket = subscribeDbItem((newData) => {
  //     console.log("newData:คือไร", newData);
  //   });
  //   return () => {
  //     socket.close();
  //   };
  // }, []);
  // const posts = data.recordsets.flatmap((recordset) => recordset.map((data) => data));

  // const posts = data.recordsets.flat();
  let postContent;
  console.log("data เป็นไง", posts, "postsได้ยัง: ");

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
    ///เอา [posts] ซึ่งเป็น array data ที่ได้จากการ fetchจาก endpoints ที่เราเลือก มาใน dataApiSLice เอามาทำการ map() แล้วส่งไป เป็น prop ให้ตัวหลักข้างบนที่เราจะแสดงผล
    postContent = <PostCard items={posts} />;

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
