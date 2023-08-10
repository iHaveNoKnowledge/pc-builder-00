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
import { resetCustomized, updateSummations } from "../slices/cutomizeSliceNoApi";
import "./SumCustomize.css";

const SumCustomize = () => {
  const sumAmount = useSelector((state) => state.customize.summations.sumAmount);
  const sum_SRP = useSelector((state) => state.customize.summations.sum_SRP);
  const sumDiscount = useSelector((state) => state.customize.summations.sumDiscount);

  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetCustomized());
    dispatch(updateSummations());
  };

  const boxStyle = {
    flexGrow: 1,
    flexBasis: 0,
    fontWeight: "bolder",
    color: "#303030",
  };
  const typoFontSize = "h5";

  return (
    <>
      <Box>
        <Box className="mainCard" sx={{}}>
          <Box sx={{ display: "flex", color: "#303030" }}>
            <Typography variant={typoFontSize} sx={{ flexGrow: 1, fontWeight: "bolder" }}>
              สินค้ารวม : {sumAmount}
            </Typography>
            {/* <Box>ประเภทสินค้า : {category}</Box> */}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              variant={typoFontSize}
              sx={{ ...boxStyle, background: "rgba(82, 82, 82,0.5) " }}
            >
              ราคารวม : <br />฿{sum_SRP.toLocaleString()}
            </Typography>
            <Typography
              variant={typoFontSize}
              sx={{ ...boxStyle, background: "rgba(82, 82, 82,0.5) " }}
            >
              ส่วนลด : <br />฿{Math.round(sumDiscount).toLocaleString()}
            </Typography>

            <Typography
              variant={typoFontSize}
              sx={{ ...boxStyle, background: "rgba(0, 245, 25,0.5) " }}
            >
              ราคาสุทธิ : <br />฿{(sum_SRP - Math.round(sumDiscount)).toLocaleString()}
            </Typography>
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
