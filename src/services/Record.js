import axios from "axios";

export const createRecordFunc = async (payload) =>
  axios.post("http://localhost:3001/api/record/create", payload);

export const getAllRecordsFunc = async () =>
  axios.get("http://localhost:3001/api/record");
export const getRecordFunc = async (payload) =>
  axios.post("http://localhost:3001/api/record/create", payload);
export const deleteRecordFunc = async (payload) =>
  axios.post("http://localhost:3001/api/record/create", payload);
export const updateRecordFunc = async (payload) =>
  axios.post("http://localhost:3001/api/record/create", payload);
