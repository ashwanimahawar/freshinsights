import React from "react";
import { Title } from "../components/Title";

export const DeletePost: React.FC = () => {
  return (
    <div>
      <Title pre="Delete from your " postblue="Posts!" /> 
      <div className="mb-10 text-primary-text border-[1px] border-border bg-secondary-background shadow rounded-lg p-6"></div>
    </div>
  );
};
