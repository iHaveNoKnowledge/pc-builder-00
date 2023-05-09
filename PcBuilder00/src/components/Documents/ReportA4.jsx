import React from "react";
import { Page, Text, View, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";
import x from "../../fonts/ChakraPetch-Medium.ttf";
import logoIMG from "../../../public/itLogo-1.png";

// Create styles

const styles = StyleSheet.create({
  containner: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Chaka_Petch",
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
});

// Create Document Component
const ReportA4 = () => {
  console.log("xxxxx", x);
  Font.register({
    family: "Chaka_Petch",
    src: x,
  });
  return (
    <>
      <Document>
        <Page size="A4" style={styles.containner}>
          <View style={{ padding: "20px" }}>
            <View style={{ backgroundColor: "#fff", padding: "20px" }}>
              {/* uppercluster */}
              <View fixed>
                <View style={styles.header}>
                  <View style={styles.itemPrintFirstChild}>
                    <Image src={logoIMG} style={{}} />
                  </View>
                  <Text style={styles.itemPrintMidChild}>สาขาบ้านหนองประดู่</Text>
                  <View style={styles.itemPrintLastChild}>
                    <View>
                      <Text>Tel:</Text>
                      <Text>_______________________</Text>
                    </View>
                    <View
                      style={{
                        borderLeft: "1px solid #000",
                        marginLeft: "10px",
                        paddingLeft: "10px",
                      }}
                    >
                      <Text>Name:</Text>
                      <Text>_______________________</Text>
                    </View>
                    <View
                      style={{
                        borderLeft: "1px solid #000",
                        marginLeft: "10px",
                        paddingLeft: "10px",
                      }}
                    >
                      <Text>Sale:</Text>
                      <Text>_______________________</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* lower Cluster */}
              <View style={styles.mainContent}>
                <View>
                  {[...Array(5)].map((item, index) => {
                    return (
                      <View key={index}>
                        <Text>{index + 1}list item loopกินไก่ป่าว</Text>
                        {index !== 0 && index % 25 === 0 && (
                          <View
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              borderTop: "1px solid #000",
                            }}
                          />
                        )}
                      </View>
                    );
                  })}
                </View>

                <View style={{ display: "flex", marginTop: "20px" }}>
                  <View
                    style={{
                      border: "1px dashed red",
                      flex: 1,
                      height: "50px",
                      marginRight: "10px",
                    }}
                  >
                    <Text>1</Text>
                  </View>
                  <View
                    style={{
                      border: "1px dashed red",
                      flex: 1,
                      height: "50px",
                      marginRight: "10px",
                    }}
                  >
                    <Text>2</Text>
                  </View>
                  <View style={{ border: "1px dashed red", flex: 1, height: "50px" }}>
                    <Text>3</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </>
  );
};

export default ReportA4;
