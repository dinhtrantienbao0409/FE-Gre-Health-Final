import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "components/LandingPage/Footer";
import { getFormByUserId, searchFormsByUser } from "services/Form";
import HomePageLayout from "layouts/HomePage";
import FormComponent from "components/FormComponent";
import LoadingComponent from "components/LoadingComponent";
import NoDataComponent from "components/NoDataComponent";

export default function ViewFormPageByUser() {
  const userId = useSelector((state) => state.auth.id);
  const userEmail = useSelector((state) => state.auth.email);
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const isSearching = useSelector((state) => state.search.isSearching);
  const navigate = useNavigate();
  const [form, setForm] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchFormsByUserId = async () => {
    try {
      setLoading(true);
      const response = await getFormByUserId(userId);
      setForm(response.data);
      setLoading(false);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewFormPageByUser.js:31 ~ fetchFormsByUserId ~ error",
        error
      );
    }
  };

  const handleSearch = async () => {
    try {
      const response = await searchFormsByUser(searchQuery, userId);
      console.log(
        "🚀 ~ file: ViewFormPageByUser.js:40 ~ handleSearch ~ response",
        response
      );

      setForm(response.data);
    } catch (error) {
      console.log(
        "🚀 ~ file: ViewFormPage.js:45 ~ handleSearch ~ error",
        error
      );
    }
  };

  const handleClick = (formId) => {
    navigate(`/home/createdForm/${formId}`);
  };

  const handleCreateButton = () => {
    navigate("/home/createForm");
  };

  useEffect(() => {
    //logic

    if (isSearching === false) {
      fetchFormsByUserId();
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
          <div className="mx-auto flex flex-col items-start justify-center max-w-7xl px-4 sm:px-6 lg:px-8 py-48">
            <div className="flex flex-col p-10 shadow-xl w-full  gap-20 rounded-lg border">
              {form.length === 0 ? (
                <NoDataComponent />
              ) : (
                <div>
                  <div className="flex flex-row gap-20">
                    <div className="flex items-start text-2xl font-bold py-8 text-gray-500 ">
                      <h1>Created Examination Forms by {userEmail}</h1>
                    </div>
                    <button
                      onClick={handleCreateButton}
                      className="w-1/4 my-8 group  w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm  rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
                    >
                      Create new examination form
                    </button>
                  </div>

                  <div className="flex flex-row">
                    <FormComponent
                      data={form}
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
