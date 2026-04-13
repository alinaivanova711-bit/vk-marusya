import axios from "axios";

export const api = axios.create({
  baseURL: "https://cinemaguide.skillbox.cc",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})
