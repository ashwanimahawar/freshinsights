import React, { useState } from "react";
import { LoginProps, User } from "../interfaces/interfaces";
import { registerNewUser } from "../services";
import { useNavigate } from "react-router-dom";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import PersonIcon from "@mui/icons-material/Person";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Title } from "../components/Title";
import { ErrorMessage } from "../components/ErrorMessage";

export const SignUp: React.FC<LoginProps> = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await registerNewUser(user);
      if (res?.data?.status === 400) {
        setIsLogin && setIsLogin(false);
        setErrorMessage(res?.data?.message);
      } else {
        alert("User Registered Successfully!");
        setIsLogin && setIsLogin(true);
        setUser({ name: "", email: "", password: "" });
        window.location.reload();
        navigate("/dashboard");
      }
    } catch (err: any) {
      setIsLogin && setIsLogin(false);
      if (err.response) {
        setErrorMessage(err?.response?.data?.message);
      }
    }
  };

  return (
    <div
      id="signup"
      className="h-auto w-full flex flex-col items-center mt-[100px] pb-20"
    >
      {/* <div className="fixed w-full flex justify-center top-[65px]"><AlertBox /></div> */}
      <div className="w-[95%] md:w-[85%] lg:w-[60%] xl:w-[50%] 2xl:w-[30%] h-auto">
        <Title pre="Sign Up" />
        <div className="md:px-10 md:py-20 px-4 py-10 border-[1px] border-border rounded-xl bg-secondary-background text-primary-text w-full h-[90%] mt-5">
          <p className="text-sm mt-[-10px] mb-[10px] text-red-600 text-center">
            All fields are mandatory.
          </p>
          <form
            onSubmit={registerUser}
            action="/services/register"
            className="flex flex-col text-xl"
          >
            <label htmlFor="name" className="font-bold text-xl">
              <PersonIcon /> Name:
            </label>
            <input
              value={user.name}
              className="px-5 py-3 rounded-lg mb-5 mt-2 text-primary-text bg-background"
              id="name"
              name="name"
              type="text"
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
                setErrorMessage(null);
              }}
              placeholder="Enter Your Full Name"
              required
            />
            <label htmlFor="email" className="font-bold text-xl">
              <MailRoundedIcon /> Email:
            </label>
            <input
              value={user.email}
              className="px-5 py-3 rounded-lg mb-5 mt-2 text-primary-text bg-background"
              id="email"
              name="email"
              type="email"
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
                setErrorMessage(null);
              }}
              placeholder="Enter Your Registered Email"
              required
            />
            <label htmlFor="password" className="font-bold text-xl">
              <KeyRoundedIcon /> Password:
            </label>
            <input
              value={user.password}
              className="px-5 py-3 rounded-lg mb-5 mt-2 text-primary-text bg-background"
              id="password"
              name="password"
              type="password"
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
                setErrorMessage(null);
              }}
              placeholder="Enter Your Password"
              required
            />
            {errorMessage && <ErrorMessage text={errorMessage} />}
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-500 text-white mt-5 font-bold py-2 px-4 rounded-lg"
            >
              Register me <NearMeIcon />
            </button>
          </form>
          <p className="mt-3 text-center text-lg">
            Already an User?{" "}
            <a
              href="/login"
              className="text-blue-700 hover:text-blue-500 hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
