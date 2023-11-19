import React, { useEffect } from 'react';

export default function Profile(props) {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    }
  });

  let data = props;
  return (
    <>
      <div
        tabIndex="-1"
        aria-hidden="true"
        className="content-modal"
      >
        <form onSubmit={(e) => data._addClientProject(e)}>
          <div
            className="col p-3"
            style={{
              backgroundColor: "#F4F4F4",
              borderRadius: "25px",
              position: 'relative',
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
                Cliente
              </h4>
            </div>
            <div className="lg:flex block ">
              <div className='lg:flex block'>
                <div className="block mx-auto mt-4">
                  <div className="lg:flex block">
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label className="form-label">Cliente</label>
                        <input
                          type="text"
                          className="form-control"
                          value={`${data.dataClient.firstName} - ${data.dataClient.firstLastName}`}
                          style={{ margin: "auto", textAlign: "center" }}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label className="form-label">Contacto</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={data.dataClient.email}
                          style={{ margin: "auto", textAlign: "center" }}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label htmlFor="ref" className="form-label">Referencia</label>
                        <input
                          type="text"
                          className="form-control"
                          id="ref"
                          placeholder={data.reference}
                          onChange={e => data.setReference(e.target.value)}
                          style={{ margin: "auto", textAlign: "center" }}
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label htmlFor="rev" className="form-label">Revisión</label>
                        <input
                          type="text"
                          className="form-control"
                          id="rev"
                          placeholder={data.review}
                          onChange={e => data.setReview(e.target.value)}
                          style={{ margin: "auto", textAlign: "center" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto mt-3">
              <h4
                style={{
                  color: "#004750",
                  fontSize: "32px",
                  fontWeight: "700",
                }}
              >
                Proyecto
              </h4>
            </div>
            <div className="lg:flex block ">
              <div className='lg:flex block'>
                <div className="block mx-auto mt-4">
                  <div className="lg:flex block">
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label htmlFor="id" className="form-label">ID</label>
                        <input
                          type="text"
                          className="form-control"
                          id="id"
                          placeholder={data.projectId}
                          style={{ margin: "auto", textAlign: "center" }}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label htmlFor="nameProject" className="form-label">Nombre del proyecto</label>
                        <input
                          type="text"
                          className="form-control"
                          id='nameProject'
                          onChange={e => data.setTitle(e.target.value)}
                          style={{ margin: "auto", textAlign: "center" }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label htmlFor="M2" className="form-label">m2</label>
                        <input
                          type="text"
                          className="form-control"
                          id='M2'
                          onChange={e => data.setM2(e.target.value)}
                          style={{ margin: "auto", textAlign: "center" }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label htmlFor="country" className="form-label">Ubicación</label>
                        <input
                          type="text"
                          className="form-control"
                          id='country'
                          onChange={e => data.setLocation(e.target.value)}
                          style={{ margin: "auto", textAlign: "center" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:grid lg:grid-cols-2 block">
                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">Breve descripción</label>
                        <textarea
                          name="textarea"
                          className="form-control"
                          id='description'
                          onChange={e => data.setDescription(e.target.value)}
                          placeholder='Descripción'
                        />
                      </div>
                    </div>

                    <div className="mt-2 mx-4">
                      <div className="mb-3">
                        <label htmlFor="scopeService" className="form-label" >Alcances del servicio a realizar</label>
                        <textarea
                          name="textarea"
                          className="form-control"
                          id='scopeService'
                          onChange={e => data.setScope(e.target.value)}
                          placeholder='Descripción'
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:flex block mb-2 lg:mr-6">
                    <button
                      type="button"
                      className="btn rounded-pill ColorButtonMain mt-3 w-75 lg:ml-96"
                      onClick={() => data.setShowModal(false)}>
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn rounded-pill ColorButtonMainInv mt-3 w-75 lg:ml-4">
                      Guardar proyecto
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
              }}
              onClick={() => data.setShowModal(false)}
              title='Cerrar'
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg className="w-5 h-5 " fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </>
  )
}