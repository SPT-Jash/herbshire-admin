import { createContext, useEffect, useState } from "react";

export const Context = createContext("");

export const ContextProvider = (props) => {
  const [selectedNavItem, setSelectedNavItem] = useState();
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewAddress, setviewAddress] = useState(false);
  const [viewOrder, setviewOrder] = useState(false);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    console.log("Auth: " + authData);
    if (authData) {
      setAuth(authData);
      setIsLoading(false);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        selectedNavItem,
        setSelectedNavItem,
        auth,
        setAuth,
        isLoading,
        setIsLoading,
        viewAddress,
        setviewAddress,
        viewOrder,
        setviewOrder
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
