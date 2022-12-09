import axiosInstance from "axiosInterceptor/axiosInstance";

export const MailSender = async (payload) =>
  axiosInstance.post("http://localhost:3001/api/EMAIL/send", payload);
