import "./App.css";
import CustomizationProto02 from "./components/CustomizationProto02";
import SelectionProto01 from "./components/SelectionProto01";
import { Box, Container, Grid } from "@mui/material";
import SumCustomize from "./components/SumCustomize";
import Bottom from "./components/BottomComponent";
import UserFilter from "./components/UserFilter";

function App() {
  return (
    <Container
      disableGutters
      sx={{
        height: "auto",
        "@media (min-width: 0px)": {
          maxWidth: "1400px",
        },
      }}
    >
      <Grid container columns={{ xs: 4, md: 12 }}>
        <Grid item xs={4} md={3} rowHeight={25} columns={{ xs: 4, md: 12 }}>
          <Grid item xs={4} md={12}>
            <SumCustomize />
          </Grid>

          <Grid item xs={4} md={12}>
            <CustomizationProto02 />
          </Grid>
        </Grid>

        <Grid item xs={4} md={9} rowHeight={25} columns={{ xs: 4, sm: 6, md: 12 }}>
          <Grid item xs={4} sm={5} md={12}>
            <Box sx={{ pl: 2, display: "flex", flexDirection: "column" }}>
              <Box sx={{ flexGrow: 1 }}>
                <UserFilter />
              </Box>
              <Box>
                <Bottom />
              </Box>
            </Box>
          </Grid>

          <Grid item xs={4} sm={6} md={12}>
            <Box sx={{ pl: 2 }}>
              <SelectionProto01 />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
