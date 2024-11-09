import React, { useState } from "react";
import { DashMenu } from "../components/DashMenu";
import { Outlet } from "react-router-dom";
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';

export const Dashboard: React.FC = () => {
  const [isMobileDashboard, setIsMobileDashboard] = useState<boolean>(false);
  return (
    <div className="flex h-screen bg-primary text-primary-color">
      <div className="hidden lg:block py-10 border-r-[1px] w-auto border-border lg:w-[21%] xl:w-[16%] 3xl:w-[15%] bg-secondary-background shadow-md">
    <DashMenu  />
      </div>
      {isMobileDashboard && (
        <div className="absolute z-50 lg:hidden py-10 border-r-[1px] border-border lg:w-[21%] xl:w-[16%] 3xl:w-[15%] bg-secondary-background shadow-md">
          <DashMenu setIsMobileDashboard={setIsMobileDashboard} />
        </div>
      )}
      <div className="w-[95%] lg:w-[77%] xl:w-[82%] 3xl:w-[84%] mx-auto hide-scrollbar overflow-auto py-3 lg:py-0">
        <div onClick={() => setIsMobileDashboard(true)} className="flex justify-center items-center lg:hidden rounded-md border-2 border-border bg-secondary-background px-2 py-2 text-primary-text inline w-[42px]">
          <AppsRoundedIcon fontSize="medium" />
        </div>
        <Outlet />
      </div>
    </div>
  );
};
