import axios from "axios";

export const loginFunc = async (payload) =>
  axios.post("http://localhost:3001/api/auth/login", payload);

export const registerFunc = async (payload) =>
  axios.post("http://localhost:3001/api/auth/register", payload);

export const getUserProfile = async (userId) =>
  axios.get(`http://localhost:3001/api/auth/${userId}`);

export const getAllUsers = async (page, limit) =>
  // axios.get(`http://localhost:3001/api/auth?${page}&${limit}`);
  axios.get(`http://localhost:3001/api/auth`);
