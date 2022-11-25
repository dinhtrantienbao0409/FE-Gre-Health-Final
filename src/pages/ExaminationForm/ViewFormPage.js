import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "components/LandingPage/Footer";
import { getAllFormsFunc, getFormsByDoctorIdFunc } from "services/Form";
import { useNavigate } from "react-router-dom";

export default function ViewFormPage() {
  const doctorId = useSelector((state) => state.auth.id);
  const navigate = useNavigate();
  const [form, setForm] = useState([]);

  // const fetchAllForms = async () => {
  //   try {
  //     const response = await getAllFormsFunc();
  //     setForm(response.data.docs);
  //   } catch (error) {
  //     console.log(
  //       "🚀 ~ file: ViewFormPage.js ~ line 30 ~ fetchAllForms ~ error",
  //       error
  //     );
  //   }
  // };

  const fetchFormsByDoctorId = async () => {
    try {
      const response = await getFormsByDoctorIdFunc(doctorId);
      setForm(response.data.docs);
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
    fetchFormsByDoctorId();
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
                onClick={() => handleClick(item._id)}
                id={item._id}
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
                    Read more
                  </button>
                </div>
              </div>
            ))}

          {/* <div className="w-1/2 rounded-lg shadow-md lg:max-w-sm">
            
            <div className="p-4">
              <h4 className="text-xl font-semibold tracking-tight text-blue-600">
                React Tailwind Card with Image
              </h4>
              <p className="mb-2 leading-normal">
                react tailwind css card with image It is a long established fact
                that a reader will be distracted by the readable content.
              </p>
              <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                Read more
              </button>
            </div>
          </div>
          <div className="w-1/2 rounded-lg shadow-md lg:max-w-sm">
            
            <div className="p-4">
              <h4 className="text-xl font-semibold tracking-tight text-blue-600">
                React Tailwind Card with Image
              </h4>
              <p className="mb-2 leading-normal">
                react tailwind css card with image It is a long established fact
                that a reader will be distracted by the readable content.
              </p>
              <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                Read more
              </button>
            </div>
          </div>
          <div className="w-1/2 rounded-lg shadow-md lg:max-w-sm">
            
            <div className="p-4">
              <h4 className="text-xl font-semibold tracking-tight text-blue-600">
                React Tailwind Card with Image
              </h4>
              <p className="mb-2 leading-normal">
                react tailwind css card with image It is a long established fact
                that a reader will be distracted by the readable content.
              </p>
              <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                Read more
              </button>
            </div>
          </div>
          <div className="w-1/2 rounded-lg shadow-md lg:max-w-sm">
            
            <div className="p-4">
              <h4 className="text-xl font-semibold tracking-tight text-blue-600">
                React Tailwind Card with Image
              </h4>
              <p className="mb-2 leading-normal">
                react tailwind css card with image It is a long established fact
                that a reader will be distracted by the readable content.
              </p>
              <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                Read more
              </button>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
