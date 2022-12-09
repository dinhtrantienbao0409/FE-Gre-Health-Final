import React, { useState } from "react";
import SideLink from "./SideLink";
import { SidebarData } from "../../layoutData/HomePageData";
import { useSelector } from "react-redux";
// import Logo from "../Logo";

const Sidebar = () => {
  const role = useSelector((state) => state.auth.role);
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`fixed bg-gray-600 min-h-screen transition-all ${
        open ? "w-72" : "w-16"
      } left-0 top-[80px] px-4`}
    >
      <div
        onClick={() => setOpen(!open)}
        className="py-3 flex justify-end text-3xl text-white hover:text-cyan-500 duration-500"
      >
        <ion-icon name="menu"></ion-icon>
      </div>
      <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>

      <div
        className={`mt-4 flex flex-col items-start gap-8 relative whitespace-pre duration-500  ${
          !open && "opacity-0  overflow-hidden"
        }`}
      >
        {/* {SidebarData.map((item) => (
          <SideLink path={item.path} name={item.name} key={item.name} />
        ))} */}
        {role === "doctor" && (
          <div className="flex flex-col items-start gap-5">
            <SideLink path={"/doctor"} name={"Examination Forms"} />
            <SideLink path={"/doctor/profile"} name={"Profile"} />
            <SideLink
              path={"/doctor/createdRecord"}
              name={"Dental Health Records"}
            />
          </div>
        )}
        {role === "user" && (
          <div className="flex flex-col items-start gap-5">
            <SideLink path={"/home"} name={"Dental Health Records"} />
            <SideLink path={"/home/profile"} name={"Profile"} />
            <SideLink path={"/home/createdForm"} name={"Examination Forms"} />
          </div>
        )}
        {role === "receptionist" && (
          <div className="flex flex-col items-start gap-5">
            <SideLink path={"/receptionist"} name={"Examination Forms"} />
            <SideLink path={"/receptionist/profile"} name={"Profile"} />
            <SideLink path={"/receptionist/dashboard"} name={"Dashboard"} />
          </div>
        )}
        {role === "admin" && (
          <div className="flex flex-col items-start gap-5">
            <SideLink path={"/admin"} name={"User Management"} />
            <SideLink path={"/admin/profile"} name={"Profile"} />
            <SideLink path={"/admin/dashboard"} name={"Dashboard"} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Sidebar;
