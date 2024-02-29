import React, { useEffect, useRef, useState } from "react";
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

function Sadhana() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [formData, setFormData] = useState(new FormData());

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

    console.log(checkedItems);
    setCheckedItems(checkedItems);
  }, []);

  const handleChange = (e) => {
    // Update the form data whenever the input value changes
    formData.set(e.target.name, e.target.value);
  };

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
          <div className="py-5">
            <h1 className="text-center font-bold text-xl">Sadhana Form</h1>
            <p className="text-center px-5 text-gray-400">
              This form is to track you daily progress in the path of
              <i className="text-red-400 ml-2">Krsna consiousness</i>
            </p>
          </div>

          <div className="pb-5">
            <div className="flex flex-col">
              <label className="font-semibold">PHONE NUMBER</label>
              <input
                type="text"
                placeholder="7878989023"
                className="border px-4 py-1.5 rounded-lg"
              />
            </div>
            <button className="px-4 py-1.5 justify-between w-full font-semibold text-white bg-blue-500 border border-blue-800 rounded-lg mt-5">
              Submit
            </button>
          </div>
          <form onSubmit={handleSubmit}>
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
            <button
              className="my-5 py-1.5 px-4 text-center rounded-lg bg-blue-500 border border-blue-800 w-full text-white"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sadhana;
