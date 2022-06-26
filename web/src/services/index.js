import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://fuel-supply-api.herokuapp.com/"
})


axiosInstance.interceptors.request.use((config) => {
    const { token } = window.localStorage;
  
    if (token) {
      config.headers.Authorization = token;
    }
  
    return config;
  },
  (error) => Promise.reject(error));

  const api = {
    get(endpoint) {
      return axiosInstance.get(endpoint);
    },
    post(endpoint, body) {
      return axiosInstance.post(endpoint, body);
    },
    delete(endpoint, body) {
      return axiosInstance.delete(endpoint, body);
    },
    put(endpoint, body) {
      return axiosInstance.put(endpoint, body);
    },
    patch(endpoint, body) {
      return axiosInstance.patch(endpoint, body);
    },
    login(body){
        return axios.post("https://fuel-supply-api.herokuapp.com/posto/login", body);
    },
  };

export default api;