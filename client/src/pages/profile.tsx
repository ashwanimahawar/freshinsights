import React, { useEffect, useState } from "react";
import { Title } from "../components/Title";
import { Heading1 } from "../components/Heading1";
import { ProfileProps } from "../interfaces/interfaces";
import { SubHeading } from "../components/SubHeading";
import { PrimaryButton } from "../components/PrimaryButton";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";

export const Profile: React.FC<ProfileProps> = ({ checkedUser }) => {
  const navigate = useNavigate();
  const [accountDate, setAccountDate] = useState<Date>();
  const created = checkedUser?.created_at;
  useEffect(() => {
    if (created) {
      const date = new Date(created);
      setAccountDate(date);
    }
  }, [checkedUser]);
  return (
    <div>
      <Title pre="Welcome to your " postblue="Profile!" />
      <div className="mb-10 text-primary-text border-[1px] border-border bg-secondary-background shadow rounded-lg px-2 py-6 lg:p-6 w-full">
        <Heading1 text="Below are your details: " />
        <br />
        <br />
        <br />
        <div className="flex flex-col md:flex-row md:gap-5">
          <SubHeading margin="10px 0px" pre="Your Name:" />
          <input
            type="text"
            readOnly
            className="arimo font-semibold text-xl bg-background rounded-xl px-5 py-1 border-[1px] border-border w-auto"
            value={checkedUser?.name}
          />
        </div>
        <br />
        <div className="flex flex-col md:flex-row md:gap-5">
          <SubHeading margin="10px 0px" pre="Your Email:" />
          <input
            type="text"
            readOnly
            className="arimo font-semibold text-xl bg-background rounded-xl px-5 py-1 border-[1px] border-border w-auto"
            value={checkedUser?.email}
          />
        </div>
        <br />
        <div className="flex flex-col md:flex-row md:gap-5">
          <SubHeading margin="10px 0px" pre="Your Account was created on:" />
          <input
            type="text"
            readOnly
            className="arimo font-semibold text-xl bg-background rounded-xl px-5 py-1 border-[1px] border-border w-auto"
            value={`${accountDate?.toDateString()} - ${accountDate?.toLocaleTimeString()}`}
          />
        </div>
        <div className="my-10 flex gap-0 md:gap-3 flex-col md:flex-row">
          <PrimaryButton
            onClick={() => navigate("/dashboard/post")}
            margin="10px 0px"
            text="Go To Posts"
            postIcon={<ArrowOutwardIcon />}
          />
          <PrimaryButton
            onClick={() => navigate("/dashboard/post/create")}
            margin="10px 0px"
            text="Create New Post"
            postIcon={<ArrowOutwardIcon />}
          />
          <PrimaryButton
            onClick={() => navigate("/dashboard")}
            margin="10px 0px"
            text="Dashboard Home"
            postIcon={<ArrowOutwardIcon />}
          />
        </div>
      </div>
    </div>
  );
};
