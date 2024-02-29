import React, { useEffect, useState } from "react";
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
} from "../../components/ModalForm/ConfigModalForm";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_ENDPOINT } from "../../admin/config/Server";

function Sadhana() {
  const { programId } = useParams();
  const [checkedItems, setCheckedItems] = useState([]);
  const [formData, setFormData] = useState(new FormData());
  const [Participant, setParticipant] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [programDetails, setProgramDetails] = useState({});

  const storeToLocalStorage = (item) => {
    localStorage.setItem("phoneNumber", item);
  };

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    if (phoneNumber) {
      setPhoneNumber(phoneNumber);
    }
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.search; // Get the search parameters part of the URL
    const params = new URLSearchParams(url);

    const checkedItems = [];

    // Iterate over each search parameter
    params.forEach((value, key) => {
      // Assuming your parameter name is always 'functionNames'
      if (key === "functionNames") {
        // Split the values by comma if multiple values are present
        const values = value.split(",");
        // Push each value into the checkedItem state array
        values.forEach((item) => {
          checkedItems.push({ functionName: item });
        });
      }
    });
    setCheckedItems(checkedItems);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${SERVER_ENDPOINT}/program/id/${programId}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setProgramDetails(responseData);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [programId]);

  const handleChange = (e) => {
    // Update the form data whenever the input value changes
    formData.set(e.target.name, e.target.value);
  };
  //to get the participant based on the mobile number
  async function handleSubmitUser(e) {
    setIsLoading(true);
    e.preventDefault();
    if (phoneNumber === "") {
      toast.error("Enter your phone Number");
      return;
    }
    try {
      const response = await fetch(
        `${SERVER_ENDPOINT}/participant/phone/${phoneNumber}`
      );

      if (response.ok) {
        const responseData = await response.json();
        setParticipant(responseData);
      } else if (response.status === 404) {
        console.log(
          "participant with the phone number does not exists  please register"
        );
        navigate("/registeration");
        storeToLocalStorage(phoneNumber);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(...formData);
    toast.success("successfully submitted");
  };

  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col items-center gap-5 w-full py-5 px-2">
        <div className="px-5 border rounded-xl bg-white shadow-lg ">
          <h1 className="text-center font-bold text-xl py-5">Sadhana Form</h1>
          <form onSubmit={handleSubmitUser}>
            <div className="flex md:flex-row flex-col gap-2 md:items-end items-center justify-center">
              <div className="flex flex-col gap-2 mx-5">
                <label className="font-semibold text-gray-600">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="px-4 py-1.5 border rounded outline-none "
                  placeholder="8888959287"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="flex items-end gap-5 ml-2">
                <button
                  className="px-4 py-1.5 text-white text-lg  bg-blue-700 rounded md:w-[150px] w-[100px]"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Search"}
                </button>
              </div>
            </div>
            {phoneNumber.length !== 10 ? (
              <p className="text-red-600">Please enter 10 digit number</p>
            ) : null}
          </form>

          {Object.keys(Participant).length > 0 && (
            <p className="text-center px-5 pt-5 text-red-500 font-semibold">
              Welcome,{`${Participant?.firstName} ${Participant?.lastName}`}
            </p>
          )}
          <p className="text-center px-5 pt-5 font-semibold">
            {programDetails.name}
          </p>
          <p className="text-center px-5 text-gray-400 py-5">
            This form is to track you daily progress in the path of
            <i className="text-red-400 ml-2">Krsna consiousness</i>
          </p>

          <form
            onSubmit={handleSubmit}
            className={`${
              Object.keys(Participant).length > 0 ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col gap-5">
              {checkedItems.map((item, index) => {
                switch (item.functionName) {
                  case "NOR":
                    return (
                      <NORComponent
                        key={index}
                        onChange={handleChange}
                        label={"Number of Rounds "}
                      />
                    );
                  case "EJRB8A":
                    return (
                      <EJRB8AComponent
                        key={index}
                        onChange={handleChange}
                        label={"Early Japa rounds before 8 AM "}
                      />
                    );
                  case "AJRA8A":
                    return (
                      <AJRA8AComponent
                        key={index}
                        onChange={handleChange}
                        label={"Early Japa rounds after 8 AM "}
                      />
                    );
                  // Add cases for other function names as needed
                  case "F8RCT":
                    return (
                      <F8RCTComponent
                        key={index}
                        onChange={handleChange}
                        label={"First 8 rounds completed time "}
                      />
                    );
                  case "N8RCT":
                    return (
                      <N8RCTComponent
                        key={index}
                        onChange={handleChange}
                        label={"Next 8 rounds completed time "}
                      />
                    );
                  case "WUT":
                    return (
                      <WUTComponent
                        key={index}
                        onChange={handleChange}
                        label={"Wake up time "}
                      />
                    );
                  case "ST":
                    return (
                      <STComponent
                        key={index}
                        onChange={handleChange}
                        label={"Sleep time "}
                      />
                    );
                  case "PBR":
                    return (
                      <PBRComponent
                        key={index}
                        onChange={handleChange}
                        label={"Prabhupada Book Reading "}
                      />
                    );
                  case "BNR":
                    return (
                      <BNRComponent
                        key={index}
                        onChange={handleChange}
                        label={"Book Name Reading"}
                      />
                    );
                  case "PCH":
                    return (
                      <PCHComponent
                        key={index}
                        onChange={handleChange}
                        label={"Prabhupada Class Hearing "}
                      />
                    );
                  case "GCH":
                    return (
                      <GCHComponent
                        key={index}
                        onChange={handleChange}
                        label={"Guru Class Hearing "}
                      />
                    );
                  case "CH":
                    return (
                      <CHComponent
                        key={index}
                        onChange={handleChange}
                        label={"Class Hearing "}
                      />
                    );
                  case "S":
                    return (
                      <SComponent
                        key={index}
                        onChange={handleChange}
                        label={"Speaker "}
                      />
                    );
                  case "AA":
                    return (
                      <AAComponent
                        key={index}
                        onChange={handleChange}
                        label={"Attended Arthi"}
                      />
                    );
                  case "MIU":
                    return (
                      <MIUComponent
                        key={index}
                        onChange={handleChange}
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
              <div className={`w-full flex items-center justify-center`}>
                <button
                  className="my-5 py-1.5 px-4 text-center rounded-lg bg-blue-500 border border-blue-800 w-[200px] text-white"
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sadhana;
