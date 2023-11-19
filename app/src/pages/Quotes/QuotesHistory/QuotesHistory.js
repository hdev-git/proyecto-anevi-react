import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Loading from "../../../components/Loading/Loading";
import { getQuotesHistory } from "../../../services/Quotes.service";
import messageBox from "../../../utils/messagebox";
import { formatDate } from "../../../utils/tools";

function QuotesHistory() {
  const navigate = useNavigate();
  let locations = useLocation();
  let { idClient, projectId } = locations.state.projectData;
  let [isLoading, setIsLoading] = useState(true);
  let [projects, setProjects] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await getQuotesHistory(idClient, projectId)
      .then(({ data }) => {
        if (data.error) return messageBox.Simple(data.message, "error");
        setProjects(data);
        setIsLoading(false);
      })
      .catch((err) => messageBox.Simple(err, "error"));
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
              <span className="font-semibold">Detalles de cotizaciones</span>{" "}
              {">"} Historial
            </h4>
          </div>

          <div className="p-1.5 w-full inline-block align-middle">
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
                  {projects.length > 0 &&
                    projects.map((project) => {
                      return (
                        <tr key={project.id}>
                          <td className="px-6 py-3 text-sm font-medium text-gray-800 whitespace-nowrap text-center align-top">
                            {project.id}
                          </td>
                          <td
                            className={`px-6 py-3 font-bold text-md ${
                              stylesStatus[project.status].color
                            } whitespace-nowrap text-center align-top`}
                          >
                            {stylesStatus[project.status].text.toUpperCase()}
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
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default QuotesHistory;
