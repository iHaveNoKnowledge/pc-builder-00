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

  const initData = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" },
  ];
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [isSelected, setIsSeleced] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();
    // if (query === "") {
    //   setData(initData);
    // } else {
    //   const filteredData = data.filter((item) =>
    //     item.name.toLowerCase().includes(query.toLowerCase())
    //   );
    //   setData(filteredData);
    // }
  };

  useEffect(() => {
    dispatch(changeTextSearch(query));
  }, [query]);

  return (
    <Box className="mainCardFilter">
      <Box>
        {/* <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <ul>
            {data.map((item) => (
            <li key={item.id}>{item.name}</li>
            ))}
        </ul> */}

        <form onSubmit={handleSearch} style={{ display: "flex" }}>
          <TextField
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
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              ค้นหา
            </Button>
          </Box>
        </form>
      </Box>

      <Box>
        <Stack spacing={2} sx={{ width: 500, marginInline: "auto", mt: "14px" }}>
          <Autocomplete
            id="size-small-filled"
            size="small"
            options={initData}
            getOptionLabel={(option) => option.name}
            // defaultValue={top100Films[0]}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option.name}
                  size="small"
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} variant="filled" label="FilterName" placeholder="Favorites" />
            )}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default UserFilter;
