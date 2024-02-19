import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function AddActivitiesModal({ isOpen, setIsOpen }) {
  const [programArr, setProgramArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSelection, setIsOpenSelection] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/program/`);
        if (response?.ok) {
          const responseData = await response.json();

          setProgramArr(responseData.content);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  if (isOpen) {
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-[1000] backdrop-brightness-50 cursor-pointer flex items-center justify-center"
          onClick={setIsOpen}
        ></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white p-10 rounded-2xl">
          <div className="flex flex-col gap-2">
            <p
              className={`font-semibold ${
                isLoading ? "text-gray-300" : "text-gray-600"
              }`}
            >
              select program
            </p>
            <div className="relative inline-block text-left w-full">
              <button
                type="button"
                onClick={() =>
                  !isLoading && setIsOpenSelection(!isOpenSelection)
                }
                className={`inline-flex items-center justify-between w-[200px] px-4 py-2 text-sm font-medium  bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 text-gray-700 `}
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
              >
                <p>select</p>
                <p>
                  <ChevronDownIcon className="h-3 w-3 text-black" />
                </p>
              </button>
              {!isLoading ? (
                isOpenSelection ? (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[100]"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div className="py-1" role="none">
                      {programArr?.length > 0 ? (
                        programArr.map((item) => (
                          <Link to={`/activities/${item.id}`}>
                            <p
                              value={item.id}
                              key={item.id}
                              role="menu"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {item.name}
                            </p>
                          </Link>
                        ))
                      ) : (
                        <p>NO Volunteer to show</p>
                      )}
                    </div>
                  </div>
                ) : null
              ) : null}
            </div>
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
