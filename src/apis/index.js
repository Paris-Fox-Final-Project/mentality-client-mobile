import axios from "axios";

export default apiClient = axios.create({
  baseURL: "https://mentality-server.herokuapp.com/",
});
