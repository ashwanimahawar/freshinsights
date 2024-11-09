import React from "react";

export const PrimaryButton: React.FC<{
  text?: string;
  smText? : string;
  onClick?: () => void;
  bg?: string;
  preIcon?: React.ReactNode;
  postIcon?: React.ReactNode;
  padding?: string;
  margin?: string;
  type?: "submit" | "reset" | "button" | undefined;
}> = ({ preIcon, postIcon, text, smText, onClick, padding, margin, type, bg }) => {
  return (
    <button
      type={type}
      style={{
        padding: padding,
        margin: margin,
        backgroundColor: bg
      }}
      onClick={onClick}
      className="flex justify-center items-center gap-2 my-1 post-btn bg-blue-700 text-white px-[20px] py-[6px] rounded-md font-semibold text-lg cursor-pointer hover:bg-blue-500"
    >
      {preIcon} {text} <span className="hidden sm:inline lg:hidden 2.5xl:inline">{smText}</span> {postIcon}
    </button>
  );
};
