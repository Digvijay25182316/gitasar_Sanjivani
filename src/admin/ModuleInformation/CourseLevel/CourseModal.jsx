import React from "react";

function CourseModal({ isOpen, setIsOpen, children }) {
  if (isOpen) {
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-[1000] backdrop-brightness-50 cursor-pointer flex items-center justify-center"
          onClick={setIsOpen}
        ></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white p-5 rounded-2xl">
          {children}
        </div>
      </>
    );
  }
}

export default CourseModal;
