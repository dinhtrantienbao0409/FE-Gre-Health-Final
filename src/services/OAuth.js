import axios from "axios";

export const loginWithGoogle = async () => {
  return await axios.get("http://localhost:3001/auth/google");
};

export const callbackWithGoogle = async () => {
  return await axios.get("http://localhost:3001/auth/google/callback");
};
