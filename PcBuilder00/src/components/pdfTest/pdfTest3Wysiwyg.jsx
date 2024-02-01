import { CardContent } from "@mui/material";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";

function PdfTest3Wysiwyg() {
  //* Style Object
  const styles = {
    cardStyle: { background: "white", color: "black", padding: "20px", margin: "20px" },
    container: { width: "fitContent", height: "fitContent", boxSizing: "borderBox", margin: "60px" },
    printableArea: {},
  };

  //* States Redux
  // const data

  //* Print Specific Component
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //* Display JSX
  return (
    <div style={styles.container}>
      <div style={styles.printableArea} id="printableArea" ref={componentRef}>
        <div style={styles.cardStyle}>
          <div>
            <h1>pdfTest3wysiwyg</h1>
          </div>
          <div>
            <h2>แมว</h2>
            <CardContent>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus placeat beatae sapiente consequuntur
              recusandae error nesciunt debitis velit, incidunt quos. Modi nobis reprehenderit animi? Pariatur, fuga?
              Est architecto et tempora, incidunt sapiente nam nihil a error corporis autem natus vitae perferendis
              tenetur animi? Sapiente ullam accusamus a adipisci nostrum rerum illum aspernatur labore quaerat sint
              consequuntur cupiditate sed porro cumque ea iste, assumenda expedita vero! Reiciendis blanditiis
              perferendis aperiam facere, error ullam explicabo provident nostrum est quasi, impedit unde aspernatur,
              porro dignissimos deleniti rerum? Quod fugit provident quos expedita obcaecati, earum modi at corrupti ad
              quae beatae autem accusantium labore voluptatem voluptas porro magnam. Quidem a aliquam veritatis
              corporis, quisquam, possimus pariatur deleniti tempore aperiam provident cum repellendus mollitia, modi
              corrupti. Dicta corporis enim nesciunt omnis ratione harum ut tempore explicabo nobis, facere odit ex,
              sunt adipisci recusandae eaque repudiandae odio magnam impedit quaerat soluta. Ex debitis, consequuntur
              sit deserunt dolorum sequi pariatur rerum quam nulla. Explicabo consequatur ab animi dolor architecto
              perspiciatis consequuntur adipisci laboriosam porro tempore, atque ipsam omnis reiciendis dolorem corporis
              accusamus itaque asperiores. Ad laboriosam velit consequuntur, nesciunt fugit a blanditiis fugiat dolor
              adipisci dolorem vel earum repellat distinctio nulla voluptate aliquid quas aspernatur dolores unde? Earum
              nobis ducimus inventore? Cum reiciendis voluptatem consequatur itaque ab porro quae doloremque hic
              possimus quod ullam, vel ipsum earum ea. Ipsa est sint nobis quos sequi quis tenetur commodi deserunt
              provident assumenda non, vero quia, consequuntur tempora porro, voluptatum magni maiores! Repudiandae
              quisquam, vel assumenda cum impedit necessitatibus architecto nostrum ut dolor distinctio quibusdam modi
              ipsam amet placeat iure culpa vero expedita maiores! Magni, deserunt cupiditate sed ratione sint
              aspernatur rem consequatur excepturi? Eaque tempore odio odit, repudiandae cum itaque explicabo
              perspiciatis consequatur molestias unde, harum dolorum vitae quia accusantium dolores voluptatibus, fuga
              sapiente sed obcaecati ut? Ea labore deserunt iure magni non nesciunt molestiae corrupti ullam dicta vitae
              officiis doloribus quis consequuntur enim laudantium nisi porro, numquam architecto, repellendus sequi
              soluta error est. Totam mollitia dolorum quo, obcaecati eaque debitis similique eum dolorem rem saepe
              earum. Esse ea animi inventore obcaecati in eaque incidunt fuga facere aspernatur laborum! Veniam ipsa
              consequuntur necessitatibus qui consectetur accusantium maxime, odio, possimus deleniti tenetur voluptatum
              voluptatibus excepturi temporibus facilis hic repellat et earum quas. Beatae vitae saepe architecto. Sit
              quae quaerat impedit quis esse eos provident eveniet debitis sunt, facilis asperiores illum sed nulla
              totam fugit ex excepturi eius labore. Delectus laboriosam atque libero amet impedit distinctio voluptatum
              tempora ipsa quibusdam, doloribus nulla, tempore quis natus eligendi architecto odit dolor, culpa
              voluptate repellat tenetur? Aperiam, molestiae repellat nam corrupti voluptatum fugiat commodi voluptatem
              sed quis. Molestias alias soluta sapiente eos culpa a illo corrupti id, ipsa vitae harum enim fuga earum
              at nisi? Quae repellat culpa eveniet iure impedit vel sit ex beatae, a exercitationem maiores cumque
              aliquid, minima dolorum illum saepe ad veniam voluptatibus harum laboriosam illo voluptate! Error ab vel
              temporibus pariatur vero perspiciatis architecto voluptates reiciendis praesentium, facilis fugiat
              nesciunt, ea, cum veritatis eaque accusamus illo nobis ratione porro.
            </CardContent>
          </div>
        </div>
      </div>

      <div style={styles.cardStyle}>
        <button onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
}

export default PdfTest3Wysiwyg;
