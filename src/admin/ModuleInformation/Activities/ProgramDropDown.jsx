import {
  AdjustmentsHorizontalIcon,
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { SERVER_ENDPOINT } from "../../config/Server";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const ProgramDropDown = ({
  isSpecialNativeQuery,
  position,
  origin,
  fieldname,
  fieldname2,
  setvalue,
  selected,
  removeFilter,
  issort,
  setIsSort,
}) => {
  const [isprogramDropDownOpen, setprogramDropDownOpen] = useState(false);
  const [programArr, setProgramArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSelection, setIsOpenSelection] = useState(false);
  const [selectedType, setSelectedType] = useState({});

  const menuRef = useRef();

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setprogramDropDownOpen(false);
    }
  };
  // Attach click outside listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleprogramDropDown = () => {
    setprogramDropDownOpen(!isprogramDropDownOpen);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/program/`);
        if (response.ok) {
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

  const handleSubmit = (program) => {
    setSelectedType(program);
    setIsOpenSelection(false);
    setvalue({ [fieldname]: program.name });
    toggleprogramDropDown();
    setIsSort("id");
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div className=" flex programs-center">
        {issort ? (
          <button
            onClick={() => {
              setIsSort("id");
            }}
            type="button"
            className="p-1 transition-colors duration-300 hover:bg-gray-200 ml-2 rounded-full"
          >
            <ArrowLongDownIcon className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              if (isSpecialNativeQuery) {
                setIsSort(fieldname2);
              } else {
                setIsSort(fieldname);
              }
            }}
            type="button"
            className="p-1 transition-colors duration-300 hover:bg-gray-200 ml-2 rounded-full"
          >
            <ArrowLongUpIcon className="h-4 w-4" />
          </button>
        )}

        <div className="flex programs-center">
          {!selected ? (
            <button
              onClick={toggleprogramDropDown}
              type="button"
              className="text-gray-600"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
            </button>
          ) : (
            <button
              className="bg-red-200 rounded-full text-red-500"
              onClick={() => {
                removeFilter();
                setIsSort("id");
              }}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div
        className={`absolute ${position} z-10 w-56 mt-2 ${origin} bg-white border border-gray-300 rounded-md shadow-lg transform transition-transform ease-in-out duration-300 ${
          isprogramDropDownOpen ? "scale-100" : "scale-0"
        }`}
      >
        <div className="relative inline-block text-left w-full">
          <button
            type="button"
            onClick={() => !isLoading && setIsOpenSelection(!isOpenSelection)}
            className={`inline-flex programs-center justify-between w-full px-4 py-2 text-sm font-medium  bg-white border border-gray-300 rounded-md shadow-sm ${
              isLoading
                ? "text-gray-400"
                : "hover:bg-gray-50 focus:outline-none focus:ring-1 text-gray-700"
            }`}
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            <p>
              {Object.keys(selectedType).length === 0
                ? "Select"
                : `${selectedType?.name}`}
            </p>
            <p>
              <ChevronDownIcon className="h-3 w-3 text-black" />
            </p>
          </button>
          {!isLoading && isOpenSelection ? (
            <div
              className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[100]"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div className="py-1 w-full" role="none">
                {programArr?.length > 0 ? (
                  programArr.map((program, index) => (
                    <p
                      key={index}
                      role="menu"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => handleSubmit(program)}
                    >
                      {program?.name}
                    </p>
                  ))
                ) : (
                  <p>NO Volunteer to show</p>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProgramDropDown;
