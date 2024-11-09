import React from "react";

export const ErrorMessage: React.FC<{ text: string; padding?: string }> = ({
  text,
  padding,
}) => {
  return (
    <p
      style={{
        padding: padding,
      }}
      className="text-sm mt-[-10px] mb-[10px] py-5 text-red-600 text-center"
    >
      {text}
    </p>
  );
};
