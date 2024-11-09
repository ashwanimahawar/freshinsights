import React from "react";

export const Toast: React.FC<{
  style?: React.CSSProperties;
  text?: string;
  preIcon?: React.ReactNode;
}> = ({ style, preIcon, text }) => {
  return (
    <div
      style={style}
      className="fixed w-auto bg-background border-2 border-border rounded-xl py-3 px-3 lg:px-5 mx-auto mt-20"
    >
      <div className="flex gap-2 justify-center items-center">
        {preIcon}
        <h2 className="text-xl font-bold">{text}</h2>
      </div>
    </div>
  );
};
