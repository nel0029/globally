/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyUserName,
  registerUser,
} from "../../redux/asynActions/userAsyncActions";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import useDebounce from "./Hooks/useDebounce";
import { IonIcon } from "@ionic/react";
import { eyeOutline, eyeOffOutline } from "ionicons/icons";
import {
  resetAuthMessage,
  resetRegisterMessage,
  resetValid,
} from "../../redux/usersSlice";
import CircleLoader from "../../common/CircleLoader";

function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const message = useSelector((state: any) => state.user.authMessage);
  const valid = useSelector((state: any) => state.user.valid);
  const registerMessage = useSelector(
    (state: any) => state.user.registerMessage
  );
  const [showPassWord, setShowPassword] = useState(false);
  const [isServerLoading, setIsServerLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
    userFirstName: "",
    userMiddleName: "",
    userLastName: "",
  });

  const userName = useDebounce(formData.userName, 1000);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (inputText: string) => {
    const mailformat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (inputText && inputText.toString().match(mailformat)) {
      setEmailError("");
      return true;
    } else {
      setEmailError("Please enter a valid email address");
      return false;
    }
  };

  useEffect(() => {
    if (userName.length > 6) {
      dispatch(verifyUserName(userName));
    }
  }, [userName, dispatch]);

  const goToLogIn = () => {
    dispatch(resetRegisterMessage());
    dispatch(resetValid());
    navigate("/login");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (formData) {
      if (!formData.userFirstName) {
        event.preventDefault();
        setFormError("Please fill out this field");
      }

      if (!formData.userLastName) {
        event.preventDefault();
        setFormError("Please fill out this field");
      }
      if (!formData.email) {
        event.preventDefault();
        setFormError("Please fill out this field");
      }

      if (!formData.userName) {
        event.preventDefault();
        setFormError("Please fill out this field");
      }

      if (!formData.password) {
        event.preventDefault();
        setFormError("Please fill out this field");
      }

      event.preventDefault();
      const isEmailValid = validateEmail(formData.email);

      if (isEmailValid === true) {
        setIsServerLoading(true);

        dispatch(registerUser(formData)).then((response: any) => {
          // Redirect to login page
          if (response.meta.requestStatus === "fulfilled") {
            setIsServerLoading(false);
            dispatch(resetRegisterMessage());
            dispatch(resetAuthMessage());
            goToLogIn();
          }
        });
      } else {
        event.preventDefault();
        setEmailError("Please enter a valid email address");
      }
    } else {
      event.preventDefault();
      setFormError("Please fill out this field");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassWord);
  };

  useEffect(() => {
    return () => {
      dispatch(resetValid());
      dispatch(resetAuthMessage());
    };
  }, []);
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-y-2">
      <div className="w-full max-w-[500px] flex flex-col items-center justify-center border rounded-lg">
        <div className="text-lg font-bold text-secondary py-3">
          Create an account
        </div>
        <div className="flex w-full">
          <form
            className="flex flex-col flex-1 p-2 gap-y-2"
            onSubmit={handleSubmit}
          >
            {registerMessage && <div>{registerMessage}</div>}
            <div
              className={`${
                formError && !formData.userFirstName
                  ? "border border-primary"
                  : "border"
              } flex flex-col rounded-lg py-1 px-2 gap-y-0.5`}
            >
              <div className="text-gray-400 text-sm  flex flex-row items-center gap-x-1">
                <span>First Name</span>
                <span className="text-primary">
                  {formError && !formData.userFirstName
                    ? ` * ${formError}`
                    : ""}
                </span>
              </div>
              <input
                className="bg-transparent text-base outline-none"
                type="text"
                name="userFirstName"
                value={formData.userFirstName}
                onChange={onChange}
              />
            </div>
            <div
              className={`flex flex-col rounded-lg py-1 px-2 gap-y-0.5 border`}
            >
              <div className="text-gray-400 text-sm  flex flex-row items-center gap-x-1">
                Middle Name <span>{"(Optional)"}</span>
              </div>
              <input
                className="bg-transparent text-base outline-none"
                type="text"
                name="userMiddleName"
                value={formData.userMiddleName}
                onChange={onChange}
              />
            </div>
            <div
              className={`${
                formError && !formData.userLastName
                  ? "border border-primary"
                  : "border"
              } flex flex-col rounded-lg py-1 px-2 gap-y-0.5`}
            >
              <div className="text-gray-400 text-sm  flex flex-row items-center gap-x-1">
                <span>Last Name</span>
                <span className="text-primary">
                  {formError && !formData.userLastName ? ` * ${formError}` : ""}
                </span>
              </div>
              <input
                className="bg-transparent text-base outline-none"
                type="text"
                name="userLastName"
                value={formData.userLastName}
                onChange={onChange}
              />
            </div>
            <div
              className={`${
                emailError || (formError && !formData.email)
                  ? "border border-primary"
                  : "border"
              } flex flex-col rounded-lg py-1 px-2 gap-y-0.5`}
            >
              <div className="text-gray-400 text-sm  flex flex-row items-center gap-x-1">
                <span>Email</span>
                <span className="text-primary">
                  {formData && formData.email && emailError
                    ? `${emailError}`
                    : formError && !formData.email
                    ? ` * ${formError}`
                    : ""}
                </span>
              </div>
              <input
                className="bg-transparent text-base outline-none"
                type="text"
                name="email"
                value={formData.email}
                onChange={onChange}
              />
            </div>
            <div
              className={`${
                formError && !formData.userName
                  ? "border border-primary"
                  : "border"
              } flex flex-col rounded-lg py-1 px-2 gap-y-0.5 border`}
            >
              <div className="text-gray-400 text-sm  flex flex-row items-center gap-x-1">
                <span>User Name</span>
                <span className="text-primary">
                  {formError && !formData.userName ? ` * ${formError}` : ""}
                </span>
              </div>
              <input
                className="bg-transparent text-base outline-none"
                type="text"
                name="userName"
                value={formData.userName}
                onChange={onChange}
              />
              {userName ? (
                <div
                  className={`text-sm ${
                    !valid ? "text-primary" : "text-secondary1"
                  }`}
                >
                  {message ? message : null}
                </div>
              ) : null}
            </div>

            <div
              className={`${
                formError && !formData.password
                  ? "border border-primary"
                  : "border"
              } flex flex-col rounded-lg py-1 px-2 gap-y-0.5`}
            >
              <div className="text-gray-400 text-sm  flex flex-row items-center gap-x-1">
                <span>Password</span>
                <span className="text-primary">
                  {formError && !formData.password ? ` * ${formError}` : ""}
                </span>
              </div>
              <div className="w-full flex flex-row items-center gap-x-2">
                <input
                  className="flex-grow bg-transparent text-base outline-none"
                  type={showPassWord ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={onChange}
                />
                <div
                  onClick={handleShowPassword}
                  className="flex justify-center items-center"
                >
                  <IonIcon icon={showPassWord ? eyeOutline : eyeOffOutline} />
                </div>
              </div>
            </div>

            <button
              className="basis-0 py-1 px-2 rounded-full outline-none bg-secondary cursor-pointer hover:bg-opacity-75 text-base font-bold text-white"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
        <div className="flex flex-row items-center gap-x-2 py-3">
          <div>Already have an account?</div>
          <div
            onClick={goToLogIn}
            className="text-secondary hover:underline cursor-pointer"
          >
            Log In
          </div>
        </div>
      </div>
      {isServerLoading && (
        <div className="z-50 fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="text-black max-w-[300px] rounded-lg bg-white p-4 flex flex-col gap-y-4">
            <div className="text-black text-center text-xl">
              Please wait. This app is using free tier of render that is why it
              takes time to make a request for sometimes
            </div>

            <div className=" w-full flex flex-row items-center justify-center">
              <CircleLoader />
              <div>Loading...</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
