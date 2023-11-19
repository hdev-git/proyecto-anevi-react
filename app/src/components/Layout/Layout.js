import React, { useState, useContext } from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import "./styleLayout.css";
import routes from "../../routes";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Logo from "../../images/Home/Frame 2.png";

import Login from "../../pages/Users/Login";

export default function Layout({ clearUser }) {

  const [modalNav, setmodalNav] = useState(true);
  let Context = useContext(UserContext).user;

  return (
    <>
      <Router>
        <div
          className={
            !Context.token
              ? "layout-wrapper layout-content-navbar LoginBackground"
              : "layout-wrapper layout-content-navbar"
          }>
          <div className="layout-container">
            {!Context.token ? (
              <></>
            ) : (
              modalNav ? (
                <Dashboard setmodalNav={setmodalNav} clearUser={clearUser} userRole={Context.role} />
              )
                : (
                  <div
                    className="w-14 pt-3 pl-2 mx-auto"
                    style={{
                      background: 'rgb(249, 249, 249)',
                      position: 'absolute',
                      zIndex: '77'
                    }}
                  >
                    <div
                      className="app-brand-link cursor-pointer"
                      onClick={() => modalNav ? setmodalNav(false) : setmodalNav(true)}
                    >
                      <img
                        src={Logo}
                        className="w-14 m-auto"
                        alt=""
                      />
                      <p className="text-xl ml-3">Menu</p>
                    </div>
                  </div>
                )
            )}
            <div className="layout-page">
              {
                window.location.pathname !== "/login"
                && <Navbar clearUser={clearUser} />
              }
              <div className="content-wrapper">
                <div className="container-xxl flex-grow-1 container-p-y">
                  <div className="row">
                    <div className="content">
                      <Routes>
                        {routes.map(function (route, idx) {
                          return (
                            // route.component && (
                            <Route
                              key={idx}
                              path={route.path}
                              exact={route.exact === true ? true : false}
                              element={route.element}
                            />

                            // )
                          );
                        })}
                      </Routes>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}
