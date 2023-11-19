import React, { useEffect, useState } from 'react';
import messageBox from '../../utils/messagebox';
import { addTermsAndConditions, updateTermsAndConditions } from '../../services/Admin.service';

function ModalTermsAndConditions({ setActiveModal, isUpdate, dataUpdate = {}, setDataUpdate }) {

  let [idOrder, setIdOrder] = useState(dataUpdate.idOrder || '');
  let [description, setDescription] = useState(dataUpdate.description || '');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    }
  });


  async function addTermsAndConditionsFC() {
    await addTermsAndConditions({ idOrder, description })
      .then(({ data }) => {
        messageBox.Simple(data.message, 'success');
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch(err => messageBox.Simple(err, 'error'));
  }

  async function updateTermsAndConditionsFC() {
    await updateTermsAndConditions({ ...dataUpdate, idOrder, description })
      .then(({ data }) => {
        messageBox.Simple(data.message, 'success');
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch(err => messageBox.Simple(err, 'error'));
  }

  return (
    <>
      <div
        tabIndex="-1"
        aria-hidden="true"
        className="content-modal"
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <div
            className="col p-5"
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
                {
                  isUpdate
                    ? 'Modificando término y condición'
                    : 'Crear nuevo término y condición'
                }
              </h4>
            </div>
            <div className='block p-4'>
              <label className="form-label">Orden</label>
              <input
                type="number"
                className="form-control"
                value={idOrder}
                onChange={e => setIdOrder(e.target.value)}
                style={{ margin: "auto", textAlign: "center" }}
              />
              <label className="form-label">Descripción del término y condición</label>
              <textarea
                name="textarea"
                className="form-control text-justify"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="lg:flex block ">
              <div className='lg:flex block'>
                <div className="block mx-auto">
                  <div className="lg:flex block mb-2 lg:ml-60 px-4">
                    <button
                      type="button"
                      className="btn rounded-pill ColorButtonMain mt-3 w-75 w-100"
                      onClick={() => {
                        setActiveModal(false);
                        isUpdate && setDataUpdate({})
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn rounded-pill ColorButtonMainInv mt-3 w-75 lg:ml-4 w-100"
                      onClick={() => {
                        isUpdate
                          ? updateTermsAndConditionsFC()
                          : addTermsAndConditionsFC()
                      }}
                    >
                      {
                        isUpdate
                          ? 'Actualizar término y condición'
                          : 'Guardar término y condición'
                      }
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
              onClick={() => {
                setActiveModal(false)
                isUpdate && setDataUpdate({})
              }}
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
        </form >
      </div >
    </>
  )
}

export default ModalTermsAndConditions;
