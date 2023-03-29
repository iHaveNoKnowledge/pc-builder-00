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
import { Divider } from "@mui/material";
import {
  addProduct,
  removeProduct,
  setMax,
} from "../slices/cutomizeSliceNoApi";

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
    { id: 1, title: "sword01", category: "sword", slot: "2" },
    { id: 2, title: "sword02", category: "sword", slot: "3" },
    { id: 3, title: "shield01", category: "shield" },
    { id: 4, title: "shield02", category: "shield" },
    { id: 5, title: "upperHead01", category: "upHead" },
    { id: 6, title: "upperHead02", category: "upHead" },
    { id: 7, title: "card01", category: "card" },
    { id: 8, title: "card02", category: "card" },
    {
      id: 9,
      title: "CPU01_AMD",
      category: "CPU",
      socket: "AM4",
      img:
        "https://media-cdn.bnn.in.th/263562/730143309936-00-square_medium.jpg",
    },
    {
      id: 11,
      title: "CPU02_AMD",
      category: "CPU",
      socket: "AM4",
      img:
        "https://media-cdn.bnn.in.th/52122/AMD-CPU-Ryzen7-5800X-3.8GHz-8C-16T-AM4-gen5-1-square_medium.jpg",
    },
    {
      id: 12,
      title: "CPU01_intel",
      category: "CPU",
      socket: "1700",
      img:
        "https://media-cdn.bnn.in.th/164968/intel-core-i5-12400-1-square_medium.jpg",
    },
    {
      id: 13,
      title: "CPU02_intel",
      category: "CPU",
      socket: "1700",
      img:
        "https://media-cdn.bnn.in.th/264216/intel-core-i9-13900F-1-square_medium.jpg",
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
    },
    {
      id: 22,
      title: "RAM01_single",
      category: "RAM",
      count: "1",
      typeRAM: "DDR4",
      img:
        "https://media-cdn.bnn.in.th/106735/zadak-moab-aura2-rgb-ddr4-1-square_medium.jpg",
    },
    {
      id: 23,
      title: "RAM02_single",
      category: "RAM",
      count: "1",
      typeRAM: "DDR5",
      img:"https://media-cdn.bnn.in.th/279728/zadak-ddr5-spark-rgb-white-1-square_medium.jpg"
    },
    {
      id: 24,
      title: "RAM01_duo",
      category: "RAM",
      count: "2",
      typeRAM: "DDR4",
      img:
        "https://media-cdn.bnn.in.th/106729/zadak-moab-aura2-rgb-ddr4-1-square_medium.jpg",
    },
    {
      id: 25,
      title: "RAM01_duo",
      category: "RAM",
      count: "2",
      typeRAM: "DDR5",
      img:
        "https://media-cdn.bnn.in.th/277595/consair-vengeance-rgb-ddr5-kit-black-1-square_medium.jpg",
    },
    {
      id: 26,
      title: "CPU03_AMD",
      category: "CPU",
      socket: "AM5",
      img:
        "https://media-cdn.bnn.in.th/280791/amd-ryzen9-7900x3d-1-square_medium.jpg",
    },
    {
      id: 27,
      title: "CPU04_AMD",
      category: "CPU",
      socket: "AM5",
      img:
        "https://media-cdn.bnn.in.th/240481/amd-ryzen9-7950x-1-square_medium.jpg",
    },
  ];

  ////dispatchZone!!!!!!!!!
  const dispatch = useDispatch();

  //นี่คือ dispatch ข้างในบรรจุ action
  const handleChange = (id, title, category, socket, typeRAM, slot, img) => {
    dispatch(addProduct({ id, title, category, socket, typeRAM, img }));
    // if (category === "Mainboard") {
    //   dispatch(setMax(slot));
    // }
    console.log("stateparts: ", parts);
  };

  ////useSelector!!!!!!!!!!!!!!!
  const category = useSelector((state) => state.category.category);
  const parts = useSelector((state) => state.noApiCustomize.partData);

  ////useState!!!!!!!!!!!!!!!!!!!
  const [curItem, setCurItem] = useState(items);

  ////เงื่อนไขcompatibility
  ///หาเงื่อนไข จากการเลือก mainboard
  const { socket: socket_mb, typeRAM: typeRAM_mb } = parts.find(
    (item) => item.category === "Mainboard"
  );

  ///หาเงื่อนไข จากการเลือก CPU
  const { socket: socket_CPU } = parts.find((item) => item.category === "CPU");

  ///หาเงื่อนไข จากการเลือก RAM
  const { typeRAM: typeRAM_RAM } = parts.find(
    (item) => item.category === "RAM"
  );

  ///สำหรับโชวสินค้าให้เลือกตามหมวดหมู่
  const CPU = curItem.filter((item) => {
    if (socket_mb === "") {
      return item.category === "CPU";
    } else {
      return item.category === "CPU" && item.socket === socket_mb;
    }
  });

  const mainBoard = curItem.filter((item) => {
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

  const RAM = curItem.filter((item) => {
    if (typeRAM_mb === "") {
      return item.category === "RAM";
    } else {
      return item.category === "RAM" && item.typeRAM === typeRAM_mb;
    }
  });

  const unconditionalProduct = curItem.filter(
    (item) =>
      item.category !== "CPU" &&
      item.category !== "Mainboard" &&
      item.category !== "RAM"
  );
  const combineProduct = unconditionalProduct.concat(CPU, mainBoard, RAM);
  const showProduct = combineProduct.filter(
    (item) => item.category === category
  );

  ////useEffect
  useEffect(() => {
    console.log("ได้ไรมา", showProduct);
  }, [showProduct]);

  ////หน้าเว็บ
  return (
    <>
      <Grid container spacing="14" columns={{ xs: 4, sm: 12, md: 12 }}>
        {showProduct.map((item, index) => {
          return (
            <Grid item xs={8} sm={6} md={4} key={index}>
              <Card sx={{ border: "1px dashed green" }}>
                <CardActionArea
                  onClick={(e) => {
                    handleChange(
                      item.id,
                      item.title,
                      item.category,
                      item.socket,
                      item.typeRAM,
                      item.slot,
                      item.img
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
                        primary="฿ 999 บาท"
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="caption"
                              color="text.secondary"
                            >
                              ราคาปกติ ฿ 9,999 บาท
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </Box>
                    {/* <Typography
                    variant="body2"
                    color="text.secondary"
                  ></Typography> */}
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
    </>
  );
}
