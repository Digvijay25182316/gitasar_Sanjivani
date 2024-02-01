import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";

const Dropdown = ({
  position,
  origin,
  fieldname,
  setvalue,
  selected,
  removeFilter,
}) => {
  const [issort, setIsSort] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const [formstate, setFormState] = useState("");

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const onItemClick = (e) => {
    e.preventDefault();
    if (formstate !== "") {
      setvalue({ [fieldname]: formstate });
      setDropdownOpen(false);
      setFormState("");
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div className=" flex items-center">
        {issort ? (
          <button
            onClick={() => {
              setIsSort(false);
            }}
            type="button"
            className="p-1 transition-colors duration-300 hover:bg-gray-100 ml-2 rounded-full"
          >
            <ArrowLongDownIcon className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              setIsSort(true);
            }}
            type="button"
            className="p-1 transition-colors duration-300 hover:bg-gray-100 ml-2 rounded-full"
          >
            <ArrowLongUpIcon className="h-4 w-4" />
          </button>
        )}

        <div className="flex items-center">
          {!selected ? (
            <button onClick={toggleDropdown} type="button">
              <EllipsisVerticalIcon className="h-6 w-6" />
            </button>
          ) : (
            <button
              className="bg-red-200 rounded-full text-red-500"
              onClick={removeFilter}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div
        className={`absolute ${position} z-10 w-56 mt-2 ${origin} bg-white border border-gray-300 rounded-md shadow-lg transform transition-transform ease-in-out duration-300 ${
          isDropdownOpen ? "scale-100" : "scale-0"
        }`}
      >
        <div
          className="py-1 flex items-center justify-center"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <form
            onSubmit={onItemClick}
            className="flex flex-col  items-center gap-5 py-2"
          >
            <input
              type="text"
              placeholder="search..."
              value={formstate}
              onChange={(e) => setFormState(e.target.value)}
              className="border  py-1 rounded-md border-blue-200 outline-none"
            />
            <div className="flex items-center gap-5">
              <button
                type="submit"
                className="px-4 py-1 bg-blue-100 text-blue-700 rounded-md"
              >
                Search
              </button>
              <button
                onClick={toggleDropdown}
                type="button"
                className="px-4 py-1 bg-red-100 text-red-700 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;