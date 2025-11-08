// import axios from "axios";

// const API_URL = "http://localhost:5000/auth";

// const api = axios.create({
//   baseURL: API_URL,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("jwt_token");
//   if (token) {
//     config.headers["jwt_token"] = token;
//   }
//   return config;
// });

// export default api;

import axios from "axios";

const API_URL = "http://localhost:5000/auth";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
