import React, { useState, useEffect } from "react";

import Loading from "../../components/Loading/Loading";
import {
  deleteTermsAndConditions,
  getTermsAndConditions,
} from "../../services/Admin.service";
import messageBox from "../../utils/messagebox";
import ModalTermsAndConditions from "./ModalTermsAndConditions";

function TermsAndConditions() {
  let [loading, setLoading] = useState(true);
  let [terms, setTerms] = useState([]);
  let [activeModal, setActiveModal] = useState(false);
  let [isUpdate, setIsUpdate] = useState(false);
  let [dataUpdate, setDataUpdate] = useState({});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await getTermsAndConditions()
      .then(({ data }) => {
        setTerms(data);
        setLoading(false);
      })
      .catch((err) => messageBox.Simple(err, "error"));
  }

  function editTermsAndConditionsFC(term) {
    setDataUpdate(term);
    setIsUpdate(true);
    setActiveModal(true);
  }

  async function deleteTermsAndConditionsFC(id) {
    await deleteTermsAndConditions(id)
      .then(({ data }) => {
        messageBox.Simple(data.message, "success");
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch((err) => messageBox.Simple(err, "error"));
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
              Panel términos y condiciones
            </h1>
          </div>
          <div className="flex flex-col mx-6">
            <div className="overflow-x-auto">
              <div className="py-3 pl-2">
                <div className="relative">
                  <div className="lg:flex block justify-between">
                    <div className="lg:flex lg:justify-end lg:mb-5">
                      <button
                        type="button"
                        className="btn rounded-pill ColorButtonMainInv lg:text-sm xl:text-md lg:ml-2 flex"
                        onClick={() => setActiveModal(true)}
                      >
                        Crear nuevo término o condición
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-1.5 w-full inline-block align-middle">
                <div className="overflow-auto border rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 table-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                          Orden
                        </th>
                        <th
                          scope="col"
                          style={{ maxWidth: 250 }}
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                          <span className="inline-flex items-center">
                            Descripción
                          </span>
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {terms.length === 0 ? (
                        <tr>
                          <td className="text-center p-3 fs-5" colSpan="4">
                            No hay términos y condiciones registradas.
                          </td>
                        </tr>
                      ) : (
                        terms.map((term) => {
                          return (
                            <tr key={term.id}>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {term.idOrder}
                              </td>
                              <td
                                className="px-6 py-4 text-sm text-gray-800"
                                style={{ maxWidth: 250 }}
                              >
                                {term.description}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <button
                                  className="text-green-500 hover:text-green-700 mx-2"
                                  onClick={() => editTermsAndConditionsFC(term)}
                                >
                                  Modificar
                                </button>
                                <button
                                  className="text-yellow-500 hover:text-yellow-700 mx-2"
                                  onClick={(e) =>
                                    deleteTermsAndConditionsFC(term.id)
                                  }
                                >
                                  Eliminar
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
              {
                <ModalTermsAndConditions
                  setActiveModal={setActiveModal}
                  isUpdate={isUpdate}
                  dataUpdate={dataUpdate}
                  setDataUpdate={setDataUpdate}
                />
              }
            </div>
          )}
        </>
      )}
    </>
  );
}

export default TermsAndConditions;
