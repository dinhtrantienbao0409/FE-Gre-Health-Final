import { useEffect, useState } from "react";
import { getAllDoctors } from "services/Auth";
import { updateFormFunc } from "services/Form";
import { useNavigate } from "react-router-dom";

export default function FormDialog({ formId, onDialog }) {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState();
  const [doctorId, setDoctorId] = useState();

  const handleGetDoctorId = (event) => {
    const doctorId = event.target.value;

    setDoctorId(doctorId);
  };

  const fetchAllDoctors = async () => {
    try {
      const response = await getAllDoctors();
      setDoctor(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: FormDialog.js ~ line 24 ~ fetchAllDoctors ~ error",
        error
      );
    }
  };

  const updateForm = async () => {
    try {
      const response = await updateFormFunc(formId, doctorId);
      return response.data;
    } catch (error) {
      console.log(
        "🚀 ~ file: FormDialog.js ~ line 32 ~ updateForm ~ error",
        error
      );
    }
  };

  useEffect(() => {
    fetchAllDoctors();
  }, []);
  return (
    <div
      className="fixed bg-gray-900 top-0 left-0 right-0 bottom-0 bg-opacity-50 transition-opacity"
      // onClick={() => onDialog(false)}
    >
      <div
        className="absolute flex flex-col items-center top-1/3 left-1/3  p-10 rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <select
          onChange={handleGetDoctorId}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option defaultValue>Choose a doctor</option>
          {doctor &&
            doctor.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
        </select>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center cursor-pointer rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => {
              onDialog(false);
              updateForm();
              navigate(0);
            }}
          >
            Assign Doctor
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center cursor-pointer rounded-md bg-gray-400 border border-gray-300 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => onDialog(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
