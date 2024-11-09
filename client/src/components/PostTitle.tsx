import React from "react";

interface HeadingProps {
  text: string | undefined;
}

export const PostTitle: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h1 className=" text-2xl lg:text-3xl font-bold text-primary-text">
      {text}
    </h1>
  );
};
