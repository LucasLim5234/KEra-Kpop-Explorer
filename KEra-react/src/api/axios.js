import axios from "axios";

const api = axios.create({
  baseURL: "http://76.13.213.42:8082",
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
  },
});

export default api;
