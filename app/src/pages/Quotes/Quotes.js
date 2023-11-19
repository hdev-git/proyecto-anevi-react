import React, { useState, useEffect, useContext } from "react";

import {
  deleteQuotes,
  getQuotes,
  updateQuoteStatus,
} from "../../services/Quotes.service";
import Modal from "./ModalEditQuote";
import messageBox from "../../utils/messagebox";
import { UserContext } from "../../context/UserContext";
import { formatDate } from "../../utils/tools";
import { getClient } from "../../services/Client.service";
import Loading from "../../components/Loading/Loading";
import LogoSearch from "../../images/Home/Vector.png";
import IconEdit from "../../images/Cotizaciones/Vector.png";
import IconDelete from "../../images/Cotizaciones/mdi_delete-outline.png";
import { getProjectId } from "../../services/Projects.service";
import { useNavigate } from "react-router";

function Quotes() {
  let [loading, setLoading] = useState(true);
  let [quotes, setQuotes] = useState([]);
  let [activeModal, setActiveModal] = useState(false);
  let [search, setSearch] = useState("");
  let [quotesSearch, setQuotesSearch] = useState("");
  let [dataProject, setDataProject] = useState({});
  let [dataClient, setDataClient] = useState({});
  let [status, setStatus] = useState("noState");
  let [isUpdate, setIsUpdate] = useState(false);
  let [currentPage, setCurrentPage] = useState(0);
  let userData = useContext(UserContext).user;
  let navigate = useNavigate();

  useEffect(() => {
    getQuotesData();
  }, []);

  async function getQuotesData() {
    await getQuotes(userData.role < 3 ? userData.id : 0)
      .then(({ data }) => {
        data.Quotes = data.Quotes.sort((a, b) => a.id - b.id);
        setQuotes(data.Quotes);
        setLoading(false);
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
          if (isUpdate) {
            setIsUpdate(true);
          } else {
            setIsUpdate(false);
          }
          setActiveModal(true);
        })
        .catch((err) => messageBox.Simple(err, "error"));
    });
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

  function searchFilter(value) {
    let dataFilter = [];
    quotes
      .filter((project) => {
        return project.title.toLowerCase().includes(value.toLowerCase())
          ? project.title.toLowerCase().includes(value.toLowerCase())
          : project.id
              .toString()
              .toLowerCase()
              .includes(value.toString().toLowerCase());
      })
      .map((client) => (dataFilter[client.id] = client));
    setSearch(value);
    setQuotesSearch(dataFilter);
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

  let stylesStatus = {
    AP: { color: "text-lime-500", text: "Aprobado" },
    MD: { color: "text-sky-400", text: "Modificado" },
    PE: { color: "text-yellow-400", text: "Pendiente" },
    NE: { color: "text-red-500", text: "Rechazado" },
  };

  function redirectQuoteHistory(projectData) {
    navigate("../quotesHistory", { state: { projectData } });
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="ml-8 mt-10">
            <h1
              className="mb-2 font-weight-bold"
              style={{
                fontFamily: "Poppins",
                fontSize: "40px",
                marginTop: "10px",
                marginBottom: "20px",
                color: "rgb(0, 71, 80)",
                fontWeight: "700",
              }}
            >
              Cotizaciones
            </h1>
          </div>
          <div className="flex flex-col mx-6">
            <div className="overflow-x-auto">
              <div className="py-3 pl-2">
                <div className="relative">
                  <div className="lg:flex block justify-between">
                    <div className="lg:flex lg:w-1/2">
                      <div className="mb-3" style={{ position: "relative" }}>
                        <input
                          id="defaultInput"
                          className="form-control rounded-pill lg:w-96 lg:14"
                          style={{
                            backgroundColor: "#F1F1F1",
                            color: "#B9B9B9",
                            borderBlockColor: "#B9B9B9",
                            paddingLeft: "40px",
                          }}
                          value={search}
                          onChange={(e) => searchFilter(e.target.value)}
                          type="text"
                          placeholder="Ingrese el ID o el nombre del proyecto"
                          disabled={quotes.length === 0 ? true : false}
                        />
                        <img
                          src={LogoSearch}
                          alt="Lupa de búsqueda"
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "15px",
                            transform: "translateY(-50%)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-1.5 w-full inline-block align-middle">
                {quotes.length === 0 ? (
                  <h2 className="p-3 text-lg font-semibold text-center">
                    No sé encontró ninguna cotización realizada por usted.
                  </h2>
                ) : (
                  <div className="overflow-auto border rounded-lg">
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
                            <span className="inline-flex items-center">
                              Estatus
                            </span>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                          >
                            <span className="inline-flex items-center">
                              Proyecto
                            </span>
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
                            <span className="inline-flex items-center">
                              Precio
                            </span>
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
                        {search.length > 0 && quotesSearch.length === 0 ? (
                          <tr>
                            <td
                              className="p-3 text-lg font-semibold text-center"
                              colSpan="7"
                            >
                              No sé encontró ninguna cotización que coincida con
                              la búsqueda.
                            </td>
                          </tr>
                        ) : quotesSearch.length > 0 ? (
                          quotesSearch.map((project) => {
                            return (
                              <tr key={project.quoteId}>
                                <td className="px-6 py-3 text-sm font-medium text-gray-800 whitespace-nowrap text-center align-top">
                                  {project.quoteId}
                                  <div className="mx-auto flex justify-content-center mt-4 pt-2">
                                    {(project.status === "MD" ||
                                      project.status === "PE") && (
                                      <>
                                        <button>
                                          <img
                                            className="w-6 h-6 mx-1 mt-0.5"
                                            src={IconEdit}
                                            title="Modificar proyecto"
                                            alt=""
                                            onClick={() =>
                                              editQuote(project, true)
                                            }
                                          />
                                        </button>
                                        <button>
                                          <img
                                            className="w-7 h-7 mx-1"
                                            src={IconDelete}
                                            title="Eliminar proyecto"
                                            alt=""
                                            onClick={() =>
                                              deleteQuote(project.quoteId)
                                            }
                                          />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </td>
                                <td
                                  className={`px-6 py-3 font-bold text-md ${
                                    stylesStatus[project.status].color
                                  } whitespace-nowrap text-center align-top`}
                                >
                                  {stylesStatus[
                                    project.status
                                  ].text.toUpperCase()}
                                  {userData.role === 3 &&
                                    (project.status === "MD" ||
                                      project.status === "PE") && (
                                      <div className="select">
                                        <select
                                          value={status}
                                          style={{ borderRadius: "1em" }}
                                          onChange={(e) =>
                                            changeStatus(
                                              project.quoteId,
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
                                    )}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-800 whitespace-nowrap text-center align-top">
                                  {project.title}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-800 whitespace-nowrap text-center align-top">
                                  {project.reference}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-800 whitespace-nowrap text-center align-top">
                                  {project.scope}
                                </td>
                                <td className="px-6 py-3 text-sm text-gray-800 whitespace-nowrap text-center align-top">
                                  € {project.price}
                                </td>
                                <td className="px-6 py-3 text-sm font-medium text-gray-800 whitespace-nowrap text-center">
                                  {formatDate(project.createDate)}
                                  <button
                                    type="button"
                                    className="btn rounded-pill ColorButtonMainInv flex mx-auto my-2 px-4"
                                    onClick={() =>
                                      redirectQuoteHistory(project)
                                    }
                                  >
                                    Historial de Cotización
                                  </button>
                                  <p
                                    className="text-link fw-semibold flex items-center justify-center"
                                    style={{
                                      color: "#00a297",
                                    }}
                                    onClick={() => editQuote(project, false)}
                                  >
                                    Ver detalle de cotización
                                  </p>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          quotes
                            .slice(currentPage, currentPage + 10)
                            .map((project) => {
                              return (
                                <tr key={project.quoteId}>
                                  <td className="px-6 py-3 text-sm font-medium text-gray-800 whitespace-nowrap text-center align-top">
                                    {project.quoteId}
                                    <div className="mx-auto flex justify-content-center mt-4 pt-2">
                                      {(project.status === "MD" ||
                                        project.status === "PE") && (
                                        <>
                                          <button>
                                            <img
                                              className="w-6 h-6 mx-1 mt-0.5"
                                              src={IconEdit}
                                              title="Modificar proyecto"
                                              alt=""
                                              onClick={() =>
                                                editQuote(project, true)
                                              }
                                            />
                                          </button>
                                          <button>
                                            <img
                                              className="w-7 h-7 mx-1"
                                              src={IconDelete}
                                              title="Eliminar proyecto"
                                              alt=""
                                              onClick={() =>
                                                deleteQuote(project.quoteId)
                                              }
                                            />
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </td>
                                  <td
                                    className={`px-6 py-3 font-bold text-md ${
                                      stylesStatus[project.status].color
                                    } whitespace-nowrap text-center align-top`}
                                  >
                                    {stylesStatus[
                                      project.status
                                    ].text.toUpperCase()}
                                    {userData.role === 3 &&
                                      (project.status === "MD" ||
                                        project.status === "PE") && (
                                        <div className="select">
                                          <select
                                            value={status}
                                            style={{ borderRadius: "1em" }}
                                            onChange={(e) =>
                                              changeStatus(
                                                project.quoteId,
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
                                      )}
                                  </td>
                                  <td className="px-6 py-3 text-sm text-gray-800 whitespace-nowrap text-center align-top">
                                    {project.title}
                                  </td>
                                  <td className="px-6 py-3 text-sm text-gray-800 whitespace-nowrap text-center align-top">
                                    {project.reference}
                                  </td>
                                  <td className="px-6 py-3 text-sm text-gray-800 whitespace-nowrap text-center align-top">
                                    {project.scope}
                                  </td>
                                  <td className="px-6 py-3 text-sm text-gray-800 whitespace-nowrap text-center align-top">
                                    € {project.price}
                                  </td>
                                  <td className="px-6 py-3 text-sm font-medium text-gray-800 whitespace-nowrap text-center">
                                    {formatDate(project.createDate)}
                                    <button
                                      type="button"
                                      className="btn rounded-pill ColorButtonMainInv flex mx-auto my-2 px-4"
                                      onClick={() =>
                                        redirectQuoteHistory(project)
                                      }
                                    >
                                      Historial de Cotización
                                    </button>
                                    <p
                                      className="text-link fw-semibold flex items-center justify-center"
                                      style={{
                                        color: "#00a297",
                                      }}
                                      onClick={() => editQuote(project, false)}
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
                )}
              </div>
            </div>
            {!(search.length > 0 || quotesSearch.length > 0) &&
              quotes.length > 0 && (
                <>
                  <div className="flex gap-2 mt-3 mb-2 mr-1 justify-end">
                    <button
                      className="paginationLeftAndRightButton p-1.5 flex items-center"
                      onClick={() =>
                        currentPage > 0 && setCurrentPage(currentPage - 10)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12.5"
                        height="12.5"
                        viewBox="0 0 6 10"
                        fill="none"
                      >
                        <path
                          d="M5.18826 9.79377L0.33312 5.6808C-0.11104 5.29064 -0.11104 4.68914 0.33312 4.31523L5.18826 0.202269C5.64773 -0.187894 6 0.00718769 6 0.608689L6 9.38735C6 10.0051 5.64773 10.1839 5.18826 9.79377Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                    {currentPage / 10 === 0 ? (
                      <>
                        <button
                          className="paginationButtons px-2 py-0.5 flex items-center activePagination"
                          disabled
                        >
                          {currentPage / 10 + 1}
                        </button>
                        {quotesSearch.length > 10 && (
                          <>
                            <button
                              className="paginationButtons px-2 py-0.5 flex items-center"
                              onClick={() => setCurrentPage(currentPage + 10)}
                            >
                              {currentPage / 10 + 2}
                            </button>
                            <button
                              className="paginationButtons px-2 py-0.5 flex items-center"
                              onClick={() => setCurrentPage(currentPage + 20)}
                            >
                              {currentPage / 10 + 3}
                            </button>
                          </>
                        )}
                      </>
                    ) : currentPage / 10 === Math.floor(quotes.length / 10) ? (
                      <>
                        <button
                          className="paginationButtons px-2 py-0.5 flex items-center"
                          onClick={() => setCurrentPage(currentPage - 20)}
                        >
                          {currentPage / 10 - 2}
                        </button>
                        <button
                          className="paginationButtons px-2 py-0.5 flex items-center"
                          onClick={() => setCurrentPage(currentPage - 10)}
                        >
                          {currentPage / 10 - 1}
                        </button>
                        <button
                          className="paginationButtons px-2 py-0.5 flex items-center activePagination"
                          disabled
                        >
                          {currentPage / 10}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="paginationButtons px-2 py-0.5 flex items-center"
                          onClick={() => setCurrentPage(currentPage - 10)}
                        >
                          {currentPage / 10}
                        </button>
                        <button
                          className="paginationButtons px-2 py-0.5 flex items-center activePagination"
                          disabled
                        >
                          {currentPage / 10 + 1}
                        </button>
                        <button
                          className="paginationButtons px-2 py-0.5 flex items-center"
                          onClick={() => setCurrentPage(currentPage + 10)}
                        >
                          {currentPage / 10 + 2}
                        </button>
                      </>
                    )}
                    <button
                      className="paginationLeftAndRightButton p-1.5 flex items-center"
                      onClick={() =>
                        currentPage / 10 < Math.floor(quotes.length / 10) &&
                        setCurrentPage(currentPage + 10)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12.5"
                        height="12.5"
                        viewBox="0 0 6 11"
                        fill="none"
                      >
                        <path
                          d="M0.811742 0.226854L5.66688 4.75112C6.11104 5.1803 6.11104 5.84195 5.66688 6.25324L0.811742 10.7775C0.352265 11.2067 0 10.9921 0 10.3304L0 0.673916C0 -0.00561714 0.352265 -0.202325 0.811742 0.226854Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              )}
          </div>
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
      )}
    </>
  );
}

export default Quotes;
