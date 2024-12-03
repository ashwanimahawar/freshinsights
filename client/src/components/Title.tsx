import React from "react";
import { TitleProps } from "../interfaces/interfaces";


export const Title: React.FC<TitleProps> = ({
  preblue,
  pre,
  postblue,
  post,
  align,
  margin,
  padding,
  fontSize,
}) => {
  return (
    <div className="w-full">
      <h1
        style={{
          textAlign: align,
          margin: margin,
          fontSize: fontSize,
          padding: padding,
        }}
        className="poppins text-primary-text text-center md:my-8 my-5 font-extrabold text-3xl px-5 md:text-5xl"
      >
        <span className="text-blue-700">{preblue}</span>
        {pre}
        <span className="text-blue-700">{postblue}</span>
        {post}
      </h1>
    </div>
  );
};
