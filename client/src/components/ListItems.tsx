import React from "react";
import { ListItemProps } from "../interfaces/interfaces";

export const ListItems: React.FC<ListItemProps> = ({
  style,
  bold,
  post,
  break: breakProp,
  mailto,
}) => {
  return (
    <div style={style}>
      <span className="font-semibold text-primary-text">{bold}</span>
      {breakProp && <br />}
      {post}<a className="text-blue-700 hover:underline cursor-pointer font-semibold" href={`mailto:${mailto}`}>{mailto}</a>
    </div>
  );
};
