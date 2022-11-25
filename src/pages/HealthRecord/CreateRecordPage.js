import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createRecordFunc } from "../../services/Record";
import Footer from "../../components/LandingPage/Footer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { getUserProfile } from "services/Auth";
import { getFormById } from "services/Form";

const schemaValidation = yup.object().shape({
  name: yup.string().required(),
  gender: yup.string().required(),
  dateOfBirth: yup.string().required(),
  address: yup.string().required(),
  age: yup.string().required(),
  contact: yup.string().required(),
  healthCondition: yup.string().required(),
  doctorSuggestion: yup.string().required(),
});

export default function CreateRecordPage() {
  const userId = useSelector((state) => state.auth.id);
  const { formId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [doctorProfile, setDoctorProfile] = useState();

  const [formData, setFormData] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaValidation) });

  const fetchDoctorProfile = async () => {
    try {
      const response = await getUserProfile(userId);

      setDoctorProfile(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: UserProfile.js ~ line 12 ~ fetchUserProfile ~ error",
        error
      );
    }
  };

  const fetchFormData = async () => {
    try {
      const response = await getFormById(formId);
      setFormData(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: CreateRecordPage.js ~ line 60 ~ fetchFormData ~ error",
        error
      );
    }
  };

  useEffect(() => {
    fetchDoctorProfile();
    fetchFormData();
  }, []);

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
      navigate("/home/record");

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
              Dental Medical Record
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
            onSubmit={handleSubmit(handleCreateRecord)}
          >
            {doctorProfile && (
              <div className="doctorInfo">
                <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                  Doctor Information
                </h1>
                <input type="hidden" name="remember" defaultValue="true" />
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
                        name="name"
                        type="text"
                        className=" appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        readOnly
                        defaultValue={doctorProfile.name}
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
                        readOnly
                        defaultValue={doctorProfile.gender}
                      />
                    </div>
                    <div className="w-1/2 flex flex-col item-start">
                      <label
                        className="flex item-start text-sm font-bold text-gray-600"
                        htmlFor="date-of-birth"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="text"
                        className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        readOnly
                        defaultValue={doctorProfile.email}
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4 my-4 mx-2">
                    <div className=" w-1/2 flex flex-col item-start">
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
                        readOnly
                        defaultValue={doctorProfile.address}
                      />
                    </div>

                    <div className=" w-1/2 flex flex-col item-start">
                      <label
                        className="flex item-start text-sm font-bold text-gray-600"
                        htmlFor="contact"
                      >
                        Phone number
                      </label>
                      <input
                        id="contact"
                        name="contact"
                        type="text"
                        className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        readOnly
                        defaultValue={doctorProfile.contact}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

            {formData && (
              <div className="userInfo">
                <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                  Member Information
                </h1>
                <input type="hidden" name="remember" defaultValue="true" />
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
                        name="name"
                        type="text"
                        className="bg-gray-300 appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        defaultValue={formData.username}
                        readOnly
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
                        id="gender"
                        name="gender"
                        type="text"
                        className="bg-gray-300 appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        defaultValue={formData.gender}
                        readOnly
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
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="text"
                        className="bg-gray-300 appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        defaultValue={formData.dateOfBirth}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4 my-4 mx-2">
                    <div className=" w-1/2 flex flex-col item-start">
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
                        className="bg-gray-300 appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Enter your address"
                        defaultValue={formData.address}
                        readOnly
                      />
                    </div>
                    <div className="w-1/2 flex flex-col item-start">
                      <label
                        className="flex item-start text-sm font-bold text-gray-600"
                        htmlFor="contact"
                      >
                        Phone number
                      </label>
                      <input
                        id="contact"
                        name="contact"
                        type="text"
                        className="bg-gray-300 appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Enter your phone number"
                        defaultValue={formData.contact}
                        readOnly
                      />
                    </div>
                  </div>
                  {/* <div className="flex flex-col mx-2 ">
                  <div className="my-4 w-2/3 flex flex-col item-start">
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
                      className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your address"
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
                  <div className=" w-2/3 flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="contact"
                    >
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
                    <div>
                      {errors.contact && (
                        <span className="text-sm text-red-600">
                          {errors?.contact?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="my-4 w-2/3 flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
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
                    <div>
                      {errors.healthCondition && (
                        <span className="text-sm text-red-600">
                          {errors?.healthCondition?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className=" w-2/3 flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
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
                    <div>
                      {errors.doctorSuggestion && (
                        <span className="text-sm text-red-600">
                          {errors?.doctorSuggestion?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div> */}
                </div>
              </div>
            )}

            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

            <div className="claimInfo">
              <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                Claim Information
              </h1>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px gap-5">
                <div className="flex space-x-4 my-4 mx-2">
                  <div className="w-1/2 flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="date-of-birth"
                    >
                      Blood type
                    </label>
                    <input
                      id="bloodType"
                      name="bloodType"
                      type="text"
                      className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      // {...register("dateOfBirth", { required: true })}
                    />
                    {/* <div>
                      {errors.dateOfBirth && (
                        <span className="text-sm text-red-600">
                          {errors?.dateOfBirth?.message}
                        </span>
                      )}
                    </div> */}
                  </div>
                  <div className="w-1/2 flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="age"
                    >
                      BMI
                    </label>
                    <input
                      id="bmi"
                      name="bmi"
                      type="text"
                      className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      // {...register("age", { required: true })}
                    />
                    {/* <div>
                      {errors.age && (
                        <span className="text-sm text-red-600">
                          {errors?.age?.message}
                        </span>
                      )}
                    </div> */}
                  </div>
                </div>
                <div className="flex space-x-4 my-4 mx-2">
                  <div className=" w-1/2 flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="address"
                    >
                      Height
                    </label>
                    <input
                      id="height"
                      name="height"
                      type="text"
                      className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      // {...register("address", { required: true })}
                    />
                    {/* <div>
                      {errors.address && (
                        <span className="text-sm text-red-600">
                          {errors?.address?.message}
                        </span>
                      )}
                    </div> */}
                  </div>
                  <div className=" w-1/2 flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="contact"
                    >
                      Weight
                    </label>
                    <input
                      id="weight"
                      name="weight"
                      type="text"
                      className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      // {...register("contact", { required: true })}
                    />
                    {/* <div>
                      {errors.contact && (
                        <span className="text-sm text-red-600">
                          {errors?.contact?.message}
                        </span>
                      )}
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

            <div className="medicalPlan">
              <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                Medical Plan
              </h1>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className=" rounded-md shadow-sm -space-y-px gap-5">
                <div className="my-4 flex flex-col">
                  <div className=" w-2/3 flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="date-of-birth"
                    >
                      Disease symptoms
                    </label>
                    <input
                      id="disease-symptoms"
                      name="disease-symptoms"
                      type="text"
                      className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      // {...register("dateOfBirth", { required: true })}
                    />
                    {/* <div>
                      {errors.dateOfBirth && (
                        <span className="text-sm text-red-600">
                          {errors?.dateOfBirth?.message}
                        </span>
                      )}
                    </div> */}
                  </div>
                  <div className="my-4 w-2/3 flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="date-of-birth"
                    >
                      Treatment plan
                    </label>
                    <input
                      id="treatment-plan"
                      name="treatment-plan"
                      type="text"
                      className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      // {...register("dateOfBirth", { required: true })}
                    />
                    {/* <div>
                      {errors.dateOfBirth && (
                        <span className="text-sm text-red-600">
                          {errors?.dateOfBirth?.message}
                        </span>
                      )}
                    </div> */}
                  </div>
                  <div className="w-2/3 flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="date-of-birth"
                    >
                      Prescribed medication
                    </label>
                    <input
                      id="prescribed-medication"
                      name="prescribed-medication"
                      type="text"
                      className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      // {...register("dateOfBirth", { required: true })}
                    />
                    {/* <div>
                      {errors.dateOfBirth && (
                        <span className="text-sm text-red-600">
                          {errors?.dateOfBirth?.message}
                        </span>
                      )}
                    </div> */}
                  </div>
                  <div className="my-4 w-2/3 flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="date-of-birth"
                    >
                      Doctor suggestion
                    </label>
                    <input
                      id="doctor-suggestion"
                      name="doctor-suggestion"
                      type="text"
                      className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      // {...register("dateOfBirth", { required: true })}
                    />
                    {/* <div>
                      {errors.dateOfBirth && (
                        <span className="text-sm text-red-600">
                          {errors?.dateOfBirth?.message}
                        </span>
                      )}
                    </div> */}
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
      <Footer />
    </div>
  );
}
