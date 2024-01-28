import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  return (
    <div className="flex items-center bg-white fixed top-0 right-0 left-0 z-[1000] font-nunito-sans font-bold">
      <div className="md:w-[20vw]">
        <p className="text-xl px-2 py-1.5 text-gray-700">Sanjivani</p>
      </div>
      <div className="md:w-[80vw] font-normal">
        <nav className="md:flex items-center hidden">
          <Link to={"/admin/information/program"}>
            <p
              className={` transition-colors duration-500 py-2 md:px-5 ${
                pathname.startsWith("/admin/information")
                  ? "text-blue-700 border-b-2 border-b-blue-700 bg-blue-100"
                  : "text-gray-400"
              } text-lg`}
            >
              Information
            </p>
          </Link>
          <Link to={"/admin/dashboard"}>
            <p
              className={` transition-colors duration-500 py-2 md:px-5 ${
                pathname.startsWith("/admin/dashboard")
                  ? "text-blue-700 border-b-2 border-b-blue-700 bg-blue-100"
                  : "text-gray-400"
              } text-lg`}
            >
              Dashboard
            </p>
          </Link>
          <Link to={"/admin/home"}>
            <p
              className={` transition-colors duration-500 py-2 md:px-5 ${
                pathname.startsWith("/admin/home")
                  ? "text-blue-700 border-b-2 border-b-blue-700 bg-blue-100"
                  : "text-gray-400"
              } text-lg`}
            >
              Home
            </p>
          </Link>
          <Link to={"/admin/settings"}>
            <p
              className={` transition-colors duration-500 py-2 md:px-5 ${
                pathname.startsWith("/admin/settings")
                  ? "text-blue-700 border-b-2 border-b-blue-700 bg-blue-100"
                  : "text-gray-400"
              } text-lg`}
            >
              settings
            </p>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Header;
