import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CustomizationProto01 from "./components/CustomizationProto01";
import SelectionProto01 from "./components/SelectionProto01";
import {Box, Container, Grid} from "@mui/material";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Container disableGutters sx={{ minHeight: "auto" }}>
        {/* outergrid */}
        <Grid container columns={{ xs: 4, sm: 12, md: 12 }}>
          {/* TOPPICK QUICK SET ZONE */}
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{ border: "1px dashed rgba(0, 153, 51,1)" }}
          >
            <Box sx={{ px: 1 }}>TOPPICK has state fromserver</Box>
          </Grid>

          <Grid item xs={4} sm={4} md={4}>
            {/* <Customization /> */}
            <CustomizationProto01 />
          </Grid>

          <Grid item xs={4} sm={8} md={8}>
            <Box sx={{ pl: 1 }}>
              {/* <Selection /> */}
              {/* <SelectionProto00 /> */}
              <SelectionProto01 />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
