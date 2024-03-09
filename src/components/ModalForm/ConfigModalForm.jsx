import { useLocation, useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import "react-datepicker/dist/react-datepicker.css";

export function NOR({ label, onChange, value }) {
  const { pathname } = useLocation();
  const { programId } = useParams();

  const handleChange = (e) => {
    const object = {
      target: {
        name: e.target.name,
        value: Number(e.target.value),
      },
    };
    onChange(object);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="NOR">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== `/sadhana/${programId}`}
        type="number"
        id="NOR"
        name="numberOfRounds"
        onChange={handleChange}
        placeholder="Number Of Rounds "
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Number Of Rounds

export function EJRB8A({ label, onChange, value }) {
  const { pathname } = useLocation();
  const { programId } = useParams();
  const handleChange = (e) => {
    const object = {
      target: {
        name: e.target.name,
        value: Number(e.target.value),
      },
    };
    onChange(object);
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="EJRB8A">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== `/sadhana/${programId}`}
        type="number"
        id="EJRB8A"
        name="earlyJapaRoundsBefore8AM"
        onChange={handleChange}
        placeholder="Early Japa rounds before 8 AM "
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Early Japa rounds before 8 AM

export function AJRA8A({ label, onChange, value }) {
  const { pathname } = useLocation();
  const { programId } = useParams();
  const handleChange = (e) => {
    const object = {
      target: {
        name: e.target.name,
        value: Number(e.target.value),
      },
    };
    onChange(object);
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="AJRA8A">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== `/sadhana/${programId}`}
        type="number"
        id="AJRA8A"
        name="earlyJapaRoundsAfter8AM"
        onChange={handleChange}
        placeholder="Early Japa rounds after 8 AM "
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Early Japa rounds after 8 AM
export function F8RCT({ label, onChange, value }) {
  const [time12, setTime12] = useState("");
  const { pathname } = useLocation();
  const { programId } = useParams();
  const handleChangeDate = (e) => {
    const inputValue = e.target.value;
    setTime12(inputValue);

    if (inputValue.trim() !== "") {
      const [time, period] = inputValue.split(" ");
      const [hoursStr, minutesStr] = time.split(":");
      let hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);

      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }

      const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const convertedTime = `${formattedHours}:${formattedMinutes}:${`${0}${0}`}.000000`;

      const event = {
        target: {
          name: "first8RoundsCompletedTime",
          value: convertedTime,
        },
      };
      onChange(event);
    } else {
      console.log("");
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="F8RCT">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <div className="px-4 py-1.5 rounded-lg border w-full">
        <input
          disabled={pathname !== `/sadhana/${programId}`}
          type="time"
          id="F8RCT"
          name="first8RoundsCompletedTime"
          value={time12}
          onChange={handleChangeDate}
          placeholder="First 8 rounds completed time "
          className="w-full outline-none"
          required
        />
      </div>
    </div>
  );
} //First 8 rounds completed time
export function N8RCT({ label, onChange, value }) {
  const [time12, setTime12] = useState("");
  const { pathname } = useLocation();
  const { programId } = useParams();
  const handleChangeDate = (e) => {
    const inputValue = e.target.value;
    setTime12(inputValue);

    if (inputValue.trim() !== "") {
      const [time, period] = inputValue.split(" ");
      const [hoursStr, minutesStr] = time.split(":");
      let hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);

      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }

      const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

      const convertedTime = `${formattedHours}:${formattedMinutes}:${`${0}${0}`}.000000`;

      const event = {
        target: {
          name: "next8RoundsCompletedTime",
          value: convertedTime,
        },
      };
      onChange(event);
    } else {
      console.log("");
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="N8RCT">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <div className="px-4 py-1.5 rounded-lg border w-full">
        <input
          disabled={pathname !== `/sadhana/${programId}`}
          type="time"
          id="N8RCT"
          name="next8RoundsCompletedTime"
          value={time12}
          onChange={handleChangeDate}
          placeholder="Next 8 rounds completed time"
          className={"w-full outline-none"}
          required
        />
      </div>
    </div>
  );
} //Next 8 rounds completed time
export function WUT({ label, onChange, value }) {
  const [time12, setTime12] = useState("");
  const { pathname } = useLocation();
  const { programId } = useParams();

  const handleChangeDate = (e) => {
    const inputValue = e.target.value;
    setTime12(inputValue);

    if (inputValue.trim() !== "") {
      const [time, period] = inputValue.split(" ");
      const [hoursStr, minutesStr] = time.split(":");
      let hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);

      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }

      const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

      const convertedTime = `${formattedHours}:${formattedMinutes}:${`${0}${0}`}.000000`;

      const event = {
        target: {
          name: "wakeUpTime",
          value: convertedTime,
        },
      };
      onChange(event);
    } else {
      console.log("");
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="WUT">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <div className="px-4 py-1.5 rounded-lg border">
        <input
          disabled={pathname !== `/sadhana/${programId}`}
          type="time"
          id="WUT"
          name="wakeUpTime"
          value={time12}
          onChange={handleChangeDate}
          placeholder="Wake up time"
          className={"w-full outline-none"}
          required
        />
      </div>
    </div>
  );
} //Wake up time
export function ST({ label, onChange, value }) {
  const [time12, setTime12] = useState("");
  const { pathname } = useLocation();
  const { programId } = useParams();

  const handleChangeDate = (e) => {
    const inputValue = e.target.value;
    setTime12(inputValue);

    if (inputValue.trim() !== "") {
      const [time, period] = inputValue.split(" ");
      const [hoursStr, minutesStr] = time.split(":");
      let hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);

      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }

      const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

      const convertedTime = `${formattedHours}:${formattedMinutes}:${`${0}${0}`}.000000`;

      const event = {
        target: {
          name: "sleepTime",
          value: convertedTime,
        },
      };
      onChange(event);
    } else {
      console.log("");
    }
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="ST">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <div className="px-4 py-1.5 rounded-lg border">
        <input
          disabled={pathname !== `/sadhana/${programId}`}
          type="time"
          id="ST"
          name="sleepTime"
          value={time12}
          onChange={handleChangeDate}
          // wrapperClassName={`w-full`}
          placeholder="Sleep time"
          className={"w-full outline-none"}
          required
        />
      </div>
    </div>
  );
} //Sleep time
export function PBR({ label, onChange, value }) {
  const { pathname } = useLocation();
  const { programId } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const event = {
      target: {
        name: name,
        value: Number(value),
      },
    };
    onChange(event);
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="PBR">
        {label}
        <i className="text-gray-500 font-normal">in minutes</i>
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== `/sadhana/${programId}`}
        type="number"
        id="PBR"
        name="prabhupadaBookReading"
        onChange={handleChange}
        placeholder="Prabhupada Book Reading "
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Prabhupada Book Reading
export function BNR({ label, onChange, value }) {
  const { pathname } = useLocation();
  const { programId } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const event = {
      target: {
        name: name,
        value: Number(value),
      },
    };
    onChange(event);
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="BNR">
        {label}
        <i className="text-gray-500 font-normal">in minutes</i>
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== `/sadhana/${programId}`}
        type="number"
        id="BNR"
        name="nonPrabhupadaBookReading"
        onChange={handleChange}
        placeholder="Non Prabhupada Book Reading name"
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Book Name Reading
export function PCH({ label, onChange, value }) {
  const { pathname } = useLocation();
  const { programId } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;

    const event = {
      target: {
        name: name,
        value: Number(value),
      },
    };
    onChange(event);
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="PCH">
        {label}
        <i className="text-gray-500 font-normal">in minutes</i>
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== `/sadhana/${programId}`}
        type="number"
        id="PCH"
        name="prabhupadaClassHearing"
        onChange={handleChange}
        placeholder="Prabhupada Class Hearing "
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Prabhupada Class Hearing
export function GCH({ label, onChange, value }) {
  const { pathname } = useLocation();
  const { programId } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const event = {
      target: {
        name: name,
        value: Number(value),
      },
    };
    onChange(event);
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="GCH">
        {label}
        <i className="text-gray-500 font-normal">in minutes</i>
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== `/sadhana/${programId}`}
        type="number"
        id="GCH"
        name="guruClassHearing"
        onChange={handleChange}
        placeholder="Guru Class Hearing "
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Guru Class Hearing
export function CH({ label, onChange, value }) {
  const { pathname } = useLocation();
  const { programId } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const event = {
      target: {
        name: name,
        value: Number(value),
      },
    };
    onChange(event);
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="CH">
        {label}
        <i className="text-gray-500 font-normal">in minutes</i>
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== `/sadhana/${programId}`}
        type="number"
        id="CH"
        name="otherClassHearing"
        onChange={handleChange}
        placeholder="Other Class Hearing"
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Class Hearing
export function S({ label, onChange, value }) {
  const { pathname } = useLocation();
  const { programId } = useParams();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="S">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== `/sadhana/${programId}`}
        type="text"
        id="S"
        name="speaker"
        onChange={onChange}
        placeholder="Other Speaker name that you hearing to"
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Speaker
export function AA({ label, onChange, value }) {
  const [selectionOpen, setSelectionOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const { pathname } = useLocation();
  const { programId } = useParams();
  const menuRef = useRef();

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setSelectionOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="AA">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <div className="relative inline-block text-left" ref={menuRef}>
        <button
          type="button"
          disabled={pathname !== `/sadhana/${programId}`}
          className="px-4 py-1.5 rounded-lg border flex items-center w-full justify-between"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setSelectionOpen(!selectionOpen)}
        >
          {selectedItem.length > 0 ? `${selectedItem}` : "Select"}
          <ChevronDownIcon className="h-3 w-3 text-black" />
        </button>
        {selectionOpen && (
          <div
            className="px-1 py-1.5 rounded-lg border mt-1.5 absolute z-[1000] w-full bg-white shadow-lg"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="flex flex-col" role="none">
              <p
                onClick={() => {
                  const e = {
                    target: {
                      name: "attendedArti",
                      value: "YES",
                    },
                  };
                  onChange(e);
                  setSelectionOpen(false);
                  setSelectedItem("Yes");
                }}
                className={`px-1 py-1.5 hover:bg-gray-200 cursor-pointer rounded-md`}
              >
                Yes{" "}
              </p>
              <p
                onClick={() => {
                  const e = {
                    target: {
                      name: "attendedArti",
                      value: "NO",
                    },
                  };
                  onChange(e);
                  setSelectionOpen(false);
                  setSelectedItem("No");
                }}
                className={`px-1 py-1.5 hover:bg-gray-200 cursor-pointer rounded-md`}
              >
                No
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} //Attended Arthi
export function MIU({ label, onChange, value }) {
  const { pathname } = useLocation();
  const { programId } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    const event = {
      target: {
        name: name,
        value: Number(value),
      },
    };
    onChange(event);
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="MIU">
        {label}
        <i className="text-gray-500 font-normal">in minutes</i>
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== `/sadhana/${programId}`}
        type="number"
        name="mobileInternetUsage"
        id="MIU"
        onChange={handleChange}
        placeholder="handleChange/Internet-Usage"
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Mobile/Internet-Usage

export const FormListItems = [
  {
    id: 1,
    type: "Number of Rounds ",
    valueType: "Number",
    functionName: "NOR",
    databaseField: "numberOfRounds",
  },
  {
    id: 2,
    type: "Early Japa rounds before 8 AM ",
    valueType: "Number",
    functionName: "EJRB8A",
    databaseField: "earlyJapaRoundsBefore8AM",
  },
  {
    id: 3,
    type: "Early Japa rounds after 8 AM ",
    valueType: "Number",
    functionName: "AJRA8A",
    databaseField: "earlyJapaRoundsAfter8AM",
  },
  {
    id: 4,
    type: "First 8 rounds completed time ",
    valueType: "Time",
    functionName: "F8RCT",
    databaseField: "first8RoundsCompletedTime",
  },
  {
    id: 5,
    type: "Next 8 rounds completed time ",
    valueType: "Time",
    functionName: "N8RCT",
    databaseField: "next8RoundsCompletedTime",
  },
  {
    id: 6,
    type: "Wake up time ",
    valueType: "Time",
    functionName: "WUT",
    databaseField: "wakeUpTime",
  },
  {
    id: 7,
    type: "Sleep time ",
    valueType: "Time",
    functionName: "ST",
    databaseField: "sleepTime",
  },
  {
    id: 8,
    type: "Prabhupada Book Reading ",
    valueType: "Number",
    functionName: "PBR",
    databaseField: "prabhupadaBookReading",
  },
  {
    id: 9,
    type: "Book Name Reading",
    valueType: "Text",
    functionName: "BNR",
    databaseField: "nonPrabhupadaBookReading",
  },
  {
    id: 10,
    type: "Prabhupada Class Hearing ",
    valueType: "Time",
    functionName: "PCH",
    databaseField: "prabhupadaClassHearing",
  },
  {
    id: 11,
    type: "Guru Class Hearing ",
    valueType: "Time",
    functionName: "GCH",
    databaseField: "guruClassHearing",
  },
  {
    id: 12,
    type: "Class Hearing ",
    valueType: "Time",
    functionName: "CH",
    databaseField: "otherClassHearing",
  },
  {
    id: 13,
    type: "Speaker ",
    valueType: "Text",
    functionName: "S",
    databaseField: "speaker",
  },
  {
    id: 14,
    type: "Attended Arthi",
    valueType: "Boolean",
    functionName: "AA",
    databaseField: "attendedArti",
  },
  {
    id: 15,
    type: "Mobile/Internet-Usage",
    valueType: "Time",
    functionName: "MIU",
    databaseField: "mobileInternetUsage",
  },
];
