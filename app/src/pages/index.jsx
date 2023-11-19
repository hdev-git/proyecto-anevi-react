import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClient } from '../services/Client.service';
import messageBox from '../utils/messagebox';
import Loading from '../components/Loading/Loading';
import LogoSearch from '../images/Home/Vector.png';
import Avatar1 from '../images/avatars/1.png';

function Home() {

  let navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  let [search, setSearch] = useState('');
  let [clientsSearch, setClientsSearch] = useState([]);
  let [clients, setClients] = useState([]);
  let [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    _getClients();
  }, []);

  async function _getClients() {
    await getClient()
      .then(({ data }) => {
        if (data.error) {
          messageBox.Simple(data.mensaje, 'error');
        } else {
          data = data.sort((a, b) => a.id - b.id);
          setClients(data);
          setLoading(false);
        }
      })
      .catch((err) => messageBox.Simple(err.message, 'error'))
  }

  async function _redirectDetailsClient(id) {
    navigate("../clientDetails", { state: { id } })
  }

  async function searchFilter(value) {
    let dataFilter = [];
    clients
      .filter(client => {
        if (isNaN(value)) {
          client.fullName = `${client.firstName} ${client.firstLastName}`;
          return client.fullName.toLowerCase().includes(value.trim().toLowerCase());
        } else {
          return client.id === Number(value)
        }
      })
      .map(client => dataFilter.push(client));
    setSearch(value);
    setClientsSearch(dataFilter);
  }

  return (
    loading
      ? <Loading />
      : <>
        <div className="py-6">
          <h1 style={{
            color: "#004750",
            fontWeight: "700",
          }}
            className="2xl:text-6xl lg:text-5xl text-4xl"
          >
            Clientes
          </h1>
        </div>
        <div className="lg:flex block justify-between">
          <div className="lg:flex block">
            <div className="mb-3" style={{ position: 'relative', }}>
              <input
                id="defaultInput"
                className="form-control rounded-pill lg:w-96 lg:14"
                style={{
                  backgroundColor: "#F1F1F1",
                  color: "#B9B9B9",
                  borderBlockColor: "#B9B9B9",
                  paddingLeft: '40px'
                }}
                value={search}
                onChange={e => searchFilter(e.target.value)}
                type="text"
                placeholder="Ingresa el Nombre o el ID de tu cliente"
              />
              <img src={LogoSearch} alt='Lupa de búsqueda' style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)' }} />
            </div>
          </div>
        </div>
        {
          (search.length > 0 && clientsSearch.length === 0)
            ? <h4 className='text-lg font-semibold'>No sé encontró ningún cliente que coincida con la búsqueda.</h4>
            : clientsSearch.length > 0
              ? <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 my-2">
                {
                  clientsSearch.map((client, index) => {
                    return (
                      <div className="col lg:mt-0 md:mx-2 mx-1 mt-3" key={index}>
                        <div
                          className="card h-80 w-auto lg:mx-1 center-custom py-3 "
                          style={{
                            backgroundColor: "rgba(148, 160, 160, 0.2)",
                          }}
                        >
                          <img
                            src={Avatar1}
                            alt='XD'
                            className="w-20 mt-4 h-auto rounded-circle"
                          />
                          <div className="card-body">
                            <div>
                              {
                                (client.firstName || client.secundName || client.firstLastName || client.SecundLastName)
                                  ? <h5 className="card-title my-1 fw-semibold">{client.firstName && client.firstName} {client.secundName && client.secundName} {client.firstLastName && client.firstLastName} {client.SecundLastName && client.SecundLastName}</h5>
                                  : <h5 className='card-title my-1 fw-semibold'>Sin nombre y apellido registrado</h5>
                              }
                              <p className="card-text my-1">{client.company ? client.company : 'No data (Empresa)'}</p>
                            </div>
                            <button
                              type="button"
                              className="btn rounded-pill ColorButtonMain lg:text-sm xl:text-md mx-2 mt-2"
                              onClick={() => _redirectDetailsClient(client.id)}
                            >
                              Detalles del perfil
                            </button>
                            <button
                              type="button"
                              className="btn rounded-pill ColorButtonMainInv lg:text-sm xl:text-md mx-2 mt-2"
                              onClick={() => _redirectDetailsClient(client.id)}
                            >
                              Crear proyecto
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              : <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-1 my-2">
                {
                  clients.slice(currentPage, currentPage + 10).map((data, index) => (
                    <div className="col lg:mt-0 mx-1 md:mx-2 mt-3" key={index}>
                      <div
                        className="card h-80 w-auto lg:mx-1 center-custom py-3 "
                        style={{
                          backgroundColor: "rgba(148, 160, 160, 0.2)",
                        }}
                      >
                        <img
                          src={Avatar1}
                          alt='XD'
                          className="w-20 mt-4 h-auto rounded-circle"
                        />
                        <div className="card-body">
                          <div>
                            {
                              (data.firstName || data.secundName || data.firstLastName || data.SecundLastName)
                                ? <h5 className="card-title my-1 fw-semibold">{data.firstName && data.firstName} {data.secundName && data.secundName} {data.firstLastName && data.firstLastName} {data.SecundLastName && data.SecundLastName}</h5>
                                : <h5 className='card-title my-1 fw-semibold'>Sin nombre y apellido registrado</h5>
                            }
                            <p className="card-text my-1">{data.company ? data.company : 'No data (Empresa)'}</p>
                          </div>
                          <button
                            type="button"
                            className="btn rounded-pill ColorButtonMain lg:text-sm xl:text-md mx-2 mt-2"
                            onClick={() => _redirectDetailsClient(data.id)}
                          >
                            Detalles del perfil
                          </button>
                          <button
                            type="button"
                            className="btn rounded-pill ColorButtonMainInv lg:text-sm xl:text-md mx-2 mt-2"
                            onClick={() => _redirectDetailsClient(data.id)}
                          >
                            Crear proyecto
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
        }
        {
          (!(search.length > 0 || clientsSearch.length > 0) && clients.length > 0)
          && <>
            <div className="flex gap-2 mt-3 mb-2 mr-1 justify-end">
              <button
                className='paginationLeftAndRightButton p-1.5 flex items-center'
                onClick={() => currentPage > 0 && setCurrentPage(currentPage - 10)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height="12.5" viewBox="0 0 6 10" fill="none">
                  <path d="M5.18826 9.79377L0.33312 5.6808C-0.11104 5.29064 -0.11104 4.68914 0.33312 4.31523L5.18826 0.202269C5.64773 -0.187894 6 0.00718769 6 0.608689L6 9.38735C6 10.0051 5.64773 10.1839 5.18826 9.79377Z" fill="currentColor" />
                </svg>
              </button>
              {
                (currentPage / 10) === 0
                  ? <>
                    <button className='paginationButtons px-2 py-0.5 flex items-center activePagination' disabled>{currentPage / 10 + 1}</button>
                    {
                      clients.length >= 10
                      && <>
                        <button className='paginationButtons px-2 py-0.5 flex items-center' onClick={() => setCurrentPage(currentPage + 10)}>{currentPage / 10 + 2}</button>
                        <button className='paginationButtons px-2 py-0.5 flex items-center' onClick={() => setCurrentPage(currentPage + 20)}>{currentPage / 10 + 3}</button>
                      </>
                    }
                  </>
                  : ((currentPage / 10) === Math.floor((clients.length / 10)))
                    ? <>
                      <button className='paginationButtons px-2 py-0.5 flex items-center' onClick={() => setCurrentPage(currentPage - 20)}>{currentPage / 10 - 2}</button>
                      <button className='paginationButtons px-2 py-0.5 flex items-center' onClick={() => setCurrentPage(currentPage - 10)}>{currentPage / 10 - 1}</button>
                      <button className='paginationButtons px-2 py-0.5 flex items-center activePagination' disabled>{currentPage / 10}</button>
                    </>
                    : <>
                      <button className='paginationButtons px-2 py-0.5 flex items-center' onClick={() => setCurrentPage(currentPage - 10)}>{currentPage / 10}</button>
                      <button className='paginationButtons px-2 py-0.5 flex items-center activePagination' disabled>{currentPage / 10 + 1}</button>
                      <button className='paginationButtons px-2 py-0.5 flex items-center' onClick={() => setCurrentPage(currentPage + 10)}>{currentPage / 10 + 2}</button>
                    </>
              }
              <button
                className='paginationLeftAndRightButton p-1.5 flex items-center'
                onClick={() => (currentPage / 10) < Math.floor((clients.length / 10)) && setCurrentPage(currentPage + 10)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12.5" height="12.5" viewBox="0 0 6 11" fill="none">
                  <path d="M0.811742 0.226854L5.66688 4.75112C6.11104 5.1803 6.11104 5.84195 5.66688 6.25324L0.811742 10.7775C0.352265 11.2067 0 10.9921 0 10.3304L0 0.673916C0 -0.00561714 0.352265 -0.202325 0.811742 0.226854Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </>
        }
      </>
  );
}

export default Home;