import { useRef, useContext } from "react";
import { useMutation } from "react-query";

import Button from "../../shared/components/button/Button";
import Card from "../../shared/components/card/Card";
import Input from "../../shared/components/input/Input";
import { AuthContext } from "../../shared/context/auth-context";

import { loginUser } from "../api/users";

import "./Authenticate.css";

const LogIn = (props) => {
  const auth = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  /* Log in mutation */
  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("login data: ", data);
      auth.login(data.id, data.token);
    },
    onError: (error) => {
      console.log(error);
    },
  });

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: onSubmitHandler
 DESCRIPTION: 
     Prevents default form submission behavior and calls the
     loginUserMutation.mutate function to perform login mutation.
     Called when login form is submitted.
*********************************************************************/
  const onSubmitHandler = (event) => {
    event.preventDefault();
    loginUserMutation.mutate({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <Card className="authentication">
      <h2>{"Login"}</h2>
      <form onSubmit={onSubmitHandler}>
        <Input ref={emailRef} type="email" label="Email" />
        <Input ref={passwordRef} type="password" label="Password" />
        <Button type="submit">{"LOGIN"}</Button>
      </form>
    </Card>
  );
};

export default LogIn;
