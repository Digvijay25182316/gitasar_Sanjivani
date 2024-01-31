import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

function AddActivitiesModal({ isOpen, setIsOpen }) {
  if (isOpen) {
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-[1000] backdrop-brightness-50 cursor-pointer flex items-center justify-center"
          onClick={setIsOpen}
        ></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white p-10 rounded-2xl">
          <div>
            <form action="" className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label>Activity Name :</label>
                <input type="text" className="border px-3 py-1.5 rounded-md" />
              </div>
              <div className="flex flex-col">
                <label>Description :</label>
                <textarea
                  type="text"
                  className="border px-3 py-1.5 rounded-md"
                />
              </div>
              <div className="flex justify-center">
                <button className="bg-blue-700 text-white w-[200px] py-1.5 text-lg font-semibold rounded-md">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <button
            className="bg-red-100 text-red-700 w-max p-2 rounded-full h-max absolute right-2 top-2 z-[100]"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </>
    );
  }
}

export default AddActivitiesModal;
