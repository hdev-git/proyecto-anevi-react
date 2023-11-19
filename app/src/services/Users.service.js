import http from "./../utils/http";
const url = "https://bnzeroapp.com";
// const url = "http://localhost:4000";

export function createUser(data) {
  return http.post(`${url}/api/user`, JSON.stringify({ ...data }));
}

export function getUser(id) {
  return http.post(`${url}/api/user/get`, JSON.stringify({ id }));
}

export function updateUser(id, data) {
  return http.post(`${url}/api/user/update/${id}`, JSON.stringify(data));
}

export function getAllUsers() {
  return http.get(`${url}/api/user`);
}

export function blockingUser(id) {
  return http.post(`${url}/api/user/blocking/${id}`);
}
