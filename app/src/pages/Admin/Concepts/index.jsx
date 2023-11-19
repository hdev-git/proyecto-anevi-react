import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getConcept,
  delConcept,
  putConcept,
} from "../../../services/Admin.service";
import Loading from "../../../components/Loading/Loading";
import LogoSearch from "../../../images/Home/Vector.png";
import messageBox from "../../../utils/messagebox";
import ModalCreateConcept from "./ModalCreateConcept";

function Concepts(props) {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  let [products, setProducts] = useState([]);
  let [activeModal, setActiveModal] = useState(false);
  let [search, setSearch] = useState("");
  let [dataProductsUpdate, setDataProductsUpdate] = useState(undefined);
  let location = useLocation();

  useEffect(() => {
    if (loading) {
      getConcept(location.state.id)
        .then(({ data }) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => messageBox.Simple(err, "error"));
    }
  });

  function editConcept(id) {
    setDataProductsUpdate(products[id]);
    setActiveModal(true);
  }

  function _delConcept(e, id) {
    e.preventDefault();
    delConcept(id)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((err) => messageBox.Simple(err, "error"));
    setTimeout(() => window.location.reload(), 500);
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="ml-8 mt-10">
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
                <span onClick={() => navigate("../products")}>Productos</span>{" "}
                {">"} Concepto
              </h4>
            </div>
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
              Crear conceptos
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
                          className="form-control rounded-pill lg:w-80 lg:14"
                          style={{
                            backgroundColor: "#F1F1F1",
                            color: "#B9B9B9",
                            borderBlockColor: "#B9B9B9",
                            paddingLeft: "40px",
                          }}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          type="text"
                          placeholder="Ingresa el email del vendedor"
                          disabled={products.length === 0 ? true : false}
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
                    <div className="lg:flex lg:justify-end lg:w-1/2 lg:mb-5">
                      <button
                        type="button"
                        className="btn rounded-pill ColorButtonMainInv lg:text-sm xl:text-md lg:ml-2 flex"
                        onClick={() => setActiveModal(true)}
                      >
                        Crear nuevo concepto
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
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        >
                          <span className="inline-flex items-center">
                            Título
                          </span>
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.length === 0 ? (
                        <tr>
                          <td className="text-center p-3 fs-5" colSpan="4">
                            No hay Productos registrados
                          </td>
                        </tr>
                      ) : search.length > 0 ? (
                        products
                          .filter((product) =>
                            product.title
                              .toString()
                              .toLowerCase()
                              .includes(search.toString().toLowerCase())
                          )
                          .map((product, index) => {
                            return (
                              <tr key={index}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                  {product.id}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  {product.title}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                  <button
                                    className="text-green-500 hover:text-green-700 mx-2"
                                    onClick={() => editConcept(index)}
                                  >
                                    Modificar
                                  </button>
                                  <button
                                    className="text-yellow-500 hover:text-yellow-700 mx-2"
                                    onClick={(e) => _delConcept(e, product.id)}
                                  >
                                    Eliminar
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                      ) : (
                        products.map((product, index) => {
                          return (
                            <tr key={index}>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {product?.id}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {product.title}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <button
                                  className="text-green-500 hover:text-green-700 mx-2"
                                  onClick={() => editConcept(index)}
                                >
                                  Modificar
                                </button>
                                <button
                                  className="text-yellow-500 hover:text-yellow-700 mx-2"
                                  onClick={(e) => _delConcept(e, product.id)}
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
              <ModalCreateConcept
                dataProductsUpdate={dataProductsUpdate && dataProductsUpdate}
                setActiveModal={setActiveModal}
                setDataProductsUpdate={setDataProductsUpdate}
                productId={location.state.id}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Concepts;
