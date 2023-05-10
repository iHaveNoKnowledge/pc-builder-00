import React from "react";
import { Page, View, Text, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";
import x from "../../fonts/ChakraPetch-Medium.ttf";
import logoIMG from "../../assets/itLogo-1.png";
import "./testReportA4.css";

// Create Document Component
const TestReportA4 = () => {
  Font.register({
    family: "Chaka_Petch",
    src: x,
  });
  return (
    <>
      <document className="body">
        <page size="A4" className="page">
          {/* <span>My Table</span> */}
          <table className="table">
            {/* Header row, col name*/}
            <tr className="tableRow">
              <th className="tableCol">
                <img
                  className="tableCell"
                  src={logoIMG}
                  style={{ backgroundColor: "#0033e6" }}
                ></img>
              </th>
              <th className="tableCol">
                <span className="tableCell">
                  Branch Details Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
                  recusandae porro labore. Quod magni, minima eos eligendi provident expedita
                  dolorem!
                </span>
              </th>
              <th className="tableCol">
                <td className="tableCell">
                  <tr className="tableRow">
                    <td className="tableCell">Tel:</td>
                    <td>___________________________</td>
                  </tr>
                  <tr className="tableRow">
                    <td className="tableCell">Name:</td>
                    <td>___________________________</td>
                  </tr>
                  <tr className="tableRow">
                    <td className="tableCell">Sale:</td>
                    <td>___________________________</td>
                  </tr>
                </td>
              </th>
            </tr>
            {/* row1 */}
            <tr className="tableRow">
              <td className="tableCol">
                <span className="tableCell">John Doe</span>
              </td>
              <td className="tableCol">
                <span lassName="tableCell">30</span>
              </td>
            </tr>
            {/* row2 */}
            <tr className="tableRow">
              <td className="tableCol">
                <span lassName="tableCell">Jane Smith</span>
              </td>
              <td className="tableCol">
                <span lassName="tableCell">25</span>
              </td>
            </tr>
            {/* row3 */}
            <tr className="tableRow">
              <td className="tableCol">
                <span lassName="tableCell">Bob Johnson</span>
              </td>
              <td className="tableCol">
                <span lassName="tableCell">40</span>
              </td>
            </tr>
          </table>
        </page>
      </document>
    </>
  );
};

export default TestReportA4;
