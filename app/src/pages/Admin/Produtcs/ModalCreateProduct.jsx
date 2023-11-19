import React, { useEffect, useState } from "react";
import { addProducts, putProducts } from "../../../services/Admin.service";
import messageBox from "../../../utils/messagebox";

function ModalCreateProduct({
  setActiveModal,
  dataProductsUpdate,
  setDataProductsUpdate,
}) {
  let [title, setTitle] = useState(
    dataProductsUpdate ? dataProductsUpdate.title : ""
  );
  let [reference, setReference] = useState(
    dataProductsUpdate ? dataProductsUpdate.ref : ""
  );
  let [price, setPrice] = useState(
    dataProductsUpdate ? dataProductsUpdate.price : ""
  );
  let [amount, setAmount] = useState(
    dataProductsUpdate ? dataProductsUpdate.amount : ""
  );
  let [duration, setDuration] = useState(
    dataProductsUpdate ? dataProductsUpdate.duration : ""
  );
  let [facturation, setFacturation] = useState(
    dataProductsUpdate ? dataProductsUpdate.facturation : ""
  );
  let [concept, setConcept] = useState(
    dataProductsUpdate ? dataProductsUpdate.concept : ""
  );

  let [currency, setCurrency] = useState("$");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  });

  async function CreateSeller(e) {
    e.preventDefault();
    let ref = reference;
    await addProducts({
      title,
      ref,
      price: `${currency} ${price}`,
      amount,
      duration,
      facturation,
      concept,
    })
      .then(({ data }) => {
        if (data.error) {
          messageBox.Simple(data.message, "error");
        } else {
          messageBox.Simple(data.message, "success");
          setActiveModal(false);
        }
      })
      .catch((err) => messageBox.Simple(err, "error"));
    setTimeout(() => window.location.reload(), 2000);
  }

  async function UpdateAccount(e) {
    e.preventDefault();
    let ref = reference;
    await putProducts({
      id: dataProductsUpdate.id,
      title,
      ref,
      price: `${currency} ${String(price).slice(1)}`,
      amount,
      duration,
      facturation,
      concept,
    })
      .then(({ data }) => {
        if (data.error) {
          messageBox.Simple(data.message, "error");
        } else {
          messageBox.Simple(data.message, "success");
          setActiveModal(false);
        }
      })
      .catch((err) => messageBox.Simple(err, "error"));
    setTimeout(() => window.location.reload(), 2000);
    console.log("actualzar data");
  }

  return (
    <>
      <div tabIndex="-1" aria-hidden="true" className="content-modal">
        <form
          onSubmit={(e) =>
            dataProductsUpdate ? UpdateAccount(e) : CreateSeller(e)
          }
        >
          <div
            className="col p-5"
            style={{
              backgroundColor: "#F4F4F4",
              borderRadius: "25px",
              position: "relative",
            }}
          >
            <div className="mx-auto mt-2">
              <h4
                style={{
                  color: "#004750",
                  fontSize: "32px",
                  fontWeight: "700",
                }}
              >
                {dataProductsUpdate
                  ? `Modificando producto`
                  : "Crear nuevo producto"}
              </h4>
            </div>
            <div className="block p-4">
              <div className="">
                <div>
                  <label className="form-label">Referencia</label>
                  <input
                    type="text"
                    className="form-control"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    style={{ margin: "auto", textAlign: "center" }}
                  />
                </div>
              </div>
              <div className="mt-3 lg:grid lg:grid-cols-2 grid-rows-1 lg:gap-3">
                <div>
                  <label className="form-label">Precio</label>
                  <input
                    type="text"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{ margin: "auto", textAlign: "center" }}
                  />
                </div>
                <div>
                  <label className="form-label">Moneda</label>
                  <div className="select">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      style={{ margin: "auto", textAlign: "center" }}
                    >
                      <option value="$">Peso</option>
                      <option value="$">Dolar</option>
                      <option value="€">Euro</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div>
                  <label className="form-label">Título</label>
                  <textarea
                    rows="2"
                    cols="50"
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{ margin: "auto", textAlign: "center" }}
                  />
                </div>
              </div>
              <div className="mt-3">
                <div>
                  <label className="form-label">Concepto</label>
                  <textarea
                    rows="2"
                    cols="50"
                    type="text"
                    className="form-control"
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    style={{ margin: "auto", textAlign: "center" }}
                  />
                </div>
              </div>
              <div className="mt-2 lg:grid lg:grid-cols-2 grid-rows-1 lg:gap-3">
                <div>
                  <label className="form-label">Importe</label>
                  <input
                    type="text"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{ margin: "auto", textAlign: "center" }}
                  />
                </div>
                <div>
                  <label className="form-label">Duración (Meses)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    style={{ margin: "auto", textAlign: "center" }}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="form-label">Facturación</label>
                <input
                  type="text"
                  className="form-control"
                  value={facturation}
                  onChange={(e) => setFacturation(e.target.value)}
                  style={{ margin: "auto", textAlign: "center" }}
                />
              </div>
            </div>

            <div className="lg:flex block ">
              <div className="lg:flex block">
                <div className="block mx-auto">
                  <div className="lg:flex block mb-2 lg:ml-60 px-4">
                    <button
                      type="button"
                      className="btn rounded-pill ColorButtonMain mt-3 w-75 w-100"
                      onClick={() => {
                        setActiveModal(false);
                        dataProductsUpdate && setDataProductsUpdate(undefined);
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn rounded-pill ColorButtonMainInv mt-3 w-75 lg:ml-4 w-100"
                    >
                      {dataProductsUpdate
                        ? "Actualizar producto"
                        : "Guardar producto"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              style={{
                position: "absolute",
                top: "2rem",
                right: "2rem",
              }}
              onClick={() => {
                setActiveModal(false);
                dataProductsUpdate && setDataProductsUpdate(undefined);
              }}
              title="Cerrar"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg className="w-5 h-5 " fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ModalCreateProduct;
