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
import { changeTextSearch, updateFilters, setSelectedValuesCopy } from "../slices/userFilterSlice";
import { Typography } from "@mui/material";

const UserFilter = () => {
  ////Static Variable

  ////useDispatch
  const dispatch = useDispatch();
  ////useSelector
  const currentCategory = useSelector((state) => state.category.category);
  const searchTyped = useSelector((state) => state.userFilter.textSearch);
  const filterOptions = useSelector((state) => state.userFilter.filterOptions);
  const filters = useSelector((state) => state.userFilter.filtersSet);
  const selectedValuesCopy = useSelector((state) => state.userFilter.selectedValueCopy);

  console.log("พังเหรอวะ", filters[0].selectedOption);
  const currentFilters = filters.find((filterItem) => {
    return filterItem.name === currentCategory.toLowerCase();
  });

  /////////อันนี้ต้องย้ายไปใช้ที่ selection ///////////////////// เพราะ filter ปกติเป็น object ไม่ใช่ array โค้ก filter เลยไม่ติด

  // let OrderFilterName = [];
  // for (let properties in filters[currentCategory]) {
  //   OrderFilterName.push(properties);
  // }
  // console.log("แปลงหัวข้อfilter เป็น array", OrderFilterName);

  ////usestate
  const [query, setQuery] = useState("");
  // const [selectedFilter, setSelectedFilter] = useState(currentFilters.filters);
  console.log("เรามี filter ชุดไหนcurrentFilters ", currentFilters.filters);
  const [isSelected, setIsSeleced] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});

  ////สำหรับใช้ action updateStateFilters
  useEffect(() => {
    dispatch(updateFilters({ selectedValuesCopy, currentCategory }));
  }, [selectedValuesCopy]);

  ////handleFunctions
  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleChange = (event, filterName, selectedFilter, currentCategory) => {
    // setSelectedFilter((prev) => {
    //   return { ...prev, [filterName]: event.target.textContent };
    // });
    // console.log("อันใหม่หน้าตาเป็นงี้: ", JSON.stringify(selectedFilter));
    // // filterName = filterName.charAt(0).toLowerCase() + filterName.slice(1);
  };

  const handleChange2 = (filterName, newValue) => {
    // setSelectedValues((prevValues) => ({
    //   ...prevValues,
    //   [filterName]: newValue,
    // }));
    dispatch(setSelectedValuesCopy({ filterName, newValue, currentCategory }));
  };

  const handleChangeOption = (e, currentCategory, keyName) => {
    const value = e.target.value;
    dispatch(setSelectedValuesCopy({ value, currentCategory, keyName }));
  };

  ////useEffect ใช้สำหรับเลือก ชุดของ filter ว่าจะเอา filter ชุดไหนโดยอิงตามตัวแปร currentCategory(ประเภทสินค้าที่เลือก)
  useEffect(() => {
    setSelectedValues({});
    dispatch(setSelectedValuesCopy());
    ///เปลี่ยนsetFilter ให้เป็นไปตาม category
    // setSelectedFilter((prev) => {
    //   for (let x in prev) {f
    //     prev[x];
    //   }
    // });
    console.log("filters[currentCategory]", filters[currentCategory]);
    // setSelectedFilter(filters[currentCategory]);
    console.log("selectedValuesที่เลือกมาเป็นไง", selectedValuesCopy);
  }, [currentCategory]);

  ////useEffect !!!สำหรับ search filter
  useEffect(() => {
    dispatch(changeTextSearch(query));
  }, [query]);

  console.log("filterOptionsหน้าตาเปนไง:", filterOptions);
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
      <Box>{JSON.stringify(filters[0].selectedOptionState.brand)}</Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginY: "10px",
          flexWrap: "wrap",
        }}
      >
        {filterOptions ? (
          <>
            {filters.map((item, index) => {
              if (item.name === currentCategory.toLowerCase()) {
                return (
                  <>
                    {item.filters.map((item2, index2) => {
                      return (
                        <>
                          <Box className="dropDown">
                            <Box style={{ textAlign: "center" }}>
                              <Typography variant="h6" fontWeight={{ sm: "600" }}>
                                {item2.name.charAt(0).toUpperCase() + item2.name.slice(1)}
                              </Typography>
                            </Box>
                            <select
                              onChange={(e) => {
                                const keyName = item2.name;

                                handleChangeOption(e, currentCategory, keyName);
                              }}
                            >
                              <option value="">Please Select</option>
                              {item2.choice.map((option, indexOption) => {
                                return (
                                  <>
                                    <option value={option}>{option}</option>
                                  </>
                                );
                              })}
                            </select>
                          </Box>
                        </>
                      );
                    })}
                  </>
                );
              }
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
