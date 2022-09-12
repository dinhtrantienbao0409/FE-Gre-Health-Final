import axios from "axios";

export const loginFunc = async (payload) =>
  axios.post("http://localhost:3001/api/auth/login", payload);

export const registerFunc = async (payload) =>
  axios.post("http://localhost:3001/api/auth/register", payload);
