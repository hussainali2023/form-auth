import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import app from "./firebase.init";

const Register = () => {
  const auth = getAuth(app);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDisable, setIsDisable] = useState(true);

  const handleName = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  const handleEmail = (e) => {
    const test = /\S+@\S+\.\S+/.test(e.target.value);
    if (!test) {
      setError("Please give a valid email");
      return;
    }
    setEmail(e.target.value);
    setError("");
  };

  const handlePassword = (e) => {
    if (!/(?=.{8,})/.test(e.target.value)) {
      setError("Password must be 8 characters");
      return;
    }
    if (!/(?=.*[a-zA-Z])/.test(e.target.value)) {
      setError("Password should have Upper Case");
      return;
    }
    if (!/(?=.*[!#@$%&? "])/.test(e.target.value)) {
      setError("Password should have special character");
      return;
    }
    setPassword(e.target.value);
    setError("");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if ((name, email, password)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateName();
          verify();
          console.log(user);
          setError("");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage, errorCode);
          // ..
        });
    } else {
      setError("Please fill out all the input");
      return;
    }
  };

  const updateName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  };

  const verify = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
    });
  };

  return (
    <div className="">
      <div className=" mx-auto mt-5 w-full max-w-xs">
        <p className="text-center text-red-400">{error}</p>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              onBlur={handleName}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Enter Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              onBlur={handleEmail}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your E-mail address"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onBlur={handlePassword}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Enter Password"
              required
            />
          </div>
          <div className="mb-2 ">
            <input
              onClick={() => {
                setIsDisable(!isDisable);
              }}
              type="checkbox"
              name="condition"
              id=""
            />
            <span className="ml-1 text-sm text-blue-600 font-medium cursor-pointer">
              Accept term & condition
            </span>
          </div>
          <div className="">
            <button
              onClick={handleSignUp}
              disabled={isDisable}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign Up
            </button>
            <br />
            <br />

            <p className="text-sm">
              Already Sign Up ? Please{" "}
              <a
                className=" font-bold text-blue-500 hover:text-blue-800"
                href="/"
              >
                {" "}
                Login
              </a>
            </p>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 Register. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
