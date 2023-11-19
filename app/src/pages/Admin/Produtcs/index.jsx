import React, { useState, useEffect } from "react";
import { getProducts, delProducts } from "../../../services/Admin.service";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import LogoSearch from "../../../images/Home/Vector.png";
import messageBox from "../../../utils/messagebox";
import ModalCreateProduct from "./ModalCreateProduct";

function Products() {
  let [loading, setLoading] = useState(true);
  let [products, setProducts] = useState([]);
  let [activeModal, setActiveModal] = useState(false);
  let [search, setSearch] = useState("");
  let [dataProductsUpdate, setDataProductsUpdate] = useState(undefined);
  let navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      getProducts()
        .then(({ data }) => {
          setProducts(data);
          setLoading(false);
        })
        .catch((err) => messageBox.Simple(err, "error"));
    }
  });

  function editProducr(id) {
    setDataProductsUpdate(products[id]);
    setActiveModal(true);
  }

  function _delProduct(e, id) {
    e.preventDefault();
    delProducts(id)
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((err) => messageBox.Simple(err, "error"));
    setTimeout(() => window.location.reload(), 500);
  }

  function redirectConcept(id) {
    navigate("/concepts", { state: { id } });
  }
  function redirectScope(id) {
    navigate("/scopes", { state: { id } });
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
              Panel del auditor crear productos
            </h1>
          </div>
          <div className="flex flex-col mx-6">
            <div className="overflow-x-auto">
              <div className="py-3 pl-2">
                <div className="relative">
                  <div className="lg:flex block justify-between">
                    <div className="lg:flex lg:w-1/2">
                      {/* <div className="mb-3" style={{ position: 'relative' }}>
                          <input
                            id="defaultInput"
                            className="form-control rounded-pill lg:w-80 lg:14"
                            style={{
                              backgroundColor: "#F1F1F1",
                              color: "#B9B9B9",
                              borderBlockColor: "#B9B9B9",
                              paddingLeft: '40px'
                            }}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            type="text"
                            placeholder="Ingresa el email del vendedor"
                            disabled={products.length === 0 ? true : false}
                          />
                          <img src={LogoSearch} alt='Lupa de búsqueda' style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)' }} />
                        </div> */}
                    </div>
                    <div className="lg:flex lg:justify-end lg:w-1/2 lg:mb-5">
                      <button
                        type="button"
                        className="btn rounded-pill ColorButtonMainInv lg:text-sm xl:text-md lg:ml-2 flex"
                        onClick={() => setActiveModal(true)}
                      >
                        Crear nuevo producto
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
                          <span className="inline-flex items-center">
                            Referencia
                          </span>
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
                            Importe
                          </span>
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                        >
                          <span className="inline-flex items-center">
                            Duración
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
                            No hay Prodcutos registrados
                          </td>
                        </tr>
                      ) : search.length > 0 ? (
                        products
                          .filter((product) =>
                            product.ref
                              .toString()
                              .toLowerCase()
                              .includes(search.toString().toLowerCase())
                          )
                          .map((product, index) => {
                            return (
                              <tr key={index}>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  {product.ref}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  {product.title}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  {product.price}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  {product.amount}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                  {product.duration}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                  <button
                                    className="text-green-500 hover:text-green-700 mx-2"
                                    onClick={() => editProducr(index)}
                                  >
                                    Modificar
                                  </button>
                                  <button
                                    className="text-yellow-500 hover:text-yellow-700 mx-2"
                                    onClick={(e) => _delProduct(e, product.id)}
                                  >
                                    Eliminar
                                  </button>
                                  <button
                                    className="text-yellow-500 hover:text-yellow-700 mx-2"
                                    onClick={() => redirectConcept(product.id)}
                                  >
                                    Agregar conceptos
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
                                {product?.ref}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {product.title}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {product.price}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {product.amount}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {product.duration}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <button
                                  className="text-green-500 hover:text-green-700 mx-2"
                                  onClick={() => editProducr(index)}
                                >
                                  Modificar
                                </button>
                                <button
                                  className="text-yellow-500 hover:text-yellow-700 mx-2"
                                  onClick={(e) => _delProduct(e, product.id)}
                                >
                                  Eliminar
                                </button>
                                <button
                                  className="text-blue-400 hover:text-blue-700 mx-2"
                                  onClick={() => redirectConcept(product.id)}
                                >
                                  Conceptos
                                </button>
                                <button
                                  className="text-blue-400 hover:text-blue-700 mx-2"
                                  onClick={() => redirectScope(product.id)}
                                >
                                  Entregables
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
              <ModalCreateProduct
                dataProductsUpdate={dataProductsUpdate && dataProductsUpdate}
                setActiveModal={setActiveModal}
                setDataProductsUpdate={setDataProductsUpdate}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Products;
