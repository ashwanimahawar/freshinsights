import React from "react";

export const Link: React.FC<{ text: string }> = ({ text }) => {
  return <p className="text-blue-700 hover:underline text-lg arimo">{text}</p>;
};
