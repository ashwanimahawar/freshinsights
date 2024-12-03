import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LightModeRoundedIcon from "@mui/icons-material/LightMode";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import { LoginProps } from "../interfaces/interfaces";
import { getDashboard, logoutUser } from "../services";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { DashMenuItems } from "./DashMenuItems";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";

export const Header: React.FC<LoginProps> = ({ isLogin, setIsLogin }) => {
  const [lightMode, setLightMode] = useState(false);
  const navigate = useNavigate();
  const [isMobileMenu, setIsMobileMenu] = useState<boolean>(false);

  //Light Mode Function
  const toggleLightMode = () => {
    const newLightMode = !lightMode;
    setLightMode(newLightMode);
    document.body.classList.toggle("light", newLightMode);
    localStorage.setItem("lightMode", newLightMode ? "true" : "false");
  };

  useEffect(() => {
    const savedLightMode = localStorage.getItem("lightMode");
    if (savedLightMode === "true") {
      setLightMode(true);
      document.body.classList.add("light");
    } else {
      setLightMode(false);
      document.body.classList.remove("light");
    }
  }, []);

  const logoutExistingUser = async () => {
    try {
      const res = await logoutUser();
      if (res?.data?.status === 200) {
        setIsLogin && setIsLogin(false);
        localStorage.setItem("isLogin", "false");
        navigate(res?.data?.redirect);
      }
    } catch (err: any) {
      alert(err?.response?.data?.message);
    }
  };

  const handleDashboard = async () => {
    try {
      const res = await getDashboard();
      const route = res?.data?.redirect;
      navigate(route);
    } catch (err: any) {
      navigate(err?.response?.data?.redirect);
    }
  };

  return (
    <div className="transition-all w-full bg-nav-bg py-3 border-b-[1px] border-border flex items-center justify-between px-4 md:px-0 md:justify-around text-white ">
      <h1
        onClick={() => navigate("/")}
        className="cursor-pointer xl:ml-40 arimo font-extrabold text-xl md:text-3xl"
      >
        Fresh <span className="text-blue-700">Insights</span>
      </h1>

      <ul className="xl:ml-40 arimo hidden md:flex gap-5 items-center font-[600]">
        <li
          onClick={() => navigate("/")}
          className="hover:text-blue-700 hover:underline hover:cursor-pointer"
        >
          Home
        </li>

        <li
          className="hover:text-blue-700 hover:underline hover:cursor-pointer"
          onClick={handleDashboard}
        >
          Dashboard
        </li>

        <li
          onClick={() => navigate("/about")}
          className="hover:text-blue-700 hover:underline hover:cursor-pointer"
        >
          About
        </li>

        <li
          onClick={() => navigate("/contact")}
          className="hover:text-blue-700 hover:underline hover:cursor-pointer"
        >
          Contact
        </li>
      </ul>
      <div className="arimo font-[600] ml-5 flex gap-3 items-center">
        <button
          style={{ color: lightMode ? "black" : "blue" }}
          className="md:h-[40px] md:w-[40px] h-[35px] w-[35px] bg-white rounded-[100%]"
          onClick={toggleLightMode}
        >
          {lightMode ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </button>
        <button
          onClick={() => setIsMobileMenu(!isMobileMenu)}
          className="py-1 px-2 text-primary-text rounded-md bg-background border-2 md:hidden border-border"
        >
          <MenuIcon fontSize="medium" />
        </button>
        {isLogin ? (
          <button
            onClick={logoutExistingUser}
            className="primary-btn hidden md:block"
          >
            <span className="inter hidden sm:inline">LogOut</span>{" "}
            <LogoutIcon />
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="primary-btn login-btn hidden md:block"
            >
              <span className="inter hidden sm:inline">LogIn</span>{" "}
              <LoginIcon />
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="inter secondary-btn hidden lg:block"
            >
              SignUp <AppRegistrationIcon />
            </button>
          </>
        )}
      </div>
      {isMobileMenu && (
        <div className="transition-all h-screen fixed top-0 right-0 z-50 md:hidden py-10 border-r-[1px] border-border w-[70%] bg-secondary-background shadow-md">
          <nav className="transition-all mt-5 px-2 text-primary-text z-50">
            <div className="transition-all flex justify-center items-center absolute top-2 right-5">
              <PrimaryButton
                onClick={() => setIsMobileMenu(!isMobileMenu)}
                padding="4px"
                preIcon={<CloseRoundedIcon />}
              />
            </div>
            <DashMenuItems
              style={{
                fontWeight: "500",
                fontSize: "20px",
              }}
              onClick={() => {
                navigate("/");
                setIsMobileMenu(false);
              }}
              text="Home"
            />
            <DashMenuItems
              style={{
                fontWeight: "500",
                fontSize: "20px",
              }}
              onClick={() => {
                navigate("/dashboard");
                setIsMobileMenu(false);
              }}
              text="Dashboard"
            />
            <DashMenuItems
              style={{
                fontWeight: "500",
                fontSize: "20px",
              }}
              onClick={() => {
                navigate("/about");
                setIsMobileMenu(false);
              }}
              text="About"
            />
            <DashMenuItems
              onClick={() => {
                navigate("/contact");
                setIsMobileMenu(false);
              }}
              style={{
                fontWeight: "500",
                fontSize: "20px",
              }}
              text="Contact"
            />
            <div className="w-auto mx-3 my-10">
              {isLogin ? (
                <SecondaryButton
                  onClick={() => {
                    logoutExistingUser();
                    setIsMobileMenu(false);
                  }}
                  preIcon={<LogoutIcon />}
                  text="LogOut"
                />
              ) : (
                <>
                  <SecondaryButton
                    onClick={() => {
                      navigate("/login");
                      setIsMobileMenu(false);
                    }}
                    preIcon={<LoginIcon />}
                    text="LogIn"
                  />
                  <SecondaryButton
                    onClick={() => {
                      navigate("/signup");
                      setIsMobileMenu(false);
                    }}
                    preIcon={<AppRegistrationIcon />}
                    text="SignUp"
                  />
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};
