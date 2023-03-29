import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import ImageIcon from "@mui/icons-material/Image";
import {Box, List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Avatar, CardMedia, Button} from "@mui/material";
import { changeCategory } from "../slices/categorySlice";
import { removeProduct } from "../slices/cutomizeSliceNoApi";
import './CustomizationProto01.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { margin, padding } from "@mui/system";





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
   dispatch(removeProduct);
 };

  return (
    <>
      
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {categories.map((item, index) => {
          return (
            <React.Fragment key={index}>

              {item.id ? (
          
                //เลือกสินค้าแล้ว  
                <div className="borderLine">
                  <ListItem
                    sx={{
                      borderLeft: "0.8em solid #42528A",
                      margin: "0px"
                    }}
                  >
                    <ListItemButton
                      disableRipple
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChange(item.category);
                      }}
                    >
                      <ListItemAvatar>
                        <Box
                          component="img"
                          src={item.img}
                          alt={item.title}
                          sx={{ objectFit: "contain", width: 50 }}
                        ></Box>
                      </ListItemAvatar>
                      <ListItemText primary={item.title} secondary="" />
                      <Button
                        disableRipple
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("innerBtnActivated");
                        }}
                      >
                        test
                      </Button>
                    </ListItemButton>
                  </ListItem>
                </div> 
                
              ) : (

                // ยังไม่เลือกสินค้า
                <div className="borderLine">    
                  <ListItem
                    sx={{
                      ":not(:last-child)": {},
                      borderLeft: "0.8em solid #42528A",
                      margin:"0px"
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
