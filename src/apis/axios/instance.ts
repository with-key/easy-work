import axios from "axios";

export const apis = axios.create({
  baseURL: "api",
});
