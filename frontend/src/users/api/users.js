/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: signUpUser
 DESCRIPTION:
     Sends a POST request to the server to sign up a new user with
     given name, email and password.

 Input: name, email, password
 Output: JSON response from the server
*********************************************************************/
export const signUpUser = async ({ name, email, password }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  return await res.json();
};

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: loginUser
 DESCRIPTION:
     Sends a POST request to the server to log in an existing user 
     with given email and password.

 Input: email, password
 Output: JSON response from the server
*********************************************************************/
export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return await res.json();
};

/*********************************************************************
  F U N C T I O N    D E S C R I P T I O N
---------------------------------------------------------------------
 NAME: getUserById
 DESCRIPTION:
     Sends a GET request to the server to retrieve user with
     specified user íd.

 Input: name, email, password
 Output: JSON response from the server
*********************************************************************/
export const getUserById = async (userId) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/${userId}`);
  return await res.json();
};
