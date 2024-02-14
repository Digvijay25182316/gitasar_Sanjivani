import React, { useEffect, useState } from "react";
import { SERVER_ENDPOINT } from "../../admin/config/Server";
import toast from "react-hot-toast";

function ProgramCard({ programId }) {
  const [programName, setProgramName] = useState("");
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${SERVER_ENDPOINT}/program/id/${programId}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setProgramName(responseData?.name);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  });

  return <div>{programName !== "" ? `${programName}` : "...loading"}</div>;
}

export default ProgramCard;
