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
  ////useSelector
  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.category.category);
  const searchTyped = useSelector((state) => state.userFilter.textSearch);
  const filterOptions = useSelector((state) => state.userFilter.categorizedData);
  console.log("filterOptionคือไร:", filterOptions);

  const filters = filterOptions.map((item) => item.value);
  ////usestate
  const initData = ["AM4", "1700", "AM5"];
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(filters);
  const [isSelected, setIsSeleced] = useState(false);

  // ////useEffect
  // useEffect(() => {
  //   setSelectedFilter(() => {});
  // }, []);
  console.log("ฟิลเตอร์เริ่มต้น", selectedFilter);

  ////handleFunctions
  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleChagnge = (event, filterName) => {
    setSelectedFilter();

    const array2 = { ...filterOptions.value, [filterName]: event.target.textContent };
    console.log("อันใหม่หน้าตาเป็นงี้: ", JSON.stringify(selectedFilter));
  };

  ////useEffect
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
            // onBlur={(e) => setIsSeleced(false)}
            // onFocus={(e) => setIsSeleced(true)}
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
        {filterOptions ? (
          <>
            {filterOptions.map((item, index) => {
              return (
                <Box key={index} sx={{ flexGrow: 1, mx: "10px", mt: "10px", flexBasis: 0 }}>
                  <Autocomplete
                    onChange={(e) => handleChagnge(e, item.filterName)}
                    // sx={{ width: "71%" }} ปรับ เท่านี้มากสุดละ ไม่งั้น drop down มันจะเบี้ยว
                    disablePortal={true}
                    id="size-small-filled"
                    size="small"
                    options={item.value}
                    getOptionLabel={(options) => options}
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
                    //ส่วนหัวข้อinput
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="filled"
                        label={`${item.filterName}`}
                        placeholder="Favorites"
                      />
                    )}
                  />
                </Box>
              );
            })}
          </>
        ) : (
          <>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flexGrow: 1, height: "54.18px" }}></Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default UserFilter;
