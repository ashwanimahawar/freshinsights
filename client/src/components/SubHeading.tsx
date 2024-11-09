import React from "react";

interface SubHeadingProps {
  preblue?: string;
  pre?: string;
  postblue?: string;
  post?: string;
  margin?: string;
  fontSize?: string;
  padding?: string;
}

export const SubHeading: React.FC<SubHeadingProps> = ({
  preblue,
  pre,
  postblue,
  post,
  margin,
  padding,
  fontSize,
}) => {
  return (
    <h2
      style={{
        margin: margin,
        fontSize: fontSize,
        padding: padding,
      }}
      className="text-xl font-bold text-primary-text mb-3"
    >
      {" "}
      <span className="text-blue-700">{preblue}</span>
      {pre}
      <span className="text-blue-700">{postblue}</span>
      {post}
    </h2>
  );
};
