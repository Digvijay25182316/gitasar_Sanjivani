import React, { useEffect } from "react";
import { FRONTEND_ENDPOINT } from "../../config/Server";
import { LinkIcon } from "@heroicons/react/24/solid";
import CopyClipBoard from "../../../components/BottomNav.jsx/CopyClipBoard";
import QrCode from "./QrCode";

function ExternalLink({ Programs }) {
  const handleClick = () => {
    console.log("Clicked");
  };
  return (
    <div
      className="w-full flex justify-between items-center px-5 gap-5"
      onClick={handleClick}
    >
      <a
        href={`${FRONTEND_ENDPOINT}/activities/${Programs.id}`}
        className=" hover:underline   text-blue-700 flex items-center gap-2 justify-center"
      >
        <LinkIcon className="h-4 w-4" />
        Link
      </a>
      <CopyClipBoard url={`${FRONTEND_ENDPOINT}/activities/${Programs.id}`} />
      <QrCode
        url={`${FRONTEND_ENDPOINT}/activities/${Programs.id}`}
        courseCode={"ABCDEFG"}
      />
    </div>
  );
}

export default ExternalLink;
