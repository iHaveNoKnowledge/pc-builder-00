import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, Divider, Stack } from "@mui/material";
import { resetCustomized, updateSummations } from "../slices/cutomizeSliceNoApi";
import "./SumCustomize.css";

const StyledTypography = ({ children, bg, role, type }) => {
  const typographyStyle = {
    fontSize: "1.9rem",
    display: "flex",
    flexBasis: 0,
    fontWeight: "bolder",
    color: "#303030",
    padding: "7px 10px",
    background:
      bg === "green" ? "rgba(67, 255, 38, 0.5)" : role === "sumItem" ? "" : "rgba(82, 82, 82, 0.3)",
    flexGrow: type === "value" ? 0 : 1,
  };

  return <Typography sx={typographyStyle}>{children}</Typography>;
};

const SumCustomize = () => {
  const sumAmount = useSelector((state) => state.customize.summations.sumAmount);
  const sum_SRP = useSelector((state) => state.customize.summations.sum_SRP);
  const sumDiscount = useSelector((state) => state.customize.summations.sumDiscount);

  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetCustomized());
    dispatch(updateSummations());
  };

  return (
    <>
      <Box>
        <Box className="mainCard" sx={{}}>
          <Box sx={{ display: "flex", color: "#303030" }}>
            <StyledTypography role="sumItem">สินค้ารวม : {sumAmount}</StyledTypography>
          </Box>

          <Stack sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex" }}>
              <StyledTypography>ราคารวม :</StyledTypography>
              <StyledTypography type="value">฿{sum_SRP.toLocaleString()}</StyledTypography>
            </Box>

            <Box sx={{ display: "flex" }}>
              <StyledTypography> ส่วนลด : </StyledTypography>
              <StyledTypography type="value">
                ฿{Math.round(sumDiscount).toLocaleString()}
              </StyledTypography>
            </Box>

            <Box sx={{ display: "flex" }}>
              <StyledTypography bg="green" variant="h4">
                ราคาสุทธิ :
              </StyledTypography>
              <StyledTypography bg="green" type="value">
                ฿{(sum_SRP - Math.round(sumDiscount)).toLocaleString()}
              </StyledTypography>
            </Box>
          </Stack>
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
