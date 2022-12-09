import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createFormFunc } from "../../services/Form";
import Footer from "../../components/LandingPage/Footer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getUserProfile } from "services/Auth";
import { MailSender } from "services/Mail";

import dayjs from "dayjs";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import HomePageLayout from "layouts/HomePage";
import ImageDialog from "components/HomePage/ImageDialog";

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
  const [dialog, setDialog] = useState({
    isLoading: false,
  });
  const [dialogText, setDialogText] = useState("");

  const [defaultValues, setDefaultValues] = useState({
    username: "",
    userId: "",
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
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaValidation),
    defaultValues: defaultValues,
  });
  console.log(
    "🚀 ~ file: CreateFormPage.js:45 ~ CreateFormPage ~ errors",
    errors
  );

  useEffect(() => {
    fetchUserProfile();
    if (userProfile) {
      setDefaultValues({
        username: userProfile?.name,
        userId: userProfile?._id,
        gender: userProfile?.gender,
        dateOfBirth: userProfile?.dateOfBirth,
        address: userProfile?.address,
        contact: userProfile?.contact,
        email: userProfile?.email,
        reason: userProfile?.reason,
        examinationHistory: userProfile?.examinationHistory,
        dentalProblem: userProfile?.dentalProblem,
        diseaseSymptoms: userProfile?.diseaseSymptoms,
        dateRequest: userProfile?.dateRequest,
      });
    }
    reset(defaultValues);
  }, [defaultValues?.username, userProfile?.name]);

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
      setDialogText("");
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
      if (response.status === 200) {
        handleDialog(true);
        setDialogText("Form Dialog");
        handleSendMail();
      }
      return response.data;
    } catch (error) {
      console.log(
        "🚀 ~ file: CreateFormPage.js:123 ~ handleCreateForm ~ error",
        error
      );
      setError(error.message);
    }
  };

  const handleSendMail = async () => {
    const mailTemplate = {
      receiver: userProfile.email,
      subject:
        "[DO NOT REPLY] Dental Medical Examination Registration Form received",
      text: "You have a notification from Gre Oral Health system",
      message: `Dear ${userProfile.name}, The system has received your application for dental health examination, we will arrange an appointment according to your request. Pay attention to the next email as it will include all the necessary information.`,
    };
    try {
      const mail = await MailSender(mailTemplate);
      return mail;
    } catch (error) {
      console.log(
        "🚀 ~ file: CreateRecordPage.js:170 ~ handleSendMail ~ error",
        error
      );
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
    } else {
      handleDialog(false);
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
            onSubmit={handleSubmit(handleCreateForm)}
          >
            <input type="hidden" name="remember" value="true" />
            {userProfile && (
              <div className="memberInfo">
                <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                  Contact Information
                </h1>
                <div className="rounded-md shadow-sm -space-y-px gap-5">
                  <div className="flex space-x-4 my-4 mx-2">
                    <Controller
                      name="username"
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                            name="username"
                            className=" appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            disabled
                            onChange={onChange}
                            value={value}
                          />
                        </div>
                      )}
                    />
                    <Controller
                      name="userId"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <input
                          id="userid"
                          type="hidden"
                          name="userId"
                          className=" appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                            className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            disabled
                            onChange={onChange}
                            value={value}
                          />
                        </div>
                      )}
                    />
                    <Controller
                      name="dateOfBirth"
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                            className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            disabled
                            onChange={onChange}
                            value={value}
                          />
                        </div>
                      )}
                    />
                  </div>

                  <div className="flex space-x-4 my-4 mx-2">
                    <Controller
                      name="address"
                      control={control}
                      render={({ field: { onChange, value } }) => (
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
                            onChange={onChange}
                            value={value}
                          />
                        </div>
                      )}
                    />
                    <Controller
                      name="contact"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <div className=" mb-4 w-1/2 flex flex-col item-start">
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
                            onChange={onChange}
                            value={value}
                          />
                        </div>
                      )}
                    />
                    <Controller
                      name="email"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <div className=" mb-4 w-1/2 flex flex-col item-start">
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
                            onChange={onChange}
                            value={value}
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

            <div>
              <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                Primary reason for this appointment
              </h1>
              <Controller
                name="reason"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className=" w-2/3 my-4 mx-2 w-full flex flex-col item-start">
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                      onChange={onChange}
                      value={value}
                    >
                      <FormControlLabel
                        value="Examination"
                        control={<Radio />}
                        label="Examination"
                      />
                      <FormControlLabel
                        value="Emergency"
                        control={<Radio />}
                        label="Emergency"
                      />
                      <FormControlLabel
                        value="Consultation"
                        control={<Radio />}
                        label="Consultation"
                      />
                    </RadioGroup>
                    <div>
                      {errors.reason && (
                        <span className="text-sm text-red-600">
                          {errors?.reason?.message}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              />
            </div>

            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

            <div className="dateExamined">
              <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                Dental history
              </h1>
              {/* <input type="hidden" name="remember" value="true" /> */}
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
                        <Controller
                          name="examinationHistory"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="radio-buttons-group"
                              onChange={onChange}
                              value={value}
                            >
                              <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label="yes"
                              />
                              <FormControlLabel
                                value="No"
                                control={<Radio />}
                                label="no"
                              />
                            </RadioGroup>
                          )}
                        />
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
                        <Controller
                          name="dentalProblem"
                          control={control}
                          render={({ field: { onChange, value } }) => (
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              name="radio-buttons-group"
                              onChange={onChange}
                              value={value}
                            >
                              <FormControlLabel
                                value="Yes"
                                control={<Radio />}
                                label="yes"
                              />
                              <FormControlLabel
                                value="No"
                                control={<Radio />}
                                label="no"
                              />
                            </RadioGroup>
                          )}
                        />
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
                      <Controller
                        name="diseaseSymptoms"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <div className=" w-2/3 flex flex-col item-start">
                            <label
                              className="flex item-start text-sm font-bold text-gray-600"
                              htmlFor="date-of-birth"
                            >
                              Please describe your dental problems specifically.
                            </label>
                            <input
                              id="diseaseSymptoms"
                              name="diseaseSymptoms"
                              type="text"
                              className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              onChange={onChange}
                              value={value}
                              // {...register("diseaseSymptoms")}
                            />
                          </div>
                        )}
                      />
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
              <div className=" rounded-md shadow-sm -space-y-px gap-5">
                <div className="my-4 flex flex-col">
                  <Controller
                    name="dateRequest"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <div className=" w-2/3 flex flex-col item-start">
                        <label
                          className="flex item-start text-sm font-bold text-gray-600"
                          htmlFor="date-of-birth"
                        >
                          Date & Time Examined
                        </label>
                        <input
                          id="dateRequest"
                          name="dateRequest"
                          type="text"
                          className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          onChange={onChange}
                          value={value}
                        />
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

            <div>
              <input
                type="submit"
                value={"submit"}
                // onClick={handleCreateForm}
                className="w-1/4 mx-2 group  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
              />
            </div>
          </form>
        </div>
      </div>
      {dialog.isLoading && (
        <ImageDialog
          // formId={formId}
          onDialog={confirmDialog}
          // setValue={setValue}
          name={dialogText}
        />
      )}
      <HomePageLayout />
      <Footer />
    </div>
  );
}
