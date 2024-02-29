import { useLocation } from "react-router-dom";

export function NOR({ label, onChange, value }) {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="NOR">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== "/sadhana"}
        type="text"
        name="NOR"
        onChange={onChange}
        value={value}
        placeholder="Number Of Rounds "
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Number Of Rounds

export function EJRB8A({ label, onChange, value }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="EJRB8A">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== "/sadhana"}
        type="text"
        name="EJRB8A"
        onChange={onChange}
        value={value}
        placeholder="Early Japa rounds before 8 AM "
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Early Japa rounds before 8 AM

export function AJRA8A({ label, onChange, value }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="AJRA8A">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== "/sadhana"}
        type="text"
        name="AJRA8A"
        onChange={onChange}
        value={value}
        placeholder="Early Japa rounds after 8 AM "
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Early Japa rounds after 8 AM
export function F8RCT({ label, onChange, value }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="F8RCT">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== "/sadhana"}
        type="text"
        name="F8RCT"
        onChange={onChange}
        value={value}
        placeholder="First 8 rounds completed time "
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //First 8 rounds completed time
export function N8RCT({ label, onChange, value }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="N8RCT">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== "/sadhana"}
        type="text"
        name="N8RCT"
        onChange={onChange}
        value={value}
        placeholder="Next 8 rounds completed time "
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Next 8 rounds completed time
export function WUT({ label, onChange, value }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="WUT">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== "/sadhana"}
        type="text"
        name="WUT"
        onChange={onChange}
        value={value}
        placeholder="Wake up time"
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Wake up time
export function ST({ label, onChange, value }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="ST">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== "/sadhana"}
        type="text"
        name="ST"
        onChange={onChange}
        value={value}
        placeholder="Sleep time"
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Sleep time
export function PBR({ label, onChange, value }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="PBR">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== "/sadhana"}
        type="text"
        name="PBR"
        onChange={onChange}
        value={value}
        placeholder="Prabhupada Book Reading "
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Prabhupada Book Reading
export function BNR({ label, onChange, value }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="BNR">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== "/sadhana"}
        type="text"
        name="BNR"
        onChange={onChange}
        value={value}
        placeholder="Book Name Reading"
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Book Name Reading
export function PCH({ label, onChange, value }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="PCH">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== "/sadhana"}
        type="text"
        name="PCH"
        onChange={onChange}
        value={value}
        placeholder="Prabhupada Class Hearing "
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Prabhupada Class Hearing
export function GCH({ label, onChange, value }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="GCH">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== "/sadhana"}
        type="text"
        name="GCH"
        onChange={onChange}
        value={value}
        placeholder="Guru Class Hearing "
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Guru Class Hearing
export function CH({ label, onChange, value }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="CH">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== "/sadhana"}
        type="text"
        name="CH"
        onChange={onChange}
        value={value}
        placeholder="Class Hearing"
        className="px-4 py-1.5 text-lg rounded-lg border"
        required
      />
    </div>
  );
} //Class Hearing
export function S({ label, onChange, value }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="S">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== "/sadhana"}
        type="text"
        name="S"
        onChange={onChange}
        value={value}
        placeholder="Speaker"
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Speaker
export function AA({ label, onChange, value }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="AA">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== "/sadhana"}
        type="text"
        name="AA"
        onChange={onChange}
        value={value}
        placeholder="Attended Arthi"
        className="px-4 py-1.5 rounded-lg border"
        required
      />
    </div>
  );
} //Attended Arthi
export function MIU({ label, onChange, value }) {
  const { pathname } = useLocation();
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-semibold" htmlFor="MIU">
        {label}
        <i className="text-red-400">*</i>
      </label>
      <input
        disabled={pathname !== "/sadhana"}
        type="text"
        name="MIU"
        onChange={onChange}
        value={value}
        placeholder="Mobile/Internet-Usage"
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
  },
  {
    id: 2,
    type: "Early Japa rounds before 8 AM ",
    valueType: "Number",
    functionName: "EJRB8A",
  },
  {
    id: 3,
    type: "Early Japa rounds after 8 AM ",
    valueType: "Number",
    functionName: "AJRA8A",
  },
  {
    id: 4,
    type: "First 8 rounds completed time ",
    valueType: "Time",
    functionName: "F8RCT",
  },
  {
    id: 5,
    type: "Next 8 rounds completed time ",
    valueType: "Time",
    functionName: "N8RCT",
  },
  { id: 6, type: "Wake up time ", valueType: "Time", functionName: "WUT" },
  { id: 7, type: "Sleep time ", valueType: "Time", functionName: "ST" },
  {
    id: 8,
    type: "Prabhupada Book Reading ",
    valueType: "Number",
    functionName: "PBR",
  },
  { id: 9, type: "Book Name Reading", valueType: "Text", functionName: "BNR" },
  {
    id: 10,
    type: "Prabhupada Class Hearing ",
    valueType: "Time",
    functionName: "PCH",
  },
  {
    id: 11,
    type: "Guru Class Hearing ",
    valueType: "Time",
    functionName: "GCH",
  },
  { id: 12, type: "Class Hearing ", valueType: "Time", functionName: "CH" },
  { id: 13, type: "Speaker ", valueType: "Text", functionName: "S" },
  { id: 14, type: "Attended Arthi", valueType: "Boolean", functionName: "AA" },
  {
    id: 15,
    type: "Mobile/Internet-Usage",
    valueType: "Time",
    functionName: "MIU",
  },
];
