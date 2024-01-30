import { XMarkIcon } from "@heroicons/react/24/solid";
import React from "react";

function ProgramModal({ isOpen, onClose, children }) {
  if (isOpen)
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-[1000] backdrop-brightness-50 cursor-pointer flex items-center justify-center"
          onClick={onClose}
        ></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white p-5 rounded-2xl">
          <div className="md:w-[50vw] w-[85vw]">
            <div className="border-b">
              <p className="font-semibold text-gray-600 text-lg">
                Create Program
              </p>
              <button
                className="absolute top-2 right-2 bg-red-200 text-red-700 p-2 rounded-full"
                onClick={onClose}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5 overflow-y-scroll h-[82vh] no-scrollbar">
              <form action="" className="text-gray-600 flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Program Name</label>
                  <input
                    type="text"
                    placeholder="Gitasar Batch 1"
                    className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Program Description</label>
                  <textarea
                    placeholder="your description"
                    className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                  />
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Program Incharge</label>
                    <select
                      placeholder="your description"
                      className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                    >
                      <option value="">select</option>
                      <option value="">option1</option>
                      <option value="">option2</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Program Coordinator</label>
                    <select
                      placeholder="your description"
                      className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                    >
                      <option value="">select</option>
                      <option value="">option1</option>
                      <option value="">option2</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Program Preacher</label>
                    <select
                      placeholder="your description"
                      className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                    >
                      <option value="">select</option>
                      <option value="">option1</option>
                      <option value="">option2</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Program Mentor</label>
                    <select
                      placeholder="your description"
                      className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                    >
                      <option value="">select</option>
                      <option value="">option1</option>
                      <option value="">option2</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Audience Type</label>
                    <select
                      placeholder="your description"
                      className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                    >
                      <option value="">select</option>
                      <option value="">option1</option>
                      <option value="">option2</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Program Type</label>
                    <select
                      placeholder="your description"
                      className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                    >
                      <option value="">select</option>
                      <option value="">option1</option>
                      <option value="">option2</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Location</label>
                  <input
                    type="text"
                    placeholder="NVCC Temple"
                    className="border px-4 py-1.5 rounded-md"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
}

export default ProgramModal;
