import React from "react";
import Avatar1 from '../../images/avatars/1.png';

export default function Navbar(props) {
  const data = props;

  // function clearDataUser() {
  //   data.clearUser();
  // };

  return (
    <>
      <nav
        className="w-full"
        style={{
          backgroundColor: "#F9F9F9",
          paddingTop: "10px",
          paddingBottom: "10px",
          paddingRight: 40
        }}>
        <div className="navbar-nav-right d-flex align-items-center">
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            {/* ------------------------------ <!-- User --> ----------------------------- */}
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <span
                className="nav-link hide-arrow"
              >
                <div className="avatar avatar-online">
                  <img
                    src={Avatar1}
                    alt=''
                    className="w-px-40 h-auto rounded-circle"
                  />
                </div>
              </span>
            </li>
            {/* <li className="nav-item lh-1 me-3 ms-3">
              <a
                href='/'
                style={{
                  color: '#FF5242'
                }}
                onClick={clearDataUser}
              >
                Cerrar sesión
              </a>
            </li> */}
            {/* ----------------------------- <!--/ User --> ----------------------------- */}
          </ul>
        </div>
      </nav>
    </>
  );
}
