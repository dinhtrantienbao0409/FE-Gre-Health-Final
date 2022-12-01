import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createFormFunc } from "../../services/Form";
import Footer from "../../components/LandingPage/Footer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getUserProfile } from "services/Auth";

import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import HomePageLayout from "layouts/HomePage";

const schemaValidation = yup.object().shape({
  username: yup.string().required(),
  gender: yup.string().required(),
  dateOfBirth: yup.string().required(),
  address: yup.string().required(),
  contact: yup.string().required(),
  email: yup.string().required(),
  reason: yup.string().required(),
  examinationHistory: yup.string().required(),
  dentalProblem: yup.string().required(),
  diseaseSymptoms: yup.string().required(),
  dateRequest: yup.string().required(),
});

export default function CreateFormPage() {
  const userId = useSelector((state) => state.auth.id);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState();
  const [value, setValue] = useState(dayjs("2022-10-20T00:00:00.000Z"));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    defaultValues: {
      username: "",
      gender: "",
      dateOfBirth: "",
      address: "",
      contact: "",
      email: "",
      reason: "",
      examinationHistory: "",
      dentalProblem: "",
      diseaseSymptoms: "",
      dateRequest: "",
    },
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile(userId);

      setUserProfile(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: CreateFormPage.js ~ line 42 ~ fetchUserProfile ~ error",
        error
      );
    }
  };

  const handleCreateForm = async (data) => {
    try {
      const {
        username,
        userId,
        gender,
        dateOfBirth,
        address,
        contact,
        email,
        reason,
        examinationHistory,
        dentalProblem,
        diseaseSymptoms,
        dateRequest,
      } = data;
      console.log(
        "🚀 ~ file: CreateFormPage.js ~ line 94 ~ handleCreateForm ~ data",
        data
      );
      const payload = {
        username,
        userId,
        gender,
        dateOfBirth,
        address,
        contact,
        email,
        reason,
        examinationHistory,
        dentalProblem,
        diseaseSymptoms,
        dateRequest,
      };
      console.log(
        "🚀 ~ file: CreateFormPage.js ~ line 80 ~ handleCreateForm ~ payload",
        payload
      );

      const response = await createFormFunc(payload);
      // navigate("/home");

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
              Dental Medical Examination Registration Form
            </h1>
            <p className=" text-gray-500 text-start text-sm">
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus
              magnam voluptatum cupiditate veritatis in accusamus quisquam.
            </p>
          </div>
          <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

          <form
            className="mt-8 space-y-6"
            // action="#"
            // method="POST"
            // onSubmit={handleSubmit(handleCreateForm)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            {userProfile && (
              <div className="memberInfo">
                <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                  Contact Information
                </h1>
                <div className="rounded-md shadow-sm -space-y-px gap-5">
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
                        type="text"
                        value={userProfile.name}
                        className=" appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        disabled
                        // defaultValue={userProfile.name}
                        {...register("username", { required: true })}
                      />
                    </div>

                    <div className="w-1/2 flex flex-col item-start">
                      <label
                        className="flex item-start text-sm font-bold text-gray-600"
                        htmlFor="gender"
                      >
                        Gender
                      </label>
                      <input
                        id="age"
                        name="age"
                        type="text"
                        className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        disabled
                        defaultValue={userProfile.gender}
                      />
                    </div>
                    <div className="w-1/2 flex flex-col item-start">
                      <label
                        className="flex item-start text-sm font-bold text-gray-600"
                        htmlFor="date-of-birth"
                      >
                        Date of Birth
                      </label>
                      <input
                        id="age"
                        name="age"
                        type="text"
                        className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        disabled
                        defaultValue={userProfile.dateOfBirth}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4 my-4 mx-2">
                    <div className=" mb-4 w-1/2 flex flex-col item-start">
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
                        className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        disabled
                        defaultValue={userProfile.address}
                      />
                    </div>

                    <div className=" w-1/2 flex flex-col item-start">
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
                        className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        disabled
                        defaultValue={userProfile.contact}
                      />
                    </div>
                    <div className=" w-1/2 flex flex-col item-start">
                      <label
                        className="flex item-start text-sm font-bold text-gray-600"
                        htmlFor="contact"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="text"
                        className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        disabled
                        defaultValue={userProfile.email}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

            <div>
              <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                Primary reason for this appointment
              </h1>
              <div className=" w-2/3 my-4 mx-2 w-full flex flex-col item-start">
                <div className="flex flex-row space-x-32 mt-2">
                  <div className="form-check">
                    <label className="form-check-label inline-block text-gray-800">
                      Examination
                      <input
                        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        // name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="Examination"
                        {...register("reason", { required: true })}
                      />
                    </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label inline-block text-gray-800">
                      Emergency
                      <input
                        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        // name="flexRadioDefault"
                        id="flexRadioDefault1"
                        value="Emergency"
                        {...register("reason", { required: true })}
                      />
                    </label>
                  </div>
                  <div className="form-check">
                    <label
                      className="form-check-label inline-block text-gray-800"
                      value="Consultation"
                    >
                      Consultation
                      <input
                        className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        // name="flexRadioDefault"
                        id="flexRadioDefault1"
                        {...register("reason", { required: true })}
                      />
                    </label>
                  </div>
                </div>
                <div>
                  {errors.reason && (
                    <span className="text-sm text-red-600">
                      {errors?.reason?.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

            <div className="dateExamined">
              <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                Dental history
              </h1>
              {/* <input type="hidden" name="remember" defaultValue="true" /> */}
              <div className=" rounded-md shadow-sm -space-y-px gap-5">
                <div className="my-4 flex flex-col">
                  <div className=" w-2/3 flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="regular-basic"
                    >
                      Do you have dental examination on a regular basis?
                    </label>
                    <div className="my-4 mx-2 w-full flex flex-col item-start">
                      <div className="flex flex-row space-x-32 mt-2">
                        <div className="form-check">
                          <label className="form-check-label inline-block text-gray-800">
                            Yes
                            <input
                              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                              type="radio"
                              // name="flexRadioDefault1"
                              id="flexRadioDefault2"
                              value="Yes"
                              {...register("examinationHistory", {
                                required: true,
                              })}
                            />
                          </label>
                        </div>
                        <div className="form-check">
                          <label className="form-check-label inline-block text-gray-800">
                            No
                            <input
                              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                              type="radio"
                              // name="flexRadioDefault1"
                              id="flexRadioDefault2"
                              value="No"
                              {...register("examinationHistory", {
                                required: true,
                              })}
                            />
                          </label>
                        </div>
                      </div>
                      <div>
                        {errors.examinationHistory && (
                          <span className="text-sm text-red-600">
                            {errors?.examinationHistory?.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" w-2/3 flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="date-of-birth"
                    >
                      Do you have a specific dental problems?
                    </label>
                    <div className="my-4 mx-2 w-full flex flex-col item-start">
                      <div className="flex flex-row space-x-32 mt-2">
                        <div className="form-check">
                          <label className="form-check-label inline-block text-gray-800">
                            Yes
                            <input
                              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                              type="radio"
                              // name="flexRadioDefault2"
                              id="flexRadioDefault3"
                              value="Yes"
                              {...register("dentalProblem", { required: true })}
                            />
                          </label>
                        </div>
                        <div className="form-check">
                          <label className="form-check-label inline-block text-gray-800">
                            No{" "}
                            <input
                              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                              type="radio"
                              // name="flexRadioDefault2"
                              id="flexRadioDefault3"
                              value="No"
                              {...register("dentalProblem", { required: true })}
                            />
                          </label>
                        </div>
                      </div>
                      <div>
                        {errors.dentalProblem && (
                          <span className="text-sm text-red-600">
                            {errors?.dentalProblem?.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" rounded-md shadow-sm -space-y-px gap-5">
                    <div className=" flex flex-col">
                      <div className=" w-2/3 flex flex-col item-start">
                        <label
                          className="flex item-start text-sm font-bold text-gray-600"
                          htmlFor="date-of-birth"
                        >
                          Please describe your dental problems specifically.
                        </label>
                        <input
                          id="disease-symptoms"
                          name="disease-symptoms"
                          type="text"
                          className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

            <div className="dateExamined">
              <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                Schedule of this medical appointment
              </h1>
              {/* <input type="hidden" name="remember" defaultValue="true" /> */}
              <div className=" rounded-md shadow-sm -space-y-px gap-5">
                <div className="my-4 flex flex-col">
                  <div className=" w-2/3 flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="date-of-birth"
                    >
                      Date & Time Examined
                    </label>
                    <input
                      id="disease-symptoms"
                      name="disease-symptoms"
                      type="text"
                      className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      {...register("dateRequest", { required: true })}
                    />
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={1}>
                        <DateTimePicker
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              {...register("dateRequest", { required: true })}
                            />
                          )}
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                          }}
                        />
                      </Stack>
                    </LocalizationProvider> */}
                    <div>
                      {errors.dateRequest && (
                        <span className="text-sm text-red-600">
                          {errors?.dateRequest?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit(handleCreateForm)}
                className="w-1/4 mx-2 group  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <HomePageLayout />
      <Footer />
    </div>
  );
}
