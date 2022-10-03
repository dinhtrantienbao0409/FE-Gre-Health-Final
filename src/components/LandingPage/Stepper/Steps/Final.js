import { registerFunc } from "services/Auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function Final() {
  const {
    email,
    password,
    confirmPassword,
    name,
    dateOfBirth,
    gender,
    address,
    contact,
    jobTitle,
  } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const payload = {
        email,
        password,
        confirmPassword,
        name,
        dateOfBirth,
        gender,
        address,
        contact,
        jobTitle,
      };

      const response = await registerFunc(payload);

      const token = response.data;
      console.log(
        "🚀 ~ file: Final.js ~ line 37 ~ handleRegister ~ token",
        token
      );
      if (!token) return;
      localStorage.setItem("access_token", token);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container md:mt-10">
      <div className="flex flex-col items-center">
        <div className="text-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-20 h-20"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div className="mt-3 text-xl font-semibold uppercase text-green-500">
          Congratulations!
        </div>
        <div className="text-lg font-semibold text-gray-500">
          Your Account has been created.
        </div>
        <div>
          <button
            onClick={() => handleRegister()}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
