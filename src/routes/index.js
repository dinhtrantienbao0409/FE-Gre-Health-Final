import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPageLayout from "../layouts/LandingPage";
import LandingPage from "../pages/Landing/LandingPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<LandingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
