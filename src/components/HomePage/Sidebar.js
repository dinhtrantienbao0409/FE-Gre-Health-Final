import React, { useState } from "react";
import SideLink from "./SideLink";
import { SidebarData } from "../../layoutData/HomePageData";
// import Logo from "../Logo";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
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
        {SidebarData.map((item) => (
          <SideLink path={item.path} name={item.name} />
        ))}
      </div>
    </div>
  );
};
export default Sidebar;
