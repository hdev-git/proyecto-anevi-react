import React, { useState, useEffect } from "react";
import {
  addCover,
  delCover,
  getCover,
  setCover,
} from "../../../services/Admin.service";
import Loading from "../../../components/Loading/Loading";
import BackgroundPdf from "../../../images/pdf/BackgroundPdf.png";
import BackgroundEnd from "../../../images/pdf/BackgroundEnd.png";

function Pdf() {
  let [loading, setLoading] = useState(true);
  let [coverPhoto, setCoverPhoto] = useState([]);

  //   function _delProduct(e, id) {
  //     e.preventDefault();
  //     delProducts(id).then(({ data }) => {
  //       setProducts(data);
  //     })
  //       .catch((err) => messageBox.Simple(err, 'error'));
  //     setTimeout(() => window.location.reload(), 500);
  //   }

  useEffect(() => {
    _getCover();
  }, []);

  async function _getCover() {
    getCover()
      .then((data) => {
        setCoverPhoto(data.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }

  async function _delCover(id) {
    delCover(id)
      .then(() => {
        console.log("delete success");
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch((err) => console.error(err));
  }

  async function _setCover(id, type) {
    setCover(id, type)
      .then(() => {
        console.log("set success");
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch((err) => console.error(err));
  }

  async function changeImage(files, type) {
    if (!files.length === 0) {
      return alert("Debes escoger una imagen.");
    }
    let picture = new FormData();
    picture.append("picture", files[0]);
    picture.append("type", type);
    await addCover(picture)
      .then((data) => {
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch((err) => console.error(err));
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
              }}>
              Configuraciones del pdf portada
            </h1>
            <p className="mb-2">Dimensiones recomendadas 512px X 725px, si la sección se encuentran sin ningún valor predeterminado se seleccionara la imagen por defecto del catalogo.</p>
            <div className="md:col-span-11 flex">
              <input
                id="inputImage"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={({ target: { files } }) => changeImage(files, 'pt')}
              />
              <label
                htmlFor="inputImage"
                // type="button"
                className="btn rounded-pill ColorButtonMainInv lg:text-sm xl:text-md mr-4">
                Agregar
              </label>
            </div>
          </div>
          <div className="flex flex-col mx-6">
            <div className="overflow-x-auto">
              <div className="py-3 pl-2">
                <div className="relative">
                  <div className="grid grid-flow-col auto-cols-max">
                    {coverPhoto.map((data, index) => {
                      const image = ('https://bnzeroapp.com/api' + data.url.replace('./', '/'));
                      if (data.type === 'pt')
                        return (
                          <div
                            key={index}
                            className={
                              data.active === false
                                ? "mt-10 content-center border-2 mr-5 rounded-md"
                                : "mt-10 content-center border-4 border-cyan-700 mr-5 rounded-md "
                            }>
                            <img
                              src={image}
                              className=" w-60 h-80 m-5 rounded-md"
                            />
                            {data.active === false && (
                              <div className="lg:flex lg:justify-center lg:mb-5">
                                <button
                                  type="button"
                                  className="btn rounded-pill ColorButtonMainInv lg:text-sm xl:text-md mr-4"
                                  onClick={() => _setCover(data.id, 'pt')}>
                                  Activar
                                </button>

                                <button
                                  type="button"
                                  className="btn rounded-pill ColorButtonDelete lg:text-sm xl:text-md"
                                  onClick={() => _delCover(data.id, 'pt')}>
                                  Eliminar
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      else return null;
                    })}
                    {coverPhoto.length === 0 &&
                      <img
                        src={BackgroundPdf}
                        className=" w-60 h-80 m-5 rounded-md"
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              }}>
              Configuraciones del pdf contra-portada
            </h1>
            <p className="mb-2">Dimensiones recomendadas 512px X 725px, si la sección se encuentran sin ningún valor predeterminado se seleccionara la imagen por defecto del catalogo.</p>
            <div className="md:col-span-11 flex">
              <input
                id="inputImage2"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={({ target: { files } }) => changeImage(files, 'c-p')}
              />
              <label
                htmlFor="inputImage2"
                // type="button"
                className="btn rounded-pill ColorButtonMainInv lg:text-sm xl:text-md mr-4">
                Agregar
              </label>
            </div>
          </div>
          <div className="flex flex-col mx-6">
            <div className="overflow-x-auto">
              <div className="py-3 pl-2">
                <div className="relative">
                  <div className="grid grid-flow-col auto-cols-max">
                    {coverPhoto.map((data, index) => {
                      const image = ('https://bnzeroapp.com/api' + data.url.replace('./', '/'));
                      if (data.type === 'c-p')
                        return (
                          <div
                            key={index}
                            className={
                              data.active === false
                                ? "mt-10 content-center border-2 mr-5 rounded-md"
                                : "mt-10 content-center border-4 border-cyan-700 mr-5 rounded-md "
                            }>
                            <img
                              src={image}
                              className=" w-60 h-80 m-5 rounded-md"
                            />
                            {data.active === false && (
                              <div className="lg:flex lg:justify-center lg:mb-5">
                                <button
                                  type="button"
                                  className="btn rounded-pill ColorButtonMainInv lg:text-sm xl:text-md mr-4"
                                  onClick={() => _setCover(data.id, 'c-p')}>
                                  Activar
                                </button>

                                <button
                                  type="button"
                                  className="btn rounded-pill ColorButtonDelete lg:text-sm xl:text-md"
                                  onClick={() => _delCover(data.id, 'c-p')}>
                                  Eliminar
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      else return null;
                    })}
                    {coverPhoto.length === 0 &&
                      <img
                        src={BackgroundEnd}
                        className=" w-60 h-80 m-5 rounded-md"
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Pdf;
