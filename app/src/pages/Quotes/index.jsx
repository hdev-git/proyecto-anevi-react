import React, { useState, useEffect, useContext } from 'react';
//import { useNavigate } from 'react-router-dom';

import CreateQuote from './CreateQuote.js';
import { getQuotes } from '../../services/Quotes.service';
import { getClient } from '../../services/Client.service';
import { UserContext } from '../../context/UserContext';
import { getProjectId } from '../../services/Projects.service';

import messagebox from '../../utils/messagebox';

export default function Quotes() {
  //let navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(true);
  const [dataClient, setDataClient] = useState({})
  const [idQuotes, setIdQuotes] = useState(0);
  const [quotes, setQuotes] = useState([]);
  const [showModalCot, setShowModalCot] = useState(false);
  const [clientId, setClientId] = useState(0);
  const [projectId, setProjectId] = useState(0);
  const [dataProyect, setDataProyect] = useState({})

  let Context = useContext(UserContext).user;

  useEffect(() => {
    _getQuotes();
  }, []);

  const _getQuotes = async () => {
    await getQuotes(idQuotes).then(async ({ data }) => {
      if (data.error) {
        messagebox.Simple(data.mensaje, 'error')
      } else {
        setQuotes(data.Quotes)
        await getProjectId(projectId).then(async ({ data }) => {
          if (data.error)
            messagebox.Simple(data.message, 'error');
          else {
            setDataProyect(data)
            await getClient(clientId).then(({ data }) => {
              if (data.error)
                messagebox.Simple(data.message, 'Error');
              else {
                setDataClient(data);
                setIsLoading(false);
              }
            })
          }
        })
      }
    })
  }

  /*const _redirectDetailsQuotes = async (id) => {
    navigate("../clientDetails", { state: { id } })
  }*/


  return (
    !isLoading
    && <>
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 style={{
          color: "#004750",
          fontSize: "32px",
          fontWeight: "700",
          lineHeight: "20px"
        }}>Cotizaciones</h4>
      </div>

      <div class="card" style={{ backgroundColor: "#F8F8F8" }}>
        <div class="mt-5 mb-5 table-responsive text-nowrap " >
          {showModalCot === true &&
            <div className="App h-screen ml-[90px] flex flex-col items-center justify-center bg-purple-200">
              <CreateQuote
                clientId={clientId}
                projectId={projectId}
                idQuotes={idQuotes}
                dataProyect={dataProyect}
                dataClient={dataClient}
                setShowModalCot={setShowModalCot}
                Context={Context}
              />
            </div>
          }
          <table class="table" >
            <thead>
              <tr>
                <th>ID Cotización</th>
                <th>Estatus</th>
                <th>Proyecto</th>
                <th>Referencia</th>
                <th>Alcances del servicio a realizar</th>
                <th>Precio</th>
                <th>Fecha de envio</th>
              </tr>
            </thead>
            <tbody class="table-border-bottom-0">
              {
                quotes.map((data) => (
                  <tr>
                    <td>{data.id}</td>
                    <td>
                      {
                        data.status === "AC" ?
                          <strong style={{ color: "#FCCC0F" }}>PENDIENTE</strong>
                          :
                          data.status === "AP" ?
                            <strong style={{ color: "#84BE08" }}>APROVADA</strong>
                            :
                            data.status === "NE" ?
                              <strong style={{ color: "red" }}>NEGADA</strong>
                              :
                              data.status === "CA" ?
                                <strong style={{ color: "#41A8FC" }}>CAMBIOS</strong>
                                :
                                <strong>None</strong>
                      }
                    </td>
                    <td>{data.title ? data.title : "No data"}</td>
                    <td>{data.reference ? data.reference : "No data"}</td>
                    <td>{data.scope ? data.scope : "No data"}</td>
                    <td>{data.price ? `$ ${data.price} MX` : "No data"}</td>
                    <td>{data.createDate ? data.createDate : "No data"}</td>
                    <td>
                      <div class="dropdown">
                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                          <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div class="dropdown-menu">
                          <button class="dropdown-item"
                            onClick={() => { setShowModalCot(true); setIdQuotes(data.id); setClientId(data.idClient); setProjectId(data.projectId) }}
                          ><i class="bx bx-edit-alt me-1"></i> Edit</button
                          >
                          <button class="dropdown-item"
                          ><i class="bx bx-trash me-1"></i> Delete</button
                          >
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}