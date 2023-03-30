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
  Divider
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
      <List sx={{ width: "97%" ,paddingLeft:"8px"}}>
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
                        padding: "0px",

                      }}
                    >
                      
                      <Box sx={{display:"flex", width:"100%", flexGrow:1}}>
                        
                          <Box sx={{ flexGrow: 1 }}>
                            <div>{item.selectAmount}{item.max !== null && (
                                  <>
                                    /{item.max}
                                  </>
                            )}</div>
                          </Box>

                          <Box
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(handleClear(item.category));
                            }}
                            sx={{
                              padding: "0.1px 15px",
                              backgroundColor: "red",
                              color: "white",
                              // textAlign:"justify",
                              paddingBottom:"2px",
                              
                            }}
                          >
                            x
                          </Box>
                      </Box>


                      <Box sx={{ display: "flex", width:"100%"}}>
{/* ////////////////////////ก้อนซ้าย/////////////////////////////// */}
                        <Box sx={{flexGrow:"1"}}>

                            <Box>
                              <ListItemAvatar sx={{ transform: "skew(-1deg)" }}>
                                <Box
                                  component="img"
                                  src={item.img}
                                  alt={item.title}
                                  sx={{ objectFit: "contain", width: 56 }}
                                ></Box>
                              </ListItemAvatar>
                            </Box>
                            
                            <Box sx={{display:"flex", justifyContent:"space-between"}}>
                              <Box className="textButton"  onClick={(e)=>{alert("ลดลง")}}>-</Box>
                              <Box style={{marginTop:"5px"}}>{item.count? item.count: item.selectAmount}</Box>
                              <Box className="textButton"  onClick={(e)=>{alert("เพิ่มขึ้น")}}>+</Box>
                            </Box>
                            
                            <div>ss</div>
                          
                        </Box>

{/* ////////////////////////ก้อนขวา/////////////////////////////// */}
                        {/* //// ย่อย1 //// */}
                        <Box sx={{flexGrow:"4"}}>
                          <Box
                            sx={{ display: "flex"}}
                          >

                            <Box
                              variant="subtitle1"
                              sx={{flexGrow:"1",  fontWeight:"bolder"}}
                            >
                              {item.title}
                            </Box>

                            <Box variant="caption">
                              Stock: INT
                            </Box>
                          </Box>  
                            
                          <Divider />
                          {/* //// ย่อย2 //// */}
                          <Box>
                            <Typography
                              disableRipple
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log("innerBtnActivated");
                              } }
                            >
                              Morbi arcu Lorem
                            </Typography>
                          </Box>
                            
                          {/* //// ย่อย3 //// */}
                          <Typography variant="subtitle1" sx={{ marginLeft:"70%"}}>฿ 999</Typography>
                            
                          </Box>
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
