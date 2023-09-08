import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import { changeCategory } from "../slices/categorySlice";
import {
  removeProduct,
  incAmount,
  decAmount,
  updateSummations,
  setMax,
} from "../slices/customizeSliceNoApi";
import { clearSelectedFilter } from "../slices/userFilterSlice";
import "./CustomizationProto01.css";
import SumCustomize from "./SumCustomize";
import { setDefault } from "../slices/paginationSlice";

const CustomizationProto02 = () => {
  //useSelector
  const parts = useSelector((state) => state.customize.partData);
  const currentCategory = useSelector((state) => state.category.category);

  //สร้าง functiondispatch
  const dispatch = useDispatch();

  //function
  const handleChange = (category) => {
    dispatch(changeCategory(category.toLowerCase().replace(" ", "")));
    dispatch(setDefault());
    if (currentCategory !== category.toLowerCase().replace(" ", ""))
      dispatch(clearSelectedFilter());
  };

  const handleIncAmt = (category, miniIndex) => {
    dispatch(incAmount({ category, miniIndex }));

    dispatch(updateSummations());
  };

  const handleDecAmt = (category, miniIndex) => {
    dispatch(decAmount({ category, miniIndex }));

    dispatch(updateSummations());
  };

  const handleClear = (category, id, miniIndex) => {
    dispatch(removeProduct({ category, id, miniIndex }));
    dispatch(setMax());
    dispatch(updateSummations());
  };

  return (
    <>
      <List sx={{ width: "97%", paddingLeft: "8px", paddingTop: "0px" }}>
        {/* <SumCustomize /> */}
        {/* <div>ปัจจุบันเลือกไร: {currentCategory}</div> */}
        <Box>
          {parts.map((item, index) => {
            return (
              <React.Fragment key={index}>
                {item.listItems[0] ? (
                  //* เลือกสินค้าแล้ว///////////////////////////////////////////////////////////
                  <div className="borderLine">
                    {/* <div>{item.category}</div> โชว์ประเภทเหนือและนอก card ที่แสดง รายการสินค้าที่เลือก*/}
                    <div className="listItemStyle">
                      {item.listItems.map((miniItem, miniIndex) => {
                        return (
                          <div key={miniIndex}>
                            <ListItem>
                              <ListItemButton
                                disableGutters={true}
                                disableRipple={true}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleChange(miniItem.category);
                                }}
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  padding: "0px",
                                }}
                              >
                                <Box sx={{ display: "Flex", width: "100%" }}>
                                  <Box sx={{ flexGrow: 1 }}>{item.categoryDisplay}</Box>

                                  <Box sx={{ flexGrow: 0.05 }}>
                                    <div>
                                      {/* {miniItem.selectAmount * miniItem.count} */}
                                      {item.typeMax ? item.typeAmount : <></>}
                                      {item.typeMax && <>/{item.typeMax}</>}
                                    </div>
                                  </Box>

                                  <Box
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleClear(
                                        miniItem.category,

                                        miniItem.id,
                                        miniIndex
                                      );
                                    }}
                                    sx={{
                                      backgroundColor: "rgb(220,47,47)",

                                      // textAlign:"justify",
                                    }}
                                  >
                                    <IconButton size="small" sx={{ color: "#FFF" }}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </Box>
                                </Box>

                                <Box
                                  sx={{
                                    display: "flex",
                                    width: "100%",
                                    gap: "4px",
                                  }}
                                >
                                  {/* //ก้อนซ้าย/////////////////////////////// */}
                                  <Box sx={{ flexGrow: "1", width: "55px" }}>
                                    <Box>
                                      <ListItemAvatar
                                        sx={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                        }}
                                      >
                                        {miniItem.img ? (
                                          <Box
                                            component="img"
                                            src={miniItem.img}
                                            alt={miniItem.title}
                                            sx={{ objectFit: "contain", width: 40, height: 40 }}
                                          />
                                        ) : (
                                          <Box
                                            component="img"
                                            src={`/images/${miniItem.compatible
                                              .toLowerCase()
                                              .split(" ", 1)}.jpg`}
                                            alt={miniItem.title}
                                            sx={{ objectFit: "contain", width: 40, height: 40 }}
                                          />
                                        )}
                                      </ListItemAvatar>
                                    </Box>

                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        bgcolor: "#c7c7c7",
                                        my: "2px",
                                        boxShadow: "0px 1px 0px 1px #c7c7c7",
                                        textAlign: "center",
                                      }}
                                    >
                                      <Box
                                        className="textButton"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDecAmt(miniItem.category, miniIndex);
                                        }}
                                      >
                                        -
                                      </Box>
                                      {/* จำนวนสินค้า */}
                                      <Box style={{ marginTop: "2px" }}>
                                        {miniItem.selectAmount}
                                      </Box>

                                      <Box
                                        className="textButton"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleIncAmt(miniItem.category, miniIndex);
                                        }}
                                      >
                                        +
                                      </Box>
                                    </Box>
                                  </Box>

                                  {/* /ก้อนขวา----------------------------------------------- */}
                                  {/* /// ย่อย1 ------------------ */}
                                  <Box sx={{ flexGrow: "7", width: "40px" }}>
                                    <Box sx={{ display: "flex" }}>
                                      <Box
                                        variant="subtitle1"
                                        sx={{
                                          flexGrow: "1",
                                          fontWeight: "bolder",
                                        }}
                                      >
                                        {miniItem.code}
                                        {/* {item.title} */}
                                      </Box>

                                      <Typography variant="caption">Stock: INT</Typography>
                                    </Box>

                                    <Divider />
                                    {/* // ย่อย2 ------------------ //// */}
                                    <Box>
                                      <Typography disableripple={true} onClick={(e) => {}}>
                                        {miniItem.productDescription}
                                      </Typography>
                                    </Box>

                                    {/* // ย่อย3 -----------------//// */}
                                    <Typography variant="subtitle1" sx={{ marginLeft: "70%" }}>
                                      ฿{" "}
                                      {(
                                        miniItem.promotionPrice * miniItem.selectAmount
                                      ).toLocaleString()}
                                    </Typography>
                                  </Box>
                                </Box>
                                <Box sx={{ height: "10px" }}></Box>
                              </ListItemButton>
                            </ListItem>
                            {/* {miniItem.listItems.length > 1 && <Divider />} */}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  //* ยังไม่เลือกสินค้า ///////////////////////////////////////////////////
                  <div className="borderLine">
                    <div className="listItemStyle">
                      <ListItem>
                        <ListItemButton
                          disableGutters={true}
                          onClick={(e) => {
                            handleChange(item.category);
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ borderRadius: "0" }}>
                              <ImageIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={`${item.categoryDisplay}`} secondary="" />
                        </ListItemButton>
                        <Box>
                          <div>
                            {item.selectAmount * item.count ? item.selectAmount * item.count : 0}
                            {item.typeMax && <>/{item.typeMax}</>}
                          </div>
                        </Box>
                      </ListItem>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </Box>
      </List>
    </>
  );
};

export default CustomizationProto02;
