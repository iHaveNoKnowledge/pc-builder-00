import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
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

  const currentFilters = filters.find((filterItem) => {
    return filterItem.name === currentCategory.toLowerCase();
  });

  ////usestate
  const [query, setQuery] = useState("");
  // const [selectedFilter, setSelectedFilter] = useState(currentFilters.filters);
  console.log("เรามี filter ชุดไหนcurrentFilters ", currentFilters.filters);
  const [isSelected, setIsSeleced] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});

  ////handleFunctions
  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleChangeOption = (e, currentCategory, keyName) => {
    const value = e.target.value;
    dispatch(setSelectedValuesCopy({ value, currentCategory, keyName }));
  };

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
      {/* <Box>{JSON.stringify(filters[0].selectedOptionState)}</Box>
      <Box>{JSON.stringify(filters[1].selectedOptionState)}</Box>
      <Box>{JSON.stringify(filters[2].selectedOptionState)}</Box> */}
      <Box>
        <Grid
          sx={{
            pt: "5px",
            mb: "5px",

            boxSizing: "border-box",
          }}
          container
          rowSpacing={0}
          columnSpacing={1}
        >
          {filterOptions ? (
            <>
              {filters.map((item, index) => {
                if (item.name === currentCategory.toLowerCase()) {
                  return (
                    <React.Fragment key={index}>
                      {item.filters.map((item2, index2) => {
                        return (
                          <React.Fragment key={index2}>
                            <Grid className="dropDown" item xs={4}>
                              <Box style={{ textAlign: "center" }}>
                                <Typography variant="h6" fontWeight={{ sm: "600" }}>
                                  {item2.name.charAt(0).toUpperCase() + item2.name.slice(1)}
                                </Typography>
                              </Box>
                              <select
                                style={{ width: "100%" }}
                                onChange={(e) => {
                                  const keyName = item2.name;
                                  handleChangeOption(e, currentCategory, keyName);
                                }}
                              >
                                <option value="">Please Select</option>
                                {item2.choice.map((option, indexOption) => {
                                  return (
                                    <option value={option} key={indexOption}>
                                      {option}
                                    </option>
                                  );
                                })}
                              </select>
                            </Grid>
                          </React.Fragment>
                        );
                      })}
                    </React.Fragment>
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
        </Grid>
      </Box>
      <Box className="resetBtn">
        <Box>reset</Box>
      </Box>
    </Box>
  );
};

export default UserFilter;
