import React from "react";
import { DashMenuItems } from "./DashMenuItems";
import { useNavigate } from "react-router-dom";

interface SubHeadingProps {
  text: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const MenuSubHeading: React.FC<SubHeadingProps> = ({ text, onClick, style }) => {
  return (
    <h1
    style={style}
      onClick={onClick}
      className="px-4 text-xl font-bold text-primary-text mb-2"
    >
      {text}
    </h1>
  );
};

export const DashMenu: React.FC<{
  setIsMobileDashboard?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsMobileDashboard }) => {
  const navigate = useNavigate();

  return (
    <nav className="px-4 text-primary-text z-50">
      <MenuSubHeading text="Account Info." />
      <DashMenuItems
        onClick={() => {
          setIsMobileDashboard && setIsMobileDashboard(false);
          navigate("");
        }}
        text="Home"
      />
      <DashMenuItems
        onClick={() => {
          setIsMobileDashboard && setIsMobileDashboard(false);
          navigate("/dashboard/profile");
        }}
        text="Profile"
      />
      <br />
      <MenuSubHeading text="Post Settings" />
      <DashMenuItems
        onClick={() => {
          setIsMobileDashboard && setIsMobileDashboard(false);
          navigate("/dashboard/post");
        }}
        text="My Posts"
      />
      <DashMenuItems
        onClick={() => {
          setIsMobileDashboard && setIsMobileDashboard(false);
          navigate("/dashboard/post/create");
        }}
        text="Create Post"
      />
      <br />
      <MenuSubHeading text="Comment Settings" />
      <DashMenuItems
        onClick={() => {
          setIsMobileDashboard && setIsMobileDashboard(false);
          navigate("/dashboard/comments");
        }}
        text="My Comments"
      />
      {/* <DashMenuItems text="Delete Comments" /> */}
      <br />
      <MenuSubHeading text="Settings" />
      <DashMenuItems text="Help" />
      <DashMenuItems text="Privacy Policy" />
      <DashMenuItems text="Terms of Service" />
    </nav>
  );
};