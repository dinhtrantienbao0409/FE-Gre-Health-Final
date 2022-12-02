import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "components/LandingPage/Footer";
import { getAllFormsFunc, getFormsByDoctorIdFunc } from "services/Form";
import { useNavigate } from "react-router-dom";
import DoctorLayout from "layouts/doctor.layouts";
import PaginateComponent from "components/PaginateComponent";
import LoadingComponent from "components/LoadingComponent";

export default function ViewFormPage() {
  const doctorId = useSelector((state) => state.auth.id);
  const navigate = useNavigate();
  const [form, setForm] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFormsByDoctorId = async () => {
    try {
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

  const handleClick = (formId) => {
    navigate(`/doctor/createRecord/${formId}`);
  };

  useEffect(() => {
    //logic
    setLoading(true);
    fetchFormsByDoctorId();
  }, []);
  return (
    <div>
      <Outlet />
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="mx-auto flex items-start justify-center max-w-7xl px-4 sm:px-6 lg:px-8 py-48">
            <div className="flex flex-row p-10 shadow-xl w-full  gap-10 rounded-lg">
              <PaginateComponent
                data={form}
                onClick={handleClick}
                button={"Create Dental Record"}
              />
            </div>
          </div>
          <Footer />
        </>
      )}
      <DoctorLayout />
    </div>
  );
}
