import React, { useState } from "react";
import axiosWithAuth from "../Protected/axiosWithAuth";
import LoadingSpinner from "./LoadingSpinner";
import { useHistory } from "react-router-dom";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const formState = {
    username: "",
    password: "",
  };

  const [state, setState] = useState(formState);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axiosWithAuth()
      .post("/api/login", state)
      .then((res) => {
        console.log("This is the response for login:", res);
        localStorage.setItem("token", res.data.payload);
        history.push("/bubble");
      })
      .catch((err) => {
        console.log("This is the Error for login:", err.message);
      });

    setState({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <h1>Welcome To The BubBle App!</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={state.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={state.password}
          onChange={handleChange}
        />
        <button>Log in</button>
        {isLoading ? <LoadingSpinner /> : null}
      </form>
    </>
  );
};

export default Login;
