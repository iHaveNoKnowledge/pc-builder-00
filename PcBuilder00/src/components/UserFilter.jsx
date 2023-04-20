import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import "./UserFilter.css";
import { useDispatch, useSelector } from "react-redux";
import { changeTextSearch } from "../slices/userFilterSlice";

const UserFilter = () => {
  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.category.category);
  const searchTyped = useSelector((state) => state.userFilter.textSearch);
  const filterOption = useSelector((state) => state.userFilter.categorizedData);
  console.log("filterOptionคือไร:", filterOption);

  const initData = ["AM4", "1700", "AM5"];
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [isSelected, setIsSeleced] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(changeTextSearch(query));
  }, [query]);

  return (
    <Box className="mainCardFilter">
      <Box>
        <form onSubmit={handleSearch} style={{ display: "flex" }}>
          <TextField
            fullWidth
            placeholder="ค้นหาสินค้า"
            type="search"
            id="input-with-icon-textfield"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              console.log(event.target.value);
            }}
            label={`Product ${currentCategory}`}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ bgcolor: "#F0F0F0", py: "4.07px" }} />
                </InputAdornment>
              ),
            }}
            variant="standard"
            onBlur={(e) => setIsSeleced(false)}
            onFocus={(e) => setIsSeleced(true)}
          />
          <Box style={{ display: "flex", alignItems: "end" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                height: "27.5px",
                borderRadius: "0px",
                backgroundColor: "#42528A",
              }}
            >
              ค้นหา
            </Button>
          </Box>
        </form>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {filterOption.map((item, index) => {
          return (
            <Box key={index} sx={{ flexGrow: 1, mx: "10px", mt: "10px", flexBasis: 0 }}>
              <Autocomplete
                // sx={{ width: "71%" }} ปรับ เท่านี้มากสุดละ ไม่งั้น drop down มันจะเบี้ยว
                disablePortal={true}
                id="size-small-filled"
                size="small"
                options={item}
                getOptionLabel={(option) => option}
                // defaultValue={top100Films[0]}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      size="small"
                      {...getTagProps({ index })}
                    />
                  ))
                }
                //ส่วนinput
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="FilterName"
                    placeholder="Favorites"
                  />
                )}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default UserFilter;
