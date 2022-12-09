import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "components/LandingPage/Footer";
import { getRecordByUserId, searchRecordsByUser } from "services/Record";
import HomePageLayout from "layouts/HomePage";
import LoadingComponent from "components/LoadingComponent";
import NoDataComponent from "components/NoDataComponent";
import RecordComponent from "components/RecordComponent";

export default function ViewRecordByUser() {
  const userId = useSelector((state) => state.auth.id);
  const userEmail = useSelector((state) => state.auth.email);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const isSearching = useSelector((state) => state.search.isSearching);
  const navigate = useNavigate();

  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecordsByUserId = async () => {
    try {
      setLoading(true);
      const response = await getRecordByUserId(userId);

      setRecord(response.data);
      setLoading(false);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewRecordByUser.js:20 ~ fetchRecordsByUserId ~ error",
        error
      );
    }
  };

  const handleSearch = async () => {
    try {
      const response = await searchRecordsByUser(searchQuery, userId);
      setRecord(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewFormPage.js:45 ~ handleSearch ~ error",
        error
      );
    }
  };

  const handleClick = (recordId) => {
    navigate(`/home/${recordId}`);
  };

  useEffect(() => {
    if (isSearching === false) {
      fetchRecordsByUserId();
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
                      <h1> Dental Records of {userEmail}</h1>
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
      <HomePageLayout />
    </div>
  );
}
