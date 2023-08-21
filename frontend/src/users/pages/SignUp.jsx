import { useRef, useContext } from "react";
import { useMutation } from "react-query";

import Button from "../../shared/components/button/Button";
import Card from "../../shared/components/card/Card";
import Input from "../../shared/components/input/Input";
import { AuthContext } from "../../shared/context/auth-context";

import { signUpUser } from "../api/users";

import "./Authenticate.css";

const SignUp = (props) => {
  const auth = useContext(AuthContext);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  /* sign up mutation */
  const signUpUserMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      console.log(data);
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
     signUpUserMutation.mutate function to perform sign up mutation.
     Called when sign up form is submitted.
*********************************************************************/
  const onSubmitHandler = (event) => {
    event.preventDefault();

    signUpUserMutation.mutate({
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <Card className="authentication">
      <h2>{"SignUp"}</h2>
      <form onSubmit={onSubmitHandler}>
        <Input ref={nameRef} type="text" label="Name" id="signup-name" />
        <Input ref={emailRef} type="email" label="Email" />
        <Input ref={passwordRef} type="password" label="Password" />
        <Button type="submit">{"SIGNUP"}</Button>
      </form>
    </Card>
  );
};

export default SignUp;
