import Footer from "components/LandingPage/Footer";
import LoadingComponent from "components/LoadingComponent";
import DoctorLayout from "layouts/doctor.layouts";
import HomePageLayout from "layouts/HomePage";
import ReceptionLayout from "layouts/reception.layouts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { getFormById } from "services/Form";

export default function ViewFormDetails() {
  const role = useSelector((state) => state.auth.role);
  const [formData, setFormData] = useState([]);
  console.log(
    "🚀 ~ file: ViewFormDetails.js:14 ~ ViewFormDetails ~ formData",
    formData
  );

  const [loading, setLoading] = useState(false);
  const { formId } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    if (role === "user") {
      navigate("/home");
    }
    if (role === "receptionist") {
      navigate("/receptionist");
    }
  };

  const fetchFormData = async () => {
    try {
      setLoading(true);
      const response = await getFormById(formId);
      setFormData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewFormDetails.js:35 ~ fetchFormData ~ error",
        error
      );
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  return (
    <>
      {role === "user" && <HomePageLayout />}
      {role === "doctor" && <DoctorLayout />}
      {role === "receptionist" && <ReceptionLayout />}

      {loading ? (
        <LoadingComponent />
      ) : (
        <div>
          <Outlet />
          {formData && (
            <div className="mx-auto flex items-center justify-center max-w-7xl px-4 sm:px-6 lg:px-8 py-48">
              <div className=" p-10 shadow-xl   w-full space-y-8 gap-5 rounded-lg">
                <div>
                  <h1 className="mt-2 text-start text-3xl font-extrabold text-gray-900">
                    Dental Medical Examination Registration Form
                  </h1>
                  <p className=" text-gray-500 text-start text-sm">
                    Lorem ipsum dolor sit amet consect adipisicing elit.
                    Possimus magnam voluptatum cupiditate veritatis in accusamus
                    quisquam.
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
                            // value={userProfile.name}
                            className=" appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            disabled
                            defaultValue={formData.username}
                          />
                        </div>
                        <input
                          id="userid"
                          type="hidden"
                          className=" appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          // defaultValue={userProfile._id}
                        />
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
                            defaultValue={formData.gender}
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
                            name="age"
                            type="text"
                            className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            disabled
                            defaultValue={formData.dateOfBirth}
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
                            defaultValue={formData.address}
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
                            defaultValue={formData.contact}
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
                            defaultValue={formData.email}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

                  <div>
                    <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                      Primary reason for this appointment
                    </h1>
                    <div className="my-4 mx-2 w-1/2 flex flex-col item-start">
                      <input
                        id="reason"
                        name="address"
                        type="text"
                        className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        disabled
                        defaultValue={formData.reason}
                      />
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
                          <div className="mb-4 mx-2 w-full flex flex-col item-start">
                            <div className="w-1/2 flex flex-col item-start">
                              <input
                                id="reason"
                                name="address"
                                type="text"
                                className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                disabled
                                defaultValue={formData.examinationHistory}
                              />
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
                          <div className="mb-4 mx-2 w-full flex flex-col item-start">
                            <div className="w-1/2 flex flex-col item-start">
                              <input
                                id="reason"
                                name="address"
                                type="text"
                                className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                disabled
                                defaultValue={formData.dentalProblem}
                              />
                            </div>
                          </div>
                        </div>
                        <div className=" rounded-md  -space-y-px gap-5">
                          <div className=" flex flex-col">
                            <div className=" w-2/3 flex flex-col item-start">
                              <label
                                className="flex item-start text-sm font-bold text-gray-600"
                                htmlFor="date-of-birth"
                              >
                                Please describe your dental problems
                                specifically.
                              </label>
                              <textarea
                                id="disease-symptoms"
                                name="disease-symptoms"
                                type="text"
                                rows="5"
                                className="mx-2 appearance-none rounded-md  block w-full px-3 py-2  border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                defaultValue={formData.diseaseSymptoms}
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
                      <div className="my-4 mx-2 flex flex-col">
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
                            className=" appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 bg-gray-300 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            defaultValue={formData.dateRequest}
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
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

                  <div>
                    <button
                      onClick={handleBack}
                      className="w-1/4 mx-2 group  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
