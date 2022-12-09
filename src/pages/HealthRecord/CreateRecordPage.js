import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createRecordFunc } from "../../services/Record";
import Footer from "../../components/LandingPage/Footer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { getUserProfile } from "services/Auth";
import { getFormById, updateFormStatus } from "services/Form";
import DoctorLayout from "layouts/doctor.layouts";
import ImageDialog from "components/HomePage/ImageDialog";
import { removeFirebaseImage } from "slice/imageSlice";
import { MailSender } from "services/Mail";

const schemaValidation = yup.object().shape({
  diagnosis: yup.string().required(),
  treatmentPlan: yup.string().required(),
});

export default function CreateRecordPage() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);
  const imageUrl = useSelector((state) => state.firebaseImage.url);

  const { formId } = useParams();

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [doctorProfile, setDoctorProfile] = useState();
  const [formData, setFormData] = useState();

  const [dialog, setDialog] = useState({
    isLoading: false,
  });
  const [dialogText, setDialogText] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaValidation) });

  register("imageUrl");

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

  const handleImageButton = () => {
    handleDialog(true);
    setDialogText("Image Dialog");
  };

  const handleBack = () => {
    navigate("/doctor/view");
    dispatch(removeFirebaseImage(imageUrl));
  };

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
    console.log(
      "🚀 ~ file: CreateRecordPage.js:93 ~ handleCreateRecord ~ data",
      data
    );
    try {
      setDialogText("");
      const {
        doctorName,
        doctorEmail,
        doctorAddress,
        doctorContact,
        username,
        userGender,
        userDateOfBirth,
        userAddress,
        userContact,
        dentalSymptoms,
        diagnosis,
        treatmentPlan,
        imageUrl,
        doctorId,
        userId,
      } = data;
      console.log(
        "🚀 ~ file: CreateRecordPage.js:108 ~ handleCreateRecord ~ data",
        data
      );

      const payload = {
        doctorName,
        doctorEmail,
        doctorAddress,
        doctorContact,
        username,
        userGender,
        userDateOfBirth,
        userAddress,
        userContact,
        dentalSymptoms,
        diagnosis,
        treatmentPlan,
        imageUrl,
        doctorId,
        userId,
      };
      console.log(
        "🚀 ~ file: CreateRecordPage.js ~ line 38 ~ CreateRecordPage ~ payload",
        payload
      );

      const response = await createRecordFunc(payload);
      console.log(
        "🚀 ~ file: CreateRecordPage.js:152 ~ handleCreateRecord ~ response",
        response
      );

      if (response.status === 200) {
        handleDialog(true);
        setDialogText("Record Dialog");
        handleSendMail();
        handleUpdateFormStatus();
      }

      return response.data;
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateFormStatus = async () => {
    try {
      const status = "done";
      const response = await updateFormStatus(formId, status);
      console.log(
        "🚀 ~ file: CreateRecordPage.js:174 ~ handleUpdateFormStatus ~ response",
        response.data
      );
      return response.data;
    } catch (error) {
      console.log(
        "🚀 ~ file: CreateRecordPage.js:176 ~ handleUpdateFormStatus ~ error",
        error
      );
    }
  };

  const handleSendMail = async () => {
    const mailTemplate = {
      receiver: formData.email,
      subject: "[DO NOT REPLY] GRE ORAL HEALTH: Dental reacord",
      text: "You have a notification from Gre Oral Health system",
      message: `Dear ${formData.username}, Based on your medical examination, the dentist has created your dental record on the system. Please log in to your account on the system to view detailed information.`,
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
  return (
    <div>
      <div className="mx-auto flex items-center justify-center max-w-7xl px-4 sm:px-6 lg:px-8 py-48">
        <div className=" p-10 shadow-xl   w-full space-y-8 gap-5 rounded-lg">
          <div>
            <h1 className="mt-2 text-start text-3xl font-extrabold text-gray-900">
              Consultation Form for member to receive Dental Health Care.
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
            <div></div>
            {doctorProfile && (
              <div className="doctorInfo">
                <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                  Dentist Information
                </h1>
                <input type="hidden" name="remember" defaultValue="true" />
                <input
                  id="doctorId"
                  type="hidden"
                  className=" appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  defaultValue={doctorProfile._id}
                  {...register("doctorId")}
                />
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
                        id="doctorName"
                        type="text"
                        className=" appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        readOnly
                        defaultValue={doctorProfile.name}
                        {...register("doctorName")}
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
                        id="doctorEmail"
                        type="text"
                        className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        readOnly
                        defaultValue={doctorProfile.email}
                        {...register("doctorEmail")}
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
                        id="doctorAddress"
                        type="text"
                        className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        readOnly
                        defaultValue={doctorProfile.address}
                        {...register("doctorAddress")}
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
                        id="doctorContact"
                        name="contact"
                        type="text"
                        className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        readOnly
                        defaultValue={doctorProfile.contact}
                        {...register("doctorContact")}
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
                <input
                  id="userId"
                  name="name"
                  type="hidden"
                  className="bg-gray-300 appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  defaultValue={formData.userId}
                  readOnly
                  {...register("userId")}
                />
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
                        id="username"
                        name="name"
                        type="text"
                        className="bg-gray-300 appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        defaultValue={formData.username}
                        readOnly
                        {...register("username")}
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
                        id="userGender"
                        name="gender"
                        type="text"
                        className="bg-gray-300 appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        defaultValue={formData.gender}
                        readOnly
                        {...register("userGender")}
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
                        id="userDateOfBirth"
                        name="dateOfBirth"
                        type="text"
                        className="bg-gray-300 appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        defaultValue={formData.dateOfBirth}
                        readOnly
                        {...register("userDateOfBirth")}
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
                        id="userAddress"
                        name="address"
                        type="text"
                        className="bg-gray-300 appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Enter your address"
                        defaultValue={formData.address}
                        readOnly
                        {...register("userAddress")}
                      />
                    </div>
                    <div className=" mb-4 w-1/2 flex flex-col item-start">
                      <label
                        className="flex item-start text-sm font-bold text-gray-600"
                        htmlFor="contact"
                      >
                        Phone number
                      </label>
                      <input
                        id="userContact"
                        name="contact"
                        type="text"
                        className="bg-gray-300 appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Enter your phone number"
                        defaultValue={formData.contact}
                        readOnly
                        {...register("userContact")}
                      />
                    </div>
                  </div>
                  <div className="my-4 mx-2 w-2/3 flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="date-of-birth"
                    >
                      Dental symptoms
                    </label>

                    <textarea
                      id="dentalSymptoms"
                      name="disease-symptoms"
                      type="text"
                      className="bg-gray-300 appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      rows="5"
                      readOnly
                      defaultValue={formData.diseaseSymptoms}
                      {...register("dentalSymptoms")}
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

            <div className="medicalPlan">
              <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                DENTIST'S REPORT
              </h1>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="flex flex-row rounded-md shadow-sm -space-y-px gap-5">
                <div className=" w-1/2 my-4 mx-2 flex flex-col">
                  <div className=" flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="date-of-birth"
                    >
                      Diagnosis of Dentist
                    </label>

                    <textarea
                      id="diagnosis"
                      type="text"
                      className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      rows="5"
                      {...register("diagnosis", { required: true })}
                    />
                    <div>
                      {errors.diagnosis && (
                        <span className="text-sm text-red-600">
                          {errors?.diagnosis?.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="my-4 flex flex-col item-start">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="date-of-birth"
                    >
                      Treatment plan
                    </label>

                    <textarea
                      id="treatmentPlan"
                      type="text"
                      className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      rows="5"
                      {...register("treatmentPlan", { required: true })}
                    />
                    <div>
                      {errors.treatmentPlan && (
                        <span className="text-sm text-red-600">
                          {errors?.treatmentPlan?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {!imageUrl ? (
                  <div className="w-1/2">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="date-of-birth"
                    >
                      Illustrating images
                    </label>
                    <div
                      className="bg-cover bg-indigo-300 rounded-md h-full"
                      onClick={handleImageButton}
                    >
                      <img
                        className="object-cover h-full rounded-md w-full"
                        src="https://images.tute.io/static/img/noimg-thumbnail.png"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-1/2 ">
                    <label
                      className="flex item-start text-sm font-bold text-gray-600"
                      htmlFor="date-of-birth"
                    >
                      Illustrating images
                    </label>
                    <div
                      className="bg-cover bg-white rounded-md h-full"
                      // onClick={handleImageButton}
                    >
                      <img
                        id="imageUrl"
                        className="object-cover h-full rounded-md w-full"
                        src={imageUrl}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

            <div className="flex flex-row">
              <button
                onClick={handleBack}
                className="w-1/4 mx-2 group  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <input
                type="submit"
                value={"submit"}
                // onClick={setDialogText("Mail Dialog")}
                className="w-1/4 mx-2 group  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
              />
            </div>
          </form>
        </div>
      </div>
      {dialog.isLoading && (
        <ImageDialog
          formId={formId}
          onDialog={confirmDialog}
          setValue={setValue}
          name={dialogText}
        />
      )}
      <DoctorLayout />
      <Footer />
    </div>
  );
}
