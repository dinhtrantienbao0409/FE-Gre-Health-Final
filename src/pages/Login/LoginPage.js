import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginFunc } from "../../services/Auth";
import { callbackWithGoogle, loginWithGoogle } from "../../services/OAuth";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "slice/authSlice/logginSlice";
import ImageDialog from "components/HomePage/ImageDialog";
import { Link, redirect } from "react-router-dom";
import { Axios } from "axios";

const schemaValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(3),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [dialog, setDialog] = useState({
    isLoading: false,
  });
  const [dialogText, setDialogText] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaValidation) });

  const renderRoute = (isLoggedIn, userRole) => {
    if (isLoggedIn) {
      switch (userRole) {
        case "admin":
          navigate("/admin");
          break;
        case "doctor":
          navigate("/doctor");
          break;
        case "receptionist":
          navigate("/receptionist");
          break;
        case "user":
          navigate("/home");
          break;
      }
    }
  };
  const handleDialog = (isLoading) => {
    setDialog({
      isLoading,
    });
  };

  const confirmDialog = (choose) => {
    if (choose) {
      handleDialog(false);
      setPassword("");
    }
  };

  const handleLogin = async (data) => {
    try {
      const { email, password } = data;
      setPassword(password);
      const payload = {
        email,
        password,
      };
      const response = await loginFunc(payload);
      console.log(
        "🚀 ~ file: LoginPage.js ~ line 33 ~ handleLogin ~ response",
        response
      );
      const { token, payload: loggedInUser } = response.data;
      dispatch(setLoggedInUser(loggedInUser));

      if (!token) return;
      localStorage.setItem("access_token", token);

      if (localStorage.getItem("access_token")) {
        renderRoute(true, response.data.payload.role);
      }
      // navigate("/home");
    } catch (error) {
      setError(error.message);
      handleDialog(true);
      setDialogText("Login Dialog");
    }
  };

  // const handleLoginWithGoogle = async () => {
  //   try {
  //     window.location.href = "http://localhost:3001/auth/google";
  //     const data = await callbackWithGoogle();
  //     console.log(
  //       "🚀 ~ file: LoginPage.js:98 ~ handleLoginWithGoogle ~ data",
  //       data
  //     );
  //   } catch (error) {
  //     console.log(
  //       "🚀 ~ file: LoginPage.js:103 ~ handleLoginWithGoogle ~ error",
  //       error
  //     );
  //   }
  // };

  const handleFetchUserData = async () => {
    const response = await Axios.get("http://localhost3001/Oauth/user", {
      withCredentials: true,
    });
    console.log(
      "🚀 ~ file: LoginPage.js:113 ~ handleFetchUserData ~ response",
      response
    );
  };

  const redirectToGoogleLogin = async (jwt) => {
    let timer;
    window.location.href = "http://localhost:3001/auth/google";

    // setCookie("jwt", jwt);
    // alert(`jwt is ${JSON.stringify(cookies["jwt"])}`);
    if (window.location.href) {
      timer = setInterval(() => {
        handleFetchUserData();
        if (timer) {
          clearInterval(timer);
        }
      }, 500);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-48 px-4 sm:px-6 lg:px-8">
      <div className=" p-10 shadow-xl max-w-md  w-full space-y-8 gap-5 rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          // action="#"
          // method="POST"
          onSubmit={handleSubmit(handleLogin)}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px gap-5">
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-cyan-600 hover:text-cyan-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
            >
              Sign in
            </button>
          </div>
          <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
            <p className="text-center font-semibold mx-4 mb-0">OR</p>
          </div>
        </form>
        {/* <a href="http://localhost:3001/auth/google"> */}
        <button
          // type="submit"
          onClick={redirectToGoogleLogin}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login with Google
        </button>
        {/* </a> */}
      </div>
      {dialog.isLoading && (
        <ImageDialog
          //Update
          // formId={formId}
          onDialog={confirmDialog}
          // setValue={setValue}
          name={dialogText}
        />
      )}
    </div>
  );
};

export default Login;
