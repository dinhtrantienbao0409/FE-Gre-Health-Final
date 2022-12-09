import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "components/LandingPage/Footer";
import { getRecordByDoctorId, searchRecordsByDoctor } from "services/Record";
import LoadingComponent from "components/LoadingComponent";
import NoDataComponent from "components/NoDataComponent";
import RecordComponent from "components/RecordComponent";
import DoctorLayout from "layouts/doctor.layouts";

export default function ViewRecordByDoctor() {
  const doctorId = useSelector((state) => state.auth.id);
  const doctorEmail = useSelector((state) => state.auth.email);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const isSearching = useSelector((state) => state.search.isSearching);
  const navigate = useNavigate();
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecordsByDoctorId = async () => {
    try {
      setLoading(true);
      const response = await getRecordByDoctorId(doctorId);

      setRecord(response.data);
      setLoading(false);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewRecordByDoctor.js:26 ~ fetchRecordsByDoctorId ~ error",
        error
      );
    }
  };

  const handleSearch = async () => {
    try {
      const response = await searchRecordsByDoctor(searchQuery, doctorId);

      setRecord(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewRecordByDoctor.js:42 ~ handleSearch ~ error",
        error
      );
    }
  };

  const handleClick = (recordId) => {
    navigate(`/doctor/createdRecord/${recordId}`);
  };

  useEffect(() => {
    //logic
    if (isSearching === false) {
      fetchRecordsByDoctorId();
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
          <div className="mx-auto flex items-start justify-center max-w-7xl px-4 sm:px-6 lg:px-8 py-48 ">
            <div className="flex flex-row p-10 shadow-xl w-full  gap-12 rounded-lg border">
              {record.length === 0 ? (
                <NoDataComponent />
              ) : (
                <div>
                  <div className="flex flex-row gap-40">
                    <div className="flex items-start text-2xl font-bold py-8 text-gray-500 ">
                      <h1> Dental Records of {doctorEmail}</h1>
                    </div>
                  </div>

                  <div className="flex flex-row">
                    <RecordComponent
                      data={record}
                      onClick={handleClick}
                      button={"Click Here To View Details"}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </>
      )}
      <DoctorLayout />
    </div>
  );
}
