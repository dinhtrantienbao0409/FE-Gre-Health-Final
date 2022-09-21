import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createRecordFunc } from "../../services/Record";
import Footer from "../../components/LandingPage/Footer";

export default function CreateRecordPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCreateRecord = async (data) => {
    try {
      const {
        name,
        gender,
        dateOfBirth,
        address,
        age,
        contact,
        healthCondition,
        doctorSuggestion,
      } = data;
      const payload = {
        name,
        gender,
        dateOfBirth,
        address,
        age,
        contact,
        healthCondition,
        doctorSuggestion,
      };
      console.log(
        "🚀 ~ file: CreateRecordPage.js ~ line 38 ~ CreateRecordPage ~ payload",
        payload
      );

      const response = await createRecordFunc(payload);
      navigate("/home");

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
              Medical Record
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
            // action="#"
            // method="POST"
            onSubmit={handleSubmit(handleCreateRecord)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px gap-5">
              <div className="flex space-x-4 my-4 mx-2">
                <div className="w-1/2 flex flex-col item-start">
                  <label className="flex item-start text-sm" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className=" appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your fullname"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="w-1/2 flex flex-col item-start">
                  <label className="flex item-start text-sm" htmlFor="gender">
                    Gender
                  </label>
                  <input
                    id="gender"
                    name="gender"
                    type="text"
                    className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    {...register("gender", { required: true })}
                  />
                </div>
              </div>
              <div className="flex space-x-4 my-2 mx-2">
                <div className="w-1/2 flex flex-col item-start">
                  <label
                    className="flex item-start text-sm"
                    htmlFor="date-of-birth"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="text"
                    className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your date of birth"
                    {...register("dateOfBirth", { required: true })}
                  />
                </div>
                <div className="w-1/2 flex flex-col item-start">
                  <label className="flex item-start text-sm" htmlFor="age">
                    Age
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="text"
                    className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    {...register("age", { required: true })}
                  />
                </div>
              </div>
              <div className="flex flex-col mx-2 ">
                <div className="my-4 w-2/3 flex flex-col item-start">
                  <label className="flex item-start text-sm" htmlFor="address">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your address"
                    {...register("address", { required: true })}
                  />
                </div>
                <div className=" w-2/3 flex flex-col item-start">
                  <label className="flex item-start text-sm" htmlFor="contact">
                    Phone number
                  </label>
                  <input
                    id="contact"
                    name="contact"
                    type="text"
                    className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your phone number"
                    {...register("contact", { required: true })}
                  />
                </div>
                <div className="my-4 w-2/3 flex flex-col item-start">
                  <label
                    className="flex item-start text-sm"
                    htmlFor="healthCondition"
                  >
                    Health Condition
                  </label>
                  <input
                    id="healthCondition"
                    name="healthCondition"
                    type="text"
                    className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder=""
                    {...register("healthCondition", { required: true })}
                  />
                </div>
                <div className=" w-2/3 flex flex-col item-start">
                  <label
                    className="flex item-start text-sm"
                    htmlFor="doctorSuggestion"
                  >
                    Doctor Suggestion
                  </label>
                  <input
                    id="doctorSuggestion"
                    name="doctorSuggestion"
                    type="text"
                    className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder=""
                    {...register("doctorSuggestion", { required: true })}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>
            <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
              Claim Information
            </h1>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>
            <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
              Medical Data
            </h1>
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
      <Footer />
    </div>
  );
}
