import React, { useState, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useLocation, useNavigate } from "react-router-dom";
import PDF from "./pdf";
import Loading from "../../../components/Loading/Loading";
import { getUser } from "../../../services/Users.service";
import messageBox from "../../../utils/messagebox";
import { getTermsAndConditions } from "../../../services/Admin.service";
import { getFees } from "../../../services/Quotes.service";

function GeneratePdf() {
  let location = useLocation();
  let navigate = useNavigate();
  let statePdf = location.state.view;
  let dataClient = location.state.client;
  let dataProject = location.state.project;
  let dataProducts = location.state.products;
  let dataConcepts = location.state.concepts;

  let [loading, setLoading] = useState(true);
  let [dataOwner, setDataOwner] = useState({});
  let [termsAndConditions, setTermsAndConditions] = useState({});
  let [fees, setFees] = useState();

  useEffect(() => {
    getRestOfData();
  }, []);

  async function getRestOfData() {
    let ownerID = Number(dataProject.hubspotOwnerId);
    await getUser(ownerID)
      .then(async ({ data }) => {
        setDataOwner(data);
        await getTermsAndConditions()
          .then(async ({ data }) => {
            setTermsAndConditions(data);
            setLoading(false);
            // await getFees(dataProject.id)
            //   .then(({ data }) => {
            //     setFees(data);
            //     setLoading(false);
            //   })
            //   .catch((err) => messageBox.Simple(err, "error"));
          })
          .catch((err) => messageBox.Simple(err, "error"));
      })
      .catch((err) => messageBox.Simple(err, "error"));
  }

  return loading ? (
    <Loading />
  ) : (
    statePdf && (
      <div style={{ position: "relative" }}>
        <div
          onClick={() => navigate("../")}
          style={{
            width: 30,
            height: 30,
            borderRadius: 50,
            background: "#00A297",
            position: "absolute",
            left: 10,
            top: -40,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#FFF"
            class="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </div>
        <PDFViewer
          fileName={`PDF Cotización ${dataProject.title}.pdf`}
          style={{ width: "100%", height: "90vh", marginTop: 40 }}
        >
          <PDF
            dataClient={dataClient}
            dataProject={dataProject}
            dataProducts={dataProducts}
            dataOwner={dataOwner}
            dataFees={dataConcepts}
            termsAndConditions={termsAndConditions}
          />
        </PDFViewer>
      </div>
    )
  );
}

export default GeneratePdf;
