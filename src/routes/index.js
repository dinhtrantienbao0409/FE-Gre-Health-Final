import AdminCreateUserPage from "pages/Admin/CreateUserPage";
import AdminViewUserPage from "pages/Admin/ViewUsersPage";
import CreateFormPage from "pages/ExaminationForm/CreateFormPage";
import DoctorProfile from "pages/Profile/DoctorProfile";
import UserProfile from "pages/Profile/UserProfile";
import LandingPageLayout from "../layouts/LandingPage";
import CreateRecordPage from "../pages/HealthRecord/CreateRecordPage";
import ViewRecordPage from "../pages/HealthRecord/ViewRecordPage";
import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/Login/LoginPage";
import Register from "../pages/Register/RegisterPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewFormPage from "pages/ExaminationForm/ViewFormPage";
import ViewFormPageWithoutDoctorId from "pages/ExaminationForm/ViewFormPageWithoutDoctorId";
import ProtectedRoute from "./protectedRoute";
import ViewRecordByUser from "pages/HealthRecord/ViewRecordByUser";
import ViewRecordByDoctor from "pages/HealthRecord/ViewRecordByDoctor";
import ViewRecordDetails from "pages/HealthRecord/ViewRecordDetails";
import ViewFormPageByUser from "pages/ExaminationForm/ViewFormPageByUser";
import ViewFormDetails from "pages/ExaminationForm/ViewFormDetails";
import LoginSuccess from "components/LoginSuccess";
import ReceptionistDashBoard from "components/receptionistDashboard";

const AppRouter = (req, res) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="login/success" element={<LoginSuccess />} />

        <Route path="/admin" element={<ProtectedRoute role={"admin"} />}>
          <Route path="/admin" element={<AdminViewUserPage />} />
          <Route path="/admin/dashboard" element={<AdminViewUserPage />} />
          <Route path="/admin/profile" element={<UserProfile />} />
          <Route path="/admin/createUser" element={<AdminCreateUserPage />} />
        </Route>
        <Route path="/doctor" element={<ProtectedRoute role={"doctor"} />}>
          <Route path="/doctor" element={<ViewFormPage />} />
          <Route
            path="/doctor/createdForm/:formId"
            element={<ViewFormDetails />}
          />
          <Route
            path="/doctor/createdRecord"
            element={<ViewRecordByDoctor />}
          />
          <Route
            path="/doctor/createdRecord/:recordId"
            element={<ViewRecordDetails />}
          />
          <Route path="/doctor/profile" element={<UserProfile />} />
          <Route
            path="/doctor/createRecord/:formId"
            element={<CreateRecordPage />}
          />
        </Route>
        <Route
          path="/receptionist"
          element={<ProtectedRoute role={"receptionist"} />}
        >
          <Route
            path="/receptionist"
            element={<ViewFormPageWithoutDoctorId />}
          />
          <Route
            path="/receptionist/dashboard"
            element={<ReceptionistDashBoard />}
          />
          <Route path="/receptionist/profile" element={<UserProfile />} />
          <Route
            path="/receptionist/assignedForm/:formId"
            element={<ViewFormDetails />}
          />
        </Route>
        <Route path="/home" element={<ProtectedRoute role={"user"} />}>
          <Route path="/home" element={<ViewRecordByUser />} />
          <Route path="/home/:recordId" element={<ViewRecordDetails />} />
          <Route path="/home/profile" element={<UserProfile />} />
          <Route path="/home/createForm" element={<CreateFormPage />} />
          <Route path="/home/createdForm" element={<ViewFormPageByUser />} />
          <Route
            path="/home/createdForm/:formId"
            element={<ViewFormDetails />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
