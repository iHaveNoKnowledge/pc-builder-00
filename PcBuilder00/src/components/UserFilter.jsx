import React, { useState, useEffect, useRef } from "react";
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
import { clearSelectedFilter } from "../slices/userFilterSlice";

const UserFilter = () => {
  ////Static Variable

  ////useDispatch
  const dispatch = useDispatch();
  ////useSelector
  const currentCategory = useSelector((state) => state.category.category);
  const searchTyped = useSelector((state) => state.userFilter.textSearch);
  const filterOptions = useSelector((state) => state.userFilter.filterOptions);
  const filtersSet = useSelector((state) => state.userFilter.filtersSet);

  const currentFilters = filtersSet.find((filterItem) => {
    return filterItem.name === currentCategory.toLowerCase();
  });
  //isOptAvailable?
  const isFiltContained = Object.keys(currentFilters.selectedOptionState);

  ////usestate
  const [query, setQuery] = useState("");
  // const [selectedFilter, setSelectedFilter] = useState(currentFilters.filters);
  const [currentOpt, setCuerrentOpt] = useState([]);
  ////useRef
  const selectRef = useRef(null);
  // const handleResetSelect = () => {
  //   console.log("selectRef:", selectRef.current);
  //   selectRef.current.value = "x";
  // };

  ////handleFunctions
  const handleSearch = (e) => {
    console.log("ค้นห่าสินค้า", e.target);
    event.preventDefault();
  };

  const handleChangeOption = (e, currentCategory, keyName) => {
    const value = e.target.value;
    const test = value == Number(value);
    console.log("ตรวจType:", value, ":", typeof value, "ลบกันได้ไหม", test);
    dispatch(setSelectedValuesCopy({ value, currentCategory, keyName }));
  };

  ////useEffect !!!สำหรับ search filter
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
      {/* เอาไว้ดูค่าใน state สำหรับ dev
      <Box>{JSON.stringify(filtersSet[0].selectedOptionState)}</Box>
      <Box>{JSON.stringify(filtersSet[1].selectedOptionState)}</Box>
      <Box>{JSON.stringify(filtersSet[2].selectedOptionState)}</Box> */}
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
          {isFiltContained ? (
            <>
              {filtersSet.map((item, index) => {
                if (item.name === currentCategory.toLowerCase()) {
                  return (
                    <React.Fragment key={index}>
                      {item.filters.map((item2, index2) => {
                        const filterName = item2.name;
                        return (
                          <React.Fragment key={index2}>
                            <Grid className="dropDown" item xs={4}>
                              <Box style={{ textAlign: "center" }}>
                                <Typography variant="h6" fontWeight={{ sm: "600" }}>
                                  {/* {item2.name.charAt(0).toUpperCase() + item2.name.slice(1)} */}
                                  {item2.displayName}
                                </Typography>
                              </Box>
                              <select
                                value={item.selectedOptionState[filterName]}
                                style={{ width: "100%" }}
                                onChange={(e) => {
                                  const keyName = item2.name;
                                  handleChangeOption(e, currentCategory, keyName);
                                }}
                              >
                                <option value="">Please Select</option>
                                {item2.choices.map((option, indexOption) => {
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
                <Box sx={{ flexGrow: 1, height: "51.72px" }}></Box>
              </Box>
            </>
          )}
        </Grid>
      </Box>
      {isFiltContained.length > 0 ? (
        <>
          <Box className="resetBtn">
            <Box>
              <Button
                disableRipple={true}
                sx={{ p: 0, backgroundColor: "#42528A" }}
                onClick={() => dispatch(clearSelectedFilter())}
                variant="contained"
              >
                reset
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default UserFilter;
