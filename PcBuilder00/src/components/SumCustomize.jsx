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
import { resetCustomized, updateSumAmount } from "../slices/cutomizeSliceNoApi";
import "./SumCustomize.css";

const SumCustomize = () => {
  const sumAmount = useSelector((state) => state.noApiCustomize.summations.sumAmount);
  const sum_SRP = useSelector((state) => state.noApiCustomize.summations.sum_SRP);
  const sumDiscount = useSelector((state) => state.noApiCustomize.summations.sumDiscount);

  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetCustomized());
    dispatch(updateSumAmount());
  };

  return (
    <>
      <Box>
        <Box className="mainCard">
          <Box sx={{ display: "flex" }}>
            <Box variant="subtitle1" sx={{ flexGrow: 1, fontWeight: "bolder" }}>
              สินค้ารวม : {sumAmount}
            </Box>
            {/* <Box>ประเภทสินค้า : {category}</Box> */}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ flexGrow: 1, flexBasis: 0 }}>
              ส่วนลด : <br />฿{Math.round(sumDiscount)}
            </Box>
            &nbsp;
            <Box sx={{ flexGrow: 1, flexBasis: 0 }}>
              ราคารวม : <br />฿{sum_SRP}
            </Box>
            &nbsp;
            <Box sx={{ flexGrow: 1, flexBasis: 0 }}>
              ราคาสุทธิ : <br />฿{sum_SRP - Math.round(sumDiscount)}
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box>
          <Button onClick={(e) => handleReset()}>Reset</Button>
        </Box>
      </Box>
    </>
  );
};

export default SumCustomize;
