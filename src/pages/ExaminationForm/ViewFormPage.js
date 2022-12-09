import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "components/LandingPage/Footer";
import {
  getAllFormsFunc,
  getFormsByDoctorIdFunc,
  getFormsByDoctorWithStatus,
  searchForms,
} from "services/Form";
import DoctorLayout from "layouts/doctor.layouts";
import FormComponent from "components/FormComponent";
import LoadingComponent from "components/LoadingComponent";
import NoDataComponent from "components/NoDataComponent";

export default function ViewFormPage() {
  const doctorId = useSelector((state) => state.auth.id);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const isSearching = useSelector((state) => state.search.isSearching);
  const navigate = useNavigate();
  const [form, setForm] = useState([]);
  const [formWithStatus, setFormWithStatus] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchFormsByDoctorId = async () => {
    try {
      setLoading(true);
      const response = await getFormsByDoctorIdFunc(doctorId);
      setForm(response.data);
      setLoading(false);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewFormPage.js ~ line 30 ~ fetchFormsByDoctorId ~ error",
        error
      );
    }
  };

  const fetchFormsByDoctorWithStatus = async () => {
    try {
      setLoading(true);
      const response = await getFormsByDoctorWithStatus(doctorId);
      console.log(
        "🚀 ~ file: ViewFormPage.js:44 ~ fetchFormsByDoctorWithStatus ~ response",
        response
      );
      setFormWithStatus(response.data);
      setLoading(false);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewFormPage.js:45 ~ fetchFormsByDoctorWithStatus ~ error",
        error
      );
    }
  };

  const handleSearch = async () => {
    try {
      let signedForm = [];
      let unSignedForm = [];
      const response = await searchForms(searchQuery, doctorId);
      for (let item of response.data) {
        if (item.status === "") {
          unSignedForm.push(item);
        } else {
          signedForm.push(item);
        }
      }
      setForm(unSignedForm);
      setFormWithStatus(signedForm);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewFormPage.js:45 ~ handleSearch ~ error",
        error
      );
    }
  };

  const handleClick = (formId) => {
    navigate(`/doctor/createRecord/${formId}`);
  };

  const handleClickForm = (formId) => {
    navigate(`/doctor/createdForm/${formId}`);
  };

  useEffect(() => {
    //logic

    if (isSearching === false) {
      fetchFormsByDoctorId();
      fetchFormsByDoctorWithStatus();
    } else {
      handleSearch();
    }
  }, [searchQuery]);
  return (
    <div>
      <Outlet />
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <DoctorLayout />
          <div className="mx-auto flex flex-col items-start justify-center max-w-7xl px-4 sm:px-6 lg:px-8 py-48">
            <div className="flex flex-col p-10 shadow-xl w-full  gap-20 rounded-lg border">
              {form.length === 0 ? (
                <NoDataComponent />
              ) : (
                <div>
                  <div className="flex items-start text-2xl font-bold py-8 text-gray-500 ">
                    <h1>Pending Examination Forms</h1>
                  </div>
                  <div className="flex flex-row">
                    <FormComponent
                      data={form}
                      onClick={handleClick}
                      button={"Click Here To Create Dental Record"}
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center my-4 before:flex-1 before:border-t-4 before:border-gray-300 before:mt-0 after:flex-1 after:border-t-4 after:border-gray-300 after:mt-0"></div>

              {formWithStatus.length === 0 ? (
                <NoDataComponent />
              ) : (
                <div>
                  <div className="flex items-start text-2xl font-bold py-8 text-gray-500">
                    <h1>Examination forms have been created dental records</h1>
                  </div>
                  <div className="flex flex-row">
                    <FormComponent
                      data={formWithStatus}
                      onClick={handleClickForm}
                      button={"View Details"}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}
