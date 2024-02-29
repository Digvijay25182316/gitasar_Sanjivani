import { PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import {
  NOR as NORComponent,
  EJRB8A as EJRB8AComponent,
  AJRA8A as AJRA8AComponent,
  F8RCT as F8RCTComponent,
  N8RCT as N8RCTComponent,
  WUT as WUTComponent,
  ST as STComponent,
  PBR as PBRComponent,
  BNR as BNRComponent,
  PCH as PCHComponent,
  GCH as GCHComponent,
  CH as CHComponent,
  S as SComponent,
  AA as AAComponent,
  MIU as MIUComponent,
  FormListItems,
} from "./ConfigModalForm";
import { FRONTEND_ENDPOINT, SERVER_ENDPOINT } from "../../admin/config/Server";
import toast from "react-hot-toast";
import CopyClipBoard from "../BottomNav.jsx/CopyClipBoard";
import { Link, useNavigate, useParams } from "react-router-dom";

function FormModalComp() {
  const { programId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [activitiesArr, setActivitiesArr] = useState([]);
  const [participant, setParticipant] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const storeToLocalStorage = (item) => {
    localStorage.setItem("phoneNumber", item);
  };
  const [GeneratedURL, setGeneratedUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [checkedItems, setCheckedItems] = useState([]);

  const handleChange = (event, item) => {
    const { checked } = event.target;

    if (checked) {
      setCheckedItems((prevItems) => [...prevItems, item]);
    } else {
      setCheckedItems((prevItems) =>
        prevItems.filter((prevItem) => prevItem.id !== item.id)
      );
    }
  };

  const generateURL = () => {
    const params = new URLSearchParams();
    checkedItems.forEach((item) => {
      params.append("functionNames", item.functionName);
    });
    setGeneratedUrl(`${FRONTEND_ENDPOINT}/sadhana?${params.toString()}`);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-center w-full flex items-center justify-center gap-3 text-blue-700"
      >
        open
        <PencilIcon className="h-4 w-4" />
      </button>
      {isOpen ? (
        <div className="fixed top-0 left-0 right-0 bottom-0  h-screen bg-white z-[1000] overflow-y-auto overflow-x-hidden w-full">
          <button
            className="absolute z-[100] right-5 top-5 text-lg flex items-center gap-3 bg-gray-500 text-white px-2 py-1 rounded-xl h-max"
            onClick={() => setIsOpen(false)}
          >
            <XMarkIcon className="h-5 w-5" />
            close
          </button>
          <div className="flex items-center w-full">
            <div className="md:w-[23vw] h-screen fixed top-0 left-0 border-r bg-white">
              <div className="py-10 flex flex-col gap-2">
                {FormListItems?.map((item) => (
                  <div key={item.id} className="px-5 whitespace-nowrap">
                    <label
                      htmlFor={item.functionName}
                      className="flex items-center gap-2 font-semibold"
                    >
                      <input
                        id={item.functionName}
                        name={item.functionName}
                        type="checkbox"
                        className="h-5 w-5"
                        checked={checkedItems.some(
                          (checkedItem) => checkedItem.id === item.id
                        )}
                        onChange={(event) => handleChange(event, item)}
                      />
                      {item.type}
                    </label>
                  </div>
                ))}
              </div>
              <div className="px-5">
                <button
                  className="text-center w-full border px-4 py-1.5 rounded-lg bg-green-500 text-white"
                  onClick={() => generateURL()}
                >
                  GenerateURL
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center gap-5 w-[70vw] ml-[23vw] my-5">
              <p className="flex text-xl font-semibold">PreviewForm</p>
              <div className="flex ">
                <a
                  href={GeneratedURL}
                  className="w-[300px] line-clamp-4 text-blue-500 underline"
                >
                  {GeneratedURL && GeneratedURL}
                </a>
                {GeneratedURL && <CopyClipBoard url={GeneratedURL} />}
              </div>
              <div className="mt-5 px-5 border rounded-xl">
                <h1 className="text-center font-bold text-xl p-5">
                  Sadhana Form
                </h1>

                <div className="flex md:flex-row flex-col gap-2 md:items-end items-center justify-center">
                  <div className="flex flex-col gap-2 mx-5">
                    <label className="font-semibold text-gray-600">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="px-4 py-1.5 border rounded outline-none "
                      placeholder="8888959287 "
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end gap-5 ml-2">
                    <button
                      className={`px-4 py-1.5 text-lg  ${
                        isLoading
                          ? "bg-blue-400 text-white"
                          : "bg-blue-700 text-white"
                      } rounded md:w-[150px] w-[100px]`}
                      type="submit"
                      disabled
                    >
                      {isLoading ? "loading..." : "Search"}
                    </button>
                  </div>
                </div>
                <p className="text-center p-5 text-gray-400">
                  This form is to track your daily progress in the path of
                  <i className="text-red-400 ml-2">Krsna consiousness</i>
                </p>
                <div className="flex flex-col gap-5">
                  {checkedItems.map((item, index) => {
                    switch (item.functionName) {
                      case "NOR":
                        return (
                          <NORComponent
                            key={index}
                            label={"Number of Rounds "}
                          />
                        );
                      case "EJRB8A":
                        return (
                          <EJRB8AComponent
                            key={index}
                            label={"Early Japa rounds before 8 AM "}
                          />
                        );
                      case "AJRA8A":
                        return (
                          <AJRA8AComponent
                            key={index}
                            label={"Early Japa rounds after 8 AM "}
                          />
                        );
                      // Add cases for other function names as needed
                      case "F8RCT":
                        return (
                          <F8RCTComponent
                            key={index}
                            label={"First 8 rounds completed time "}
                          />
                        );
                      case "N8RCT":
                        return (
                          <N8RCTComponent
                            key={index}
                            label={"Next 8 rounds completed time "}
                          />
                        );
                      case "WUT":
                        return (
                          <WUTComponent key={index} label={"Wake up time "} />
                        );
                      case "ST":
                        return (
                          <STComponent key={index} label={"Sleep time "} />
                        );
                      case "PBR":
                        return (
                          <PBRComponent
                            key={index}
                            label={"Prabhupada Book Reading "}
                          />
                        );
                      case "BNR":
                        return (
                          <BNRComponent
                            key={index}
                            label={"Book Name Reading"}
                          />
                        );
                      case "PCH":
                        return (
                          <PCHComponent
                            key={index}
                            label={"Prabhupada Class Hearing "}
                          />
                        );
                      case "GCH":
                        return (
                          <GCHComponent
                            key={index}
                            label={"Guru Class Hearing "}
                          />
                        );
                      case "CH":
                        return (
                          <CHComponent key={index} label={"Class Hearing "} />
                        );
                      case "S":
                        return <SComponent key={index} label={"Speaker "} />;
                      case "AA":
                        return (
                          <AAComponent key={index} label={"Attended Arthi"} />
                        );
                      case "MIU":
                        return (
                          <MIUComponent
                            key={index}
                            label={"Mobile/Internet-Usage"}
                          />
                        );
                      // Add more cases as needed
                      default:
                        return null;
                    }
                  })}
                </div>
                {checkedItems?.length > 0 ? (
                  <div className="flex justify-center w-full ">
                    <button
                      className="my-5 py-1.5 px-4 text-center rounded-lg bg-blue-500 border border-blue-800 text-white w-[200px]"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div className="text-center font-semibold my-10 text-gray-400">
                    No Configured Fields
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default FormModalComp;

// const namesOfFields = [
//   { NOR: "Number of Rounds " },
//   { EJRB8A: "Early Japa rounds before 8 AM " },
//   { AJRA8A: "Early Japa rounds after 8 AM " },
//   { F8RCT: "First 8 rounds completed time " },
//   { N8RCT: "Next 8 rounds completed time " },
//   { WUT: "Wake up time " },
//   { ST: "Sleep time " },
//   { PBR: "Prabhupada Book Reading " },
//   { BNR: "Book Name Reading" },
//   { PCH: "Prabhupada Class Hearing " },
//   { GCH: "Guru Class Hearing " },
//   { CH: "Class Hearing " },
//   { S: "Speaker " },
//   { AA: "Attended Arthi" },
//   { MIU: "Mobile/Internet-Usage" },
// ];
