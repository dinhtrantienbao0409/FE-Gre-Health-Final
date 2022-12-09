import Footer from "components/LandingPage/Footer";
import LoadingComponent from "components/LoadingComponent";
import DoctorLayout from "layouts/doctor.layouts";
import HomePageLayout from "layouts/HomePage";
import ReceptionLayout from "layouts/reception.layouts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { getRecordById } from "services/Record";

export default function ViewRecordDetails() {
  const role = useSelector((state) => state.auth.role);
  const [recordData, setRecordData] = useState([]);

  const [loading, setLoading] = useState(false);
  const { recordId } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    if (role === "user") {
      navigate("/home");
    }
  };

  const fetchRecordData = async () => {
    try {
      setLoading(true);
      const response = await getRecordById(recordId);
      setRecordData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewRecordDetails.js:11 ~ fetchRecordData ~ error",
        error
      );
    }
  };

  useEffect(() => {
    fetchRecordData();
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
          {recordData && (
            <div>
              <div className="mx-auto flex items-center justify-center max-w-7xl px-4 sm:px-6 lg:px-8 py-48">
                <div className=" p-10 shadow-xl   w-full space-y-8 gap-5 rounded-lg">
                  <div>
                    <h1 className="mt-2 text-start text-3xl font-extrabold text-gray-900">
                      Consultation Form for member to receive Dental Health
                      Care.
                    </h1>
                    <p className=" text-gray-500 text-start text-sm">
                      Lorem ipsum dolor sit amet consect adipisicing elit.
                      Possimus magnam voluptatum cupiditate veritatis in
                      accusamus quisquam.
                    </p>
                  </div>
                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

                  <form
                    className="mt-8 space-y-6"
                    // action="#"
                    // method="POST"
                    // onSubmit={handleSubmit(handleCreateRecord)}
                  >
                    <div className="doctorInfo">
                      <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                        Dentist Information
                      </h1>
                      <input
                        type="hidden"
                        name="remember"
                        defaultValue="true"
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
                              defaultValue={recordData.doctorName}
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
                              defaultValue={recordData.doctorEmail}
                              // {...register("doctorEmail")}
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
                              defaultValue={recordData.doctorAddress}
                              // {...register("doctorAddress")}
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
                              defaultValue={recordData.doctorContact}
                              // {...register("doctorContact")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

                    {/* {formData && ( */}
                    <div className="userInfo">
                      <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                        Member Information
                      </h1>
                      <input
                        type="hidden"
                        name="remember"
                        defaultValue="true"
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
                              readOnly
                              defaultValue={recordData.username}
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
                              readOnly
                              id="userGender"
                              name="gender"
                              type="text"
                              className="bg-gray-300 appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              defaultValue={recordData.userGender}
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
                              readOnly
                              id="userDateOfBirth"
                              name="dateOfBirth"
                              type="text"
                              className="bg-gray-300 appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              defaultValue={recordData.userDateOfBirth}
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
                              readOnly
                              id="userAddress"
                              name="address"
                              type="text"
                              className="bg-gray-300 appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              placeholder="Enter your address"
                              defaultValue={recordData.userAddress}
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
                              readOnly
                              id="userContact"
                              name="contact"
                              type="text"
                              className="bg-gray-300 appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 font-bold text-gray-600 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              placeholder="Enter your phone number"
                              defaultValue={recordData.userContact}
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
                            defaultValue={recordData.dentalSymptoms}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    {/* )} */}

                    <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0 after:flex-1 after:border-t after:border-gray-300 after:mt-0"></div>

                    <div className="medicalPlan">
                      <h1 className="mt-2 text-start text-xl font-extrabold text-gray-900">
                        DENTIST'S REPORT
                      </h1>
                      <input
                        type="hidden"
                        name="remember"
                        defaultValue="true"
                      />
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
                              readOnly
                              id="diagnosis"
                              type="text"
                              className="bg-gray-300 appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              rows="5"
                              defaultValue={recordData.diagnosis}
                            />
                          </div>
                          <div className="my-4 flex flex-col item-start">
                            <label
                              className="flex item-start text-sm font-bold text-gray-600"
                              htmlFor="date-of-birth"
                            >
                              Treatment plan
                            </label>

                            <textarea
                              readOnly
                              id="treatmentPlan"
                              type="text"
                              className="bg-gray-300 appearance-none rounded-md  block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                              rows="5"
                              defaultValue={recordData.treatmentPlan}
                            />
                          </div>
                        </div>
                        <div className="w-1/2 ">
                          <label
                            className="flex item-start text-sm font-bold text-gray-600"
                            htmlFor="date-of-birth"
                          >
                            Illustrating images
                          </label>
                          {recordData.imageUrl ? (
                            <div
                              className="bg-cover bg-white rounded-md h-full"
                              // onClick={handleImageButton}
                            >
                              <img
                                id="imageUrl"
                                className="object-cover h-full rounded-md w-full"
                                src={recordData.imageUrl}
                              />
                            </div>
                          ) : (
                            <div
                              className="bg-cover bg-white rounded-md h-full"
                              // onClick={handleImageButton}
                            >
                              <img
                                id="imageUrl"
                                className="object-cover h-full rounded-md w-full"
                                src="https://images.tute.io/static/img/noimg-thumbnail.png"
                              />
                            </div>
                          )}
                        </div>
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
                      {/* <input
                    type="submit"
                    value={"submit"}
                    // onClick={handleCreateRecord}
                    className="w-1/4 mx-2 group  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400"
                  /> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      <Footer />
    </>
  );
}
