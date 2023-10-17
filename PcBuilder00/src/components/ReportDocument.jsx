import React, { useRef, useEffect, useState } from "react";
import { Page, Text, View, Document, Image, Font, PDFViewer, usePDF } from "@react-pdf/renderer";
import logoHeader from "../../public/images/itLogo-1.png";
import font from "../fonts/ChakraPetch-Regular.ttf";
import { AppBar, Toolbar, Button, Dialog, IconButton, Typography, Slide, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import PopupAlert from "./generalModules/PopupAlert";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./SetList";

Font.register({ family: "Chakra_Petch", src: font });

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ReportDocument = () => {
  const partDataReport2 = useSelector((state) => state.customize.partData);
  const { partData, itemsList } = useSelector((state) => state.customize);
  const { info, branch } = useSelector((state) => state.report);

  //* Rows
  const rowsPerPage = 22;
  const emptyRows = rowsPerPage - itemsList.length;

  ////* Form //////////////////////////////////////////////////////////////////////////////////////////////////////
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  //* onclick เปิด Form ////////////////////////////////////////////////////////////////////
  const handleClickOpen = () => {
    if (!itemsList.length && !alertOpen) {
      setAlertOpen(true);
    } else {
      setOpen(true);
    }
  };

  //* onclick ปิด Form ////////////////////////////////////////////////////////////////////
  const handleClose = () => {
    if (alertOpen === true) {
      setAlertOpen(false);
    } else {
      setOpen(false);
    }
  };

  const twoDigitFormat = (number) => {
    return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //*
  const WrapText = (text) => {
    const numOccurrences = (str, target) => str.split(target).length - 1;
    const count = numOccurrences(text, "ำ");
    const newLength = text.length + count;

    return (
      <View>
        {/* {text?.match(/\w+|\W+/g)?.map((seg, i) => {
          if (Number(seg) / Number(seg) === 1) {
            return (
              <Text key={i} style={{ width: `${newLength}ch` }}>
                {text}
              </Text>
            );
          } else {
            return (
              <Text key={i} style={{ width: `${newLength}ch` }}>
                {seg.toLocaleString().padEnd(newLength, " ")}
              </Text>
            );
          }
        })} */}
        <Text style={{ width: `${newLength}ch` }}>
          {text.toLocaleString().padEnd(newLength, " ")}
        </Text>
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
          <Text style={tableCellHeaderStyle}>{WrapText("บริษัท ไอที ซิตี้ จำกัด (มหาชน)")}</Text>
          {/* คําแนะนํา อย่าใช้สระ ำ ให้ใช้เครื่องหมาย  ํ ยติภัง + สระ า เพราะ จำนวน index กับจำนวนตัวอักษรที่แสดงผลจะไม่ตรงกัน ทำให้แสดงผลไม่ครบ */}
          <Text style={tableCellStyle}>{WrapText(branch.address)}</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <View style={{ ...subTableDisplay, ...{ flexDirection: "row", marginTop: "8px" } }}>
            <View style={contactStyle}>
              <Text>ลูกค้า</Text>
            </View>
            <View>
              <Text style={{ fontSize: 9 }}>:</Text>
            </View>
            <View style={{ fontSize: 9, marginVertical: 1, marginLeft: 3, width: 130 }}>
              {/* <Text>รับตัวแปร Cus str ทำconditional display</Text> */}
              <Text>{info.customerName}</Text>
            </View>
          </View>

          <View style={{ ...subTableDisplay, flexDirection: "row" }}>
            <View style={contactStyle}>
              <Text>โทร</Text>
            </View>
            <View>
              <Text style={{ fontSize: 10 }}>:</Text>
            </View>
            <View style={{ fontSize: 9, marginVertical: 1, marginLeft: 3, width: 130 }}>
              {/* <Text>รับตัวแปร custel str ทำconditional display</Text> */}
              <Text>{info.customerTel}</Text>
            </View>
          </View>

          <View
            style={{
              borderBottom: "1px solid rgba(21,21,21)",
            }}
          ></View>

          <View style={{ ...subTableDisplay, flexDirection: "row" }}>
            <View style={contactStyle}>
              <Text>ผู้ขาย</Text>
            </View>
            <View>
              <Text style={{ fontSize: 9 }}>:</Text>
            </View>
            <View style={{ fontSize: 9, marginVertical: 1, marginLeft: 3, width: 130 }}>
              {/* <Text>รับตัวแปร saler ทำconditional display </Text> */}
              <Text>{info.sellerName} </Text>
            </View>
          </View>

          <View style={{ ...subTableDisplay, flexDirection: "row" }}>
            <View style={contactStyle}>
              <Text>โทร</Text>
            </View>
            <View>
              <Text style={{ fontSize: 9 }}>:</Text>
            </View>
            <View style={{ fontSize: 9, marginVertical: 1, marginLeft: 3, width: 130 }}>
              {/* <Text>รับตัวแปร custel str ทำconditional display</Text> */}
              <Text>{info.sellerTel}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const createTableRowIT = (rows) => {
    return (
      <View>
        <View style={firstTableColStyle}>{createTableRowITDYN(rows)}</View>
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
        <View style={{ ...inlineStyle, ...inlineDescr, flexGrow: 1 }}>
          <Text>{WrapText("Description")}</Text>
          {/* <Text>{WrapText("ยายกินลําไยนําลายยายไหลย้อย")}</Text> */}
        </View>
        <View style={{}}></View>
        <View style={{ ...inlineStyle, ...inlineQTY }}>
          <Text>{WrapText("QTY")}</Text>
        </View>
        {/* <View style={{ ...inlineStyle, ...inlinePrice }}>
          <Text>{WrapText("Price")}</Text>
        </View>
        <View style={{ ...inlineStyle, ...inlineTotal }}>
          <Text>{WrapText("Total")}</Text>
        </View> */}
      </View>
    );
  };

  const createTableRowITDYN = (itemArr) => {
    const itemsAmt = itemsList.length;
    const formattedNumber = (itemsAmt - (itemsAmt - 1)).toString().padStart(6, "0");
    switch (true) {
      case itemsAmt >= 1:
        return (
          <View style={subTableDisplay}>
            {headerSubTable()}
            {/* 1st row */}
            <View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View
                  style={{
                    ...inlineStyle,
                    ...inlineOrder,
                    ...celUnderline,
                  }}
                >
                  <Text>{WrapText("1")}</Text>
                </View>

                <View
                  style={{
                    ...inlineStyle,
                    ...inlineCode,
                    ...celUnderline,
                  }}
                >
                  <Text>{`${itemsList[0].code}`}</Text>
                </View>

                <View
                  style={{
                    ...inlineStyle,
                    ...inlineDescr,
                    ...celUnderline,
                  }}
                >
                  <Text>{`${itemsList[0].productDescription}`}</Text>
                </View>
                <View
                  style={{ flexGrow: 1, borderBottom: "1px groove rgba(130, 195, 255, 1)" }}
                ></View>
                <View
                  style={{
                    ...inlineStyle,
                    ...inlineQTY,
                    ...celUnderline,
                  }}
                >
                  <Text>{`${itemsList[0].selectAmount.toLocaleString()}`}</Text>
                </View>

                {/* <View style={{ ...inlineStyle, ...inlinePrice }}>
                  <Text>{`${itemsList[0].srp
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text>
                </View>

                <View style={{ ...inlineStyle, ...inlineTotal }}>
                  <Text>{`${(itemsList[0].srp * itemsList[0].selectAmount)
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text>
                </View> */}
              </View>
            </View>
            {/* the following rows */}
            {[...Array(itemsAmt - 1)].map((table, index) => {
              const formattedNumberx = (index + 2).toString().padStart(6, "0");
              // https://stackoverflow.com/questions/75039805/how-to-break-a-page-conditionally-with-react-pdf-renderer อันนี้ช่วยได้
              return (
                <View key={index} style={{ borderCollapse: "collapse" }}>
                  <View
                    break={itemsList % 20 === 0}
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <View
                      style={{
                        ...inlineStyle,
                        ...inlineOrder,
                        ...celUnderline,
                      }}
                    >
                      <Text>{WrapText(`${2 + index}`)}</Text>
                    </View>
                    <View
                      style={{
                        ...inlineStyle,
                        ...inlineCode,
                        ...celUnderline,
                      }}
                    >
                      <Text>{`${itemsList[index + 1].code}`}</Text>
                    </View>
                    <View
                      style={{
                        ...inlineStyle,
                        ...inlineDescr,
                        ...celUnderline,
                        flexGrow: 1,
                      }}
                    >
                      <Text>{`${itemsList[index + 1].productDescription}`}</Text>
                    </View>
                    <View style={{ borderBottom: "1px groove rgba(130, 195, 255, 1)" }}></View>
                    <View
                      style={{
                        ...inlineStyle,
                        ...inlineQTY,
                        ...celUnderline,
                      }}
                    >
                      <Text>{`${itemsList[index + 1].selectAmount.toLocaleString()}`}</Text>
                    </View>
                    {/* <View style={{ ...inlineStyle, ...inlinePrice }}>
                      <Text>{`${itemsList[index + 1].srp
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text>
                    </View>
                    <View style={{ ...inlineStyle, ...inlineTotal }}>
                      <Text>{`${(itemsList[index + 1].srp * itemsList[index + 1].selectAmount)
                        .toFixed(2)
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}</Text>
                    </View> */}
                  </View>
                </View>
              );
            })}

            {/* space ROWS */}
            {[...Array(emptyRows)].map((table, index) => {
              const islastChild = index + 1 - emptyRows === 0;
              return (
                <View key={index}>
                  <View break={true} style={{ display: "flex", flexDirection: "row" }}>
                    <View
                      style={{
                        ...inlineStyle,
                        ...inlineOrder,
                        minHeight: "20px",
                        ...celUnderline,
                      }}
                    >
                      <Text></Text>
                    </View>
                    <View style={{ ...inlineStyle, ...inlineCode, ...celUnderline }}></View>
                    <View style={{ ...inlineStyle, ...inlineDescr, ...celUnderline, flexGrow: 1 }}>
                      {islastChild && <Text>เป็น Last</Text>}
                    </View>
                    <View style={{ ...celUnderline }}></View>
                    <View style={{ ...inlineStyle, ...inlineQTY, ...celUnderline }}></View>
                    <View style={{ ...inlineStyle, ...inlinePrice, ...celUnderline }}>
                      <Text></Text>
                    </View>
                    <View style={{ ...inlineStyle, ...inlineTotal, ...celUnderline }}>
                      <Text></Text>
                    </View>
                  </View>
                </View>
              );
            })}

            {/* summary rows */}
            {/* <View style={{ borderTop: "1px solid #000" }}> */}
            <View>
              <View break={true} style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ ...inlineStyle, ...inlineOrder }}></View>
                <View style={{ ...inlineStyle, ...inlineCode }}></View>
                <View style={{ ...inlineStyle, ...inlineDescr }}></View>
                <View style={{ ...inlineStyle, ...inlineQTY }}></View>
                <View style={{ ...inlineStyle, ...inlinePrice, borderBottom: "1px groove  #000" }}>
                  <Text>ราคารวม</Text>
                </View>
                <View style={{ ...inlineStyle, ...inlineTotal, borderBottom: "1px groove  #000" }}>
                  <Text>
                    {itemsList
                      .reduce((acc, item) => acc + item.srp * (100 / 107) * item.selectAmount, 0)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View break={true} style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ ...inlineStyle, ...inlineOrder }}></View>
                <View style={{ ...inlineStyle, ...inlineCode }}></View>
                <View style={{ ...inlineStyle, ...inlineDescr }}></View>
                <View style={{ ...inlineStyle, ...inlineQTY }}></View>
                <View
                  style={{
                    ...inlineStyle,
                    ...inlinePrice,
                    borderBottom: "1px groove  #000",
                  }}
                >
                  <Text>ภาษีมูลค่าเพิ่ม</Text>
                </View>
                <View style={{ ...inlineStyle, ...inlineTotal, borderBottom: "1px groove  #000" }}>
                  <Text>
                    {itemsList
                      .reduce(
                        (acc, item) =>
                          acc + (item.srp - item.srp * (100 / 107)) * item.selectAmount,
                        0
                      )
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View break={true} style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ ...inlineStyle, ...inlineOrder }}></View>
                <View style={{ ...inlineStyle, ...inlineCode }}></View>
                <View style={{ ...inlineStyle, ...inlineDescr }}></View>
                <View style={{ ...inlineStyle, ...inlineQTY }}></View>
                <View style={{ ...inlineStyle, ...inlinePrice, borderBottom: "1px groove  #000" }}>
                  <Text>ราคาสุทธิ</Text>
                </View>
                <View style={{ ...inlineStyle, ...inlineTotal, borderBottom: "1px groove  #000" }}>
                  <Text>
                    {itemsList
                      .reduce((acc, item) => acc + item.srp * item.selectAmount, 0)
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );

      default:
        break;
    }
  };

  const reportRef = useRef(null);
  const [reportHeight, setReportHeight] = useState(0);
  useEffect(() => {
    setReportHeight(reportRef);
  });

  const FinalizedDocument = () => {
    const [repPageNumber, setRepPageNumber] = useState();
    const [repTotalPage, setRepTotalPage] = useState();
    const [renderTImes, setRenderTimes] = useState(0);
    console.log(reportHeight);
    return (
      <Document>
        <Page style={pageStyle} size="A4" orientation="portrait" ref={reportRef}>
          <View style={tableStyle}>
            <Text
              style={{ display: "block", marginLeft: "auto" }}
              render={({ pageNumber, totalPages }) => {
                setRepPageNumber(pageNumber);
                setRepTotalPage(totalPages);
                return `${pageNumber} / ${totalPages} `;
              }}
              fixed
            />
            <Text>แมว</Text>
            {createMainTableHeader()}
            {createTableRowIT(5)}
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <ThemeProvider theme={theme}>
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

      <Dialog open={alertOpen} onClose={handleClose}>
        <PopupAlert type="select" />
      </Dialog>

      <Dialog
        sx={{ overFlow: "hidden" }}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#42528A" }}>
          <Toolbar style={{ minHeight: "1px !important" }}>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Print Customer Report / สำหรับลูกค้า
            </Typography>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box>
          <PDFViewer style={viewerStyle}> {FinalizedDocument()}</PDFViewer>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
};

//style------------------------------------------------------------------------------------
export const pageStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  paddingTop: 55,
  paddingHorizontal: 40,
  paddingBottom: 56,
};

export const tableStyle = {
  display: "table",
  width: "auto",
  fontFamily: "Chakra_Petch",
};

export const tableRowStyle = {
  flexDirection: "row",
  display: "flex",
};

export const firstTableColHeaderStyle = {
  // width: "28vh",
  width: "16vw",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  backgroundColor: "#0033E6",
  display: "flex",
  justifyContent: "center",
};

export const tableColHeaderStyle = {
  width: "36vw",
  // width: "100%",
  // borderStyle: "solid",
  // borderColor: "#000",
  // borderBottomColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  // backgroundColor: "#bdbdbd",
  display: "flex",
  justifyContent: "center",
};

export const firstTableColStyle = {
  // width: "28vh",
  width: "100%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderTopWidth: 0,
  whiteSpace: "normal",
};

export const tableColStyle = {
  // width: "28vh",
  width: "100%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopWidth: 0,
  whiteSpace: "pre",
};

export const tableCellHeaderStyle = {
  // margin: 4,
  fontSize: 12,
  padding: "8 2 0",
  width: "100%",
  textAlign: "center",
};

export const celUnderline = {
  borderBottom: "1px groove rgba(130, 195, 255, 1)",
};

export const inlineStyle = {
  padding: "5px 10px",
  fontSize: 8.5,
};
export const inlineOrder = { width: "6.5%", textAlign: "center" };
export const inlineCode = { width: "14%" };
export const inlineDescr = { width: "37.5%" };
export const inlineQTY = { width: "14%", textAlign: "center" };
export const inlinePrice = { width: "16%", textAlign: "right" };
export const inlineTotal = { width: "15%", textAlign: "right" };

export const tableCellStyle = {
  fontSize: 8.5,
  width: "100%",
  flexGrow: 0,
  textAlign: "left",
  fontFamily: "Chakra_Petch",
  whiteSpace: "normal",
  padding: 8,
};

export const image = {
  marginVertical: 1,
  marginHorizontal: 15,
  backgroundColor: "#0033E6",
};

export const subTableDisplay = {
  margin: 4,
  display: "flex",
};

export const viewerStyle = {
  display: "block",
  margin: "0 auto",
  width: "70%",
  height: "100vh",
};

export const contactStyle = {
  fontSize: 9,
  width: "17%",
};

export default ReportDocument;
