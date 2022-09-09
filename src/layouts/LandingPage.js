import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const LandingPageLayout = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPageLayout;
