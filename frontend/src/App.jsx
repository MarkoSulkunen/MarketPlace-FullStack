import { useState, useCallback, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Products from "./products/pages/products";
import MyProducts from "./products/pages/MyProducts";
import AddProduct from "./products/pages/AddProduct";
import LogIn from "./users/pages/LogIn";
import SignUp from "./users/pages/SignUp";
import MainNavigation from "./shared/components/navigation/MainNavigation";

import { AuthContext } from "./shared/context/auth-context";

import "./App.css";

const queryClient = new QueryClient();

let logoutTimer;

function App() {
  const [token, setToken] = useState(null);
  const [userId, setuser] = useState(null);
  const [email, setEmail] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: login
 DESCRIPTION: 
     Function for loggin in and setting user data to local storage
*********************************************************************/
  const login = useCallback((uid, token, email, expirationDate) => {
    setToken(token);
    setuser(uid);
    setEmail(email);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        email,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: logout
 DESCRIPTION: 
    Function for logging out and removing user data from local storage
*********************************************************************/
  const logout = useCallback(() => {
    setToken(null);
    setuser(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  /* useEffect to check if user fata exists in local storage and if the token is still valid */
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    console.log("stored data: ", storedData);
    /* if there is user data in local storage and the token is valid, log in the user */
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  /* useEffect to automatically log user out when token expires */
  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Products />
        </Route>
        <Route path="/myproducts" exact>
          <MyProducts />
        </Route>
        <Route path="/products/new" exact>
          <AddProduct />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Products />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
        name: name,
        email: email,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <MainNavigation />
          <main>{routes}</main>
        </Router>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}
export default App;
