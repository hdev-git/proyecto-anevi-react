import React, { useState, useEffect, useContext } from 'react';
import messageBox from '../../../utils/messagebox';
import { UserContext } from '../../../context/UserContext';
import { getUser, updateUser } from '../../../services/Users.service';
import Loading from '../../../components/Loading/Loading';

import LogoPencil from '../../../images/mdi_pencil.svg';
import Avatar1 from '../../../images/avatars/1.png';

function ProfileSettings() {

  let [userData, setUserData] = useState();
  let [loading, setLoading] = useState(true);
  let [enableFirstName, setEnableFirstName] = useState(false);
  let [enableLastName, setEnableLastName] = useState(false);
  let [enablePassword, setEnablePassword] = useState(false);
  let [enableEmail, setEnableEmail] = useState(false);
  let [enableConfirmPassword, setEnableConfirmPassword] = useState(false);
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [rePassword, setRePassword] = useState('');
  let idUser = useContext(UserContext).user.id;

  useEffect(() => {
    if (loading) {
      getDataUser();
    }
  });

  async function getDataUser() {
    await getUser(idUser).then(({ data }) => {
      if (data.error) {
        messageBox.Simple(data.mensaje, 'error');
      } else {
        setUserData(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setLoading(false);
      }
    });
  }

  async function updateData() {
    await updateUser(idUser, { firstName, lastName, userName: userData.userName, email, role: userData.role, password, rePassword })
      .then(({ data }) => {
        if (data.error) {
          messageBox.Simple(data.message, 'error');
        } else {
          messageBox.Simple(data.message, 'success');
          setTimeout(() => window.location.reload(), 2000);
        }
      })
      .catch(err => messageBox.Simple(err, 'error'))
  }

  return (
    <>
      {
        loading
          ? <Loading />
          :
          <div
            tabIndex="-1"
            aria-hidden="true"
          >
            <form className="mx-auto" onSubmit={(e) => e.preventDefault()}>
              <div className="ml-8 mt-10">
                <h4
                  style={{
                    color: "#004750",
                    fontSize: "32px",
                    fontWeight: "700",
                    lineHeight: "20px"
                  }}
                >
                  Mi cuenta
                </h4>
              </div>

              <div className="block m-10">
                <div className="mb-3 flex">
                  <img
                    src={Avatar1}
                    alt=''
                    className="w-24 m-4 rounded-circle"
                  />
                  <img
                    src={LogoPencil}
                    alt=''
                    className="w-4 h-4 m-4 rounded-circle"
                    style={{
                      top: '50%',
                      left: '0',
                      position: 'relative',
                      width: '25px',
                      height: '25px',
                      transform: 'translateY(-50%)'
                    }}
                  />
                </div>
                <div className="lg:flex block">
                  <div className="mt-2">
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label text-center" >Nombre</label>
                      <div className="flex">
                        <input
                          type="text"
                          className="form-control rounded-pill w-auto"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder={userData.firstName && userData.firstName}
                          style={{ margin: "auto", textAlign: "center" }}
                          disabled={!enableFirstName}
                        />
                        <img
                          src={LogoPencil}
                          alt=''
                          className="w-4 h-4 m-4 rounded-circle"
                          style={{
                            cursor: 'pointer'
                          }}
                          onClick={() => setEnableFirstName(!enableFirstName)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label" >Apellido</label>
                      <div className="flex">
                        <input
                          type="text"
                          className="form-control rounded-pill w-auto"
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder={userData.lastName && userData.lastName}
                          style={{ margin: "auto", textAlign: "center" }}
                          disabled={!enableLastName}
                        />
                        <img
                          src={LogoPencil}
                          alt=''
                          className="w-4 h-4 m-4 rounded-circle"
                          style={{
                            cursor: 'pointer'
                          }}
                          onClick={() => setEnableLastName(!enableLastName)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label" >Email</label>
                      <div className="flex">
                        <input
                          type="text"
                          className="form-control rounded-pill w-auto"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={userData.email && userData.email}
                          style={{ margin: "auto", textAlign: "center" }}
                          disabled={!enableEmail}
                        />
                        <img
                          src={LogoPencil}
                          alt=''
                          className="w-4 h-4 m-4 rounded-circle"
                          style={{
                            cursor: 'pointer'
                          }}
                          onClick={() => setEnableEmail(!enableEmail)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label" >Password</label>
                      <div className="flex">
                        <input
                          type="password"
                          className="form-control rounded-pill w-auto"
                          id="password"
                          placeholder='*******'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          style={{ margin: "auto", textAlign: "center" }}
                          disabled={!enablePassword}
                        />
                        <img
                          src={LogoPencil}
                          alt=''
                          className="w-4 h-4 m-4 rounded-circle"
                          style={{
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            setEnablePassword(!enableConfirmPassword)
                            setEnableConfirmPassword(!enableConfirmPassword)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {
                    enableConfirmPassword &&
                    <div className='mt-2'>
                      <div className='mb-3'>
                        <label htmlFor="rePassword" className="form-label">Confirmar password</label>
                        <div className='flex'>
                          <input
                            type="password"
                            className="form-control rounded-pill w-auto"
                            id="rePassword"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            placeholder='*******'
                            style={{ margin: "auto", textAlign: "center" }}
                          />
                          <img
                            style={{ opacity: '0' }}
                            src={LogoPencil}
                            alt=''
                            className="w-4 h-4 m-4 rounded-circle"
                          />
                        </div>
                      </div>
                    </div>
                  }
                </div>
                {
                  (
                    userData.firstName !== firstName ||
                    userData.lastName !== lastName ||
                    userData.email !== email ||
                    (password || rePassword)
                  ) &&
                  <div className='my-2'>
                    <div className='lg:mb-5'>
                      <button
                        type="button"
                        className="btn rounded-pill ColorButtonMainInv lg:text-sm xl:text-md flex"
                        onClick={() => updateData()}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                }
              </div>

              <div className="ml-8 mt-10">
                <h4
                  style={{
                    color: "#004750",
                    fontSize: "32px",
                    fontWeight: "700",
                    lineHeight: "20px",
                    margin: '20px 0'
                  }}
                >
                  Datos laborales
                </h4>
                <div className="lg:flex block">
                  <div className="mt-2">
                    <div className="mb-3">
                      <label htmlFor="job" className="form-label text-center" >Puesto de trabajo</label>
                      <div className="flex">
                        <input
                          type="text"
                          className="form-control rounded-pill w-auto"
                          id="job"
                          value={userData.rolName && userData.rolName}
                          style={{ margin: "auto", textAlign: "center" }}
                          disabled={true}
                        />
                        <img
                          src={LogoPencil}
                          alt=''
                          className="w-4 h-4 m-4 rounded-circle"
                          style={{
                            opacity: '0'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
      }
    </>
  );
}

export default ProfileSettings;
