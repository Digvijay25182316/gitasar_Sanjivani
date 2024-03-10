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
import CopyClipBoard from "../../components/BottomNav.jsx/CopyClipBoard";

function formatDate(date) {
  // Extract day, month, and year components
  const day = date.getDate().toString().padStart(2, "0"); // Ensure two-digit day
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const year = date.getFullYear().toString().slice(2); // Get last two digits of the year

  // Format the date as DD-MM-YY
  return `${day}-${month}-${year}`;
}

function Sadhana() {
  const { programId } = useParams();
  const [checkedItems, setCheckedItems] = useState([]);
  const [Participant, setParticipant] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [programDetails, setProgramDetails] = useState({});
  const [checkedItemsObjDB, setCheckedItemsObjDB] = useState({});
  const [SubmittedSuccess, setSubmittedSuccess] = useState(false);
  const [SadhanaSuccessData, setSadhanaSuccessData] = useState("");

  const [formData, setFormData] = useState({
    programId: Number(programId),
    programName: programDetails.name,
    participantId: Participant.id ? Number(Participant.id) : 0,
  });
  /////////////////to set all the fields in the initlastate of formdata
  useEffect(() => {
    const date = formatDate(new Date());
    setFormData((prevData) => ({
      ...prevData,
      programName: programDetails?.name,
      participantId: Participant?.id ? Number(Participant.id) : 0,
      sadhanaDate: date,
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
  const handleShare = (text) => {
    // Encode the message for URL
    let message = `*!!Sadhana Submitted* \n Name: ${Participant.firstName}${Participant.lastName}\n`;
    for (const key in formData) {
      if (
        Object.hasOwnProperty.call(formData, key) &&
        key !== "programId" &&
        key !== "participantId"
      ) {
        message += `*${key}*: ${formData[key]}\n`; // Wrapping keys in asterisks for bold formatting
      }
    }
    setSadhanaSuccessData(message);
  };

  const handleSubmit = async (e) => {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    e.preventDefault();

    try {
      const response = await fetch(
        `${SERVER_ENDPOINT}/participant-sadhana/record`,
        { method: "POST", headers: header, body: JSON.stringify(formData) }
      );
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData?.message);
        handleShare(formData);
        setSubmittedSuccess(true);
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
      <SubmittedSuccessComp
        isOpen={SubmittedSuccess}
        onClose={() => setSubmittedSuccess(false)}
      >
        <div className="flex flex-col items-center">
          <p className="text-red-600 font-bold text-xl">Preview Message</p>
          <div className="p-5 flex flex-col gap-2">
            <p className="font-bold">Sadhana Submitted</p>
            <p className="font-semibold w-full">{`Name : ${Participant.firstName}${Participant.lastName}`}</p>
            <div>
              {Object.keys(formData).map((key) => (
                <p key={key} className="mb-2">
                  <span className="font-bold">{key}:</span> {formData[key]}
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-5 py-5">
            {" "}
            <button
              onClick={() => {
                const encodedMessage = encodeURIComponent(SadhanaSuccessData);
                // Construct the shareable link
                const shareableLink = `whatsapp://send?text=${encodedMessage}`;
                // Open the shareable link in a new window
                window.open(shareableLink);
              }}
              className="flex items-center border border-green-400 bg-green-200 px-2 rounded-xl "
            >
              Whatsapp
              <i>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="40"
                  height="40"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#fff"
                    d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
                  ></path>
                  <path
                    fill="#cfd8dc"
                    d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
                  ></path>
                  <path
                    fill="#40c351"
                    d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
                  ></path>
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </i>
            </button>
            <CopyClipBoard url={SadhanaSuccessData} />
            {/*this is not being used to store the url this is to store the text to share to whatsapp */}
          </div>
        </div>
      </SubmittedSuccessComp>
    </div>
  );
}

export default Sadhana;

const SubmittedSuccessComp = ({ isOpen, onClose, children }) => {
  if (isOpen) {
    return (
      <>
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-[1000] backdrop-brightness-50 cursor-pointer flex items-center justify-center"
          onClick={onClose}
        ></div>
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-white rounded-2xl">
          {children}
        </div>
      </>
    );
  } else {
    return null;
  }
};
