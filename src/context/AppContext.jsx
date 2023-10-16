import { createContext, useContext, useEffect, useState } from "react";

import { currentUser, singOut } from "../services/AuthService";
import Alert from "../components/Alert";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        let res = await currentUser();

        if (res.status === "error") {
          setIsLoggedIn(false);
          singOut();
          return;
        }

        setUser({ ...res.data });
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        links,
        setLinks,
        isLoggedIn,
        setIsLoggedIn,
        alert,
        setAlert
      }}
    >
      {children}

      <Alert/>
    </AppContext.Provider>
  );
};

export default AppContext;
