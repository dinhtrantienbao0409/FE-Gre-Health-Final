import AdminLayout from "layouts/admin.layouts";
import DoctorLayout from "layouts/doctor.layouts";
import ReceptionLayout from "layouts/reception.layouts";
import AdminCreateUserPage from "pages/Admin/CreateUserPage";
import AdminViewUserPage from "pages/Admin/ViewUsersPage";
import CreateFormPage from "pages/ExaminationForm/CreateFormPage";
import DoctorProfile from "pages/Profile/DoctorProfile";
import UserProfile from "pages/Profile/UserProfile";
import HomePageLayout from "../layouts/HomePage";
import LandingPageLayout from "../layouts/LandingPage";
import CreateRecordPage from "../pages/HealthRecord/CreateRecordPage";
import ViewRecordPage from "../pages/HealthRecord/ViewRecordPage";
import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/Login/LoginPage";
import Register from "../pages/Register/RegisterPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewFormPage from "pages/ExaminationForm/ViewFormPage";
import ViewFormPageWithoutDoctorId from "pages/ExaminationForm/ViewFormPageWithoutDoctorId";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminViewUserPage />} />
          <Route path="createUser" element={<AdminCreateUserPage />} />
        </Route>
        <Route path="/doctor" element={<DoctorLayout />}>
          {/* <Route index element={<ViewRecordPage />} /> */}
          <Route index element={<ViewFormPage />} />
          <Route path="profile" element={<DoctorProfile />} />
          <Route path="createRecord/:formId" element={<CreateRecordPage />} />
        </Route>
        <Route path="/receptionist" element={<ReceptionLayout />}>
          {/* <Route index element={<ViewFormPage />} /> */}
          <Route index element={<ViewFormPageWithoutDoctorId />} />
        </Route>
        <Route path="/home" element={<HomePageLayout />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="createForm" element={<CreateFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
