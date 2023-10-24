import React from "react";
import { Page, Text, View, Document, Image, Font } from "@react-pdf/renderer";
import xx from "../../fonts/ChakraPetch-Regular.ttf";
import xxx from "../../../public/images/itLogo-1.png";

import { Box } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
Font.register({ family: "Chakra_Petch", src: xx });
import { pageStyle, tableStyle } from "../ReportDocument";
import { useSelector } from "react-redux";
import { bwipjs } from "bwip-js";

const TableDocumentCashier = () => {
  const partDataReport2 = useSelector((state) => state.customize.partData);
  const { partData, itemsList } = useSelector((state) => state.customize);
  const { info, branch } = useSelector((state) => state.report);
  const createMainTableHeader = () => {
    return (
      <View style={tableRowStyle} fixed>
        <View style={firstTablereportColumnstyle}>
          <Image src={xxx} style={image} />
        </View>

        <View style={tablereportColumnstyle}>
          <Text style={tableCellHeaderStyle}>{WrapText("บริษัท ไอที ซิตี้ จำกัด (มหาชน)")}</Text>
          <Text style={tableCellStyle}>{WrapText(branch.address)}</Text>
        </View>

        <View style={tablereportColumnstyle}>
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

  const createTableRowIT = (x) => {
    return (
      <View style={tableRowStyle}>
        <View style={firstTableColStyle}>{createTableRowITDYN(x)}</View>
      </View>
    );
  };

  const reportColumns = () => {
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

  function BarcodeGenerator() {
    const barcodesToGenerate = ['Coa-0001', 'co6-000160'];
    const [barcodeImages, setBarcodeImages] = useState([]);
    // https://www.npmjs.com/package/react-barcode ลองไปดูในนี้เผื่อจะง่ายขึ้น
    useEffect(() => {
      const generateBarcodes = async () => {
        const images = await Promise.all(
          barcodesToGenerate.map(async (data) => {
            return new Promise((resolve, reject) => {
              bwipjs.toBuffer(
                {
                  bcid: 'code128', // ประเภทของบาร์โค้ด
                  text: data, // ข้อมูลที่คุณต้องการสร้างเป็นบาร์โค้ด
                  scale: 3, // ขนาดของบาร์โค้ด
                  includetext: true, // รวมข้อความกับบาร์โค้ด
                },
                (err, png) => {
                  if (err) {
                    reject(err);
                  } else {
                    // แปลงรูปภาพบาร์โค้ดเป็น base64
                    const base64 = Buffer.from(png).toString('base64');
                    resolve('data:image/png;base64,' + base64);
                  }
                }
              );
            });
          })
        );
        setBarcodeImages(images);
      };
  
      generateBarcodes();
    }, []);

  const createTableRowITDYN = (x) => {
    const formattedNumber = (x - (x - 1)).toString().padStart(6, "0");
    switch (true) {
      case x >= 1:
        return (
          <View style={subTableDisplay}>
            {reportColumns()}

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
    <Box>
      <PDFViewer style={viewerStyle}> {FinalizeDocument()}</PDFViewer>
    </Box>
  );
};

//style------------------------------------------------------------------------------------

export const tableRowStyle = {
  flexDirection: "row",
  display: "flex",
};

export const firstTablereportColumnstyle = {
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

export const tablereportColumnstyle = {
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
  marginHorizontal: "-1px",
};

export const inlineStyle = {
  padding: "5px 10px",
  fontSize: 8,
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

export const pageDisplayStyle = {
  // display: "block",
  position: "absolute",
  width: "50px",
  top: "4%",
  right: "4%",
  fontSize: "",
};

export default TableDocumentCashier;
