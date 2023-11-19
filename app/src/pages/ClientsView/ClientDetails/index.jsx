import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../Quotes/ModalEditQuote";
import messageBox from "../../../utils/messagebox";
import Loading from "../../../components/Loading/Loading";
import { getClient } from "../../../services/Client.service";
import {
  getProjectId,
  addProjectId,
  getProjectClientId,
  deleteProjectId,
} from "../../../services/Projects.service";
import { getQuotesFromProjectsId } from "../../../services/Quotes.service";
import { UserContext } from "../../../context/UserContext";
import CreateProjects from "./CreateProjects";
import CreateQuote from "../../Quotes/CreateQuote";

import LogoView from "../../../images/Frame 108.png";
import LogoDownload from "../../../images/mdi_file-download-outline.png";
import IconAdd from "../../../images/carbon_add.svg";
import IconEdit from "../../../images/Cotizaciones/Vector.png";
import IconDelete from "../../../images/Cotizaciones/mdi_delete-outline.png";
import Avatar1 from "../../../images/avatars/1.png";
import { formatDate } from "../../../utils/tools";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "../../Quotes/GeneratePdf/pdf";
import {
  getProducts,
  getTermsAndConditions,
} from "../../../services/Admin.service";
import { getUser } from "../../../services/Users.service";

export default function ClientsDetails() {
  let navigate = useNavigate();
  let locations = useLocation();
  let idClient = locations.state.id;
  const userContext = useContext(UserContext);
  let Context = userContext.user;

  let idQuotes = 0;

  let [isLoading, setLoading] = useState(true);
  let [Quotes, setQuotes] = useState();
  let [isUpdate, setIsUpdate] = useState(false);
  let [products, setProducts] = useState([]);
  let [activeModal, setActiveModal] = useState(false);
  const [dataClient, setDataClient] = useState({});
  const [dataProjects, setDataProjects] = useState([]);
  const [dataProject, setDataProject] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModalCot, setShowModalCot] = useState(false);
  const [clientId, setClientId] = useState();
  const [contactId, setContactId] = useState();
  const [projectId, setProjectId] = useState();
  const [reference, setReference] = useState();
  const [review, setReview] = useState();
  const [title, setTitle] = useState();
  const [m2, setM2] = useState();
  const [location, setLocation] = useState();
  const [description, setDescription] = useState();
  const [scope, setScope] = useState();
  let [savesQuotes, setSavesQuotes] = useState({});
  let [conceptsProps, setConceptsProps] = useState();
  let [idQuoteLocalStorage, setIdQuoteLocalStorage] = useState();
  let [dataOwner, setDataOwner] = useState([]);
  let [termsAndConditions, setTermsAndConditions] = useState({});

  useEffect(() => {
    _getClientDetails();
  }, []);

  async function _getClientDetails() {
    await getClient(idClient).then(async ({ data }) => {
      if (data.error) messageBox.Simple(data.message, "error");
      else {
        setDataClient(data);
        setClientId(data.id);
        setContactId(data.id);
        await getProjectClientId(idClient).then(async ({ data }) => {
          let DataProject = data;
          if (data.error) {
            messageBox.Simple(data.message, "error");
          } else {
            setDataProjects([...DataProject]);
            await getQuotesFromProjectsId(data)
              .then(async ({ data }) => {
                let DataQuotes = data;
                if (data.error) return messageBox.Simple(data.message, "error");
                setQuotes(DataQuotes);
                await getProducts().then(async ({ data }) => {
                  if (data.error) messageBox.Simple(data.mensaje, "error");
                  else {
                    setProducts(data);
                    setSavesQuotes(
                      JSON.parse(localStorage.getItem("quoteSave")) || {}
                    );
                    await getTermsAndConditions()
                      .then(({ data }) => {
                        setTermsAndConditions(data);
                        DataProject.forEach((data) => {
                          DataQuotes[data.id].forEach((quotes) => {
                            getDataOwners(data.id, quotes.hubspotOwnerId);
                          });
                        });
                        setLoading(false);
                      })
                      .catch((err) => messageBox.Simple(err, "error"));
                  }
                });
              })
              .catch((err) => messageBox.Simple(err, "error"));
          }
        });
      }
    });
  }

  async function getDataOwners(idProject, idOwner) {
    await getUser(idOwner)
      .then(({ data }) => {
        let tempArray = [...dataOwner];
        tempArray[idProject] = data;
        console.log(tempArray);
        setDataOwner([...tempArray]);
      })
      .catch((err) => messageBox.Simple(err, "error"));
  }

  const _getProjectId = async (idP) => {
    await getProjectId(idP).then(({ data }) => {
      if (data.error) messageBox.Simple(data.message, "Error");
      else {
        setDataProject(data);
        setProjectId(data.id);
        setClientId(data.clientId);
        setContactId(data.contactId);
        setReference(data.reference);
        setReview(data.review);
        setTitle(data.title);
        setM2(data.m2);
        setLocation(data.location);
        setDescription(data.description);
        setScope(data.scope);
      }
    });
  };

  const _redirectQuotesClient = async (idClient) => {
    navigate("../clientQuotes", { state: { idClient } });
  };

  const _addClientProject = async (e) => {
    e.preventDefault();
    const obj = {
      clientId,
      contactId,
      reference,
      review,
      title,
      m2,
      location,
      description,
      scope,
    };
    await addProjectId(obj).then(({ data }) => {
      if (data.error) messageBox.Simple(data.message, "Error");
      else {
        messageBox.Simple(data.message, "success");
        setTimeout(() => window.location.reload(), 2000);
      }
    });
  };

  function editProject(projectId) {
    _getProjectId(projectId);
    setIsUpdate(true);
    setShowModalCot(true);
  }

  async function deleteProject(projectId) {
    await deleteProjectId(projectId)
      .then(({ data }) => {
        if (data.error) {
          messageBox.Simple(data.message, "error");
        } else {
          messageBox.Simple(data.message, "success");
          setTimeout(() => window.location.reload(), 2000);
        }
      })
      .catch((err) => messageBox.Simple(err, "error"));
  }

  async function previewQuote(project, isUpdate) {
    await getProjectId(project.projectId).then(async ({ data }) => {
      if (data.error) return messageBox.Simple(data.message, "error");
      data = { ...data, ...project };
      setDataProject(data);
      await getClient(project.clientId)
        .then(({ data }) => {
          if (data.error) return messageBox.Simple(data.message, "error");
          setDataClient(data);
          setIsUpdate(false);
          setActiveModal(true);
        })
        .catch((err) => messageBox.Simple(err, "error"));
    });
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            style={
              showModal
                ? { pointerEvents: "none", overflow: "hidden", opacity: "0.5" }
                : {}
            }
          >
            <div className="container-p-y flex gap-3">
              <div
                onClick={() => navigate("../")}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  background: "#00A297",
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
              <h4
                style={{
                  color: "#004750",
                  fontSize: "32px",
                  fontWeight: "700",
                  lineHeight: "1",
                }}
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("../")}
                >
                  Cliente
                </span>{" "}
                {">"} {dataClient.firstName ? dataClient.firstName : "No Data"}
              </h4>
            </div>

            <div className="mt-2.5">
              <div>
                <div
                  className="col p-3"
                  style={{
                    backgroundColor: "rgba(148, 160, 160, 0.2)",
                    borderRadius: "25px",
                  }}
                >
                  <div className="lg:flex block">
                    <div className="lg:flex block lg:pl-9">
                      <img
                        src={Avatar1}
                        alt=""
                        className="w-40 h-40 rounded-circle m-auto lg:ml-8"
                      />
                      <div className="block m-10">
                        <div className="lg:flex block">
                          <div className="mt-2 mx-2">
                            <p
                              className="card-text xl:text-base lg:text-xs"
                              style={{ color: "#9A9A9A" }}
                            >
                              Nombres
                            </p>
                            <h5 className="card-title fw-semibold">
                              {dataClient.firstName
                                ? dataClient.firstName
                                : "No Data"}
                            </h5>
                          </div>
                          <div className="mt-2 mx-2">
                            <p
                              className="card-text xl:text-base lg:text-xs"
                              style={{ color: "#9A9A9A" }}
                            >
                              Apellidos
                            </p>
                            <h5 className="card-title fw-semibold">
                              {dataClient.firstLastName
                                ? dataClient.firstLastName
                                : "No Data"}
                            </h5>
                          </div>
                        </div>

                        <div className="lg:flex block">
                          <div className="mt-2 mx-2">
                            <p
                              className="card-text xl:text-base lg:text-xs"
                              style={{ color: "#9A9A9A" }}
                            >
                              Email personal
                            </p>
                            <h5 className="card-title fw-semibold">
                              {dataClient.email ? dataClient.email : "No Data"}
                            </h5>
                          </div>
                          <div className="mt-2 mx-2">
                            <p
                              className="card-text xl:text-base lg:text-xs"
                              style={{ color: "#9A9A9A" }}
                            >
                              Empresa (Marca)
                            </p>
                            <h5 className="card-title fw-semibold">
                              {dataClient.company
                                ? dataClient.company
                                : "No Data"}
                            </h5>
                          </div>
                          <div className="mt-2 mx-2">
                            <p
                              className="card-text xl:text-base lg:text-xs"
                              style={{ color: "#9A9A9A" }}
                            >
                              Web de la empresa
                            </p>
                            <h5 className="card-title fw-semibold">
                              {dataClient.website ? (
                                <a href={`https://${dataClient.website}`}>
                                  {dataClient.website}
                                </a>
                              ) : (
                                "No Data"
                              )}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex lg:ml-4 xl:ml-20 ml-0 lg:mt-0 mt-6">
                      <div
                        className="lg:-mt-12 lg:ml-28 mx-10"
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={LogoView}
                          alt=""
                          srcSet=""
                          style={{ width: "50px", height: "auto" }}
                        />
                        <p
                          className="xl:text-base lg:text-xs text-link fw-semibold"
                          style={{
                            color: "#00a297",
                            width: "100%",
                            fontSize: "1em",
                          }}
                          onClick={() => _redirectQuotesClient(dataClient.id)}
                        >
                          Ver todas las cotizaciones
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="flex btn rounded-pill ColorButtonMain my-4 lg:ml-5 mx-10"
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <img src={IconAdd} alt="" />
                    Crear nuevo proyecto
                  </button>
                </div>

                {dataProjects.length > 0 && (
                  <div>
                    <h4
                      className="lg:mt-12 mt-10 lg:ml-0 ml-20"
                      style={{
                        color: "#004750",
                        fontSize: "32px",
                        fontWeight: "700",
                      }}
                    >
                      Proyectos
                    </h4>
                    <div className="lg:mt-10 grid lg:grid-cols-4 grid-cols-1">
                      {dataProjects.map((data, index) => (
                        <div className="lg:mt-4 mt-10 mx-2" key={index}>
                          <div
                            className="card h-100 py-3 m-0 lg:m-4"
                            style={{
                              backgroundColor: "rgba(148, 160, 160, 0.2)",
                            }}
                          >
                            <div className="card-body">
                              <h5 className="card-title text-center text-2xl mb-2">
                                {data.title ? data.title : "No título"}
                              </h5>
                              <div className="mx-auto flex justify-content-center mb-3">
                                <img
                                  className="w-6 h-6 cursor-pointer mx-1 mt-0.5"
                                  src={IconEdit}
                                  title="Modificar proyecto"
                                  alt=""
                                  onClick={() => editProject(data.id)}
                                />
                                <img
                                  className="w-7 h-7 cursor-pointer mx-1"
                                  src={IconDelete}
                                  title="Eliminar proyecto"
                                  alt=""
                                  onClick={() => deleteProject(data.id)}
                                />
                              </div>
                              <p
                                className="card-text text-"
                                style={{ color: "#9A9A9A" }}
                              >
                                Nombre cliente
                              </p>
                              <p className="card-text text-lg fw-semibold">
                                {dataClient.firstName}{" "}
                                {dataClient.firstLastName}
                              </p>
                              {/* <p
                                className="card-text text-base mt-2"
                                style={{ color: "#9A9A9A" }}
                              >
                                ID
                              </p>
                              <p className="card-text text-lg fw-semibold">
                                {data.id}
                              </p> */}
                              <p
                                className="card-text text-base mt-2"
                                style={{ color: "#9A9A9A" }}
                              >
                                Nombre del proyecto
                              </p>
                              <p className="card-text text-lg fw-semibold">
                                {data.title}
                              </p>
                              <p
                                className="card-text text-base mt-2"
                                style={{ color: "#9A9A9A" }}
                              >
                                Breve descripción
                              </p>
                              <p className="card-text text-lg text-justify fw-semibold overflow-hidden">
                                {data.description.substring(0, 150)}...
                              </p>
                              <p
                                className="card-text text-base mt-2"
                                style={{ color: "#9A9A9A" }}
                              >
                                Alcances del servicio a realizar
                              </p>
                              <p className="card-text text-lg text-justify fw-semibold overflow-hidden">
                                {data.scope.substring(0, 150)}...
                              </p>
                              {savesQuotes[data.id] && (
                                <>
                                  <hr className="my-2.5" />
                                  {savesQuotes[`${data.id}`].map(
                                    (quote, index) => {
                                      return (
                                        <p
                                          className="card-text text-lg fw-semibold"
                                          key={index}
                                        >
                                          Tiene una cotización guardada sin
                                          enviar | #{index}.
                                          <br />
                                          <button
                                            type="button"
                                            onClick={() => {
                                              _getProjectId(data.id);
                                              setConceptsProps(quote.fees);
                                              setIdQuoteLocalStorage(index);
                                              setShowModalCot(true);
                                            }}
                                            className="btn rounded-pill ColorButtonMainInv my-2"
                                          >
                                            Click aquí para abrir
                                          </button>
                                        </p>
                                      );
                                    }
                                  )}
                                </>
                              )}
                              <hr className="my-2.5" />
                              <p
                                className="card-text text-base my-2"
                                style={{ color: "#9A9A9A" }}
                              >
                                Cotizaciones:
                              </p>
                              {Quotes[data.id].map((quotes) => {
                                return (
                                  <div key={quotes.id} className="my-2">
                                    <p
                                      className="card-text text-lg fw-semibold"
                                      style={{ color: "#9A9A9A" }}
                                    >
                                      {formatDate(quotes.createDate)}
                                    </p>
                                    <div className="md:block flex gap-3">
                                      <button
                                        type="button"
                                        className="btn rounded-pill ColorButtonMainGreen mt-2"
                                        onClick={() => previewQuote(quotes)}
                                      >
                                        <div className="flex content-center items-center">
                                          <img
                                            src={LogoView}
                                            alt=""
                                            className="w-4 mr-2 TouchGreen"
                                          />
                                          Previsualizar documento
                                        </div>
                                      </button>

                                      <PDFDownloadLink
                                        className="btn rounded-pill ColorButtonMainGreen mt-2 mx-auto lg:ml-0"
                                        document={
                                          <PDF
                                            dataClient={dataClient}
                                            dataProject={quotes}
                                            dataProducts={products}
                                            dataOwner={{
                                              ...dataOwner[data.id],
                                            }}
                                            termsAndConditions={
                                              termsAndConditions
                                            }
                                          />
                                        }
                                        fileName={`PDF Cotización ${data.title}.pdf`}
                                      >
                                        <div className="flex content-center items-center">
                                          <img
                                            src={LogoDownload}
                                            alt=""
                                            className="w-4 mr-2 TouchGreen"
                                          />
                                          Descargar PDF
                                        </div>
                                      </PDFDownloadLink>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setShowModalCot(true);
                                _getProjectId(data.id);
                              }}
                              className="btn rounded-pill ColorButtonMainInv my-1 ml-12 lg:ml-0 mx-4"
                            >
                              Crear nuevo cotización
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {showModal && (
            <div
              className="App h-screen ml-[90px] flex flex-col items-center justify-center bg-purple-200 vw-100 vh-100"
              style={{
                zIndex: "10",
                background: "rgba(0, 162, 151, .55)",
                position: "fixed",
                top: "0",
                right: "0",
                bottom: "0",
                left: "0",
                overflowX: "hidden",
                overflowY: "auto",
              }}
            >
              <CreateProjects
                clientId={clientId}
                contactId={contactId}
                projectId={projectId}
                reference={reference}
                review={review}
                title={title}
                m2={m2}
                location={location}
                description={description}
                scope={scope}
                dataClient={dataClient}
                _addClientProject={_addClientProject}
                setShowModal={setShowModal}
                setClientId={setClientId}
                setReference={setReference}
                setReview={setReview}
                setTitle={setTitle}
                setM2={setM2}
                setLocation={setLocation}
                setDescription={setDescription}
                setScope={setScope}
              />
            </div>
          )}

          {showModalCot && (
            <div
              className="App h-screen ml-[90px] flex flex-col items-center justify-center bg-purple-200"
              style={{
                zIndex: "10",
                background: "rgba(0, 162, 151, .55)",
                position: "fixed",
                top: "0",
                right: "0",
                bottom: "0",
                left: "0",
                overflowX: "hidden",
                overflowY: "auto",
              }}
            >
              <CreateQuote
                clientId={clientId}
                contactId={contactId}
                projectId={projectId}
                reference={reference}
                review={review}
                dataProject={dataProject}
                dataClient={dataClient}
                setShowModalCot={setShowModalCot}
                Context={Context}
                idQuotes={idQuotes}
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate}
                conceptsProps={conceptsProps}
                setConceptsProps={setConceptsProps}
                idQuoteLocalStorage={idQuoteLocalStorage}
                setIdQuoteLocalStorage={setIdQuoteLocalStorage}
              />
            </div>
          )}
        </>
      )}
      {activeModal && (
        <div
          className="App h-screen ml-[90px] flex flex-col items-center justify-center bg-purple-200 vw-100 vh-100"
          style={{
            zIndex: "10",
            background: "rgba(0, 162, 151, .55)",
            position: "fixed",
            top: "0",
            right: "0",
            bottom: "0",
            left: "0",
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          <Modal
            Context={Context}
            clientId={dataProject.idClient}
            dataClient={dataClient}
            dataProject={dataProject}
            projectId={dataProject.projectId}
            setShowModalCot={setActiveModal}
            isUpdate={false}
            setIsUpdate={() => {}}
          />
        </div>
      )}
    </>
  );
}
