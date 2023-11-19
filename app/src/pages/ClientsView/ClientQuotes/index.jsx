import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import Loading from "../../../components/Loading/Loading";
import Modal from "../../Quotes/ModalEditQuote";
import { getClient } from "../../../services/Client.service";
import {
  deleteQuotes,
  getQuoteByClientId,
  updateQuoteStatus,
} from "../../../services/Quotes.service";
import messageBox from "../../../utils/messagebox";
import { formatDate } from "../../../utils/tools";
import Avatar1 from "../../../images/avatars/1.png";
import IconEdit from "../../../images/Cotizaciones/Vector.png";
import IconDelete from "../../../images/Cotizaciones/mdi_delete-outline.png";
import { UserContext } from "../../../context/UserContext";
import { getProjectId } from "../../../services/Projects.service";

function ClientQuotes() {
  let locations = useLocation();
  let idClient = locations.state.idClient;
  let [isLoading, setIsLoading] = useState(true);
  let [clientData, setClientData] = useState({});
  let [quotesClient, setQuotesClient] = useState([]);
  let [activeModal, setActiveModal] = useState(false);
  let [dataProject, setDataProject] = useState({});
  let [dataClient, setDataClient] = useState({});
  let [isUpdate, setIsUpdate] = useState(false);
  let [status, setStatus] = useState("noState");
  let userData = useContext(UserContext).user;
  let navigate = useNavigate();

  useEffect(() => {
    getClientData();
  }, []);

  async function getClientData() {
    await getClient(idClient)
      .then(async ({ data }) => {
        if (data.error) {
          messageBox.Simple(data.message, "error");
        } else {
          setClientData(data);
          await getQuoteByClientId(idClient, userData.id, userData.role)
            .then(({ data }) => {
              if (data.error) return messageBox.Simple(data.message, "error");
              setQuotesClient(data.Quotes);
              setIsLoading(false);
            })
            .catch((err) => messageBox.Simple(err, "error"));
        }
      })
      .catch((err) => messageBox.Simple(err, "error"));
  }

  async function changeStatus(id, value) {
    setStatus(value);
    await updateQuoteStatus(id, value).then(({ data }) => {
      if (data.error) {
        messageBox.Simple(data.message, "error");
      } else {
        messageBox.Simple(data.message, "success");
        setTimeout(() => window.location.reload(), 1000);
      }
    });
  }

  async function deleteQuote(idProject) {
    await deleteQuotes(idProject)
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

  async function editQuote(project, isUpdate) {
    await getProjectId(project.projectId).then(async ({ data }) => {
      if (data.error) return messageBox.Simple(data.message, "error");
      data = { ...data, ...project };
      setDataProject(data);
      await getClient(project.clientId)
        .then(({ data }) => {
          if (data.error) return messageBox.Simple(data.message, "error");
          setDataClient(data);
          if (isUpdate) setIsUpdate(true);
          else setIsUpdate(false);
          setActiveModal(true);
        })
        .catch((err) => messageBox.Simple(err, "error"));
    });
  }

  function redirectQuoteHistory(projectData) {
    navigate("../quotesHistory", { state: { projectData } });
  }

  let stylesStatus = {
    AP: { color: "text-lime-500", text: "Aprobado" },
    MD: { color: "text-sky-400", text: "Modificado" },
    PE: { color: "text-yellow-400", text: "Pendiente" },
    NE: { color: "text-red-500", text: "Rechazado" },
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
              Cotizaciones del cliente {">"}{" "}
              {clientData.firstName ? clientData.firstName : "No Data"}
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
                            Primer Nombre
                          </p>
                          <h5 className="card-title fw-semibold">
                            {clientData.firstName
                              ? clientData.firstName
                              : "No Data"}
                          </h5>
                        </div>
                        <div className="mt-2 mx-2">
                          <p
                            className="card-text xl:text-base lg:text-xs"
                            style={{ color: "#9A9A9A" }}
                          >
                            Segundo Nombre
                          </p>
                          <h5 className="card-title fw-semibold">
                            {clientData.secundName
                              ? clientData.secundName
                              : "No Data"}
                          </h5>
                        </div>
                        <div className="mt-2 mx-2">
                          <p
                            className="card-text xl:text-base lg:text-xs"
                            style={{ color: "#9A9A9A" }}
                          >
                            Primer apellido
                          </p>
                          <h5 className="card-title fw-semibold">
                            {clientData.firstLastName
                              ? clientData.firstLastName
                              : "No Data"}
                          </h5>
                        </div>
                        <div className="mt-2 mx-2">
                          <p
                            className="card-text xl:text-base lg:text-xs"
                            style={{ color: "#9A9A9A" }}
                          >
                            Segundo apellido
                          </p>
                          <h5 className="card-title fw-semibold">
                            {clientData.secundLastName
                              ? clientData.secundLastName
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
                            {clientData.email ? clientData.email : "No Data"}
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
                            {clientData.company
                              ? clientData.company
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
                            {clientData.website ? (
                              <a href={`https://${clientData.website}`}>
                                {clientData.website}
                              </a>
                            ) : (
                              "No Data"
                            )}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-auto border rounded-lg mt-5">
              <table className="min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                    >
                      ID Cotización
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                    >
                      <span className="inline-flex items-center">Estatus</span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                    >
                      <span className="inline-flex items-center">Proyecto</span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                    >
                      <span className="inline-flex items-center">
                        Referencia
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                    >
                      <span className="inline-flex items-center">
                        Alcances del servicio a realizar
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                    >
                      <span className="inline-flex items-center">Precio</span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                    >
                      <span className="inline-flex items-center">
                        Fecha envío
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {quotesClient.length === 0 ? (
                    <tr>
                      <td
                        className="p-3 text-lg font-semibold text-center"
                        colSpan="7"
                      >
                        Usted no ha realizado cotizaciones para este cliente.
                      </td>
                    </tr>
                  ) : (
                    quotesClient.map((quote) => {
                      return (
                        <tr key={quote.quoteId}>
                          <td className="px-6 py-3 text-sm font-medium text-gray-800 whitespace-nowrap text-center align-top">
                            {quote.quoteId}
                            <div className="mx-auto flex justify-content-center mt-4 pt-2">
                              {(quote.status === "MD" ||
                                quote.status === "PE") && (
                                <>
                                  <button>
                                    <img
                                      className="w-6 h-6 mx-1 mt-0.5"
                                      src={IconEdit}
                                      title="Modificar proyecto"
                                      alt=""
                                      onClick={() => editQuote(quote, true)}
                                    />
                                  </button>
                                  <button>
                                    <img
                                      className="w-7 h-7 mx-1"
                                      src={IconDelete}
                                      title="Eliminar proyecto"
                                      alt=""
                                      onClick={() => deleteQuote(quote.quoteId)}
                                    />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                          <td
                            className={`px-6 py-3 font-bold text-md ${
                              stylesStatus[quote.status].color
                            } whitespace-nowrap text-center align-top`}
                          >
                            {stylesStatus[quote.status].text.toUpperCase()}
                            {userData.role === 3 &&
                              (quote.status === "MD" ||
                                quote.status === "PE") && (
                                <>
                                  <label htmlFor="select-status">
                                    Cambiar status
                                  </label>
                                  <div className="select">
                                    <select
                                      value={status}
                                      style={{ borderRadius: "1em" }}
                                      id="select-status"
                                      onChange={(e) =>
                                        changeStatus(
                                          quote.quoteId,
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option
                                        value="noState"
                                        style={{
                                          color: "#697a8d",
                                          textAlign: "center",
                                        }}
                                        disabled
                                      >
                                        Cambiar estatus
                                      </option>
                                      <option
                                        value="AP"
                                        style={{ color: "#697a8d" }}
                                      >
                                        Aprobar
                                      </option>
                                      <option
                                        value="NE"
                                        style={{ color: "#697a8d" }}
                                      >
                                        Denegar
                                      </option>
                                    </select>
                                  </div>
                                </>
                              )}
                          </td>
                          <td className="px-6 py-3 text-sm text-gray-800 whitespace-nowrap text-center align-top">
                            {quote.title}
                          </td>
                          <td className="px-6 py-3 text-sm text-gray-800 whitespace-nowrap text-center align-top">
                            {quote.reference}
                          </td>
                          <td className="px-6 py-3 text-sm text-gray-800 whitespace-nowrap text-center align-top">
                            {quote.scope}
                          </td>
                          <td className="px-6 py-3 text-sm text-gray-800 whitespace-nowrap text-center align-top">
                            € {quote.price}
                          </td>
                          <td className="px-6 py-3 text-sm font-medium text-gray-800 whitespace-nowrap text-center align-top">
                            {formatDate(quote.createDate)}
                            <button
                              type="button"
                              className="btn rounded-pill ColorButtonMainInv flex mx-auto my-2 px-4"
                              onClick={() => redirectQuoteHistory(quote)}
                            >
                              Historial de Cotización
                            </button>
                            <p
                              className="text-link fw-semibold flex items-center justify-center"
                              style={{
                                color: "#00a297",
                              }}
                              onClick={() => editQuote(quote, false)}
                            >
                              Ver detalle de cotización
                            </p>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
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
            Context={userData}
            clientId={dataProject.idClient}
            dataClient={dataClient}
            dataProject={dataProject}
            projectId={dataProject.projectId}
            setShowModalCot={setActiveModal}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
          />
        </div>
      )}
    </>
  );
}

export default ClientQuotes;
