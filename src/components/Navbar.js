import React, { useState } from "react";
import NavLink from "../components/NavLink";
import { NavData } from "../layoutData/LandingPageData";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-gray-800 py-4 md:px-10 px-7">
        <div
          className=" text-2xl cursor-pointer flex items-center 
          text-white hover:text-cyan-500 duration-500"
        >
          <span className="text-3xl mr-1 pt-2">
            <ion-icon name="leaf-outline"></ion-icon>
          </span>
          GreHealth
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl text-white hover:text-cyan-500 duration-500 absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-gray-800 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {NavData.map((item) => (
            <NavLink path={item.path} name={item.name} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default NavBar;
