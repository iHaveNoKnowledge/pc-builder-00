import React, { useState, useEffect } from "react";
import { Page, Text, View, Document, Image, Font } from "@react-pdf/renderer";
import xx from "../../fonts/ChakraPetch-Regular.ttf";
import xxx from "../../../public/images/itLogo-1.png";
import { Box } from "@mui/material";
import { PDFViewer } from "@react-pdf/renderer";
import { pageStyle, tableStyle } from "../ReportDocument";
import { useSelector } from "react-redux";
import bwipjs from "bwip-js";

Font.register({ family: "Chakra_Petch", src: xx });

const TableDocumentCashier = () => {
  const partDataReport2 = useSelector((state) => state.customize.partData);
  const { partData, itemsList } = useSelector((state) => state.customize);
  const { info, branch, SNs } = useSelector((state) => state.report);
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

  // const createTableRowIT = (x) => {
  //   return (
  //     <View style={tableRowStyle}>
  //       <View style={firstTableColStyle}>{createTableRowITDYN(x)}</View>
  //     </View>
  //   );
  // };

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

  const WrapText = (text) => {
    const numOccurrences = (str, target) => str.split(target).length - 1;
    const count = numOccurrences(text, "ำ");
    const newLength = text.length + count;

    return (
      <View>
        <Text style={{ width: `${newLength}ch` }}>{text.toLocaleString().padEnd(newLength, " ")}</Text>
      </View>
    );
  };

  //ทำfunction สร้าง barcode
  const generateBarcodes = (barcodeDataArray) => {
    const barcodePromises = barcodeDataArray.map((barcodeData) => {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const options = { bcid: "code128", text: barcodeData.code };
        bwipjs.toCanvas(canvas, options, (err, cvs) => {
          if (!err) {
            resolve(cvs.toDataURL("image/png"));
          } else {
            reject(err);
          }
        });
      });
    });

    return Promise.all(barcodePromises);
  };

  // const createTableRowITDYN = (x) => {
  //   const formattedNumber = (x - (x - 1)).toString().padStart(6, "0");
  //   switch (true) {
  //     case x >= 1:
  //       return (
  //         <View style={subTableDisplay}>
  //           {reportColumns()}

  //           <View>
  //             <View style={{ display: "flex", flexDirection: "row" }}>
  //               <View style={{ ...inlineStyle, ...inlineOrder }}>
  //                 <Text>{WrapText("1")}</Text>
  //               </View>
  //               <View style={{ ...inlineStyle, ...inlineCode }}>
  //                 <Text>{`XXX-${formattedNumber}`}</Text>
  //               </View>
  //               <View style={{ ...inlineStyle, ...inlineDescr }}>
  //                 <Text>{WrapText("loremfa-rotate-180")}</Text>
  //               </View>
  //               <View style={{ ...inlineStyle, ...inlineQTY }}>
  //                 <Text>{WrapText("99")}</Text>
  //               </View>
  //               <View style={{ ...inlineStyle, ...inlinePrice }}>
  //                 <Text>{WrapText("9999")}</Text>
  //               </View>
  //               <View style={{ ...inlineStyle, ...inlineTotal }}>
  //                 <Text>{WrapText("99999")}</Text>
  //               </View>
  //             </View>
  //           </View>

  //           {[...Array(x - 1)].map((table, index) => {
  //             const formattedNumberx = (index + 2).toString().padStart(6, "0");
  //             return (
  //               <View key={index}>
  //                 <View break={true} style={{ display: "flex", flexDirection: "row" }}>
  //                   <View style={{ ...inlineStyle, ...inlineOrder }}>
  //                     <Text>{WrapText(`${2 + index}`)}</Text>
  //                   </View>
  //                   <View style={{ ...inlineStyle, ...inlineCode }}>
  //                     <Text>{`XXX-${formattedNumberx}`}</Text>
  //                   </View>
  //                   <View style={{ ...inlineStyle, ...inlineDescr }}>
  //                     <Text>{WrapText("loremfa-rotate-180asdasd")}</Text>
  //                   </View>
  //                   <View style={{ ...inlineStyle, ...inlineQTY }}>
  //                     <Text>{WrapText("99")}</Text>
  //                   </View>
  //                   <View style={{ ...inlineStyle, ...inlinePrice }}>
  //                     <Text>{WrapText("9999")}</Text>
  //                   </View>
  //                   <View style={{ ...inlineStyle, ...inlineTotal }}>
  //                     <Text>{WrapText("99999")}</Text>
  //                   </View>
  //                 </View>
  //               </View>
  //             );
  //           })}
  //         </View>
  //       );

  //     default:
  //       break;
  //   }
  // };

  const lastTable = () => {
    return (
      <View>
        <View break>
          <View break={true} style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ ...inlineStyle, ...inlineOrder }}></View>
            <View style={{ ...inlineStyle, ...inlineCode }}></View>
            <View style={{ ...inlineStyle, ...inlineDescr }}></View>
            <View style={{ ...inlineStyle, ...inlineQTY }}></View>
            <View style={{ ...inlineStyle, ...inlinePrice, borderBottom: "1px groove  #000" }}>
              <Text>ราคารวม</Text>
            </View>
            <View
              style={{
                ...inlineStyle,
                ...inlineTotal,
                borderBottom: "1px groove  #000",
                marginHorizontal: "-1",
              }}
            >
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
            <View
              style={{
                ...inlineStyle,
                ...inlineTotal,
                borderBottom: "1px groove  #000",
                marginHorizontal: "-1",
              }}
            >
              <Text>
                {itemsList
                  .reduce((acc, item) => acc + (item.srp - item.srp * (100 / 107)) * item.selectAmount, 0)
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
              <Text>ราคาสุทธิ</Text>
            </View>
            <View
              style={{
                ...inlineStyle,
                ...inlineTotal,
                borderBottom: "1px groove  #000",
                marginHorizontal: "-1",
              }}
            >
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
  };

  //* Rows
  const itemsAmt = itemsList.length;
  let rowsPerPage = 20;
  // if (itemsList.length > rowsPerPage) {
  //   rowsPerPage = rowsPerPage * 2;
  // }
  const emptyRows = rowsPerPage - itemsList.length;
  const pages = Math.ceil(itemsAmt / rowsPerPage);

  const FinalizedDocument = () => {
    const [code] = itemsList;

    let countItems = 0;
    const barcodeImages = generateBarcodes(itemsList)
      .then((barcodeImages) => {
        console.log("ได้รหัสบาโค้ด: ", barcodeImages);
      })
      .catch((err) => {
        console.log("พัง: ", err);
      })
      .finally(() => {
        console.log("จบแล้วpromise");
      });
    return (
      <Document>
        {Array.from({ length: pages }).map((_, pageIndex) => {
          const startIndex = pageIndex * rowsPerPage;
          const endIndex = Math.min((pageIndex + 1) * rowsPerPage, itemsAmt);
          const itemsInPage = itemsList.slice(startIndex, endIndex);

          // Add empty placeholders if the number of items is less than the rowsPerPage
          while (itemsInPage.length < rowsPerPage) {
            itemsInPage.push([
              {
                id: " ",
                code: "",
                productDescription: " ",
                category: " ",
                selectAmount: " ",
                isPlaceholder: true,
              },
            ]); // Add empty object as a placeholder
          }
          console.log("itemsInPage: ", itemsInPage);
          return (
            <Page style={pageStyle} size="A4" orientation="portrait" key={pageIndex}>
              <Text style={pageDisplayStyle} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
              <View style={tableStyle}>
                <View fixed>{createMainTableHeader()}</View>
                <View style={firstTableColStyle}>
                  <View style={subTableDisplay}>
                    {reportColumns()}
                    {itemsInPage.map((item, index) => (
                      <View key={index} style={{ display: "flex", flexDirection: "row" }}>
                        <View
                          style={
                            (startIndex + index + 1) % rowsPerPage === 0
                              ? {
                                  ...inlineStyle,
                                  ...inlineOrder,
                                  marginHorizontal: "-1px",
                                }
                              : {
                                  ...inlineStyle,
                                  ...inlineOrder,
                                  ...celUnderline,
                                }
                          }
                        >
                          {startIndex + index + 1 > itemsAmt ? (
                            <Text style={{ color: "white" }}> {startIndex + index + 1}</Text>
                          ) : (
                            <Text style={{}}> {startIndex + index + 1}</Text>
                          )}
                        </View>

                        <View
                          style={
                            (startIndex + index + 1) % rowsPerPage === 0
                              ? {
                                  ...inlineStyle,
                                  ...inlineCode,
                                  marginHorizontal: "-1px",
                                }
                              : {
                                  ...inlineStyle,
                                  ...inlineCode,
                                  ...celUnderline,
                                }
                          }
                        >
                          <Text>{item.code}</Text>
                          {barcodeImages[index] ? <Image src={barcodeImages} /> : <Text>ไม่มี</Text>}
                        </View>

                        <View
                          style={
                            (startIndex + index + 1) % rowsPerPage === 0
                              ? {
                                  ...inlineStyle,
                                  ...inlineDescr,
                                  marginHorizontal: "-1px",

                                  flexGrow: 1,
                                }
                              : {
                                  ...inlineStyle,
                                  ...inlineDescr,
                                  ...celUnderline,
                                  flexGrow: 1,
                                }
                          }
                        >
                          <Text style={{ whiteSpace: "nowrap" }}>{item?.productDescription}</Text>
                        </View>

                        <View
                          style={
                            (startIndex + index + 1) % rowsPerPage === 0
                              ? {
                                  ...inlineStyle,
                                  ...inlineQTY,
                                  marginHorizontal: "-1px",
                                }
                              : {
                                  ...inlineStyle,
                                  ...inlineQTY,
                                  ...celUnderline,
                                }
                          }
                        >
                          <Text>{item.selectAmount?.toLocaleString()}</Text>
                        </View>

                        <View
                          style={
                            (startIndex + index + 1) % rowsPerPage === 0
                              ? {
                                  ...inlineStyle,
                                  ...inlinePrice,
                                  marginHorizontal: "-1px",
                                }
                              : {
                                  ...inlineStyle,
                                  ...inlinePrice,
                                  ...celUnderline,
                                }
                          }
                        >
                          <Text>{item.srp?.toLocaleString()}</Text>
                        </View>

                        <View
                          style={
                            (startIndex + index + 1) % rowsPerPage === 0
                              ? {
                                  ...inlineStyle,
                                  ...inlineTotal,
                                  marginHorizontal: "-1px",
                                }
                              : {
                                  ...inlineStyle,
                                  ...inlineTotal,
                                  ...celUnderline,
                                }
                          }
                        >
                          {item.srp ? (
                            <Text>{(item.srp * item.selectAmount).toLocaleString()}</Text>
                          ) : (
                            <Text>{""}</Text>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                </View>

                {pageIndex === pages - 1 && <View>{lastTable()}</View>}
              </View>
            </Page>
          );
        })}
      </Document>
    );
  };

  return (
    <Box>
      <PDFViewer style={viewerStyle}> {FinalizedDocument()}</PDFViewer>
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
