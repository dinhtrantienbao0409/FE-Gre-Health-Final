import axiosInstance from "axiosInterceptor/axiosInstance";

export const createFormFunc = async (payload) =>
  axiosInstance.post("http://localhost:3001/api/form/create", payload);

export const getAllFormsFunc = async () =>
  axiosInstance.get("http://localhost:3001/api/form");

export const getFormsWithoutDoctorIdFunc = async () =>
  axiosInstance.get("http://localhost:3001/api/form/withoutDoctorId");

export const getFormsWithDoctorId = async () =>
  axiosInstance.get("http://localhost:3001/api/form/withDoctorId");

export const getFormsByDoctorIdFunc = async (doctorId) =>
  axiosInstance.get(`http://localhost:3001/api/form/byDoctorId/${doctorId}`);

export const getFormsByDoctorWithStatus = async (doctorId) =>
  axiosInstance.get(`http://localhost:3001/api/form/byStatus/${doctorId}`);

export const getFormById = async (formId) =>
  axiosInstance.get(`http://localhost:3001/api/form/findOne/${formId}`);

export const getFormByUserId = async (userId) =>
  axiosInstance.get(`http://localhost:3001/api/form/byUserId/${userId}`);

export const updateFormFunc = async (formId, payload) =>
  axiosInstance.put(`http://localhost:3001/api/form/doctorId/${formId}`, {
    doctorId: payload,
  });

export const updateFormStatus = async (formId, payload) =>
  axiosInstance.put(`http://localhost:3001/api/form/status/${formId}`, {
    status: payload,
  });

export const searchForms = async (query, doctorId) =>
  axiosInstance.get(
    `http://localhost:3001/api/form/search?query=${query}&doctorId=${doctorId}`
  );

export const searchFormsByUser = async (query, userId) =>
  axiosInstance.get(
    `http://localhost:3001/api/form/search?query=${query}&doctorId=${userId}`
  );

export const searchFormsWithoutDoctor = async (query) =>
  axiosInstance.get(
    `http://localhost:3001/api/form/searchWithoutDoctor?query=${query}`
  );
