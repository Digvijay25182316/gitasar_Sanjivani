// GlobalStoreContext.js
import React, { createContext, useContext, useReducer } from "react";

// Step 1: Define initial state
const initialState = {
  programName: "Your Program Name",
  // Add more properties here as needed
};

// Step 2: Create reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PROGRAM_NAME":
      return {
        ...state,
        programName: action.payload,
      };
    // Add more cases to handle other state properties as needed
    default:
      return state;
  }
};

// Step 3: Create context
const GlobalStoreContext = createContext();

// Step 4: Context provider
export const GlobalStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

// Step 5: Custom hook to access context
export const useGlobalStore = () => useContext(GlobalStoreContext);
