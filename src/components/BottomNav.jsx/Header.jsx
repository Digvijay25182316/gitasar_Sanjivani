import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  return (
    <div
      className={`${
        pathname.startsWith("/admin") ? "flex" : "hidden"
      } items-center bg-white fixed top-0 right-0 left-0 z-[1000] font-nunito-sans font-bold border-b py-2`}
    >
      <div className="md:w-[20vw]">
        <p className="text-xl px-5 py-1.5 text-gray-700">Sanjivani</p>
      </div>
      <div className="md:w-[80vw] font-normal">
        <nav className="md:flex items-center hidden gap-5">
          <Link to={"/admin/information/program"}>
            <p
              className={` transition-colors duration-500 py-1 md:px-5 ${
                pathname.startsWith("/admin/information")
                  ? "text-white bg-blue-700 border border-blue-600 rounded-md"
                  : "text-gray-400 rounded-md"
              } text-lg`}
            >
              Information
            </p>
          </Link>
          <Link to={"/admin/dashboard"}>
            <p
              className={` transition-colors duration-500 py-1 md:px-5 ${
                pathname.startsWith("/admin/dashboard")
                  ? "text-white bg-blue-700 border border-blue-600 rounded-md"
                  : "text-gray-400 rounded-md"
              } text-lg`}
            >
              Dashboard
            </p>
          </Link>
          <Link to={"/admin/home"}>
            <p
              className={` transition-colors duration-500 py-1 md:px-5 ${
                pathname.startsWith("/admin/home")
                  ? "text-white bg-blue-700 border border-blue-600 rounded-md"
                  : "text-gray-400 rounded-md"
              } text-lg`}
            >
              Home
            </p>
          </Link>
          <Link to={"/admin/settings"}>
            <p
              className={` transition-colors duration-500 py-1 md:px-5 ${
                pathname.startsWith("/admin/settings")
                  ? "text-white bg-blue-700 border border-blue-600 rounded-md"
                  : "text-gray-400 rounded-md"
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
