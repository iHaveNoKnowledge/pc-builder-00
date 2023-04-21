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
import { changeTextSearch, updateFilters } from "../slices/userFilterSlice";
import { isEqual } from "lodash";

const UserFilter = () => {
  ////useSelector
  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.category.category);
  const searchTyped = useSelector((state) => state.userFilter.textSearch);
  const filterOptions = useSelector((state) => state.userFilter.filterOptions);
  const filters = useSelector((state) => state.userFilter.filters);

  ////useEffect
  useEffect(() => {
    ///เปลี่ยนsetFilter ให้เป็นไปตาม category
    setSelectedFilter((prev) => {
      for (let x in prev) {
        prev[x];
      }
    });
    setSelectedFilter(filters[currentCategory]);
  }, [currentCategory]);

  console.log("จำนวนfilter จาก category", currentCategory, filters[currentCategory]);

  /////////อันนี้ต้องย้ายไปใช้ที่ selection ///////////////////// เพราะ filter ปกติเป็น object ไม่ใช่ array โค้ก filter เลยไม่ติด
  let times = [];
  for (let properties in filters[currentCategory]) {
    times.push(properties);
  }
  console.log("แปลงหัวข้อfilter เป็น array", times);

  const currentFilter = filters[currentCategory];

  ////usestate
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(currentFilter);
  const [isSelected, setIsSeleced] = useState(false);

  console.log("stateของfilterปัจจุบัน", selectedFilter);

  ////handleFunctions
  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleChange = (event, filterName, selectedFilter, currentCategory) => {
    console.log("อันใหม่หน้าตาเป็นงี้: ", JSON.stringify(selectedFilter));
    dispatch(updateFilters({ selectedFilter, currentCategory }));

    filterName = filterName.charAt(0).toLowerCase() + filterName.slice(1);
    setSelectedFilter((prev) => {
      return { ...prev, [filterName]: event.target.textContent };
    });
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
                <Box key={index} sx={{ flexGrow: 1, mx: "2px", mt: "10px", flexBasis: 0 }}>
                  <Autocomplete
                    onChange={(e) =>
                      handleChange(e, item.filterName, selectedFilter, currentCategory)
                    }
                    // sx={{ width: "71%" }} ปรับ เท่านี้มากสุดละ ไม่งั้น drop down มันจะเบี้ยว
                    disablePortal={true}
                    id="size-small-filled"
                    size="small"
                    options={item.value}
                    value={selectedFilter[times[index]]}
                    getOptionLabel={(options) => `${options}`}
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
                      <TextField {...params} variant="filled" label={`${item.filterName}`} />
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
