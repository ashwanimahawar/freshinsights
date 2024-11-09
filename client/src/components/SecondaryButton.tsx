import React from "react";

export const SecondaryButton: React.FC<{
  text?: string;
  smText?: string;
  onClick?: () => void;
  bg?: string;
  preIcon?: React.ReactNode;
  postIcon?: React.ReactNode;
  padding?: string;
  margin?: string;
  type?: "submit" | "reset" | "button" | undefined;
}> = ({
  preIcon,
  postIcon,
  text,
  smText,
  onClick,
  padding,
  margin,
  type,
  bg,
}) => {
  return (
    <button
      type={type}
      style={{
        padding: padding,
        margin: margin,
        backgroundColor: bg,
      }}
      onClick={onClick}
      className="flex justify-center items-center gap-2 my-1 post-btn bg-transparent text-blue-700 px-[20px] py-[6px] rounded-md font-semibold border-[2px] text-primary-text border-border text-lg cursor-pointer hover:bg-green-600 hover:text-background"
    >
      {preIcon} {text}{" "}
      <span className="hidden sm:inline lg:hidden 2.5xl:inline">{smText}</span>{" "}
      {postIcon}
    </button>
  );
};
