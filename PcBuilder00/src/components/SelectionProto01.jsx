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
import {
  addProduct,
  setMax,
  updateSumAmount,
  updateSumPrices,
  setTypeAmount,
} from "../slices/cutomizeSliceNoApi";
import "./Selection.css";
import UserFilter from "./UserFilter";
import { useGetPostsQuery } from "../features/api/dataApiSlice";
import { getCategorizedData } from "../slices/userFilterSlice";

function PostCard({ items }) {
  ////useState!!!!!!!!!!!!!!!!!!!
  const [curItem, setCurItem] = useState(items);

  ////dispatchZone!!!!!!!!!
  const dispatch = useDispatch();

  //นี่คือ dispatch ข้างในบรรจุ action
  const handleChange = (
    id,
    title,
    category,
    socket,
    typeRAM,
    slot,
    img,
    count,
    promotionPrice,
    srp,
    max
  ) => {
    dispatch(
      addProduct({
        id,
        title,
        category,
        socket,
        typeRAM,
        img,
        count,
        promotionPrice,
        srp,
        slot,
        max,
      })
    );
    if (category === "Mainboard") {
      dispatch(setMax(slot));
    }
    dispatch(updateSumAmount());
    dispatch(updateSumPrices());
    // dispatch(setTypeAmount({ category }));
  };

  ////useSelector!!!!!!!!!!!!!!!
  const category = useSelector((state) => state.category.category);
  const parts = useSelector((state) => state.noApiCustomize.partData);
  const filters = useSelector((state) => state.userFilter.filters);

  ////เงื่อนไขcompatibility
  ///หาเงื่อนไข จากการเลือก mainboard
  let socket_mb, typeRAM_mb;
  parts.find((item) => {
    if (item.category === "Mainboard") {
      if (item.listItems.length !== 0) {
        socket_mb = item.listItems[0].socket;
        typeRAM_mb = item.listItems[0].typeRAM;
      } else {
        socket_mb = "";
        typeRAM_mb = "";
      }
      return item.listItems[0];
    }
  });

  ///หาเงื่อนไข จากการเลือก CPU
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

  ///หาเงื่อนไข จากการเลือก RAM
  let typeRAM_RAM = "xx";
  parts.find((item) => {
    if (item.category === "RAM") {
      if (item.listItems.length !== 0) {
        typeRAM_RAM = item.listItems[0].typeRAM;
      } else {
        typeRAM_RAM = "";
      }
      return item.listItems[0];
    }
  });

  // const { typeRAM: typeRAM_RAM } = ramCondition.listItems[0];

  ///สำหรับโชวสินค้าให้เลือกตามหมวดหมู่
  //กรองสินค้าCPU
  const CPU_display = curItem.filter((item) => {
    if (socket_mb === "") {
      return item.category === "CPU";
    } else {
      return item.category === "CPU" && item.socket === socket_mb;
    }
  });

  //กรองสินค้าMB
  // const mainBoard_display2 = curItem.filter((item) => {
  //   if (1 === 1) {
  //     console.log("ได้ไรมา", eiei)
  //     return item.category === "Mainboard"
  //   }
  // })

  const mainBoard_display = curItem.filter((item) => {
    if (socket_CPU === "" && typeRAM_RAM === "") {
      return item.category === "Mainboard";
    } else if (socket_CPU === "" && typeRAM_RAM !== "") {
      return item.category === "Mainboard" && item.typeRAM === typeRAM_RAM;
    } else if (socket_CPU !== "" && typeRAM_RAM === "") {
      return item.category === "Mainboard" && item.socket === socket_CPU;
    } else {
      return (
        item.category === "Mainboard" && item.socket === socket_CPU && item.typeRAM === typeRAM_RAM
      );
    }
  });

  //กรองสินค้าRAM
  const RAM_display = curItem.filter((item) => {
    if (typeRAM_mb === "") {
      return item.category === "RAM";
    } else {
      return item.category === "RAM" && item.typeRAM === typeRAM_mb;
    }
  });

  //arrayของสินค้าที่ไม่ต้องมีเงื่อนไข ไม่มีการกรอง
  const unconditionProduct = curItem.filter(
    (item) => item.category !== "CPU" && item.category !== "Mainboard" && item.category !== "RAM"
  );

  ///นำ display ทั้งหมดที่มีการกรองและไม่มีการกรอง มารวมกัน
  const combineProduct = unconditionProduct.concat(CPU_display, mainBoard_display, RAM_display);

  // นำ display ทั้งหมดมา filter เฉพาะ ประเภทที่ user เลือก
  const showProduct = combineProduct.filter((item) => item.category === category);

  // นำ flter มา filter showproduct
  const filterProducts = (products, filters) => {
    const filteredProducts = products.filter(
      (product) =>
        (!filters.brand || product.brand === filters.brand) &&
        (!filters.model || product.model === filters.model) &&
        (!filters.socket || product.socket === filters.socket)
    );
    return filteredProducts;
  };
  const showProductWithFilter = filterProducts(showProduct, filters);

  ////useEffect
  useEffect(() => {
    dispatch(getCategorizedData({ showProduct, category }));
  }, [showProduct]);

  ////pagination////
  const [curPageNum, setCurPageNum] = useState(1);

  const cardsPerPage = 6;
  const totalPages = Math.ceil(showProduct.length / cardsPerPage);
  const handleChangePage = (pageNum) => {
    setCurPageNum(pageNum);
  };

  const productPaginated = showProductWithFilter.slice(
    (curPageNum - 1) * cardsPerPage,
    curPageNum * cardsPerPage
  );

  useEffect(() => {
    if (curPageNum > totalPages) {
      setCurPageNum(1);
    }
  }, [category]);

  ////หน้าเว็บ
  return (
    <>
      <UserFilter />
      <Grid container spacing="10" columns={{ xs: 4, sm: 12, md: 12 }}>
        {productPaginated.map((item, index) => {
          return (
            <Grid item xs={8} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: "2px 2px 2px 1px rgba(92, 92, 92, 0.5)" }}>
                <CardActionArea
                  onClick={(e) => {
                    handleChange(
                      item.id,
                      item.title,
                      item.category,
                      item.socket,
                      item.typeRAM,
                      item.slot,
                      item.img,
                      item.count,
                      item.promotionPrice,
                      item.srp,
                      item.max
                    );
                  }}
                >
                  <CardMedia
                    component="img"
                    // image="https://res.cloudinary.com/itcity-production/image/upload/f_auto,q_auto,w_400/v1654663622/product/product-master/uvmlmnvqxiob28e35bp9.png"
                    image={item.img}
                    title={item.title}
                    // sx={{ height: "300px" }}
                  />

                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        bgcolor: "background.paper",
                      }}
                    >
                      <Typography variant="body1" sx={{ flexGrow: "1" }}>
                        SKU-000000
                      </Typography>

                      <Typography
                        variant="caption"
                        // display="block"
                        // gutterBottom
                      >
                        Stock: INT
                      </Typography>
                    </Box>
                    <Typography variant="body2">{item.title}</Typography>
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
                </CardActionArea>
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
        />
      </Stack>
    </>
  );
}

////////////////////////ส่วนนี้เป็นส่วน dynamic display based on api state/////////////////////////////////
function SelectionProto01() {
  ///เอา ค่า boolean status api มา ในหลายๆกรณี
  const {
    data: posts, //dataที่ได้จาก api เก็บไว้ในตัวแปร posts
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();
  let postContent;

  ////กรณีกำลังโหลด
  if (isLoading) {
    ///ให้เก็บหน้า html ไว้ใน postContent ดังนี้เอาไว้ return ภายหลัง
    postContent = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
    ////กรณีโหลดสำเร็จ
  } else if (isSuccess) {
    ///เอา [posts] ซึ่งเป็น array data ที่ได้จากการ fetchจาก endpoints ที่เราเลือก มาใน dataApiSLice เอามาทำการ map() แล้วส่งไป เป็น prop ให้ตัวหลักข้างบนที่เราจะแสดงผล
    postContent = <PostCard items={posts} />;

    ////กรณีError
  } else if (isError) {
    ///postContent เก็บ div ก้อนนึง ทำหน้าที่โชว alert
    postContent = (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">{error}</Alert>
      </Stack>
    );
  }
  ///อะไรเกิดขึ้นมันจะมา return เพื่อแสดงผลตรงนี้
  return <div>{postContent}</div>;
}
export default SelectionProto01;
