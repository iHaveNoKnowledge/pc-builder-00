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
  Divider,
} from "@mui/material";
import { resetCustomized } from "../slices/cutomizeSliceNoApi";
import "./SumCustomize.css";


const SumCustomize =()=>{
  const sumAmount = useSelector((state) => state.noApiCustomize.sumAmount);
  const category = useSelector((state) => state.category.category);

  const dispatch = useDispatch();

  const handleReset = ()=>{
    dispatch(resetCustomized())
  }

  return (
    <>
      <Box >
        <Box className="mainCard">
          <Box sx={{display:"flex"}}>
            <Box variant="subtitle1" sx={{flexGrow:1, fontWeight:"bolder"}}>สินค้ารวม : {sumAmount} </Box>
            {/* <Box>ประเภทสินค้า : {category}</Box> */}
          </Box>
          <Box sx={{display:"flex"}}>
            <Box sx={{flexGrow:1}}>Discount : <br/>฿999  </Box>&nbsp;
            <Box sx={{flexGrow:1}}>ราคารวม : <br/>฿999 </Box>&nbsp;
            <Box sx={{flexGrow:1}}>net: <br/>฿999 </Box>
          </Box>
          
        </Box>
        <Divider/>
          <Box>
            <Button onClick={(e)=>handleReset()}>Reset</Button>
          </Box>
      </Box>
      
    </>
  )
}

export default SumCustomize;