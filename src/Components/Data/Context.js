import { createContext, useEffect, useState } from "react";

export const Context = createContext("");

export const ContextProvider = (props) => {
  const [selectedNavItem, setSelectedNavItem] = useState();
  const [auth, setAuth] = useState();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    console.log("Auth: " + authData);
    if (authData) {
      setAuth(authData);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        selectedNavItem,
        setSelectedNavItem,
        auth,
        setAuth,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
