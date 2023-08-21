import { createContext, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  name: "",
  email: "",
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: loginHandler
 DESCRIPTION: Handles login events
*********************************************************************/
  const loginHandler = (id, token, name, email) => {
    setToken(token);
    setUserId(id);
    setName(name);
    setEmail(email);
  };

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: logoutHandler
 DESCRIPTION: Handles logout events
*********************************************************************/
  const logoutHandler = () => {
    setToken(null);
    setUserId(null);
  };

  const contextValue = {
    isLoggedIn: !!token, // Checks if token exists to determine if user is authenticated
    token: token,
    userId: userId,
    login: loginHandler,
    logout: logoutHandler,
    name: name,
    email: email,
  };

  /* Return the AuthContext provider with the context value and child components as children */
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
