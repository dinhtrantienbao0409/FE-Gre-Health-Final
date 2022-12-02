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

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<ProtectedRoute role={"admin"} />}>
          <Route path="/admin/view" element={<AdminViewUserPage />} />
          <Route path="/admin/profile" element={<UserProfile />} />
          <Route path="/admin/createUser" element={<AdminCreateUserPage />} />
        </Route>
        <Route path="/doctor" element={<ProtectedRoute role={"doctor"} />}>
          <Route path="/doctor/view" element={<ViewFormPage />} />
          <Route path="/doctor/profile" element={<DoctorProfile />} />
          <Route
            path="/doctor/createRecord/:formId"
            element={<CreateRecordPage />}
          />
        </Route>
        <Route
          path="/receptionist"
          element={<ProtectedRoute role={"receptionist"} />}
        >
          <Route path="/receptionist/profile" element={<UserProfile />} />
          <Route
            path="/receptionist/view"
            element={<ViewFormPageWithoutDoctorId />}
          />
        </Route>
        <Route path="/home" element={<ProtectedRoute role={"user"} />}>
          <Route path="/home/profile" element={<UserProfile />} />
          <Route path="/home/createForm" element={<CreateFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
