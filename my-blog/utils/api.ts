import axios from "axios";

function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }

  return null;
}

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
  function (config) {
    const token = getToken();

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;
