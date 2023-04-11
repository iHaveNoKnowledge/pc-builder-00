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
import { Divider } from "@mui/material";
import {
  addProduct,
  setMax,
  updateSumAmount,
  updateSumPrices,
  setTypeAmount,
} from "../slices/cutomizeSliceNoApi";
import "./Selection.css";
import UserFilter from "./UserFilter";

// const useStyles = makeStyles({
//   focusVisible: {},
//   root: {
//     "&:hover $focusHighlight": {
//       opacity: 0
//     }
//   },
//   focusHighlight: {}
// });

export default function SelectionProto01() {
  // const classes = useStyles();
  //initdata, data for local scope testing  !!!!!!!!!!!!!!
  const items = [
    {
      id: 1,
      title: "sword01",
      category: "sword",
      slot: "2",
      price: 2645,
      discount: 0.8,
    },
    {
      id: 2,
      title: "sword02",
      category: "sword",
      slot: "3",
      price: 9255,
      discount: 0.8,
    },
    {
      id: 3,
      title: "shield01",
      category: "shield",
      price: 7210,
      discount: 0.9,
    },
    {
      id: 4,
      title: "shield02",
      category: "shield",
      price: 14190,
      discount: 0.85,
    },
    {
      id: 5,
      title: "upperHead01",
      category: "upHead",
      price: 10725,
      discount: 0.7,
    },
    {
      id: 6,
      title: "upperHead02",
      category: "upHead",
      price: 3485,
      discount: 0.63,
    },
    { id: 7, title: "card01", category: "card", price: 18045, discount: 0.81 },
    { id: 8, title: "card02", category: "card", price: 10020, discount: 0.68 },
    {
      id: 9,
      title: "CPU01_AMD",
      category: "CPU",
      socket: "AM4",
      img:
        "https://media-cdn.bnn.in.th/263562/730143309936-00-square_medium.jpg",
      price: 19290,
      discount: 0.53,
    },
    {
      id: 11,
      title: "CPU02_AMD",
      category: "CPU",
      socket: "AM4",
      img:
        "https://media-cdn.bnn.in.th/52122/AMD-CPU-Ryzen7-5800X-3.8GHz-8C-16T-AM4-gen5-1-square_medium.jpg",
      price: 5715,
      discount: 0.51,
    },
    {
      id: 12,
      title: "CPU01_intel",
      category: "CPU",
      socket: "1700",
      img:
        "https://media-cdn.bnn.in.th/164968/intel-core-i5-12400-1-square_medium.jpg",
      price: 1250,
      discount: 0.75,
    },
    {
      id: 13,
      title: "CPU02_intel",
      category: "CPU",
      socket: "1700",
      img:
        "https://media-cdn.bnn.in.th/264216/intel-core-i9-13900F-1-square_medium.jpg",
      price: 17270,
      discount: 0.52,
    },
    {
      id: 14,
      title: "Mainboard01_AMD",
      category: "Mainboard",
      socket: "AM4",
      typeRAM: "DDR4",
      slot: 2,
      img:
        "https://media-cdn.bnn.in.th/19033/Asus-Mainboard-PRIME-A320M-K-DDR4-AM4-1-square_medium.jpg",
      price: 10560,
      discount: 0.84,
    },
    {
      id: 15,
      title: "Mainboard02_AMD",
      category: "Mainboard",
      socket: "AM5",
      typeRAM: "DDR5",
      slot: 2,
      img:
        "https://media-cdn.bnn.in.th/257878/gigabyte-b650i-aorus-ultra-1-square_medium.jpg",
      price: 18765,
      discount: 0.54,
    },
    {
      id: 16,
      title: "Mainboard01_intel",
      category: "Mainboard",
      socket: "1700",
      typeRAM: "DDR4",
      slot: 2,
      img:
        "https://media-cdn.bnn.in.th/171658/asrock-b660m-hdv-ddr4-1-square_medium.jpg",
      price: 16455,
      discount: 0.84,
    },
    {
      id: 17,
      title: "Mainboard02_intel",
      category: "Mainboard",
      socket: "1700",
      typeRAM: "DDR5",
      slot: 2,
      img:
        "https://www.jib.co.th/img_master/product/medium/2022110817133356180_1.jpg",
      price: 9100,
      discount: 0.59,
    },
    {
      id: 18,
      title: "Mainboard01_AMD 4slot",
      category: "Mainboard",
      socket: "AM4",
      typeRAM: "DDR4",
      slot: 4,
      img:
        "https://media-cdn.bnn.in.th/17709/AsRock-Mainboard-B550-Steel-Legend-AM4-1-square_medium.jpg",
      price: 10510,
      discount: 0.58,
    },
    {
      id: 19,
      title: "Mainboard02_AMD 4slot",
      category: "Mainboard",
      socket: "AM5",
      typeRAM: "DDR5",
      slot: 4,
      img:
        "https://media-cdn.bnn.in.th/241066/asrock-x670e-pg-lightning-am5-1-square_medium.jpg",
      price: 11400,
      discount: 0.88,
    },
    {
      id: 20,
      title: "Mainboard01_intel 4slot",
      category: "Mainboard",
      socket: "1700",
      typeRAM: "DDR4",
      slot: 4,
      img:
        "https://media-cdn.bnn.in.th/156972/asus-prime-z690-p-d4-csm-1-square_medium.jpg",
      price: 7290,
      discount: 0.7,
    },
    {
      id: 21,
      title: "Mainboard02_intel 4slot",
      category: "Mainboard",
      socket: "1700",
      typeRAM: "DDR5",
      slot: 4,
      img:
        "https://media-cdn.bnn.in.th/258336/msi-mag-z790-tomahawk-wifi-d5-1-square_medium.jpg",
      price: 3790,
      discount: 0.6,
    },
    {
      id: 22,
      title: "RAM01_single",
      category: "RAM",
      count: 1,
      typeRAM: "DDR4",
      img:
        "https://media-cdn.bnn.in.th/106735/zadak-moab-aura2-rgb-ddr4-1-square_medium.jpg",
      price: 7460,
      discount: 0.51,
    },
    {
      id: 23,
      title: "RAM02_single",
      category: "RAM",
      count: 1,
      typeRAM: "DDR5",
      img:
        "https://media-cdn.bnn.in.th/279728/zadak-ddr5-spark-rgb-white-1-square_medium.jpg",
      price: 10780,
      discount: 0.72,
    },
    {
      id: 24,
      title: "RAM01_duo",
      category: "RAM",
      count: 2,
      typeRAM: "DDR4",
      img:
        "https://media-cdn.bnn.in.th/106729/zadak-moab-aura2-rgb-ddr4-1-square_medium.jpg",
      price: 14920,
      discount: 0.52,
    },
    {
      id: 25,
      title: "RAM01_duo",
      category: "RAM",
      count: 2,
      typeRAM: "DDR5",
      img:
        "https://media-cdn.bnn.in.th/277595/consair-vengeance-rgb-ddr5-kit-black-1-square_medium.jpg",
      price: 18745,
      discount: 0.64,
    },
    {
      id: 26,
      title: "CPU03_AMD",
      category: "CPU",
      socket: "AM5",
      img:
        "https://media-cdn.bnn.in.th/280791/amd-ryzen9-7900x3d-1-square_medium.jpg",
      price: 14740,
      discount: 0.92,
    },
    {
      id: 27,
      title: "CPU04_AMD",
      category: "CPU",
      socket: "AM5",
      img:
        "https://media-cdn.bnn.in.th/240481/amd-ryzen9-7950x-1-square_medium.jpg",
      price: 17885,
      discount: 0.7,
    },
  ];

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
    discount,
    price
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
        discount,
        price,
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

  ////เงื่อนไขcompatibility
  ///หาเงื่อนไข จากการเลือก mainboard

  const mainboardCondition = parts.find((item) => {
    if (item.category === "Mainboard") {
      console.log("หาไม่เจอ", item.listItems[0]);
      return item.listItems[0];
    }
  });
  const {
    socket: socket_mb,
    typeRAM: typeRAM_mb,
  } = mainboardCondition.listItems[0];

  ///หาเงื่อนไข จากการเลือก CPU
  const cpuCondition = parts.find((item) => {
    if (item.category === "CPU") {
      return item;
    }
  });
  const { socket: socket_CPU } = cpuCondition.listItems[0];

  ///หาเงื่อนไข จากการเลือก RAM
  const ramCondition = parts.find((item) => {
    if (item.category === "RAM") {
      return item.listItems[0];
    }
  });
  const { typeRAM: typeRAM_RAM } = ramCondition.listItems[0];

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
        item.category === "Mainboard" &&
        item.socket === socket_CPU &&
        item.typeRAM === typeRAM_RAM
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
    (item) =>
      item.category !== "CPU" &&
      item.category !== "Mainboard" &&
      item.category !== "RAM"
  );

  ///นำ display ทั้งหมด มารวมกัน
  const combineProduct = unconditionProduct.concat(
    CPU_display,
    mainBoard_display,
    RAM_display
  );

  // นำ disply ทั้งกรองและไม่กรองมารวมกันแล้วหาตามประเภทที่ user เลือก
  const showProduct = combineProduct.filter(
    (item) => item.category === category
  );

  ////useEffect
  useEffect(() => {}, [showProduct]);

  ////pagination////
  const [curPageNum, setCurPageNum] = useState(1);
  const cardsPerPage = 6;
  const totalPages = Math.ceil(showProduct.length / cardsPerPage);
  const handleChangePage = (pageNum) => {
    setCurPageNum(pageNum);
  };
  const productPaginated = showProduct.slice(
    (curPageNum - 1) * cardsPerPage,
    curPageNum * cardsPerPage
  );

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
                      item.discount,
                      item.price
                    );
                  }}
                >
                  <CardMedia
                    component="img"
                    // image="https://res.cloudinary.com/itcity-production/image/upload/f_auto,q_auto,w_400/v1654663622/product/product-master/uvmlmnvqxiob28e35bp9.png"
                    image={item.img}
                    title={item.title}
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
                        primary={
                          "฿ " +
                          Math.round(
                            item.price * (1 - item.discount)
                          ).toLocaleString() +
                          ".-"
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="caption"
                              color="text.secondary"
                            >
                              ราคาปกติ ฿ {item.price.toLocaleString()}.-
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

      <Stack
        className="pagination-card"
        spacing={2}
        alignItems="center"
        sx={{ mt: "6px" }}
      >
        <Typography>
          Page: {curPageNum}/{totalPages}
        </Typography>
        <Pagination
          sx={{}}
          count={totalPages}
          variant="outlined"
          shape="rounded"
          onChange={(event, pageNum) => handleChangePage(pageNum)}
        />
      </Stack>
    </>
  );
}
