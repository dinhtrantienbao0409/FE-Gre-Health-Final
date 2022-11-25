import axios from "axios";

export const loginFunc = async (payload) =>
  axios.post("http://localhost:3001/api/auth/login", payload);

export const registerFunc = async (payload) =>
  axios.post("http://localhost:3001/api/auth/register", payload);

export const getUserProfile = (userId) =>
  axios.get(`http://localhost:3001/api/auth/findOne/${userId}`);

export const getAllUsers = async (page, limit) =>
  axios.get(`http://localhost:3001/api/auth`);

export const getAllDoctors = async () =>
  axios.get(`http://localhost:3001/api/auth/doctor`);
