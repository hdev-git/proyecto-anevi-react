import http from "./../utils/http";
const url = "https://bnzeroapp.com";
// const url = "http://localhost:4000";

export function getClient(id) {
  return http.post(`${url}/api/client`, JSON.stringify({ id }));
}

export function getClientsHubpost(id) {
  return http.post(`${url}/api/client`, JSON.stringify({ id }));
}
