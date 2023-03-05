import React, { useState } from "react";

import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // FORM VALIDATION

  const [emailErrorLogin, setEmailErrorLogin] = useState("");
  const [passwordErrorLogin, setPasswordErrorLogin] = useState("");
  const handleLogin = () => {
    const actualUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    console.log("actualUsers:", actualUsers);

    const user = actualUsers.find((user) => user.email === email);
    if (!user) {
      setEmailErrorLogin(true);
    } else {
      setEmailErrorLogin(false);
    }

    if (password.length < 8) {
      setPasswordErrorLogin(true);
    } else {
      setPasswordErrorLogin(false);
    }

    if (user && password.length >= 8 && user.password === password) {
      localStorage.setItem("currentUser", email);
      window.location.reload();
    }
  };
  const currentUser = localStorage.getItem("currentUser");
  return (
    <div
      data-testid="login"
      className="login-container flex flex-col justify-center items-center"
    >
      {currentUser && (
        <div
          className="bg-gradient-to-b from-green-600 to-green-500 rounded-lg p-5 w-full w-1/2 mt-5"
          style={{
            width: "auto",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            marginTop: "30px",
          }}
        >
          <h1
            style={{ fontSize: "35px" }}
            className="text-3xl font-bold text-white text-center mb-5"
          >
            Now that you are logged in, Go and check all the different cards:
          </h1>
          <div
            className="flex flex-col md:flex-row justify-center items-center"
            style={{
              marginTop: "50px",
            }}
          >
            <Link
              to="/characters"
              className="text-2sm font-bold text-white bg-gradient-to-r from-green-800 to-green-500 p-4 rounded-md shadow-lg m-2 md:m-5 hover:opacity-80"
            >
              Character cards
            </Link>
            <Link
              style={{ marginTop: "30px" }}
              to="/locations"
              className="text-2sm font-bold text-white bg-gradient-to-r from-green-800 to-green-500 p-4 rounded-md  shadow-lg m-2 md:m-5  hover:opacity-80"
            >
              Locations cards
            </Link>
            <Link
              to="/episodes"
              className="text-2sm font-bold text-white bg-gradient-to-r from-green-800 to-green-500 p-4 rounded-md shadow-lg m-2 md:m-5 hover:opacity-80"
            >
              Episodes cards
            </Link>
          </div>
        </div>
      )}

      {!currentUser && (
        <div className="bg-gradient-to-b from-green-600 to-green-500 rounded-lg p-5 w-full md:w-1/2 mt-12">
          <h2 className="text-3xl font-bold text-white text-center mb-5">
            Log in
          </h2>

          {(passwordErrorLogin || emailErrorLogin) && (
            <p className="text-red-500 text-center mb-5">Invalid credentials</p>
          )}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label htmlFor="email" className="text-xl text-white  block">
                Email:
              </label>
              <input
                className="bg-white rounded-lg px-4 py-2 w-full"
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-xl text-white mb-3 block"
              >
                Password:
              </label>
              <input
                className="bg-white rounded-lg px-4 py-2 w-full"
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <button
              className="bg-red-500 hover:bg-red-600 text-white mt-3 px-4 py-2 rounded-lg"
              onClick={handleLogin}
            >
              Log in
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
