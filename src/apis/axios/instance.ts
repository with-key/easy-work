import axios from "axios";

export const apis = axios.create({
  baseURL: "http://localhost:3000/api",
});
