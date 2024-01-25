import React from "react";
import {
  ChartPieIcon,
  CircleStackIcon,
  Cog6ToothIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";

function BottomNav() {
  const { pathname } = useLocation();
  if (pathname !== "/")
    return (
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-white">
        <div className="flex items-center justify-evenly">
          <Link to={"/admin/information"}>
            <p
              className={`transition-colors duration-500  px-4 ${
                pathname.startsWith("/admin/information")
                  ? "text-blue-700 border-t-2 py-3 border-t-blue-700"
                  : "text-gray-400"
              }`}
            >
              <CircleStackIcon
                className={`h-6 w-6 transition-colors duration-500 `}
              />
            </p>
          </Link>
          <Link to={"/admin/home"}>
            <p
              className={`transition-colors duration-500  px-4 ${
                pathname.startsWith("/admin/home")
                  ? "text-blue-700 border-t-2 py-3 border-t-blue-700"
                  : "text-gray-400"
              }`}
            >
              <HomeIcon className={`h-6 w-6 transition-colors duration-500 `} />
            </p>
          </Link>
          <Link to={"/admin/dashboard"}>
            <p
              className={`transition-colors duration-500  px-4 ${
                pathname.startsWith("/admin/dashboard")
                  ? "text-blue-700 border-t-2 py-3 border-t-blue-700"
                  : "text-gray-400"
              }`}
            >
              <ChartPieIcon
                className={`h-6 w-6 transition-colors duration-500 `}
              />
            </p>
          </Link>
          <Link to={"/admin/settings"}>
            <p
              className={`transition-colors duration-500  px-4 ${
                pathname.startsWith("/admin/settings")
                  ? "text-blue-700 border-t-2 py-3 border-t-blue-700"
                  : "text-gray-400"
              }`}
            >
              <Cog6ToothIcon
                className={`h-6 w-6 transition-colors duration-500 `}
              />
            </p>
          </Link>
        </div>
      </div>
    );
}

export default BottomNav;
