import React from "react";

interface SubHeading2Props {
  text: string | undefined;
  pre?: string | number | undefined;
}

export const SubHeading2: React.FC<SubHeading2Props> = ({ text, pre }) => {
  return (
    <h1 className="text-lg font-bold text-primary-text">
      <span className="text-blue-700 font-bold text-xl">{pre}</span> {text}
    </h1>
  );
};
