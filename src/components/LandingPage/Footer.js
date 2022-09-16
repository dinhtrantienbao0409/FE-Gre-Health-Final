import React from "react";
import { IconData } from "../../layoutData/LandingPageData";

const Footer = () => {
  return (
    <footer className=" w-full bg-gray-900 text-white relative">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-2">
        <h1
          className="lg:text-l text-l md:mb-0 mb-6 lg:leading-normal 
         "
        >
          Get connected with us on social networks:
        </h1>
        <div className="text-white">
          {IconData.map((icon) => (
            <span
              key={icon.name}
              className="p-2 cursor-pointer inline-flex items-center
        rounded-full bg-gray-700 mx-1.5 text-xl hover:text-gray-100 hover:bg-cyan-500
        duration-300 "
            >
              <ion-icon name={icon.name}></ion-icon>
            </span>
          ))}
        </div>
      </div>
      {/* <ItemsContainer /> */}
      <div className="text-center pt-2 text-gray-400 text-sm pb-3">
        <span>© 2022 GreHealth. All rights reserved.</span>
      </div>
    </footer>
  );
};
export default Footer;
