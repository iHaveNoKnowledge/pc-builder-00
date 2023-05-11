import React, { useState, useEffect, useRef } from "react";
import { Page, Text, View, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";
import x from "../../fonts/ChakraPetch-Medium.ttf";
import logoIMG from "../../assets/itLogo-1.png";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

// Create styles

const styles = StyleSheet.create({
  containner: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Chaka_Petch",
    paddingBottom: "100px",
  },
  whiteBG2: {
    backgroundColor: "white",
  },
  header: {
    border: "0.015rem dashed green",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    // padding: 5,
  },
  itemPrint: {
    // padding: 5,
  },
  itemPrintFirstChild: {
    border: "0.015rem dashed blue",
    backgroundColor: "#0033e6",
    flexGrow: 0.5,
    textAlign: "center",
    alignSelf: "center",
    width: "100%",
  },
  itemPrintMidChild: {
    border: "0.015rem dashed blue",
    flexGrow: 1,
    width: "100%",

    alignSelf: "center",
  },
  itemPrintLastChild: {
    border: "0.015rem dashed blue",
    flexGrow: 2,
    alignSelf: "center",
    width: "100%",
  },
  mainContent: {
    border: "0.015rem dashed green",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 5,
  },
  uppersection: {
    alignItems: "center",
  },
  ul: {
    listStyleType: "none",
    border: "0.015rem dashed blue",
  },
  li: {
    border: "0.015rem dashed red",
  },
  lowersection: {
    display: "flex",
    justifyContent: "flex-end",
    border: "0.015rem dashed blue",
  },
  page: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
  // table: {
  //   display: "table",
  //   width: "auto",
  //   borderStyle: "solid",
  //   borderWidth: 1,
  //   borderRightWidth: 0,
  //   borderBottomWidth: 0,
  // },
  // tableRow: {
  //   display: "table-row",
  //   flexDirection: "row",
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#bfbfbf",
  // },
  // tableCell: {
  //   display: "ta",
  //   margin: "auto",
  //   fontSize: "10px",
  //   padding: "5px",
  //   borderStyle: "solid",
  //   borderWidth: "1px",
  //   borderColor: "#bfbfbf",
  // },
  table: {
    width: "auto",
    borderStyle: "dashed",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    padding: "1.9cm 1.32cm 3.67cm 1.9cm",
  },
  tableRow: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },

  tableRowIn: {
    display: "flex",
    flexDirection: "row",
  },

  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    display: "flex",
    justifyContent: "center",
  },

  tableColIn: {
    display: "flex",
    justifyContent: "center",
    // width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },

  tableColIMG: {
    // verticalAlign: "middle",
    // textAlign: "center",
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    display: "flex",
    justifyContent: "center",
  },
  // tableCell: { margin: "2.5px", fontSize: 10 },
  tableCell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    margin: "2.5px",
  },
  tableCellIn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
  },
});

// Create Document Component
const ReportA4 = () => {
  Font.register({
    family: "Chaka_Petch",
    src: x,
  });

  const refTest1 = useRef();

  useEffect(() => {
    console.log("change", refTest1.current);
  }, [refTest1.current]);
  return (
    <>
      <Document ref={refTest1}>
        <Page size="A4" style={styles.page}>
          <View style={styles.table}>
            {/* TableHeader */}
            <View style={styles.tableRow}>
              <View style={styles.tableColIMG}>
                <View style={styles.tableCell}>
                  <Image
                    src={logoIMG}
                    style={{ backgroundColor: "#0033e6", padding: "3px 2px 1px 2.5px" }}
                  ></Image>
                </View>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  Branch Details Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
                  recusandae porro labore. Quod magni, minima eos eligendi
                </Text>
              </View>
              <View style={styles.tableCol}>
                <View style={styles.tableRowIn}>
                  <View style={styles.tableColIn}>
                    <Text style={styles.tableCellIn}>Tel:</Text>
                  </View>
                  <View style={styles.tableColIn}>
                    <Text>______</Text>
                  </View>
                </View>

                <View style={styles.tableRowIn}>
                  <View style={styles.tableColIn}>
                    <Text style={styles.tableCellIn}>Name:</Text>
                  </View>
                  <View style={styles.tableColIn}>
                    <Text>______</Text>
                  </View>
                </View>

                <View style={styles.tableRowIn}>
                  <View style={styles.tableColIn}>
                    <Text style={styles.tableCellIn}>Sale:</Text>
                  </View>
                  <Text style={styles.tableColIn}>
                    <Text>______</Text>
                  </Text>
                </View>
              </View>
            </View>
            {/* TableContent */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>React-PDF</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>3 User </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default ReportA4;
