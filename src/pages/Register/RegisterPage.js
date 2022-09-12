import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerFunc } from "../../services/Auth";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schemaValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(3),
});

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaValidation) });

  const handleRegister = async (data) => {
    console.log("🚀 ~ file: Login.js ~ line 26 ~ handleLogin ~ data", data);
    try {
      const { email, password } = data;
      const payload = {
        email,
        password,
      };
      console.log(
        "🚀 ~ file: Login.js ~ line 30 ~ handleLogin ~ payload",
        payload
      );
      const response = await registerFunc(payload);

      const token = response.data;
      if (!token) return;
      localStorage.setItem("access_token", token);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-48 px-4 sm:px-6 lg:px-8">
      <div className=" p-10 shadow-xl max-w-md  w-full space-y-8 gap-5 rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit(handleRegister)}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="text"
                autoComplete="email"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                {...register("email", { required: true })}
              />
            </div>
            <div>
              {errors.email && (
                <span className="text-sm text-red-600">
                  {errors?.email?.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                {...register("password", { required: true })}
              />
            </div>
            <div>
              {errors.password && (
                <span className="text-sm text-red-600">
                  {errors?.password?.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
