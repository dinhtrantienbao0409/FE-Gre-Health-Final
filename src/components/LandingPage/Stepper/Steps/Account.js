import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export const Account = ({ formContent }) => {
  const methods = useFormContext();
  const {
    reset,
    register,
    control,
    formState: { errors },
  } = methods;
  const data = useWatch({ control });
  console.log("🚀 ~ file: Account.js ~ line 156 ~ Account ~ data", data);

  useEffect(() => {
    reset({ ...formContent.account }, { errors: true });
  }, []);

  return (
    <form className="mx-40 my-8">
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
    </form>
  );
};
