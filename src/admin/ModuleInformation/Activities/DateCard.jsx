import React, { useEffect, useState } from "react";

function DateCard({ date }) {
  const [actdate, setDate] = useState("");
  useEffect(() => {
    const exactdate = new Date(date);
    setDate(exactdate?.toUTCString());
  }, [date]);
  return <div className="w-max">{actdate}</div>;
}

export default DateCard;
