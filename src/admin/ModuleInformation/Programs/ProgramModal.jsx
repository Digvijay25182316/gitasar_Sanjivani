import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";

function ProgramModal({ isOpen, onClose, children }) {
  const [isError, setIsError] = useState(false);
  const [volunteerArr, setVolunteerArr] = useState([]);
  const formRef = useRef();
  const formData = {
    name: formRef?.current?.name?.value,
    description: formRef?.current?.description?.value,
    incharge: formRef?.current?.incharge?.value,
    preacher: formRef?.current?.preacher?.value,
    mentor: formRef?.current?.mentor?.value,
    coordinator: formRef?.current?.coordinator?.value,
    audienceType: formRef?.current?.audienceType?.value,
    location: formRef?.current?.location?.value,
  };

  async function submitHandler(e) {
    e.preventDefault();
    const header = new Headers();
    console.log(formData);
    header.append("Content-Type", "application/json");
    await fetch(`${SERVER_ENDPOINT}/program/create`, {
      method: "POST",
      headers: header,
      body: JSON.stringify(formData),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        } else {
          setIsError(true);
          return data.json();
        }
      })
      .then((data) => {
        if (isError) {
          toast.error(data.message);
        } else {
          toast.success(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  }

  useEffect(() => {
    (async () => {
      fetch(`${SERVER_ENDPOINT}/volunteer/`)
        .then((data) => {
          if (data.ok) {
            return data.json();
          } else {
            setIsError(true);
            return data.json();
          }
        })
        .then((data) => {
          setVolunteerArr(data.content);
        });
    })();
  }, [isError]);

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
            <div className="mt-5 overflow-y-scroll h-[82vh] p-5">
              <form
                className="text-gray-600 flex flex-col gap-3"
                onSubmit={submitHandler}
                ref={formRef}
              >
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Program Name</label>
                  <input
                    type="text"
                    placeholder="Gitasar Batch 1"
                    name="name"
                    className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Program Description</label>
                  <textarea
                    placeholder="your description"
                    className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                    name="description"
                  />
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Program Incharge</label>
                    <select
                      name="incharge"
                      className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                    >
                      {volunteerArr?.map((volunteer, index) => (
                        <option value={volunteer.id} key={index}>
                          {volunteer.initiatedName
                            ? volunteer.initiatedName
                            : `${volunteer.firstName} ${volunteer.lastName}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Program Coordinator</label>
                    <select
                      className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                      name="coordinator"
                    >
                      {volunteerArr?.map((volunteer, index) => (
                        <option value={volunteer.id} key={index}>
                          {volunteer.initiatedName
                            ? volunteer.initiatedName
                            : `${volunteer.firstName} ${volunteer.lastName}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Program Preacher</label>
                    <select
                      className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                      name="preacher"
                    >
                      {volunteerArr?.map((volunteer, index) => (
                        <option value={volunteer.id} key={index}>
                          {volunteer.initiatedName
                            ? volunteer.initiatedName
                            : `${volunteer.firstName} ${volunteer.lastName}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Program Mentor</label>
                    <select
                      className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                      name="mentor"
                    >
                      {volunteerArr?.map((volunteer, index) => (
                        <option value={volunteer.id} key={index}>
                          {volunteer.initiatedName
                            ? volunteer.initiatedName
                            : `${volunteer.firstName} ${volunteer.lastName}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Audience Type</label>
                    <select
                      className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                      name="audienceType"
                    >
                      <option value="children">option1</option>
                      <option value="">option2</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Program Type</label>
                    <select
                      className="border bg-white px-4 py-1.5 rounded-md transition-colors duration-500 focus:outline-gray-400"
                      name="programType"
                    >
                      <option value="">option1</option>
                      <option value="">option2</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-10">
                  <label className="font-semibold">Location</label>
                  <input
                    type="text"
                    placeholder="NVCC Temple"
                    name="location"
                    className="border px-4 py-1.5 rounded-md"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-5 px-5 bg-white">
                  <button
                    className="w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 border"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-700 w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 text-white"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
}

export default ProgramModal;
