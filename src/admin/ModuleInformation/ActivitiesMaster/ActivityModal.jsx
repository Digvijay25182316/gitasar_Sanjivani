import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";

function ActivityModal({ isOpen, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setIsName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      description,
    };

    try {
      setIsLoading(true);
      const header = new Headers();
      header.append("Content-Type", "application/json");
      const response = await fetch(`${SERVER_ENDPOINT}/activity/create`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header,
      });
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        onClose();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
              <form
                onSubmit={handleSubmit}
                className="mb-28 flex flex-col gap-5"
              >
                <div className="flex flex-col gap-3">
                  <label
                    className={`font-semibold ${
                      isLoading ? "text-gray-400" : "text-gray-600"
                    }`}
                    htmlFor="name"
                  >
                    Activity Name
                  </label>
                  <input
                    type="text"
                    className={`border px-4 py-1.5 rounded focus:outline-gray-400`}
                    readOnly={isLoading}
                    placeholder="Chanting 12 Rounds"
                    value={name}
                    name="name"
                    onChange={(e) => setIsName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label
                    className={`font-semibold ${
                      isLoading ? "text-gray-400" : "text-gray-600"
                    }`}
                    htmlFor="description"
                  >
                    Activity Description
                  </label>
                  <input
                    type="text"
                    className={`border px-4 py-1.5 rounded focus:outline-gray-400`}
                    readOnly={isLoading}
                    placeholder="write some description about activity"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-5 px-5 bg-white rounded-b-2xl">
                  <button
                    className={`w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 border ${
                      isLoading ? "text-gray-400" : "text-black"
                    }`}
                    type="button"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    className={`${
                      isLoading ? "bg-blue-400" : "bg-blue-700"
                    } w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 text-white`}
                    type="Submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg
                        aria-hidden="true"
                        className="inline w-6 h-6 text-gray-300 animate-spin fill-blue-600 my-0.5"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
}

export default ActivityModal;
