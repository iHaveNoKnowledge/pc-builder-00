import React from "react";
import { Page, Text, View, Document, Image, Font, StyleSheet } from "@react-pdf/renderer";
import logoHeader from "../assets/itLogo-1.png";
import xx from "../fonts/ChakraPetch-Regular.ttf";
import { AppBar, Toolbar, Button, Dialog, IconButton, Typography, Slide, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PDFViewer } from "@react-pdf/renderer";

Font.register({ family: "Chakra_Petch", src: xx });

const styles = StyleSheet.create({
  title: {
    fontFamily: "Chakra_Petch",
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ReportDocument = () => {
  const [open, setOpen] = React.useState(false);
  ////onclick เปิด Form ////////////////////////////////////////////////////////////////////
  const handleClickOpen = () => {
    setOpen(true);
  };

  ////onclick ปิด Form ////////////////////////////////////////////////////////////////////
  const handleClose = () => {
    setOpen(false);
  };

  const createTableHeader = () => {
    return (
      <View style={tableRowStyle} fixed>
        <View style={firstTableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Column</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Column</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Column</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Column</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Column</Text>
        </View>
      </View>
    );
  };

  const createTableRow = () => {
    return (
      <View style={tableRowStyle}>
        <View style={firstTableColStyle}>
          <Text style={tableCellStyle}>Element</Text>
        </View>

        <View style={tableColStyle}>
          <Text style={tableCellStyle}>Element</Text>
        </View>

        <View style={tableColStyle}>
          <Text style={tableCellStyle}>Element</Text>
        </View>

        <View style={tableColStyle}>
          <Text style={tableCellStyle}>Element</Text>
        </View>

        <View style={tableColStyle}>
          <Text style={tableCellStyle}>Element</Text>
        </View>
      </View>
    );
  };

  const createMainTableHeader = () => {
    return (
      <View style={tableRowStyle} fixed>
        <View style={firstTableColHeaderStyle}>
          <Image src={logoHeader} style={image} />
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, eligendi!
          </Text>
        </View>

        <View style={tableColHeaderStyle}>
          <View style={{ ...subTableDisplay, ...{ flexDirection: "row", marginTop: "8px" } }}>
            <View style={{ fontSize: 10, width: "17%" }}>
              <Text>ลูกค้า</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>:</Text>
            </View>
            <View style={{ fontSize: 9, marginVertical: 1, marginLeft: 3, width: 130 }}>
              <Text>รับตัวแปร Cus str ทำconditional display</Text>
            </View>
          </View>

          <View style={{ ...subTableDisplay, ...{ flexDirection: "row" } }}>
            <View style={{ fontSize: 10, width: "17%" }}>
              <Text>โทร</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>:</Text>
            </View>
            <View style={{ fontSize: 9, marginVertical: 1, marginLeft: 3, width: 130 }}>
              <Text>รับตัวแปร custel str ทำconditional display</Text>
            </View>
          </View>

          <View
            style={{
              borderBottom: "1px solid rgba(21,21,21)",
            }}
          ></View>

          <View style={{ ...subTableDisplay, ...{ flexDirection: "row" } }}>
            <View style={{ fontSize: 10, width: "17%" }}>
              <Text>Sale</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>:</Text>
            </View>
            <View style={{ fontSize: 9, marginVertical: 1, marginLeft: 3, width: 130 }}>
              <Text>รับตัวแปร saler ทำconditional display </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const createTableRowIT = (x) => {
    return (
      <View style={tableRowStyle}>
        <View style={firstTableColStyle}>{createTableRowITDYN(x)}</View>
      </View>
    );
  };

  const headerSubTable = () => {
    return (
      <View style={{ display: "flex", flexDirection: "row" }} fixed>
        <View style={{ ...inlineStyle, ...inlineOrder }}>
          <Text>{WrapText("No")}</Text>
        </View>
        <View style={{ ...inlineStyle, ...inlineCode }}>
          <Text>{WrapText(`Code`)}</Text>
        </View>
        <View style={{ ...inlineStyle, ...inlineDescr }}>
          <Text>{WrapText("Description")}</Text>
        </View>
        <View style={{ ...inlineStyle, ...inlineQTY }}>
          <Text>{WrapText("QTY")}</Text>
        </View>
        <View style={{ ...inlineStyle, ...inlinePrice }}>
          <Text>{WrapText("Price")}</Text>
        </View>
        <View style={{ ...inlineStyle, ...inlineTotal }}>
          <Text>{WrapText("Total")}</Text>
        </View>
      </View>
    );
  };

  const WrapText = (text) => (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {text?.match(/\w+|\W+/g)?.map((seg, i) => {
        if (Number(seg) / Number(seg) === 1) {
          return <Text key={i}>{Number(seg).toLocaleString()}</Text>;
        } else {
          return <Text key={i}>{seg.toLocaleString()}</Text>;
        }
      })}
    </View>
  );

  const createTableRowITDYN = (x) => {
    const formattedNumber = (x - (x - 1)).toString().padStart(6, "0");
    switch (true) {
      case x >= 1:
        return (
          <View style={subTableDisplay}>
            {headerSubTable()}

            <View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ ...inlineStyle, ...inlineOrder }}>
                  <Text>{WrapText("1")}</Text>
                </View>
                <View style={{ ...inlineStyle, ...inlineCode }}>
                  <Text>{`XXX-${formattedNumber}`}</Text>
                </View>
                <View style={{ ...inlineStyle, ...inlineDescr }}>
                  <Text>{WrapText("loremfa-rotate-180")}</Text>
                </View>
                <View style={{ ...inlineStyle, ...inlineQTY }}>
                  <Text>{WrapText("99")}</Text>
                </View>
                <View style={{ ...inlineStyle, ...inlinePrice }}>
                  <Text>{WrapText("9999")}</Text>
                </View>
                <View style={{ ...inlineStyle, ...inlineTotal }}>
                  <Text>{WrapText("99999")}</Text>
                </View>
              </View>
            </View>

            {[...Array(x - 1)].map((table, index) => {
              const formattedNumberx = (index + 2).toString().padStart(6, "0");
              return (
                <View key={index}>
                  <View break={true} style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ ...inlineStyle, ...inlineOrder }}>
                      <Text>{WrapText(`${2 + index}`)}</Text>
                    </View>
                    <View style={{ ...inlineStyle, ...inlineCode }}>
                      <Text>{`XXX-${formattedNumberx}`}</Text>
                    </View>
                    <View style={{ ...inlineStyle, ...inlineDescr }}>
                      <Text>{WrapText("loremfa-rotate-180asdasd")}</Text>
                    </View>
                    <View style={{ ...inlineStyle, ...inlineQTY }}>
                      <Text>{WrapText("99")}</Text>
                    </View>
                    <View style={{ ...inlineStyle, ...inlinePrice }}>
                      <Text>{WrapText("9999")}</Text>
                    </View>
                    <View style={{ ...inlineStyle, ...inlineTotal }}>
                      <Text>{WrapText("99999")}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        );

      default:
        break;
    }
  };

  const FinalizeDocument = () => {
    return (
      <Document>
        <Page style={pageStyle} size="A4" orientation="portrait">
          <View style={tableStyle}>
            {createMainTableHeader()}
            {createTableRowIT(5)}
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          height: "27.5px",
          borderRadius: "0px",
          backgroundColor: "#42528A",
        }}
      >
        Report
      </Button>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: "relative", backgroundColor: "#42528A" }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Print
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box>
          <PDFViewer style={viewerStyle}> {FinalizeDocument()}</PDFViewer>
        </Box>
      </Dialog>
    </div>
  );
};

//style------------------------------------------------------------------------------------
const pageStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  paddingTop: 16,
  paddingHorizontal: 40,
  paddingBottom: 56,
};

const tableStyle = {
  display: "table",
  width: "auto",
  fontFamily: "Chakra_Petch",
};

const tableRowStyle = {
  flexDirection: "row",
  display: "flex",
};

const firstTableColHeaderStyle = {
  // width: "28vh",
  width: "100%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  backgroundColor: "#0033E6",
  display: "flex",
  justifyContent: "center",
};

const tableColHeaderStyle = {
  // width: "28vh",
  width: "100%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  backgroundColor: "#bdbdbd",
  display: "flex",
  justifyContent: "center",
};

const firstTableColStyle = {
  // width: "28vh",
  width: "100%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderTopWidth: 0,
  whiteSpace: "normal",
};

const tableColStyle = {
  // width: "28vh",
  width: "100%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopWidth: 0,
  whiteSpace: "pre",
};

const tableCellHeaderStyle = {
  margin: 4,
  fontSize: 12,
  fontWeight: "bold",
  width: 171,
  fontFamily: "Chakra_Petch",
};

const inlineStyle = { padding: "10px", fontSize: 10 };
const inlineOrder = { width: "6.5%", textAlign: "right" };
const inlineCode = { width: "14%" };
const inlineDescr = { width: "37.5%" };
const inlineQTY = { width: "14%" };
const inlinePrice = { width: "14%" };
const inlineTotal = { width: "14%" };

const tableCellStyle = {
  margin: 5,
  fontSize: 10,
  width: 160,
  flexGrow: 0,
  textAlign: "left",
  fontFamily: "Chakra_Petch",
};

const image = {
  marginVertical: 1,
  marginHorizontal: 15,
  backgroundColor: "#0033E6",
};

const subTableDisplay = {
  margin: 4,
  display: "flex",
};

const viewerStyle = {
  display: "block",
  margin: "0 auto",
  width: "70vw",
  height: "90vh",
};

export default ReportDocument;
