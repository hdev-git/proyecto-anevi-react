import React, { useState, useEffect } from 'react';
import { getAllUsers, blockingUser } from '../../services/Users.service';
import Loading from '../../components/Loading/Loading';
import LogoSearch from '../../images/Home/Vector.png';
import messageBox from '../../utils/messagebox';
import ModalCreateSeller from './ModalCreateSeller';

function CreateSeller() {

  let [loading, setLoading] = useState(true);
  let [users, setUsers] = useState([]);
  let [activeModal, setActiveModal] = useState(false);
  let [search, setSearch] = useState('');
  let [usersSearch, setUsersSearch] = useState('');
  let [dataUserUpdate, setDataUserUpdate] = useState();

  useEffect(() => {
    getDataUsers();
  }, []);

  async function getDataUsers() {
    await getAllUsers()
      .then(({ data }) => {
        data = data.sort((a, b) => a.id - b.id);
        let dataWithSameID = [];
        data.map((user) => dataWithSameID[user.id] = user);
        setUsers(dataWithSameID);
        setLoading(false);
      })
      .catch((err) => messageBox.Simple(err, 'error'));
  }

  async function addUserBlock(id) {
    await blockingUser(id)
      .then(({ data }) => {
        if (data.error) {
          messageBox.Simple(data.message, 'error');
        } else {
          messageBox.Simple(data.message, 'success');
        }
        getDataUsers();
      })
      .catch(err => messageBox.Simple(err, 'error'))
  }

  function editUser(id) {
    setDataUserUpdate(users[id]);
    setActiveModal(true);
  }

  function searchFilter(value) {
    let dataFilter = [];
    users
      .filter(client => {
        client.fullName = `${client.firstName.toLowerCase()} ${client.lastName.toLowerCase()}`
        return client.email.toLowerCase().includes(value.toLowerCase())
          ? client.email.toLowerCase().includes(value.toLowerCase())
          : client.fullName.includes(value.toLowerCase());
      })
      .map(client => dataFilter[client.id] = client);
    setSearch(value);
    setUsersSearch(dataFilter);
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
                Panel del auditor
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
                            placeholder="Ingresa el email ó nombre del vendedor"
                            disabled={users.length === 0 ? true : false}
                          />
                          <img src={LogoSearch} alt='Lupa de búsqueda' style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)' }} />
                        </div>
                      </div>
                      <div className='lg:flex lg:justify-end lg:w-1/2 lg:mb-5'>
                        <button
                          type="button"
                          className="btn rounded-pill ColorButtonMainInv lg:text-sm xl:text-md lg:ml-2 flex"
                          onClick={() => setActiveModal(true)}
                        >
                          Crear cuenta vendedor
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
                              Nombre
                            </span>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                          >
                            <span className="inline-flex items-center">
                              Usuario
                            </span>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                          >
                            <span className="inline-flex items-center">
                              Email
                            </span>
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase'
                          >
                            <span className="inline-flex items-center">
                              Rol
                            </span>
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase'
                          >
                            <span className="inline-flex items-center">
                              Estado de cuenta
                            </span>
                          </th>
                          <th scope='col' className='px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase'></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {
                          (search.length > 0 && usersSearch.length === 0)
                            ? <tr><td className='p-3 text-lg font-semibold text-center' colSpan='7'>No sé encontró ningún vendedor que coincida con la búsqueda.</td></tr>
                            : usersSearch.length > 0
                              ? usersSearch.map((user) => {
                                return (
                                  <tr key={user.id}>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{user.firstName} {user.lastName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{user.userName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                                      {
                                        user.role === 1
                                          ? 'Vendedor Junior'
                                          : 'Vendedor Senior'
                                      }
                                    </td>
                                    <td className={`px-6 py-4 text-center text-sm ${user.accountBlocking ? 'text-orange-500' : 'text-green-500'} whitespace-nowrap`}>
                                      {
                                        user.accountBlocking
                                          ? 'Suspendida/Inhabilitada'
                                          : 'Activa'
                                      }
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                      <button
                                        className="text-green-500 hover:text-green-700 mx-2"
                                        onClick={() => editUser(user.id)}
                                      >
                                        Modificar
                                      </button>
                                      <button
                                        className="text-yellow-500 hover:text-yellow-700 mx-2"
                                        onClick={() => addUserBlock(user.id)}
                                      >
                                        {
                                          user.accountBlocking
                                            ? 'Activar'
                                            : 'Suspender'
                                        }
                                      </button>
                                    </td>
                                  </tr>
                                )
                              })
                              : users.map((user) => {
                                return (
                                  <tr key={user.id}>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">{user.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{user.firstName} {user.lastName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{user.userName}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap text-center">
                                      {
                                        user.role === 1
                                          ? 'Vendedor Junior'
                                          : 'Vendedor Senior'
                                      }
                                    </td>
                                    <td className={`px-6 py-4 text-center text-sm ${user.accountBlocking ? 'text-orange-500' : 'text-green-500'} whitespace-nowrap`}>
                                      {
                                        user.accountBlocking
                                          ? 'Suspendida/Inhabilitada'
                                          : 'Activa'
                                      }
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                      <button
                                        className="text-green-500 hover:text-green-700 mx-2"
                                        onClick={() => editUser(user.id)}
                                      >
                                        Modificar
                                      </button>
                                      <button
                                        className="text-yellow-500 hover:text-yellow-700 mx-2"
                                        onClick={() => addUserBlock(user.id)}
                                      >
                                        {
                                          user.accountBlocking
                                            ? 'Activar'
                                            : 'Suspender'
                                        }
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
            </div>
            {
              activeModal
              && <div
                className="App h-screen ml-[90px] flex flex-col items-center justify-center bg-purple-200 vw-100 vh-100"
                style={{
                  zIndex: '10',
                  background: 'rgba(0, 162, 151, .55)',
                  position: 'fixed',
                  top: '0',
                  right: '0',
                  bottom: '0',
                  left: '0',
                  overflowX: 'hidden',
                  overflowY: 'auto',
                }}
              >
                <ModalCreateSeller dataUserUpdate={dataUserUpdate && dataUserUpdate} setActiveModal={setActiveModal} setDataUserUpdate={setDataUserUpdate} />
              </div>
            }
          </>
      }
    </>
  )

}

export default CreateSeller;