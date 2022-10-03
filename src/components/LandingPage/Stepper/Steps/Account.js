import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setUserAccount } from "slice/authSlice/registerSlice";
import { useSelector } from "react-redux";

const schemaValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(3),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export default function Account() {
  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schemaValidation) });

  const onSubmit = (data) => {
    console.log("🚀 ~ file: Account.js ~ line 28 ~ onSubmit ~ data", data);

    dispatch(setUserAccount(data));
  };

  // const handleRegister = async () => {
  //   try {
  //     const email = document.querySelector("#email").value;
  //     const password = document.querySelector("#password").value;
  //     const payload = {
  //       email,
  //       password,
  //     };
  //     console.log(
  //       "🚀 ~ file: Login.js ~ line 30 ~ handleLogin ~ payload",
  //       payload
  //     );
  //     // const response = await registerFunc(payload);
  //     dispatch(setRegisteredUser(payload));
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  return (
    <div>
      <div>
        <form
          className="my-12 space-y-6"
          id="my-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm my-4 mx-2">
            <div className="flex my-4 ">
              <div className="w-full flex flex-col item-start">
                <label className="flex item-start text-sm font-bold text-gray-500">
                  Email Address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="text"
                  autoComplete="email"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  {...register("email", { required: true })}
                  {...userData.email}
                />
                <div>
                  {errors.email && (
                    <span className="text-sm text-red-600">
                      {errors?.email?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-4 my-4">
              <div className="w-full flex flex-col item-start">
                <label className="flex item-start text-sm font-bold text-gray-500">
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
                <div>
                  {errors.password && (
                    <span className="text-sm text-red-600">
                      {errors?.password?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-4 my-4">
              <div className="w-full flex flex-col item-start">
                <label className="flex item-start text-sm font-bold text-gray-500">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", { required: true })}
                />
                <div>
                  {errors.confirmPassword && (
                    <span className="text-sm text-red-600">
                      {errors?.confirmPassword?.message}
                    </span>
                  )}
                </div>
              </div>
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
}
