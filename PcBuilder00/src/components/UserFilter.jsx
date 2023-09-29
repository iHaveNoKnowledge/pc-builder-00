import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import "./UserFilter.css";
import { useDispatch, useSelector } from "react-redux";
import { changeTextSearch, setSelectedValuesCopy } from "../slices/userFilterSlice";
import { Typography, Autocomplete, Tooltip } from "@mui/material";
import { clearSelectedFilter, branchSelect } from "../slices/userFilterSlice";
import { setDefault } from "../slices/paginationSlice";
import { zIndexCollections } from "./zindexs";
import { CustomPopper } from "../components/CustomMUI/CustomPoper";

// const CustomPopper = (props)=>{
//   const {} = props
//   return(
//     <Popper>

//     </Popper>
//   )
// }

const UserFilter = () => {
  //* Style
  const autoCompleteInput = {
    ".MuiAutocomplete-input": {
      minWidth: "0px !important",
    },
    ".MuiFormLabel-root": {
      zIndex: `${zIndexCollections.branchFilter + 1} !important`,
    },
    "MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase-sizeSmall MuiInputBase-adornedEnd MuiAutocomplete-inputRoot css-1e2h1oc-MuiInputBase-root-MuiInput-root":
      {
        height: "28.95px  !important",
      },
    ".MuiAutocomplete-inputRoot": {
      zIndex: `${zIndexCollections.branchFilter} !important`,
      position: "absolute !important",
      background: "white !important",
    },
  };

  //* useDispatch
  const dispatch = useDispatch();

  //* useSelector
  const currentCategory = useSelector((state) => state.category.category);
  const filtersSet = useSelector((state) => state.userFilter.filtersSet);
  const currentFilters = filtersSet.find((filterItem) => {
    return filterItem.name === currentCategory.toLowerCase();
  });
  const parts = useSelector((state) => state.customize.partData);
  const { branches, loading, plainBranches } = useSelector((state) => state.products);

  // สร้างออบเจกต์ Map เพื่อเก็บค่า BR_CODE ที่ไม่ซ้ำกัน
  const uniqueBRCodeMap = new Map();

  plainBranches.forEach((item) => {
    const { BR_CODE, BR_NAME } = item;

    // ถ้า BR_CODE ยังไม่ถูกเพิ่มใน Map
    if (!uniqueBRCodeMap.has(BR_CODE)) {
      // ใส่ BR_CODE ลงใน Map และกำหนด BR_NAME เป็นอาร์เรย์ที่มี BR_NAME เดียว
      uniqueBRCodeMap.set(BR_CODE, [BR_NAME]);
    } else {
      // ถ้า BR_CODE มีอยู่แล้วใน Map ให้นำ BR_NAME ไปเพิ่มในอาร์เรย์ที่มีอยู่แล้ว
      uniqueBRCodeMap.get(BR_CODE).push(BR_NAME);
    }
  });

  // แปลงค่า Map เป็นรายการข้อมูลใหม่
  const uniqueData = Array.from(uniqueBRCodeMap, ([BR_CODE, BR_NAME]) => ({
    BR_CODE,
    BR_NAME: BR_NAME.join(", "), // รวม BR_NAME เป็น string ด้วยเครื่องหมายคอมม่า
  }));

  const sortedUniqueData = uniqueData.sort((a, b) => {
    if (a.BR_CODE < b.BR_CODE) {
      return -1;
    } else if (a.BR_CODE > b.BR_CODE) {
      return 1;
    } else {
      return 0;
    }
  });

  //* isOptAvailable?
  const isFiltContained = Object.keys(currentFilters.selectedOptionState);

  //* usestate
  const [query, setQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  //*  handleFunctions
  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleChangeOption = (e, currentCategory, filterKeyName) => {
    const value = e.target.value;
    const test = value == Number(value);

    dispatch(setSelectedValuesCopy({ value, currentCategory, filterKeyName }));
    dispatch(setDefault());
  };

  //* useEffect !!!สำหรับ search filter
  useEffect(() => {
    dispatch(changeTextSearch(query));
  }, [query]);

  //todo จริงๆมันใช้ได้แหละ ถ้าต้องการให้เปลี่ยนหน้าแล้ว BranchFilter รีเซ็ตหนะนะ, แต่ผู้ใช้ไม่ต้องการให้มันรีเซ็ต เลยต้อง comment ไว้
  // useEffect(() => {
  //   dispatch(branchSelect([]));
  // }, [currentCategory]);

  //* DisplayCategory
  const { categoryDisplay } = parts.find((category) => {
    return category.category === currentCategory;
  });

  //* AutoComplete
  const handleAutocompleteChange = (event, newValue) => {
    console.log("newValue:", newValue);
    dispatch(branchSelect(newValue));
  };
  // if (loading) {
  //   return <>Loading...</>;
  // }

  const [focusInput, setFocusInput] = useState(false);
  const handleIsFocus = () => {
    if (!focusInput) {
      setFocusInput(true);
    } else {
      setFocusInput(false);
    }
  };

  return (
    <Box className="mainCardFilter">
      <>
        <Box>
          <form onSubmit={handleSearch} style={{ display: "flex" }}>
            <TextField
              sx={{ width: "57%", paddingRight: "8px", flexGrow: 1 }}
              placeholder="ค้นหาสินค้า"
              type="search"
              id="input-with-icon-textfield"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              label={`Product ${categoryDisplay}`}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ bgcolor: "#F0F0F0", py: "4.07px" }} />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <Box style={{ display: "flex", paddingTop: "16px", paddingRight: "8px" }}>
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

            <Box sx={{ width: "32.7%" }}>
              <Autocomplete
                onFocus={handleIsFocus}
                onBlur={handleIsFocus}
                style={autoCompleteInput}
                size="small"
                
                multiple
                limitTags={2}
                // options={branches}
                options={uniqueData}
                getOptionLabel={(branch) => branch.BR_CODE}
                // defaultValue={[Branches[0], Branches[1], Branches[2]]}
                renderInput={(params) => (
                  <TextField {...params} label="Branch" variant="standard" />
                )}
                isOptionEqualToValue={(option, value) =>
                  option.BR_CODE === value.BR_CODE && option.BR_NAME === value.BR_NAME
                }
                onChange={handleAutocompleteChange}
                PopperComponent={(popperProps) => (
                  <CustomPopper {...popperProps} options={uniqueData} isFocus={focusInput} />
                )}
              />
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
                                  const filterKeyName = item2.name;
                                  handleChangeOption(e, currentCategory, filterKeyName);
                                }}
                              >
                                <option value="">Please Select</option>
                                {item2.choices.map((option, indexOption) => {
                                  return (
                                    <option value={option} key={indexOption}>
                                      {option ? option : "ไม่มี"}
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
          </Grid>
        </Box>

        {isFiltContained.length > 0 ? (
          <>
            <Box className="resetBtn">
              <Button
                disableRipple={true}
                sx={{ p: 0, backgroundColor: "#42528A" }}
                onClick={() => dispatch(clearSelectedFilter())}
                variant="contained"
              >
                reset
              </Button>
            </Box>
          </>
        ) : (
          <>ไม่มีFilters</>
        )}
      </>
    </Box>
  );
};

export default UserFilter;
