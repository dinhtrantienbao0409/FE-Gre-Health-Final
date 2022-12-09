import axiosInstance from "axiosInterceptor/axiosInstance";

export const createRecordFunc = async (payload) =>
  axiosInstance.post("http://localhost:3001/api/record/create", payload);

export const getAllRecordsFunc = async () =>
  axiosInstance.get("http://localhost:3001/api/record");

export const getRecordByUserId = async (userId) =>
  axiosInstance.get(`http://localhost:3001/api/record/findByUserId/${userId}`);

export const getRecordByDoctorId = async (doctorId) =>
  axiosInstance.get(
    `http://localhost:3001/api/record/findByDoctorId/${doctorId}`
  );

export const getRecordById = async (recordId) =>
  axiosInstance.get(`http://localhost:3001/api/record/findOne/${recordId}`);

export const searchRecordsByUser = async (query, userId) =>
  axiosInstance.get(
    `http://localhost:3001/api/record/searchByUser?query=${query}&userId=${userId}`
  );

export const searchRecordsByDoctor = async (query, doctorId) =>
  axiosInstance.get(
    `http://localhost:3001/api/record/searchByDoctor?query=${query}&doctorId=${doctorId}`
  );
