import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "components/LandingPage/Footer";
import { useNavigate } from "react-router-dom";
import {
  getFormById,
  getFormsWithDoctorId,
  getFormsWithoutDoctorIdFunc,
  searchFormsWithoutDoctor,
} from "services/Form";
import ReceptionLayout from "layouts/reception.layouts";
import FormComponent from "components/FormComponent";
import LoadingComponent from "components/LoadingComponent";
import NoDataComponent from "components/NoDataComponent";
import ImageDialog from "components/HomePage/ImageDialog";

export default function ViewFormPageWithoutDoctorId() {
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const isSearching = useSelector((state) => state.search.isSearching);
  const navigate = useNavigate();
  const [form, setForm] = useState([]);
  const [assignedForm, setAssignedForm] = useState([]);
  console.log(
    "🚀 ~ file: ViewFormPageWithoutDoctorId.js:24 ~ ViewFormPageWithoutDoctorId ~ assignedForm",
    assignedForm
  );
  const [formData, setFormData] = useState();
  const [formId, setFormId] = useState();
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState({
    isLoading: false,
  });
  const [dialogText, setDialogText] = useState("");

  const fetchFormsWithoutDoctorId = async () => {
    try {
      setLoading(true);
      const response = await getFormsWithoutDoctorIdFunc();
      setForm(response.data);
      setLoading(false);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewFormPage.js ~ line 30 ~ fetchAllForms ~ error",
        error
      );
    }
  };

  const fetchFormsWithDoctor = async () => {
    try {
      setLoading(true);
      const response = await getFormsWithDoctorId();
      setAssignedForm(response.data);
      setLoading(false);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewFormPageWithoutDoctorId.js:52 ~ fetchFormsWithDoctor ~ error",
        error
      );
    }
  };

  const handleSearch = async () => {
    try {
      let assignedForm = [];
      let unAssignedForm = [];
      const response = await searchFormsWithoutDoctor(searchQuery);
      for (let item of response.data) {
        if (item.doctorId === "" && item.status === "") {
          unAssignedForm.push(item);
        } else {
          assignedForm.push(item);
        }
      }
      setForm(unAssignedForm);
      setAssignedForm(assignedForm);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewFormPageWithoutDoctorId.js:44 ~ handleSearch ~ error",
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

  const handleClick = async (formId) => {
    try {
      handleDialog(true);
      setDialogText("Assign Dialog");
      setFormId(formId);
      const response = await getFormById(formId);
      setFormData(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewFormPageWithoutDoctorId.js ~ line 40 ~ handleClick ~ error",
        error
      );
    }
  };
  const handleNavigate = (formId) => {
    navigate(`/receptionist/assignedForm/${formId}`);
  };

  useEffect(() => {
    if (isSearching === false) {
      fetchFormsWithoutDoctorId();
      fetchFormsWithDoctor();
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
          <ReceptionLayout />
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
                      button={"Assign Doctor"}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center my-4 before:flex-1 before:border-t-4 before:border-gray-300 before:mt-0 after:flex-1 after:border-t-4 after:border-gray-300 after:mt-0"></div>

              {assignedForm.length === 0 ? (
                <NoDataComponent />
              ) : (
                <div>
                  <div className="flex items-start text-2xl font-bold py-8 text-gray-500">
                    <h1>Examination forms have been assigned to Dentist</h1>
                  </div>
                  <div className="flex flex-row">
                    <FormComponent
                      data={assignedForm}
                      onClick={handleNavigate}
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
      {dialog.isLoading && (
        <ImageDialog
          formId={formId}
          onDialog={confirmDialog}
          name={dialogText}
        />
      )}
    </div>
  );
}
