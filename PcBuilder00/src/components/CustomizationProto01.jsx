import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ImageIcon from "@mui/icons-material/Image";
import {Box, List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Avatar, CardMedia} from "@mui/material";
import { changeCategory } from "../slices/categorySlice";
import { removeProduct } from "../slices/cutomizeSliceNoApi";

const CustomizationProto01 = () => {
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
   dispatch(removeProduct);
 };

  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {categories.map((item, index) => {
          return (
            <React.Fragment key={index}>
              {item.id ? (
          
                // เลือกสินค้าแล้ว  
                // <div >    
                  // <ListItem
                  // sx={{
                  //   ":not(:last-child)": {
                  //     borderBottom: "0.2em solid rgba(0,0,0,0.20)"
                  //   },
                  //   marginLeft: "0.5em",
                  //   // backgroundColor:"#FFFF"
                  // }}
                  // >
                  //   <ListItemButton
                  //     // sx={{borderLeft: "1em solid #42528A"}}
                  //     onClick={(e) => {
                  //       handleChange(item.category);
                  //     }}
                  //   >
                  //     <ListItemAvatar>
                  //       {/* <Avatar sx={{ borderRadius: "0" }}> */}
                  //       {/* <ImageIcon /> */}
                  //       <Box
                  //         component="img"
                  //         src={item.img}
                  //         alt={item.title}
                  //         sx={{ objectFit: "contain", width: 50 }}
                  //       ></Box>
                  //       {/* </Avatar> */}
                  //     </ListItemAvatar>
                  //     <ListItemText primary={item.title} secondary="" />
                  //   </ListItemButton>
                  // </ListItem>
                  <ListItem sx={{border:"1px dashed green"}}>vv</ListItem>
                // </div> 
                
              ) : (

                // ยังไม่เลือกสินค้า
                <ListItem
                  sx={{
                    ":not(:last-child)": {
                      borderBottom: "0.2em solid rgba(0,0,0,0.20)"
                    },
                  }}
                >
                  <ListItemButton
                    onClick={(e) => {
                      handleChange(item.category);
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ borderRadius: "0" }}>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={`${item.category}`} secondary="" />
                  </ListItemButton>
                </ListItem>
              )}
            </React.Fragment>
          );
        })}
      </List>
    </>
  );
};

export default CustomizationProto01;
