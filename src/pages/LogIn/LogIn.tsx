/** @format */

import React, { useState } from "react";
import { logIn } from "../../redux/asynActions/userAsyncActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router";
import { LogInUserData } from "../../types/AuthUserTypes";
import { resetAuthMessage } from "../../redux/usersSlice";
import { IonIcon } from "@ionic/react";
import { eyeOutline, eyeOffOutline } from "ionicons/icons";
import CircularProgress from "../../common/CircularProgress";
import CircleLoader from "../../common/CircleLoader";

function LogIn() {
  const [logInID, setLogInID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassWord, setShowPassword] = useState(false);
  const [isServerLoading, setIsServerLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const authMessage = useSelector((state: any) => state.user.authMessage);

  const handleSubmit = (e: any) => {
    setIsServerLoading(true);
    const userData: LogInUserData = {
      logInID: logInID,
      password: password,
    };
    dispatch(logIn(userData)).then(() => {
      setIsServerLoading(false);
      navigate("/");
      dispatch(resetAuthMessage());
    });

    e.preventDefault();
  };
  const handleUseDemoAccount = (e: any) => {
    setIsServerLoading(true);
    const userData: LogInUserData = {
      logInID: "demoaccount",
      password: "12345678",
    };
    dispatch(logIn(userData)).then(() => {
      setIsServerLoading(false);
      navigate("/");
      dispatch(resetAuthMessage());
    });
    e.preventDefault();
  };
  const goToRegister = () => {
    navigate("/register");
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassWord);
  };
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-y-2">
      <div className="w-full max-w-[500px] flex flex-col items-center justify-center border rounded-lg">
        <div className="text-lg font-bold text-secondary py-3">
          Log In your account
        </div>
        <div className="flex w-full">
          <div className="flex flex-col flex-1 p-2 gap-y-2">
            <div className="flex flex-col rounded-lg border py-1 px-2 gap-y-0.5">
              <div className="text-gray-400 text-sm">Email or Username</div>
              <input
                className="bg-transparent text-base outline-none"
                type="text"
                name="userFirstName"
                value={logInID}
                onChange={(event: any) => setLogInID(event.target.value)}
              />
            </div>

            <div className="flex flex-col rounded-lg border py-1 px-2 gap-y-0.5">
              <div className="text-gray-400 text-sm">Password</div>
              <div className="w-full flex flex-row items-center gap-x-2">
                <input
                  className="flex-grow bg-transparent text-base outline-none"
                  type={showPassWord ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(event: any) => setPassword(event.target.value)}
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
              onClick={handleSubmit}
              className="basis-0 py-1 px-2 rounded-full outline-none bg-secondary cursor-pointer hover:bg-opacity-75 text-base font-bold text-white"
              type="submit"
            >
              LogIn
            </button>
            <button
              onClick={handleUseDemoAccount}
              className="basis-0 py-1 px-2 rounded-full outline-none bg-secondary1 cursor-pointer hover:bg-opacity-75 text-base font-bold text-white"
            >
              Use Demo Account
            </button>
          </div>
        </div>
        {authMessage && <div>{authMessage}</div>}
        <div className="flex flex-row items-center gap-x-2 py-3">
          <div>Don't have an account?</div>
          <div
            onClick={goToRegister}
            className="text-secondary hover:underline cursor-pointer"
          >
            Register
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

export default LogIn;
