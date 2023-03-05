import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [emailErrorRegister, setEmailErrorRegister] = useState("");
  const [passwordErrorRegister, setPasswordErrorRegister] = useState("");
  return (
    <AuthContext.Provider
      value={{
        passwordErrorRegister,
        setPasswordErrorRegister,
        emailErrorRegister,
        setEmailErrorRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
