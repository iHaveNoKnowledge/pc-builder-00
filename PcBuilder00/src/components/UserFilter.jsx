import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";


const UserFilter = () => {
  const initData = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Bob" }
  ];
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [isSelected, setIsSeleced] = useState(false);

  const handleSearch = () => {
    if (query === "") {
      setData(initData);
    } else {
      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setData(filteredData);
    }
  };

  return (
    <div>
        <div>
        <input
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
        </ul>

        <TextField
            type="search"
            id="input-with-icon-textfield"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            label="TextField"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <SearchIcon sx={{ bgcolor: "#F0F0F0", py: "4.07px" }} />
                </InputAdornment>
            ),
            sx: {
                "& input::-webkit-search-cancel-button": {
                // styles for the clear input icon button in WebKit browsers
                color: "red"
                }
            }
            }}
            variant="standard"
            onBlur={(e) => setIsSeleced(false)}
            onFocus={(e) => setIsSeleced(true)}
        />
        </div>

        <div>
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
                <TextField
                {...params}
                variant="filled"
                label="FilterName"
                placeholder="Favorites"
                />
            )}
            />
        </Stack>
        </div>
    </div>
    
  );
};

export default UserFilter;