import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";

export default function PdfText2() {
  const itemsList = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
  ];
  const itemsAmt = itemsList.length;
  const itemsPerPage = 10;
  const pages = Math.ceil(itemsAmt / itemsPerPage);
  return (
    <PDFViewer width={700} height={800}>
      <Document>
        {Array.from({ length: pages }).map((_, pageIndex) => {
          const startIndex = pageIndex * itemsPerPage;
          const endIndex = Math.min((pageIndex + 1) * itemsPerPage, itemsAmt);
          const itemsInPage = itemsList.slice(startIndex, endIndex);

          // Add empty placeholders if the number of items is less than the itemsPerPage
          while (itemsInPage.length < itemsPerPage) {
            itemsInPage.push([" "]); // Add empty object as a placeholder
          }

          return (
            <Page size="A4" key={pageIndex}>
              <View>
                <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
                <View>
                  <Text>Header </Text>
                </View>

                {itemsInPage.map((item, index) => (
                  <View key={index} style={{ display: "flex", flexDirection: "row" }}>
                    <Text>{item}</Text>
                  </View>
                ))}
                {pageIndex === pages - 1 && (
                  <View>
                    <Text>Summary</Text>
                  </View>
                )}
              </View>
            </Page>
          );
        })}
      </Document>
    </PDFViewer>
  );
}
