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
import {
  removeProduct,
  incAmount,
  decAmount,
  updateSumAMount,
} from "../slices/cutomizeSliceNoApi";


const SumCustomize =()=>{
  const sumAmount = useSelector((state) => state.noApiCustomize.sumAmount);
  const category = useSelector((state) => state.category.category);

  return (
    <>
      <Box sx={{paddingBottom:"0.4em"}}>
        <Box>
          <Box>
            <Box>สินค้ารวม : {sumAmount}, {category}</Box>
          </Box>
          <Box sx={{display:"flex"}}>
            <Box sx={{flexGrow:1}}>Discount : <br/>฿999 </Box>&nbsp;
            <Box sx={{flexGrow:1}}>ราคารวม : <br/>฿999 </Box>&nbsp;
            <Box sx={{flexGrow:1}}>net: <br/>฿999 </Box>
          </Box>
          
        </Box>
        <Divider/>
      </Box>
      
    </>
  )
}

export default SumCustomize;