import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

// import RoutesPath from "./routes.e";
import React from "react";
// function App() {
//   return (
//     <Router>
//       <div
//         className={
//           window.location.pathname === "/login" ||
//           window.location.pathname === "/register"
//             ? "layout-wrapper layout-content-navbar LoginBackground"
//             : "layout-wrapper layout-content-navbar"
//         }>
//         <div className="layout-container">
//           {window.location.pathname === "/login" ||
//           window.location.pathname === "/register" ? (
//             <></>
//           ) : (
//             <Dashboard />
//           )}
//           <div className="layout-page">
//             {window.location.pathname === "/login" ||
//             window.location.pathname === "/register" ? (
//               <></>
//             ) : (
//               <Navbar />
//             )}
//             <div className="content-wrapper">
//               <div className="container-xxl flex-grow-1 container-p-y">
//                 <div className="row">
//                   <RoutesPath />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// import React from "react";
// import "react-router-config";
// /* Import components */
import Login from "./pages/Users/Login";
import Layout from "./components/Layout/Layout";
import { UserProvider, UserContext } from "./context/UserContext";

// /*  Estados del usuario */

function App() {
  return (
    <div className="">
      <UserProvider>
        <UserContext.Consumer>
          {(context) => {
            const { user: { token } = {}, setUser, clearUser } = context;
            return token ? (
              <Layout clearUser={clearUser} />
            ) : (
              <Router>
                <Login setUser={setUser} />
              </Router>
            );
          }}
        </UserContext.Consumer>
      </UserProvider>
    </div>
  );
}

export default App;
