import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // FORM VALIDATION
  const registeredUsers =
    JSON.parse(localStorage.getItem("registeredUsers")) || [];
  const [nameError, setNameError] = useState("");

  const {
    passwordErrorRegister,
    setPasswordErrorRegister,
    emailErrorRegister,
    setEmailErrorRegister,
  } = useContext(AuthContext);

  const validateForm = () => {
    let isValid = true;
    if (name.length < 3) {
      setNameError("Name must have at least 3 characters");
      isValid = false;
    } else {
      setNameError("");
    }

    const registeredUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const isEmailRegistered = registeredUsers.some(
      (user) => user.email === email
    );
    if (isEmailRegistered) {
      setEmailErrorRegister("The email address is already registered.");
      isValid = false;
    } else {
      setEmailErrorRegister("");
    }

    if (password.length < 9) {
      setPasswordErrorRegister("The password must have at least 9 characters.");
      isValid = false;
    } else {
      setPasswordErrorRegister("");
    }

    return isValid;
  };

  // --
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = () => {
    if (!validateForm()) {
      return;
    }

    const user = { name, password, email };
    const actualUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const newUsers = [...actualUsers, user];
    localStorage.setItem("registeredUsers", JSON.stringify(newUsers));
    alert("User registered successfully.");
    setName("");
    setEmail("");
    setPassword("");
  };
  const currentUser = localStorage.getItem("currentUser");
  return (
    <div
      data-testid="register"
      className="register-container flex flex-col justify-center items-center"
    >
      {registeredUsers.length >= 1 && (
        <div style={{ margin: "40px" }}>
          <Link
            to="/login"
            className="text-2sm font-bold text-white bg-gradient-to-r from-green-800 to-green-500 p-4 rounded-md shadow-lg m-2 md:m-5 hover:opacity-80"
          >
            Go to Login page
          </Link>
        </div>
      )}

      <div
        className="bg-purple-600 rounded-lg shadow-md p-8"
        style={{ maxWidth: "50%" }}
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white font-bold mb-2">
              Name:
            </label>
            <input
              className="appearance-none bg-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              required
            />
            {nameError && (
              <p className="text-red-500 text-xs italic">{nameError}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white font-bold mb-2">
              Email:
            </label>
            <input
              className="appearance-none bg-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailErrorRegister && (
              <p className="text-red-500 text-xs italic">
                {emailErrorRegister}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-white font-bold mb-2"
            >
              Password:
            </label>
            <input
              className="appearance-none bg-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordErrorRegister && (
              <p className="text-red-500 text-xs italic">
                {passwordErrorRegister}
              </p>
            )}
          </div>
          <button
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
