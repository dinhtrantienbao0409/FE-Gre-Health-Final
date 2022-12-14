import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Footer from "components/LandingPage/Footer";
import { registerFunc } from "services/Auth";
import AdminLayout from "layouts/admin.layouts";

const schemaValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(3),
  name: yup.string().required(),
  gender: yup.string().required(),
  dateOfBirth: yup.string().required(),
  address: yup.string().required(),
  contact: yup.string().required(),
  role: yup.string().required(),
  jobTitle: yup.string().required(),
});

export default function AdminCreateUserPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaValidation) });

  const handleCreateUser = async (data) => {
    try {
      const {
        email,
        password,
        name,
        gender,
        dateOfBirth,
        address,
        contact,
        role,
        jobTitle,
      } = data;

      const payload = {
        email,
        password,
        name,
        gender,
        dateOfBirth,
        address,
        contact,
        role,
        jobTitle,
      };

      const response = await registerFunc(payload);
      navigate("/admin");

      return response.data;
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div>
      <div className="mx-auto flex items-center justify-center max-w-7xl px-4 sm:px-6 lg:px-8 py-48">
        <div className=" p-10 shadow-xl   w-full space-y-8 gap-5 rounded-lg">
          <div>
            <h1 className="mt-2 text-start text-3xl font-extrabold text-gray-900">
              Create User
            </h1>
            <p className=" text-gray-500 text-start text-sm">
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
              magnam voluptatum cupiditate veritatis in accusamus quisquam.
            </p>
          </div>
          <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>
          <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
            Member Information
          </h1>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(handleCreateUser)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px gap-5">
              <div className="flex space-x-4 my-4 mx-2">
                <div className="w-1/2 flex flex-col item-start">
                  <label
                    className="flex item-start text-sm font-bold text-gray-600"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className=" appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter user email"
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
                <div className="w-1/2 flex flex-col item-start">
                  <label
                    className="flex item-start text-sm font-bold text-gray-600"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className=" appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter user password"
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
              <div className="flex space-x-4 my-4 mx-2">
                <div className="w-1/2 flex flex-col item-start">
                  <label
                    className="flex item-start text-sm font-bold text-gray-600"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className=" appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter user fullname"
                    {...register("name", { required: true })}
                  />
                  <div>
                    {errors.name && (
                      <span className="text-sm text-red-600">
                        {errors?.name?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-1/2 flex flex-col item-start">
                  <label
                    className="flex item-start text-sm font-bold text-gray-600"
                    htmlFor="gender"
                  >
                    Gender
                  </label>

                  <div className="flex flex-row space-x-8 mt-2">
                    <div class="form-check">
                      <input
                        class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="male"
                        {...register("gender", { required: true })}
                      />
                      <label
                        class="form-check-label inline-block text-gray-800"
                        for="flexRadioDefault1"
                      >
                        Male
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        value="female"
                        {...register("gender", { required: true })}
                      />
                      <label
                        class="form-check-label inline-block text-gray-800"
                        for="flexRadioDefault2"
                      >
                        Female
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        {...register("gender", { required: true })}
                      />
                      <label
                        class="form-check-label inline-block text-gray-800"
                        for="flexRadioDefault2"
                        value="other"
                      >
                        Other
                      </label>
                    </div>
                  </div>
                  <div>
                    {errors.gender && (
                      <span className="text-sm text-red-600">
                        {errors?.gender?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 my-2 mx-2">
                <div className="w-1/2 flex flex-col item-start my-4">
                  <label
                    className="flex item-start text-sm font-bold text-gray-600"
                    htmlFor="date-of-birth"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="text"
                    className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter user date of birth"
                    {...register("dateOfBirth", { required: true })}
                  />
                  <div>
                    {errors.dateOfBirth && (
                      <span className="text-sm text-red-600">
                        {errors?.dateOfBirth?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-1/2 flex flex-col item-start my-4">
                  <label
                    className="flex item-start text-sm font-bold text-gray-600"
                    htmlFor="contact"
                  >
                    Phone Number
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter user phone number"
                    {...register("contact", { required: true })}
                  />
                  <div>
                    {errors.contact && (
                      <span className="text-sm text-red-600">
                        {errors?.contact?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 my-4 mx-2">
                <div className="w-1/2 flex flex-col item-start">
                  <label
                    className="flex item-start text-sm font-bold text-gray-600"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    className=" appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter user address"
                    {...register("address", { required: true })}
                  />
                  <div>
                    {errors.address && (
                      <span className="text-sm text-red-600">
                        {errors?.address?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-1/2 flex flex-col item-start">
                  <label
                    className="flex item-start text-sm font-bold text-gray-600"
                    htmlFor="role"
                  >
                    Role
                  </label>

                  <div className="flex flex-row space-x-8 mt-2">
                    <div class="form-check">
                      <input
                        class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="doctor"
                        {...register("role", { required: true })}
                      />
                      <label
                        class="form-check-label inline-block text-gray-800"
                        for="flexRadioDefault1"
                      >
                        Doctor
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        value="receptionist"
                        {...register("role", { required: true })}
                      />
                      <label
                        class="form-check-label inline-block text-gray-800"
                        for="flexRadioDefault2"
                      >
                        Receptionist
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        {...register("role", { required: true })}
                      />
                      <label
                        class="form-check-label inline-block text-gray-800"
                        for="flexRadioDefault2"
                        value="user"
                      >
                        User
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        {...register("role", { required: true })}
                      />
                      <label
                        class="form-check-label inline-block text-gray-800"
                        for="flexRadioDefault2"
                        value="admin"
                      >
                        Admin
                      </label>
                    </div>
                  </div>
                  <div>
                    {errors.role && (
                      <span className="text-sm text-red-600">
                        {errors?.role?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col mx-2 ">
                <div className="my-4 w-2/3 flex flex-col item-start">
                  <label
                    className="flex item-start text-sm font-bold text-gray-600"
                    htmlFor="jobTitle"
                  >
                    Job Title
                  </label>
                  <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter user Jobtitle "
                    {...register("jobTitle", { required: true })}
                  />
                  <div>
                    {errors.jobTitle && (
                      <span className="text-sm text-red-600">
                        {errors?.jobTitle?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

            <div>
              <button
                type="submit"
                className="w-1/4 mx-2 group  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <AdminLayout />
      <Footer />
    </div>
  );
}
