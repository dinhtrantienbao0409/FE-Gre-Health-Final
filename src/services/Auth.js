import axios from "axios";
import axiosInstance from "axiosInterceptor/axiosInstance";

export const loginFunc = async (payload) =>
  axios.post("http://localhost:3001/api/auth/login", payload);

export const registerFunc = async (payload) =>
  axios.post("http://localhost:3001/api/auth/register", payload);

export const getUserProfile = (userId) =>
  axiosInstance.get(`http://localhost:3001/api/auth/findOne/${userId}`);

export const getAllUsers = async (page, limit) =>
  axiosInstance.get(`http://localhost:3001/api/auth`);

export const getAllDoctors = async () =>
  axiosInstance.get(`http://localhost:3001/api/auth/doctor`);

export const searchUsers = async (query) =>
  axiosInstance.get(`http://localhost:3001/api/auth/search?${query}`);
