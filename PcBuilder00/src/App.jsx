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
      <Grid container columns={{ xs: 4, md: 12 }} rowHeight={25}>
        <Grid item xs={12} md={12}>
          <Box sx={{ px: 1 }}></Box>
        </Grid>

        <Grid item xs={4} md={3}>
          <SumCustomize />
        </Grid>
        <Grid item xs={4} md={9}>
          <Box sx={{ pl: 2 }}>
            <UserFilter /> <Bottom />
          </Box>
        </Grid>

        <Grid item xs={4} md={3}>
          <CustomizationProto02 />
        </Grid>

        <Grid item xs={4} md={9}>
          <Box sx={{ pl: 2 }}>
            <SelectionProto01 />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
