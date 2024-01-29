import React, { useState } from "react";

const SessionList = ({ sessions }) => {
  const [items, setItems] = useState(sessions);

  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();

    const originalIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);

    if (originalIndex === targetIndex) {
      return;
    }

    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(originalIndex, 1);
    updatedItems.splice(targetIndex, 0, draggedItem);

    setItems(updatedItems);
    setDraggedIndex(null);
  };

  const handleCheckboxToggle = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <ul className="space-y-2 py-2 px-2">
      {items.map((item, index) => (
        <li
          key={item.id}
          className={`relative transition-all ${
            draggedIndex === index ? "opacity-50 scale-95" : ""
          }`}
        >
          <div className=" flex items-center justify-center border rounded-xl shadow">
            <div
              className="cursor-move left-0 top-0 h-full flex items-center space-x-4 ml-3"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              {/* Icon with 6 dots */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
                <circle cx="20" cy="12" r="1"></circle>
                <circle cx="20" cy="5" r="1"></circle>
                <circle cx="20" cy="19" r="1"></circle>
              </svg>
            </div>

            <input
              type="checkbox"
              className="cursor-pointer  ml-4"
              checked={item.checked}
              onChange={() => handleCheckboxToggle(item.id)}
            />

            <div className="ml-10">
              <div className="text-lg font-bold">{item.sessionName}</div>
              <div className="text-sm text-gray-500">
                Scheduled Date: {item.scheduledDate}
              </div>
            </div>
            <button className="ml-auto px-2 py-1 bg-blue-500 text-white rounded-md mr-3">
              Reschedule
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SessionList;
