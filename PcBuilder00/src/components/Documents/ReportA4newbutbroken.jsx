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
import { TableRow } from "@mui/material";

// Create styles

const styles = StyleSheet.create({
  containner: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Chaka_Petch",
    paddingBottom: "100px",
  },
  itemPrintFirstChild: {
    border: "0.015rem dashed blue",
    backgroundColor: "#0033e6",
    flexGrow: 0.5,
    textAlign: "center",
    alignSelf: "center",
    maxWidth: "20%",
  },
  itemPrintMidChild: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  itemPrintLastChild: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  page: {
    display: "flex",
    alignItems: "center",
    padding: "1.9cm 1.32cm 3.67cm 1.9cm",
    fontFamily: "Chaka_Petch",
  },

  table: {
    width: "auto",
    borderStyle: "dashed",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: "pink",
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

  tableColIn: {
    display: "flex",
    justifyContent: "center",
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
    justifyContent: "center",
    fontSize: 12,
  },
  tableCellIn: {
    display: "flex",
    justifyContent: "center",
    fontSize: 10,
  },
  descriptionHeader: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    maxWidth: "37.5%",
    backgroundColor: "pink",
    padding: 1,
  },
  descriptionHeaderIn: {
    textAlign: "left",
    maxWidth: "37.5%",
    backgroundColor: "cyan",
    padding: 2,
    fontSize: 10,
  },
});

// Create Document Component
const ReportA4 = () => {
  Font.register({
    family: "Chaka_Petch",
    src: x,
  });

  const branchDetail = "สาขาไหนก็ได้แล้วแต่";
  let count = 100;
  return (
    <>
      <Document>
        <Page wrap={false} size="A4" style={styles.page}>
          <Table style={styles.table} data={[{}]}>
            <TableHeader style={styles.header}>
              <Image src={logoIMG} style={styles.itemPrintFirstChild}></Image>
              <TableCell style={styles.itemPrintMidChild}>{branchDetail}</TableCell>
              <TableCell style={styles.itemPrintLastChild}>DOB</TableCell>
            </TableHeader>
            <TableBody>
              <TableCell style={{ margin: "10px" }}>
                <Table
                  data={[
                    {
                      code: "XXX-000001",
                      description: "ASROCK B760M STEEL LEGEND WIFI DDR5 LGA1700 (3Y)",
                      firstName: "John",
                      lastName: "Smith",
                      stance: "AeroSmith",
                      dob: new Date(2000, 1, 1),
                      country: "Australia",
                      phoneNumber: "xxx-0000-0000",
                      amount: 200,
                      price: 1000,
                    },
                    {
                      code: "XXX-000002",
                      description:
                        "G.SKILL TRDENT Z5 RGB 32GB (2x16GB) DDR5 5600MHz F5-5600J4040C16GX2-TZ5RK BLK",
                      firstName: "Jotaro",
                      lastName: "Kujoh",
                      stance: "Starplatinum",
                      dob: new Date(1995, 1, 1),
                      country: "Japan",
                      phoneNumber: "xxx-0000-0000",
                      amount: 1,
                      price: 10000,
                    },
                    {
                      code: "XXX-000003",
                      description:
                        "GIGABYTE AORUS RADEON RX6900XT XTREME WATERFORCE WB 16GB GDDR6 256 bit CL 19-31/8/22",
                      firstName: "Jonathan",
                      lastName: "Joestar",
                      stance: "HermitPerple",
                      dob: new Date(1945, 1, 1),
                      country: "England",
                      phoneNumber: "xxx-0000-0000",
                      amount: 1,
                      price: 100000,
                    },
                    {
                      code: "XXX-000001",
                      description: "ASROCK B760M STEEL LEGEND WIFI DDR5 LGA1700 (3Y)",
                      firstName: "John",
                      lastName: "Smith",
                      stance: "AeroSmith",
                      dob: new Date(2000, 1, 1),
                      country: "Australia",
                      phoneNumber: "xxx-0000-0000",
                      amount: 200,
                      price: 1000,
                    },
                    {
                      code: "XXX-000002",
                      description:
                        "G.SKILL TRDENT Z5 RGB 32GB (2x16GB) DDR5 5600MHz F5-5600J4040C16GX2-TZ5RK BLK",
                      firstName: "Jotaro",
                      lastName: "Kujoh",
                      stance: "Starplatinum",
                      dob: new Date(1995, 1, 1),
                      country: "Japan",
                      phoneNumber: "xxx-0000-0000",
                      amount: 1,
                      price: 10000,
                    },
                    {
                      code: "XXX-000003",
                      description:
                        "GIGABYTE AORUS RADEON RX6900XT XTREME WATERFORCE WB 16GB GDDR6 256 bit CL 19-31/8/22",
                      firstName: "Jonathan",
                      lastName: "Joestar",
                      stance: "HermitPerple",
                      dob: new Date(1945, 1, 1),
                      country: "England",
                      phoneNumber: "xxx-0000-0000",
                      amount: 1,
                      price: 100000,
                    },
                    {
                      code: "XXX-000001",
                      description: "ASROCK B760M STEEL LEGEND WIFI DDR5 LGA1700 (3Y)",
                      firstName: "John",
                      lastName: "Smith",
                      stance: "AeroSmith",
                      dob: new Date(2000, 1, 1),
                      country: "Australia",
                      phoneNumber: "xxx-0000-0000",
                      amount: 200,
                      price: 1000,
                    },
                    {
                      code: "XXX-000002",
                      description:
                        "G.SKILL TRDENT Z5 RGB 32GB (2x16GB) DDR5 5600MHz F5-5600J4040C16GX2-TZ5RK BLK",
                      firstName: "Jotaro",
                      lastName: "Kujoh",
                      stance: "Starplatinum",
                      dob: new Date(1995, 1, 1),
                      country: "Japan",
                      phoneNumber: "xxx-0000-0000",
                      amount: 1,
                      price: 10000,
                    },
                    {
                      code: "XXX-000003",
                      description:
                        "GIGABYTE AORUS RADEON RX6900XT XTREME WATERFORCE WB 16GB GDDR6 256 bit CL 19-31/8/22",
                      firstName: "Jonathan",
                      lastName: "Joestar",
                      stance: "HermitPerple",
                      dob: new Date(1945, 1, 1),
                      country: "England",
                      phoneNumber: "xxx-0000-0000",
                      amount: 1,
                      price: 100000,
                    },
                    {
                      code: "XXX-000001",
                      description: "ASROCK B760M STEEL LEGEND WIFI DDR5 LGA1700 (3Y)",
                      firstName: "John",
                      lastName: "Smith",
                      stance: "AeroSmith",
                      dob: new Date(2000, 1, 1),
                      country: "Australia",
                      phoneNumber: "xxx-0000-0000",
                      amount: 200,
                      price: 1000,
                    },
                    {
                      code: "XXX-000002",
                      description:
                        "G.SKILL TRDENT Z5 RGB 32GB (2x16GB) DDR5 5600MHz F5-5600J4040C16GX2-TZ5RK BLK",
                      firstName: "Jotaro",
                      lastName: "Kujoh",
                      stance: "Starplatinum",
                      dob: new Date(1995, 1, 1),
                      country: "Japan",
                      phoneNumber: "xxx-0000-0000",
                      amount: 1,
                      price: 10000,
                    },
                    {
                      code: "XXX-000003",
                      description:
                        "GIGABYTE AORUS RADEON RX6900XT XTREME WATERFORCE WB 16GB GDDR6 256 bit CL 19-31/8/22",
                      firstName: "Jonathan",
                      lastName: "Joestar",
                      stance: "HermitPerple",
                      dob: new Date(1945, 1, 1),
                      country: "England",
                      phoneNumber: "xxx-0000-0000",
                      amount: 1,
                      price: 100000,
                    },
                    {
                      code: "XXX-000001",
                      description: "ASROCK B760M STEEL LEGEND WIFI DDR5 LGA1700 (3Y)",
                      firstName: "John",
                      lastName: "Smith",
                      stance: "AeroSmith",
                      dob: new Date(2000, 1, 1),
                      country: "Australia",
                      phoneNumber: "xxx-0000-0000",
                      amount: 200,
                      price: 1000,
                    },
                    {
                      code: "XXX-000002",
                      description:
                        "G.SKILL TRDENT Z5 RGB 32GB (2x16GB) DDR5 5600MHz F5-5600J4040C16GX2-TZ5RK BLK",
                      firstName: "Jotaro",
                      lastName: "Kujoh",
                      stance: "Starplatinum",
                      dob: new Date(1995, 1, 1),
                      country: "Japan",
                      phoneNumber: "xxx-0000-0000",
                      amount: 1,
                      price: 10000,
                    },
                    {
                      code: "XXX-000003",
                      description:
                        "GIGABYTE AORUS RADEON RX6900XT XTREME WATERFORCE WB 16GB GDDR6 256 bit CL 19-31/8/22",
                      firstName: "Jonathan",
                      lastName: "Joestar",
                      stance: "HermitPerple",
                      dob: new Date(1945, 1, 1),
                      country: "England",
                      phoneNumber: "xxx-0000-0000",
                      amount: 1,
                      price: 100000,
                    },
                    {
                      code: "XXX-000003",
                      description:
                        "GIGABYTE AORUS RADEON RX6900XT XTREME WATERFORCE WB 16GB GDDR6 256 bit CL 19-31/8/22",
                      firstName: "Jonathan",
                      lastName: "Joestar",
                      stance: "HermitPerple",
                      dob: new Date(1945, 1, 1),
                      country: "England",
                      phoneNumber: "xxx-0000-0000",
                      amount: 1,
                      price: 100000,
                    },
                    {
                      code: "XXX-000003",
                      description:
                        "GIGABYTE AORUS RADEON RX6900XT XTREME WATERFORCE WB 16GB GDDR6 256 bit CL 19-31/8/22",
                      firstName: "Jonathan",
                      lastName: "Joestar",
                      stance: "HermitPerple",
                      dob: new Date(1945, 1, 1),
                      country: "England",
                      phoneNumber: "xxx-0000-0000",
                      amount: 1,
                      price: 100000,
                    },
                    {
                      code: "XXX-000003",
                      description:
                        "GIGABYTE AORUS RADEON RX6900XT XTREME WATERFORCE WB 16GB GDDR6 256 bit CL 19-31/8/22",
                      firstName: "Jonathan",
                      lastName: "Joestar",
                      stance: "HermitPerple",
                      dob: new Date(1945, 1, 1),
                      country: "England",
                      phoneNumber: "xxx-0000-0000",
                      amount: 1,
                      price: 100000,
                    },
                  ]}
                >
                  <TableHeader textAlign={"center"}>
                    <TableCell weighting={0.05} style={styles.tableCell}>
                      No.
                    </TableCell>
                    <TableCell weighting={0.125} style={styles.tableCell}>
                      Code
                    </TableCell>
                    <TableCell style={styles.descriptionHeader}>Description</TableCell>
                    <TableCell weighting={0.05} style={styles.tableCell}>
                      Qty
                    </TableCell>
                    <TableCell weighting={0.125} style={styles.tableCell}>
                      Unit Price
                    </TableCell>
                    <TableCell weighting={0.09} style={styles.tableCell}>
                      Total
                    </TableCell>
                  </TableHeader>

                  <TableBody textAlign={"center"}>
                    <DataTableCell
                      weighting={0.05}
                      style={styles.tableCellIn}
                      getContent={(r) => {
                        count++;
                        return <Text>{count}</Text>;
                      }}
                    />
                    <DataTableCell
                      weighting={0.125}
                      style={styles.tableCellIn}
                      getContent={(r) => r.code}
                    />
                    <DataTableCell
                      style={styles.descriptionHeaderIn}
                      getContent={(r) => r.description}
                    />
                    <DataTableCell
                      weighting={0.05}
                      style={styles.tableCellIn}
                      getContent={(r) => r.amount}
                    />
                    <DataTableCell
                      weighting={0.125}
                      style={styles.tableCellIn}
                      getContent={(r) => r.price}
                    />
                    <DataTableCell
                      weighting={0.09}
                      style={styles.tableCellIn}
                      getContent={(r) => (r.price * r.amount).toLocaleString()}
                    />
                  </TableBody>
                </Table>
              </TableCell>
            </TableBody>
          </Table>
        </Page>
      </Document>
    </>
  );
};

export default ReportA4;
