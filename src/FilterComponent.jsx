import { ArrowLongDownIcon, ArrowLongUpIcon } from "@heroicons/react/24/solid";
import React, { useRef, useState } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";

function FilterComponent({ filterRef, fieldname }) {
  const [clickedUp, setClickedUp] = useState(false);
  const [isOnFilter, setIsOnFilter] = useState(false);
  const formRef = useRef();
  function onSubmit(e) {
    e.preventDefault();
    filterRef(Object({ [fieldname]: formRef?.current?.fieldname?.value }));
    setIsOnFilter(false);
  }

  return (
    <div className="relative flex items-center gap-3">
      <div>
        <button
          onClick={() => setClickedUp((prev) => !prev)}
          className="text-2xl hover:bg-gray-200 transition-colors duration-300 px-1 py-1 rounded-full text-gray-600"
        >
          {clickedUp ? (
            <ArrowLongUpIcon className="h-5 w-5" />
          ) : (
            <ArrowLongDownIcon className="h-5 w-5" />
          )}
        </button>
      </div>
      <button
        className="text-lg hover:bg-gray-200 px-1 rounded-full py-1 transition-colors duration-300"
        onClick={() => setIsOnFilter(true)}
      >
        <BsThreeDotsVertical />
      </button>
      <FilterOpenModal
        ifOnFilter={isOnFilter}
        onClose={() => setIsOnFilter(false)}
      >
        <div>
          <form
            className="flex flex-col items-center gap-5"
            ref={formRef}
            onSubmit={onSubmit}
          >
            <label className="text-gray-700 text-xl font-normal flex items-center">
              Current filter : <p className="font-bold">{fieldname}</p>
            </label>
            <input
              type="text"
              name={"fieldname"}
              className="border px-4 py-1.5 text-lg rounded-lg"
            />
            <div className="flex items-center gap-5">
              <button
                className="text-lg bg-blue-200 text-blue-600 px-4 py-1.5 rounded-lg"
                type="submit"
              >
                submit
              </button>
              <button
                className="text-lg bg-red-200 px-4 py-1.5 rounded-lg text-red-600"
                type="button"
                onClick={() => setIsOnFilter(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </FilterOpenModal>
    </div>
  );
}

export default FilterComponent;

const FilterOpenModal = ({ ifOnFilter, onClose, children }) => {
  if (ifOnFilter) {
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-[1000] backdrop-brightness-50 cursor-pointer flex items-center justify-center"
          onClick={onClose}
        ></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white p-10 rounded-2xl">
          {children}
        </div>
      </>
    );
  } else {
    return null;
  }
};
