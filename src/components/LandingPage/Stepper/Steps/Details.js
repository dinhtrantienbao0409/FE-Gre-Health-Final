import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setUserDetails } from "slice/authSlice/registerSlice";

const schemaValidation = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  dateOfBirth: yup.string().required(),
  gender: yup.string().required(),
  jobTitle: yup.string().required(),
  contact: yup.string().required(),
});

export default function Details() {
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schemaValidation) });

  const onSubmit = (data) => {
    console.log("🚀 ~ file: Account.js ~ line 28 ~ onSubmit ~ data", data);

    dispatch(setUserDetails(data));
  };
  return (
    <div>
      <form className="my-12 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm my-4 mx-2">
          <div className="flex my-4 ">
            <div className="w-full flex flex-col item-start">
              <label className="flex item-start text-sm font-bold text-gray-500">
                Full name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                autoComplete="fullname"
                className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full name"
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
          </div>
          <div className="flex space-x-4">
            <div className="w-1/2 flex flex-col item-start">
              <label
                className="flex item-start text-sm font-bold text-gray-500"
                htmlFor="dateOfBirth"
              >
                Date Of Birth
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="text"
                className=" appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder=""
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
            <div className="w-1/2 flex flex-col item-start">
              <label
                className="flex item-start text-sm font-bold text-gray-500"
                htmlFor="gender"
              >
                Gender
              </label>

              <div className="flex flex-row items-center space-x-8">
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

          <div className="flex space-x-4 my-4">
            <div className="w-full flex flex-col item-start">
              <label className="flex item-start text-sm font-bold text-gray-500">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="address"
                className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Address"
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
          </div>
          <div className="flex space-x-4 my-4">
            <div className="w-full flex flex-col item-start">
              <label className="flex item-start text-sm font-bold text-gray-500">
                Contact
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                autoComplete="contact"
                className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contact"
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
          <div className="flex space-x-4 my-4">
            <div className="w-full flex flex-col item-start">
              <label className="flex item-start text-sm font-bold text-gray-500">
                Job Title
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                autoComplete="jobTitle"
                className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Job Title"
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
  );
}
