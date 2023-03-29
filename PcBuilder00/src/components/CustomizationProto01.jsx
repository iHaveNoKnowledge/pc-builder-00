import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ImageIcon from "@mui/icons-material/Image";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Button,
  Grid,
  CardContent,
} from "@mui/material";
import { changeCategory } from "../slices/categorySlice";
import { removeProduct } from "../slices/cutomizeSliceNoApi";
import "./CustomizationProto01.css";

const CustomizationProto01 = () => {
  //useState
  const [selected, setSelected] = useState(false);
  //useSelector
  const categories = useSelector((state) => state.noApiCustomize.partData);

  //สร้าง functiondispatch
  const dispatch = useDispatch();

  //function
  const handleChange = (category) => {
    console.log("handleChanged", category);
    dispatch(changeCategory(category));
  };

  const handleClear = (category) => {
    console.log("clear data");
    dispatch(removeProduct(category));
  };

  return (
    <>
      <List sx={{ width: "100%" }}>
        {categories.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item.id ? (
                /////////////////////เลือกสินค้าแล้ว///////////////////////////////////////////////////////////
                <div className="borderLine">
                  <ListItem className="listItemStyle">
                    <ListItemButton
                      disableGutters={true}
                      disableRipple
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChange(item.category);
                      } }
                      sx={{
                        transform: "skew(8deg)",
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: "0px",
                        width: "100%",
                        alignItems:"start",
                      }}
                    >
                      <Box sx={{ alignSelf: "end" }}>
                        <Box
                          onClick={(e) => {
                            console.log("ปุ่มแดงๆ");
                            e.stopPropagation();
                            dispatch(handleClear(item.category));
                          } }
                          sx={{
                            padding: "0.1px 10px",
                            backgroundColor: "red",
                            color: "white",
                          }}
                        >
                          x
                        </Box>
                      </Box>


                      <Box sx={{ display: "flex" ,width:"100%"}}>
                        <Typography sx={{}}>
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <ListItemAvatar sx={{ transform: "skew(-1deg)" }}>
                              <Box
                                component="img"
                                src={item.img}
                                alt={item.title}
                                sx={{ objectFit: "contain", width: 40 }}
                              ></Box>
                            </ListItemAvatar>
                            <div>ss</div>
                            <div>ss</div>
                          </Box>
                        </Typography>

{/* ////////////////////////ก้อนขวา/////////////////////////////// */}
                        <Typography sx={{flexGrow:"1" }}>
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >

                            {/* //// ย่อย1 //// */}
                            <Box
                              sx={{ display: "flex",  }}
                            >
                              <Typography
                                sx={{ flexGrow:"1", minWidth: 0 }}
                              >
                                {item.title}
                              </Typography>
                              <Typography variant="caption">
                                Stock: INT
                              </Typography>
                            </Box>

                             {/* //// ย่อย2 //// */}
                            <Box>
                              <Typography
                                disableRipple
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log("innerBtnActivated");
                                } }
                              >
                                Morbi arcu ligula, sodales nec odio sit amet, accumsan dolor.
                              </Typography>
                            </Box>

                            {/* //// ย่อย3 //// */}
                            <Box sx={{alignSelf: "end"}}>฿ 999</Box>
                          </Box>
                        </Typography>
                      </Box>

                    </ListItemButton>
                  </ListItem>
                </div>
              ) : (
                ///////////////////////////// ยังไม่เลือกสินค้า ///////////////////////////////////////////////////
                <div className="borderLine">
                  <ListItem className="listItemStyle">
                    <ListItemButton
                      disableGutters={true}
                      sx={{ transform: "skew(10deg)" }}
                      onClick={(e) => {
                        handleChange(item.category);
                      } }
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{ borderRadius: "0", transform: "skew(-2deg)" }}
                        >
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`${item.category}`} secondary="" />
                    </ListItemButton>
                  </ListItem>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </>
  );
};

export default CustomizationProto01;
