import { useRef, useState, useEffect } from "react";
import { Page, Text, View, Document, Image, Font, PDFViewer, usePDF } from "@react-pdf/renderer";
const Preview = (props) => {
  const ref = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  });

  const MyDoc = () => {
    Font.register({
      family: "broadsheet",
      src: broadsheet,
    });
    Font.register({
      family: "jost",
      src: jost,
    });
    Font.register({
      family: "texgyreheros",
      src: texgyreheros,
    });
    return (
      <Document>
        <Page
          size={[20000, 200]}
          style={{
            fontFamily: props.pdfFont,
            fontSize: props.size,
          }}
          orientation="portrait"
        >
          <View style={{ margin: "auto", lineHeight: "0" }}>
            <Text>แมว</Text>
          </View>
        </Page>
      </Document>
    );
  };

  const getDimHandler = (e) => {
    e.preventDefault();

    console.log(width);
  };

  return (
    <>
      <div className="bg-white p-5 mb-5">
        <p className={`${props.font} text-[8rem]`}>{props.preview}</p>
      </div>

      <p ref={ref} id={props.sizeClass} className={`${props.font}`}>
        {props.preview}
      </p>

      <PDFViewer
        document={<MyDoc />}
        style={viewerStyle}
        fileName="somename.pdf"
        className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full"
      >
        {({ blob, url, loading, error }) => (loading ? "Preparing document..." : "Download")}
      </PDFViewer>
      <button onClick={getDimHandler}>Get Dims</button>
    </>
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

export default Preview;
