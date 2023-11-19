import React, { useEffect, useState } from 'react';
import { addConcept, putConcept } from '../../../services/Admin.service';
import messageBox from '../../../utils/messagebox';

function ModalCreateConcept({ setActiveModal, dataProductsUpdate, setDataProductsUpdate, productId }) {

  let [title, setTitle] = useState(dataProductsUpdate ? dataProductsUpdate.title : '');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    }
  });

  async function CreateSeller(e) {
    e.preventDefault();
    await addConcept({ productId, title })
      .then(({ data }) => {
        if (data.error) {
          messageBox.Simple(data.message, 'error');
        } else {
          messageBox.Simple(data.message, 'success');
          setActiveModal(false);
        }
      })
      .catch(err => messageBox.Simple(err, 'error'))
    setTimeout(() => window.location.reload(), 2000);
  }

  async function UpdateAccount(e) {
    e.preventDefault();
    await putConcept({ id: dataProductsUpdate?.id, title })
      .then(({ data }) => {
        if (data.error) {
          messageBox.Simple(data.message, 'error');
        } else {
          messageBox.Simple(data.message, 'success');
          setActiveModal(false);
        }
      })
      .catch(err => messageBox.Simple(err, 'error'))
    setTimeout(() => window.location.reload(), 2000);
  }

  return (
    <>
      <div
        tabIndex="-1"
        aria-hidden="true"
        className="content-modal"
      >
        <form onSubmit={(e) => dataProductsUpdate ? UpdateAccount(e) : CreateSeller(e)}>
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
                  dataProductsUpdate
                    ? `Modificando concepto`
                    : 'Crear nuevo concepto'
                }
              </h4>
            </div>
            <div className='block p-4'>
              <div className=''>
                <label className="form-label">Concepto</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  style={{ margin: "auto", textAlign: "center" }}
                />
              </div>

            </div>

            <div className="lg:flex block ">
              <div className='lg:flex block'>
                <div className="block mx-auto">
                  <div className="lg:flex block mb-2 lg:ml-60 px-4">
                    <button
                      type="button"
                      className="btn rounded-pill ColorButtonMain mt-3 w-75 w-100"
                      onClick={() => {
                        setActiveModal(false)
                        dataProductsUpdate && setDataProductsUpdate(undefined)
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn rounded-pill ColorButtonMainInv mt-3 w-75 lg:ml-4 w-100">
                      {
                        dataProductsUpdate
                          ? 'Actualizar'
                          : 'Guardar'
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
                dataProductsUpdate && setDataProductsUpdate(undefined)
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

export default ModalCreateConcept;
