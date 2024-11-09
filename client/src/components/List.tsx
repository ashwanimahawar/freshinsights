import React from "react";
import { ListProps } from "../interfaces/interfaces";

export const List: React.FC<ListProps> = ({ children, style }) => {
  return (
    <ul style={style} className="list-disc ml-5 text-secondary-text">
      {children}
    </ul>
  );
};
