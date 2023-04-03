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
import { removeProduct, incAmount, decAmount, updateSumAmount } from "../slices/cutomizeSliceNoApi";
import "./CustomizationProto01.css";
import SumCustomize from "./SumCustomize";

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

  const handleIncAmt = (category) => {
    dispatch(incAmount(category));
    console.log("เพิ่ม");
    dispatch(updateSumAmount());
  };

  const handleDecAmt = (category) => {
    dispatch(decAmount(category));
    dispatch(updateSumAmount());
  };

  const handleClear = (category, slot) => {
    console.log("clear data");
    dispatch(removeProduct(category));
    if (category === "Mainboard") {
      dispatch(setMax(slot));
    }
    dispatch(updateSumAmount());
  };

  return (
    <>
      <List sx={{ width: "97%" ,paddingLeft:"8px"}}>
        <SumCustomize />
        
        {categories.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item.id ? (
                /////////////////////เลือกสินค้าแล้ว///////////////////////////////////////////////////////////
                <div className="borderLine">
                  <ListItem className="listItemStyle">
                    <ListItemButton
                      disableGutters={true}
                      disableRipple={true}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChange(item.category);
                      } }
                      sx={{
                        
                        display: "flex",
                        flexDirection: "column",
                        padding: "0px",

                      }}
                    >
                      
                      <Box sx={{display:"Flex", width:"100%"}}>

                          <Box sx={{flexGrow:1}}></Box>
                        
                          <Box sx={{ flexGrow:0.05}}>
                            <div>{(item.selectAmount*item.count)}{item.max !== null && (
                                  <>
                                    /{item.max}
                                  </>
                            )}</div>
                          </Box>

                          
                          <Box
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClear(item.category, item.slot);
                            }}
                            sx={{
                              padding: "0.1px 15px",
                              backgroundColor: 'rgb(220,47,47)',
                              color: "white",
                              // textAlign:"justify",
                              paddingBottom:"2px",
                              
                            }}
                          >
                            x
                          </Box>
                          
                      </Box>


                      <Box sx={{ display: "flex", width:"100%", gap:"4px"}}>
{/* ////////////////////////ก้อนซ้าย/////////////////////////////// */}
                        <Box sx={{flexGrow:"1"}}>

                            <Box >
                              <ListItemAvatar sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                <Box
                                  component="img"
                                  src={item.img}
                                  alt={item.title}
                                  sx={{ objectFit: "contain", width: 40 }}
                                ></Box>
                              </ListItemAvatar>
                            </Box>
                            
                            <Box  sx={{display:"flex", justifyContent:"space-between", bgcolor:"#c7c7c7", my:"2px", boxShadow:"1px 1px 1px 1px rgba(92, 92, 92, 1)", textAlign:"center"}}>
                              <Box className="textButton"  onClick={(e)=>{
                                e.stopPropagation();
                                handleDecAmt(item.category);
                              }}>
                                -
                              </Box>
                              {/* จำนวนสินค้า */}
                              <Box style={{marginTop:"5px"}}>{item.selectAmount}</Box>

                              <Box className="textButton"  onClick={(e)=>{
                                e.stopPropagation();
                                handleIncAmt(item.category)
                                }}>
                                  +
                                </Box>
                            </Box>
                            
                            <div>ss</div>
                          
                        </Box>

{/* ////////////////////////ก้อนขวา/////////////////////////////// */}
                        {/* //// ย่อย1 //// */}
                        <Box sx={{flexGrow:"5"}}>
                          <Box
                            sx={{ display: "flex"}}
                          >

                            <Box
                              variant="subtitle1"
                              sx={{flexGrow:"1",  fontWeight:"bolder"}}
                            >
                              SKU-000000
                              {/* {item.title} */}
                            </Box>

                            <Typography variant="caption">
                              Stock: INT
                            </Typography>
                          </Box>  
                            
                          <Divider />
                          {/* //// ย่อย2 //// */}
                          <Box>
                            <Typography
                              disableripple={true}
                              onClick={(e) => {
                                console.log("innerBtnActivated");
                              } }
                            >
                              Morbi arcu Lorem
                            </Typography>
                          </Box>
                            
                          {/* //// ย่อย3 //// */}
                          <Typography variant="subtitle1" sx={{ marginLeft:"70%"}}>฿ {Math.round((item.price*(1-item.discount))*item.selectAmount).toLocaleString()}</Typography>
                            
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
                      onClick={(e) => {
                        handleChange(item.category);
                      } }
                    >
                    
                      <ListItemAvatar>
                        <Avatar
                          sx={{ borderRadius: "0"}}
                        >
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={`${item.category}`} secondary="" />
                    </ListItemButton>
                    <Box><div>{(item.selectAmount*item.count)?(item.selectAmount*item.count):0}{item.max !== null && (
                                  <>
                                    /{item.max}
                                  </>
                            )}</div></Box>
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
