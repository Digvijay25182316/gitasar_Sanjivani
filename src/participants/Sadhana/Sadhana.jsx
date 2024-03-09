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
  FormListItems,
} from "../../components/ModalForm/ConfigModalForm";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_ENDPOINT } from "../../admin/config/Server";

function Sadhana() {
  const { programId } = useParams();
  const [checkedItems, setCheckedItems] = useState([]);
  const [Participant, setParticipant] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [programDetails, setProgramDetails] = useState({});
  const [checkedItemsObjDB, setCheckedItemsObjDB] = useState({});

  const [formData, setFormData] = useState({
    programId: Number(programId),
    programName: programDetails.name,
    participantId: Participant.id ? Number(Participant.id) : 0,
  });
  /////////////////to set all the fields in the initlastate of formdata
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      programName: programDetails?.name,
      participantId: Participant?.id ? Number(Participant.id) : 0,
      sadhanaDate: "05-03-24",
    }));
  }, [programDetails, Participant]);

  const storeToLocalStorage = (item) => {
    localStorage.setItem("phoneNumber", item);
  };
  /////////////////to prepopulate the phonenumber of previously input form
  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    if (phoneNumber) {
      setPhoneNumber(phoneNumber);
    }
  }, []);
  const navigate = useNavigate();
  ///////////to fetch the programData if programId exists
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

  ////////////////to see what are the fields included in the sadhana form
  useEffect(() => {
    if (programDetails.sadhanaForm > 0) {
      (async () => {
        try {
          const response = await fetch(
            `${SERVER_ENDPOINT}/sadhana-form/id/${programDetails.sadhanaForm}`
          );
          if (response.ok) {
            const responseData = await response.json();
            setCheckedItemsObjDB(responseData);
          } else {
            const errorData = await response.json();
            console.log(errorData);
          }
        } catch (error) {
          toast.error(error.message);
        }
      })();
    }
  }, [programDetails.sadhanaForm]);

  ////////////to set the checked items based on the the form structure got from the database
  useEffect(() => {
    const filteredArrForChecked = FormListItems.filter(
      (item) => checkedItemsObjDB[item.databaseField] === true
    );
    setCheckedItems(filteredArrForChecked);
  }, [checkedItemsObjDB]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleSubmit = async (e) => {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(
        `${SERVER_ENDPOINT}/participant-sadhana/record`,
        { method: "POST", headers: header, body: JSON.stringify(formData) }
      );
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData?.message);
      } else {
        const responseError = await response.json();
        toast.error(responseError?.message || responseError.title);
      }
    } catch (error) {
      toast.error(error.message || error);
    }
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
                  {isLoading ? "Loading..." : <i>Search</i>}
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
            {programDetails?.sadhanaForm > 0 ? (
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
