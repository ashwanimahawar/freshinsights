import React from "react";

export const DeleteButton: React.FC<{
  text?: string;
  smText?: string;
  onClick?: () => void;
  preIcon?: React.ReactNode;
  postIcon?: React.ReactNode;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  type?: "button" | undefined;
}> = ({
  preIcon,
  postIcon,
  text,
  smText,
  onClick,
  padding,
  margin,
  type,
  borderRadius,
}) => {
  return (
    <button
      type={type}
      style={{
        padding: padding,
        margin: margin,
        borderRadius: borderRadius,
      }}
      onClick={onClick}
      className="post-btn bg-red-700 text-white px-[20px] py-[6px] my-1 rounded-md font-semibold text-lg cursor-pointer hover:bg-red-500"
    >
      {preIcon} {text}{" "}
      <span className="hidden sm:inline xl:hidden 2xl:inline ">{smText}</span>{" "}
      {postIcon}
    </button>
  );
};
