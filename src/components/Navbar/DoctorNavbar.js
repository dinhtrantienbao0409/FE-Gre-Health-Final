import LogoForDoctor from "components/NavbarLogo/LogoForDoctor";
import React, { useState } from "react";
import CustomDropdown from "../HomePage/CustomDropdown";
import SearchField from "../HomePage/SearchField";

export default function DoctorNavbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-gray-800 py-4 md:px-10 px-7 h-[80px]">
        <LogoForDoctor />
        <SearchField />
        <div className="rounded-full bg-gray-600 px-4 py-2 ">
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl text-white hover:text-cyan-500 duration-500 absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>

          <ul
            className={` gap-2 md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-gray-600 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-20 " : "top-[-490px]"
            }`}
          >
            <CustomDropdown />
          </ul>
        </div>
      </div>
    </div>
  );
}
