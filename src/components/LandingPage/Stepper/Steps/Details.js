import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

export const Details = ({ formContent }) => {
  const methods = useFormContext();
  const {
    reset,
    register,
    formState: { errors },
  } = methods;

  useEffect(() => {
    console.log(
      "🚀 ~ file: Details.js ~ line 244 ~ useEffect ~ formContent",
      formContent
    );
    reset({ ...formContent.details }, { errors: true });
  }, []);

  return (
    <form className="mx-40 my-8">
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm my-4 mx-2">
        <div className="flex my-4 ">
          <div className="w-full flex flex-col item-start">
            <label className="flex item-start text-sm font-bold text-gray-500">
              Full name
            </label>
            <input
              id="fullname"
              type="text"
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
              <div className="form-check">
                <input
                  className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  value="male"
                  {...register("gender", { required: true })}
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="flexRadioDefault1"
                >
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  value="female"
                  {...register("gender", { required: true })}
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="flexRadioDefault2"
                >
                  Female
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  {...register("gender", { required: true })}
                />
                <label
                  className="form-check-label inline-block text-gray-800"
                  htmlFor="flexRadioDefault2"
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
    </form>
  );
};
