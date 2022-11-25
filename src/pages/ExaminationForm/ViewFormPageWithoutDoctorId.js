import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "components/LandingPage/Footer";
import { useNavigate } from "react-router-dom";
import { getFormById, getFormsWithoutDoctorIdFunc } from "services/Form";
import FormDialog from "components/HomePage/FormDialog";

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
      setForm(response.data.docs);
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
          {form &&
            form.map((item) => (
              <div
                className="w-1/2 rounded-lg shadow-md lg:max-w-sm"
                id={item._id}
                onClick={handleClick}
              >
                <div className="p-4">
                  <h4 className="text-xl font-semibold tracking-tight text-blue-600">
                    {item.username}
                  </h4>
                  <p className="mb-2 leading-normal">{item.reason}</p>
                  <p className="mb-2 leading-normal">{item.dateRequest}</p>
                  <p className="mb-2 leading-normal">{item.diseaseSymptoms}</p>
                  <p className="mb-2 leading-normal">{item.contact}</p>
                  <p className="mb-2 leading-normal">{item.address}</p>
                  <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                    Assign Doctor
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
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
