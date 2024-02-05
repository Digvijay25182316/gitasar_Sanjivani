import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

function ActivityModal({ isOpen, onClose }) {
  if (isOpen)
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-[1000] backdrop-brightness-50 cursor-pointer flex items-center justify-center"
          onClick={onClose}
        ></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white rounded-2xl">
          <div className="md:w-[50vw] w-[85vw]">
            <div className="border-b m-5">
              <div>
                <p className="font-semibold text-gray-600 text-lg">
                  Create Activity
                </p>
                <p className="text-sm text-gray-500">
                  Create an activity to activity master
                </p>
              </div>
              <button
                className="absolute top-2 right-2 bg-red-200 text-red-700 p-2 rounded-full"
                onClick={onClose}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="px-5 md:px-8">
              <form action="" className="mb-28">
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-gray-600">
                    Activity Name
                  </label>
                  <input type="text" className="border px-4 py-1.5 rounded" />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="font-semibold text-gray-600">
                    Activity Description
                  </label>
                  <input type="text" className="border px-4 py-1.5 rounded" />
                </div>
              </form>
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-5 px-5 bg-white rounded-b-2xl">
              <button className="w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 border">
                Cancel
              </button>
              <button className="bg-blue-700 w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 text-white">
                Submit
              </button>
            </div>
          </div>
        </div>
      </>
    );
}

export default ActivityModal;
