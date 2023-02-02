import axios, { AxiosPromise } from "axios";

export const api = axios.create({
  baseURL: "/",
  withCredentials: false,
});
