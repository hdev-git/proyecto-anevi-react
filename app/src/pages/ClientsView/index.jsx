import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import messageBox from '../../utils/messagebox';
import { getClient } from '../../services/Client.service';
import { UserContext } from '../../context/UserContext';
import Loading from '../../components/Loading/Loading';
import LogoSearch from '../../images/Home/Vector.png';
import Avatar1 from '../../images/avatars/1.png';


function ClientsView() {
  let navigate = useNavigate();
  let Context = useContext(UserContext);

  let [loading, setLoading] = useState(true);
  let [clients, setClients] = useState([]);
  let [search, setSearch] = useState('');
  let [clientsSearch, setClientSearch] = useState([]);
  let [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    _getClients();
  }, []);

  const _getClients = async () => {
    await getClient()
      .then(({ data }) => {
        if (data.error) {
          messageBox.Simple(data.mensaje, 'Error')
        } else {
          setClients(data)
          setLoading(false);
        }
      })
  }

  const _redirectDetailsClient = async (id) => {
    navigate("../clientDetails", { state: { id } })
  }

  function searchFilter(value) {
    let dataFilter = [];
    clients
      .filter(client => {
        if (isNaN(value)) {
          client.fullName = `${client.firstName} ${client.lastName}`;
          return client.fullName.toLowerCase().includes(value.trim().toLowerCase());
        } else return client.id === Number(value);
      })
      .map(client => dataFilter.push(client));
    setSearch(value);
    setClientSearch(dataFilter);
  }

  return (
    <>
      {
        loading
          ? <Loading />
          : <>
            <div className="ml-8 mt-10">
              <h1
                className="mb-2 font-weight-bold"
                style={{ fontFamily: "Poppins", fontSize: "40px", marginTop: "10px", marginBottom: "20px", color: "rgb(0, 71, 80)", fontWeight: '700' }}
              >
                Clientes
              </h1>
            </div>
            <div className="flex flex-col mx-6">
              <div className="overflow-x-auto">
                <div className="py-3 pl-2">
                  <div className="relative">
                    <div className="lg:flex block justify-between">
                      <div className='lg:flex lg:w-1/2'>
                        <div className="mb-3" style={{ position: 'relative' }}>
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
                            placeholder="Ingresa el nombre"
                            disabled={clients.length === 0 ? true : false}
                          />
                          <img src={LogoSearch} alt='Lupa de búsqueda' style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)' }} />
                        </div>
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
                              Nombre del cliente
                            </span>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                          >
                            <span className="inline-flex items-center">
                              Email personal
                            </span>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase"
                          >
                            <span className="inline-flex items-center">
                              Empresa (Marca)
                            </span>
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase'
                          >
                            <span className="inline-flex items-center">
                              Web de la empresa
                            </span>
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase'
                          >
                            <span className="inline-flex items-center">
                              Detalles
                            </span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {
                          (search.length > 0 && clientsSearch.length === 0)
                            ? <tr><td className='p-3 text-lg font-semibold text-center' colSpan='7'>No sé encontró ningún cliente que coincida con la búsqueda.</td></tr>
                            : clientsSearch.length > 0
                              ? clientsSearch.map((client) => {
                                return (
                                  <tr key={client.id}>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
                                      <div className='font-semibold mx-auto p-0'>
                                        <img
                                          className="w-px-50 h-px-50 rounded-circle inline-flex"
                                          src={Avatar1}
                                          alt='Avatar cliente'
                                        />
                                        <p className='inline-flex items-center ml-3'>
                                          {
                                            client.firstName || client.lastName
                                              ? `${client.firstName} ${client.lastName || ''}`
                                              : 'No data'
                                          }
                                        </p>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap text-center">{client.email && client.email !== 'null' ? client.email : 'No data'}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap text-center">{client.company ? client.company : 'No data'}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap text-center">{client.website ? client.website : 'No data'}</td>
                                    <td className='px-6 py-4 text-center text-sm whitespace-nowrap'>
                                      <button
                                        type="button"
                                        className="btn rounded-pill ColorButtonMain lg:text-sm xl:text-md mx-2 mt-2"
                                        onClick={() => _redirectDetailsClient(client.id)}
                                      >
                                        Detalles del perfil
                                      </button>
                                    </td>
                                  </tr>
                                )
                              })
                              : clients.slice(currentPage, currentPage + 10).map((client) => {
                                return (
                                  <tr key={client.id}>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap">
                                      <div className='font-semibold mx-auto p-0'>
                                        <img
                                          className="w-px-50 h-px-50 rounded-circle inline-flex"
                                          src={Avatar1}
                                          alt='Avatar cliente'
                                        />
                                        <p className='inline-flex items-center ml-3'>
                                          {
                                            client.firstName || client.lastName
                                              ? `${client.firstName} ${client.lastName || ''}`
                                              : 'No data'
                                          }
                                        </p>
                                      </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap text-center">{client.email && client.email !== 'null' ? client.email : 'No data'}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap text-center">{client.company ? client.company : 'No data'}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800 whitespace-nowrap text-center">{client.website ? client.website : 'No data'}</td>
                                    <td className='px-6 py-4 text-center text-sm whitespace-nowrap'>
                                      <button
                                        type="button"
                                        className="btn rounded-pill ColorButtonMain lg:text-sm xl:text-md mx-2 mt-2"
                                        onClick={() => _redirectDetailsClient(client.id)}
                                      >
                                        Detalles del perfil
                                      </button>
                                    </td>
                                  </tr>
                                )
                              })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
                          <button className='paginationButtons px-2 py-0.5 flex items-center' onClick={() => setCurrentPage(currentPage + 10)}>{currentPage / 10 + 2}</button>
                          <button className='paginationButtons px-2 py-0.5 flex items-center' onClick={() => setCurrentPage(currentPage + 20)}>{currentPage / 10 + 3}</button>
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
            </div>
          </>
      }
    </>
  )

}

export default ClientsView;