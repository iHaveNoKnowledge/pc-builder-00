import "./App.css";
import CustomizationProto02 from "./components/CustomizationProto02";
import SelectionProto01 from "./components/SelectionProto01";
import { Box, Container, Grid } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Container disableGutters sx={{ height: "auto", maxWidth: "100%" }}>
        <Grid container columns={{ xs: 4, sm: 12, md: 12 }} rowHeight={25}>
          <Grid item xs={12} sm={12} md={12}>
            <Box sx={{ px: 1 }}></Box>
          </Grid>

          <Grid item xs={4} sm={4} md={4}>
            <CustomizationProto02 />
          </Grid>

          <Grid item xs={4} sm={8} md={8}>
            <Box sx={{ pl: 2 }}>
              <SelectionProto01 />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
