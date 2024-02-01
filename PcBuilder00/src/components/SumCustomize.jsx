import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, Divider, Stack } from "@mui/material";
import { resetCustomized, updateSummations } from "../slices/customizeSliceNoApi";
import "./SumCustomize.css";

const StyledTypography = ({ children, isLigthen = false, isMain = false, type }) => {
  const typographyStyle = {
    fontSize: "1.8rem",
    display: "flex",
    flexBasis: 0,
    fontWeight: "bolder",
    color: "#303030",
    padding: "6px 10px",
    background: isLigthen === true ? "rgba(67, 255, 38, 0.5)" : isMain === true ? "" : "rgba(82, 82, 82, 0.3)",
    flexGrow: type === "value" ? 0 : 1,
  };

  return <Typography sx={typographyStyle}>{children}</Typography>;
};

const SumCustomize = () => {
  const sumAmount = useSelector((state) => state.customized.summations.sumAmount);
  const sum_SRP = useSelector((state) => state.customized.summations.sum_SRP);
  const sumDiscount = useSelector((state) => state.customized.summations.sumDiscount);

  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetCustomized());
    dispatch(updateSummations());
  };

  // สลับ flexDirection: "row" หรือ "column" เพื่อให้ได้รูปแบบที่ต่างกัน
  const itemDirection = { flexDirection: "row" };

  const stackStyle = {
    sx: {
      display: "flex",
      flexDirection: itemDirection.flexDirection === "row" ? "column" : "row",
    },
  };

  return (
    <>
      <Box>
        <Box className="mainCard">
          <Box sx={{ display: "flex", color: "#303030" }}>
            <StyledTypography isMain={true}>สินค้ารวม : {sumAmount}</StyledTypography>
          </Box>

          <Stack {...stackStyle}>
            <Box sx={{ display: "flex", ...itemDirection }}>
              <StyledTypography>ราคารวม :</StyledTypography>
              <StyledTypography type="value">฿{sum_SRP.toLocaleString()}</StyledTypography>
            </Box>

            <Box sx={{ display: "flex", ...itemDirection }}>
              <StyledTypography> ส่วนลด : </StyledTypography>
              <StyledTypography type="value">฿{Math.round(sumDiscount).toLocaleString()}</StyledTypography>
            </Box>

            <Box sx={{ display: "flex", ...itemDirection }}>
              <StyledTypography isLigthen={true} variant="h4">
                ราคาสุทธิ :
              </StyledTypography>
              <StyledTypography isLigthen={true} type="value">
                ฿{(sum_SRP - Math.round(sumDiscount)).toLocaleString()}
              </StyledTypography>
            </Box>
          </Stack>
        </Box>
        <Divider />
        <Box>
          <Button variant="outlined" onClick={(e) => handleReset()}>
            Clear
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default SumCustomize;
