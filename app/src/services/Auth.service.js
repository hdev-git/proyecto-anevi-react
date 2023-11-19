import http from "./../utils/http";
const url = "https://bnzeroapp.com";
// const url = "http://localhost:4000";

export function login(userName, password) {
  return http.post(`${url}/api/auth`, JSON.stringify({ userName, password }));
}
