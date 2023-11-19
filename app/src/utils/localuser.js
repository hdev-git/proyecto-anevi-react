export function setUser(user = {}) {
  let suser = JSON.stringify(user);
  window.localStorage.setItem("user", suser);
}
export function getUser() {
  let suser = window.localStorage.getItem("user");
  return JSON.parse(suser);
}
export function getToken() {
  let suser = window.localStorage.getItem("user");
  if (suser && suser !== "") {
    let user = JSON.parse(suser);
    return user.token;
  } else {
    return undefined;
  }
}

export function getOption(opt) {
  let usu = getUser();
  if (usu) {
    if (usu.perfil.indexOf(opt) > 0 || usu.perfil.indexOf(opt) === "AA") {
      return true;
    } else {
      return false;
    }
  }
}

export function getOptionExplicit(opt) {
  let usu = getUser();
  if (usu) {
    if (usu.perfil.indexOf(opt) > 0) {
      return true;
    } else {
      return false;
    }
  }
}

export function removeUser() {
  window.localStorage.removeItem("user");
}
