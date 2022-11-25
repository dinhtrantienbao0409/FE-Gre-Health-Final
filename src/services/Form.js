import axiosInstance from "axiosInterceptor/axiosInstance";

export const createFormFunc = async (payload) =>
  axiosInstance.post("http://localhost:3001/api/form/create", payload);

export const getAllFormsFunc = async () =>
  axiosInstance.get("http://localhost:3001/api/form");

export const getFormsWithoutDoctorIdFunc = async () =>
  axiosInstance.get("http://localhost:3001/api/form/withoutDoctorId");

export const getFormsByDoctorIdFunc = async (doctorId) =>
  axiosInstance.get(`http://localhost:3001/api/form/byDoctorId/${doctorId}`);

export const getFormById = async (formId) =>
  axiosInstance.get(`http://localhost:3001/api/form/findOne/${formId}`);

export const updateFormFunc = async (formId, payload) =>
  axiosInstance.put(`http://localhost:3001/api/form/${formId}`, {
    doctorId: payload,
  });
