import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "components/LandingPage/Footer";
import { useNavigate } from "react-router-dom";
import { getFormById, getFormsWithoutDoctorIdFunc } from "services/Form";
import FormDialog from "components/HomePage/FormDialog";
import ReceptionLayout from "layouts/reception.layouts";
import PaginateComponent from "components/PaginateComponent";

export default function ViewFormPageWithoutDoctorId() {
  const navigate = useNavigate();
  const [form, setForm] = useState([]);

  const [formData, setFormData] = useState();
  const [formId, setFormId] = useState();

  const [dialog, setDialog] = useState({
    isLoading: false,
  });

  const fetchFormsWithoutDoctorId = async () => {
    try {
      const response = await getFormsWithoutDoctorIdFunc();

      setForm(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewFormPage.js ~ line 30 ~ fetchAllForms ~ error",
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

  const handleClick = async (event) => {
    try {
      handleDialog(true);
      const formId = event.currentTarget.id;

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

  useEffect(() => {
    fetchFormsWithoutDoctorId();
  }, []);

  return (
    <div>
      <Outlet />
      <div className="mx-auto flex items-center justify-center max-w-7xl px-4 sm:px-6 lg:px-8 py-48">
        <div className="flex flex-row p-10 shadow-xl w-full  gap-5 rounded-lg">
          <PaginateComponent
            data={form}
            onClick={handleClick}
            button={"Assign Doctor"}
          />
        </div>
      </div>
      <ReceptionLayout />
      <Footer />
      {dialog.isLoading && (
        <FormDialog
          //Update
          formId={formId}
          onDialog={confirmDialog}
        />
      )}
    </div>
  );
}
