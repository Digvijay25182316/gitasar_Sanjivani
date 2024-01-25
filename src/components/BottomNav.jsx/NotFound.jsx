import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center gap-5">
      <div className="flex flex-col items-center text-gray-500">
        <p className="text-red-600 bg-red-200 rounded-full p-5 w-max">
          <ExclamationTriangleIcon className="h-20 w-20" />
        </p>
        <p className="">This page might not exists</p>
        or
        <p className="">The page could be under construction</p>
      </div>
      <Link to="/admin/information">
        <button className="px-4 bg-blue-200 text-blue-700 py-1.5 rounded-lg text-lg border border-blue-500 hover:bg-blue-500 hover:text-white">
          Go Home
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
