// import axios from "axios";
import axiosInstance from "axiosInterceptor/axiosInstance";

export const createRecordFunc = async (payload) =>
  axiosInstance.post("http://localhost:3001/api/record/create", payload);

export const getAllRecordsFunc = async () =>
  axiosInstance.get("http://localhost:3001/api/record");
export const getRecordFunc = async (payload) =>
  axiosInstance.post("http://localhost:3001/api/record/create", payload);
export const deleteRecordFunc = async (payload) =>
  axiosInstance.post("http://localhost:3001/api/record/create", payload);
export const updateRecordFunc = async (payload) =>
  axiosInstance.post("http://localhost:3001/api/record/create", payload);
