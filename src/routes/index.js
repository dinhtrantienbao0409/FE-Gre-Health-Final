import AdminCreateUserPage from "pages/Admin/CreateUserPage";
import AdminViewUserPage from "pages/Admin/ViewUsersPage";
import UserProfile from "pages/Profile/UserProfile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePageLayout from "../layouts/HomePage";
import LandingPageLayout from "../layouts/LandingPage";
import CreateRecordPage from "../pages/HealthRecord/CreateRecordPage";
import ViewRecordPage from "../pages/HealthRecord/ViewRecordPage";
import LandingPage from "../pages/Landing/LandingPage";
import LoginPage from "../pages/Login/LoginPage";
import Register from "../pages/Register/RegisterPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/home" element={<HomePageLayout />}>
          <Route path="record" element={<ViewRecordPage />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="record/create" element={<CreateRecordPage />} />
          <Route path="admin/users" element={<AdminViewUserPage />} />
          <Route path="admin/users/create" element={<AdminCreateUserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
