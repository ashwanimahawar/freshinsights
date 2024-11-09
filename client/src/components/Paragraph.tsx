import React from "react";
import { ParagraphProps } from "../interfaces/interfaces";

export const Paragraph: React.FC<ParagraphProps> = ({
  text,
  margin,
  padding,
  fontSize,
  whiteSpace,
}) => {
  return (
    <p
      style={{
        margin: margin,
        padding: padding,
        fontSize: fontSize,
        whiteSpace: whiteSpace
      }}
      className="py-2 text-md text-secondary-text break-words"
    >
      {text}
    </p>
  );
};
