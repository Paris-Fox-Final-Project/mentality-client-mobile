import axios from "axios";

export default apiClient = axios.create({
  baseURL: "http://192.168.1.2:4000",
});
