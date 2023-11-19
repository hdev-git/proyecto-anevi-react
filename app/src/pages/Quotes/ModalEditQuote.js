import React, { useEffect, useState } from "react";
import LogoDownload from '../../images/mdi_file-download-outline.svg';
import { useNavigate } from "react-router-dom";
import LogoAdd from "../../images/carbon_add.svg";
import LogoView from "../../images/Frame 108.svg";
//import LogoComp from '../../images/Vector.svg';
import messageBox from "../../utils/messagebox";
import { getProducts, getTermsAndConditions } from "../../services/Admin.service";
import Concepts from "./Concepts";
import { addQuotes, updateQuotes } from "../../services/Quotes.service";
import PDF from "./GeneratePdf/pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { getUser } from "../../services/Users.service";

function ModalEditQuote({
  Context,
  clientId,
  dataClient,
  dataProject,
  projectId,
  setShowModalCot,
  isUpdate,
  setIsUpdate,
}) {

  let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(true);
  let [products, setProducts] = useState([]);
  let [concepts, setConcepts] = useState([...dataProject.data]);
  let [dataOwner, setDataOwner] = useState({});
  let [termsAndConditions, setTermsAndConditions] = useState({});

  useEffect(() => {
    getProduct();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  async function getProduct() {
    await getProducts().then(async ({ data }) => {
      if (data.error) messageBox.Simple(data.mensaje, "error");
      else {
        setProducts(data);
        await getTermsAndConditions()
          .then(async ({ data }) => {
            setTermsAndConditions(data);
            await getUser(Number(dataProject.hubspotOwnerId))
              .then(({ data }) => {
                setDataOwner(data);
                setIsLoading(false);
              })
              .catch(err => messageBox.Simple(err, 'error'));
          })
          .catch(err => messageBox.Simple(err, 'error'));
      }
    });
  }

  function redirectPdf(view) {
    navigate("../quotePdf", {
      state: {
        client: dataClient,
        project: dataProject,
        products,
        view,
        concepts: dataProject.data,
      },
    });
  }

  function handleOnChange() {
    setConcepts([
      ...concepts,
      {
        concept: "noData",
        price: 0,
        unit: 0,
        discount: 0,
        imported: 0,
        duration: 0,
        billing: 0,
        reference: "",
        review: "",
        scope: "",
      },
    ]);
  }

  async function handleAddQuote(e) {
    e.preventDefault();
    if (isUpdate) {
      await updateQuotes({ quoteId: dataProject.quoteId, fees: concepts })
        .then(({ data }) => {
          if (data.error) return messageBox.Simple(data.message, "error");
          setIsUpdate(false);
          messageBox.Simple(data.message, "success");
          setTimeout(() => window.location.reload(), 2000);
        })
        .catch((err) => messageBox.Simple(err, "error"));
    } else {
      let {
        concept,
        price,
        unit,
        discount,
        imported,
        duration,
        billing,
        reference,
        review,
        scope,
      } = concepts[0];
      if (concept === "noData")
        return messageBox.Simple(
          "Necesita rellenar al menos un concepto",
          "error"
        );
      if (price === 0)
        return messageBox.Simple(
          "Necesita rellenar al menos un concepto",
          "error"
        );
      if (unit === 0)
        return messageBox.Simple(
          "Necesita rellenar al menos un concepto",
          "error"
        );
      if (discount === 0)
        return messageBox.Simple(
          "Necesita rellenar al menos un concepto",
          "error"
        );
      if (imported === 0)
        return messageBox.Simple(
          "Necesita rellenar al menos un concepto",
          "error"
        );
      if (duration === 0)
        return messageBox.Simple(
          "Necesita rellenar al menos un concepto",
          "error"
        );
      if (billing === 0)
        return messageBox.Simple(
          "Necesita rellenar al menos un concepto",
          "error"
        );
      if (reference === "")
        return messageBox.Simple(
          "Necesita rellenar al menos un concepto",
          "error"
        );
      if (review === "")
        return messageBox.Simple(
          "Necesita rellenar al menos un concepto",
          "error"
        );
      if (scope === "")
        return messageBox.Simple(
          "Necesita rellenar al menos un concepto",
          "error"
        );
      await addQuotes({
        clientId,
        projectId,
        userOwnerID: Context.id,
        Title: dataProject.title,
        dataClient,
        dataProject,
        fees: concepts,
      })
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
  }

  return (
    !isLoading && (
      <div tabIndex="-1" aria-hidden="true" className="content-modal">
        <form className="mx-auto" onSubmit={(e) => e.preventDefault()}>
          <div
            className="col p-3"
            style={{
              backgroundColor: "#F4F4F4",
              borderRadius: "25px",
              position: "relative",
            }}>
            <div className="mx-auto my-2">
              <h4
                style={{
                  color: "#004750",
                  fontSize: "32px",
                  fontWeight: "700",
                }}>
                Cliente
              </h4>
            </div>
            <div className="  lg:flex block ">
              <div className="lg:flex block">
                <div className="block mx-auto">
                  <div className="lg:flex block">
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label className="form-label">Cliente</label>
                        <input
                          type="text"
                          className="form-control text-center"
                          value={`${dataClient.firstName} - ${dataClient.firstLastName}`}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label className="form-label">Contacto</label>
                        <input
                          type="text"
                          className="form-control text-center"
                          value={dataClient.email}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label className="form-label">Referencia</label>
                        <input
                          type="text"
                          className="form-control text-center"
                          value={dataProject.reference}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label className="form-label">Revisión</label>
                        <input
                          type="text"
                          className="form-control text-center"
                          value={dataProject.review}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto my-3">
              <h4
                style={{
                  color: "#004750",
                  fontSize: "32px",
                  fontWeight: "700",
                }}>
                Proyecto
              </h4>
            </div>
            <div className="lg:flex block ">
              <div className="lg:flex block">
                <div className="block mx-auto">
                  <div className="lg:flex block">
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label className="form-label">ID</label>
                        <input
                          type="text"
                          className="form-control text-center"
                          value={dataProject.id}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label className="form-label">
                          Nombre del proyecto
                        </label>
                        <input
                          type="text"
                          className="form-control text-center"
                          value={dataProject.title}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label className="form-label">m2</label>
                        <input
                          type="text"
                          className="form-control text-center"
                          value={dataProject.m2}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label className="form-label">Ubicación</label>
                        <input
                          type="text"
                          className="form-control text-center"
                          value={dataProject.location}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:grid lg:grid-cols-2 block">
                    <div className="mt-2 ml-4 mr-1">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Breve descripción
                        </label>
                        <textarea
                          name="textarea"
                          className="form-control text-justify"
                          value={dataProject.description}
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Alcances del servicio a realizar
                        </label>
                        <textarea
                          name="textarea"
                          className="form-control"
                          value={dataProject.scope}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto">
              <h4
                style={{
                  color: "#004750",
                  fontSize: "32px",
                  fontWeight: "700",
                }}>
                Honorarios
              </h4>
            </div>
            {concepts.map((concept, index) => {
              return (
                <Concepts
                  key={index}
                  id={index}
                  concept={concept.concept}
                  price={concept.price}
                  unit={concept.unit}
                  discount={concept.discount}
                  imported={concept.imported}
                  duration={concept.duration}
                  billing={concept.billing}
                  reference={concept.reference}
                  review={concept.review}
                  scope={concept.scope}
                  products={products}
                  concepts={concepts}
                  setConcepts={setConcepts}
                  isBlock={!isUpdate ? true : false}
                />
              );
            })}

            <div className="block mb-10 mx-auto">
              <div className="block">
                {isUpdate && (
                  <button
                    type="button"
                    className="btn rounded-pill ColorButtonMain mt-3 mx-auto"
                    onClick={() => handleOnChange()}>
                    <div className="flex content-center items-center">
                      <img
                        src={LogoAdd}
                        alt=""
                        className="w-5 mr-2 TouchGreen"
                      />
                      Agregar concepto
                    </div>
                  </button>
                )}

                <div className="lg:grid lg:grid-cols-3 lg:gap-1 mx-auto block">
                  {/*<button
                  type="button"
                  className="btn rounded-pill ColorButtonMain mt-2 mx-auto lg:ml-0"
                //onClick={() => data.setShowModal(false)}
                >
                  <div className="flex content-center items-center">
                    <img src={LogoComp} alt="" className='w-4 mr-2 TouchGreen' />
                    Generar link para compartir
                  </div>
                </button>*/}
                </div>
                <button type='button'>
                  <PDFDownloadLink
                    className="btn rounded-pill ColorButtonMainGreen mt-2 mx-auto lg:ml-0"
                    document={<PDF dataClient={dataClient} dataProject={dataProject} dataProducts={products} dataOwner={dataOwner} termsAndConditions={termsAndConditions} />}
                    fileName={`PDF Cotización ${dataProject.title}.pdf`}
                  >
                    <div className="flex content-center items-center">
                      <img src={LogoDownload} alt="" className='w-4 mr-2 TouchGreen' />
                      {({ blob, url, loading, error }) => (loading ? 'Cargando documento...' : 'Descargar PDF')}
                      Descargar PDF
                    </div>
                  </PDFDownloadLink>
                </button>
                <button
                  type="button"
                  className="btn rounded-pill ColorButtonMainGreen mt-2 mx-auto lg:ml-0 block"
                  onClick={() => redirectPdf(true)}
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

                <button
                  type="button"
                  className={`btn rounded-pill ColorButtonMain mt-3 ${isUpdate && "lg:mr-3"
                    }`}
                  onClick={() => setShowModalCot(false)}>
                  {isUpdate ? "Cancelar" : "Cerrar"}
                </button>

                {isUpdate && (
                  <button
                    type="submit"
                    className="btn rounded-pill ColorButtonMainInv mt-3 lg:ml-3"
                    onClick={(e) => handleAddQuote(e)}>
                    Actualizar cotización
                  </button>
                )}
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
                setShowModalCot(false);
                isUpdate && setIsUpdate(false);
              }}
              title="Cerrar"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm dark:hover:bg-gray-600 dark:hover:text-white">
              <svg className="w-5 h-5 " fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    )
  );
}

export default ModalEditQuote;
