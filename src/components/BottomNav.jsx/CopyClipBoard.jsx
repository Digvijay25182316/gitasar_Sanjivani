import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

function CopyClipBoard({ url }) {
  const [isclipBoard, setClipBoard] = useState(false);

  const addToClipBoard = (url) => {
    return navigator.clipboard
      .writeText(url)
      .then((data) => {
        setClipBoard(true);
        console.log(data, "copied");
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setTimeout(() => {
      setClipBoard(false);
    }, 5000);
  });
  return (
    <div>
      {!isclipBoard ? (
        <button onClick={() => addToClipBoard(url)}>
          <ClipboardDocumentListIcon className="h-6 w-6 text-gray-500" />
        </button>
      ) : (
        <button disabled>
          <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-500" />
        </button>
      )}
    </div>
  );
}

export default CopyClipBoard;
