import React, { useState, useEffect, useRef } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import xx from "../../fonts/ChakraPetch-Medium.ttf";
import logoIMG from "../../assets/itLogo-1.png";
import html2canvas from "html2canvas";

//componentย่อย สำหรับใส่เนื้อหอย
export const Subcomponent = () => {
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

            {/* datarow1 */}
            <tr className="tableRow">
              <td className="tableCol">
                <span className="tableCell">John Doe</span>
              </td>
              <td className="tableCol">
                <span lassName="tableCell">30</span>
              </td>
            </tr>

            {/* datarow2 */}
            <tr className="tableRow">
              <td className="tableCol">
                <span lassName="tableCell">Jane Smith</span>
              </td>
              <td className="tableCol">
                <span lassName="tableCell">25</span>
              </td>
            </tr>

            {/* datarow3 */}
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

// componentหลัก
const ReportA4 = () => {
  Font.register({
    family: "Chaka_Petch",
    src: xx,
  });

  const subRef = useRef(null);
  console.log("componentย่อย", subRef.current);

  const optionScreenShot = { scale: 2 };

  const screenShot = (element) => {
    // html2canvas(element, optionScreenShot).then((canvas) => document.body.appendChild(canvas));
    html2canvas(element, optionScreenShot).then((canvas) => {
      const image = canvas.toDataURL("png");
      const a = document.createElement("a");
      a.setAttribute("download", "certificate.png");
      a.setAttribute("href", image);
      a.click();
    });
  };

  return (
    <>
      <div>test06</div>
      <div ref={subRef}>
        <Subcomponent />
      </div>
      <button
        onClick={() => {
          screenShot(subRef.current);
        }}
      >
        Buttons
      </button>
    </>
  );
};

export default ReportA4;
