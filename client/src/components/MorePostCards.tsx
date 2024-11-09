import React from "react";
import { PostCardProps } from "../interfaces/interfaces";
import { Paragraph } from "./Paragraph";
import { PostTitle } from "./PostTitle";

export const MorePostCards: React.FC<PostCardProps> = ({
  title,
  imgsrc,
  description,
  onClick,
}) => {
  const mobileDescription = description.slice(0, 200) + "...";
  const bigDescription = description.slice(0, 500) + "...";
  const largeDescription = description.slice(0, 800) + "...";
  return (
    <div
      onClick={onClick}
      className="group hover:scale-[1.01] cursor-pointer transition-all h-auto w-auto bg-background rounded-2xl border-[1px] border-border lg:min-h-64 lg:max-h-[330px] overflow-hidden flex flex-col lg:flex-row"
    >
      <img
        src={imgsrc}
        alt=""
        className="w-full xl:w-[45%] 3xl:w-[35%] lg:w-[50%] h-[350px] lg:h-full"
      />
      <div className="px-4 lg:px-10 py-5 lg:py-10">
        <PostTitle text={title} />
        {/* mobileDescription */}
        <div className="2xl:hidden">
          <Paragraph text={mobileDescription} />
        </div>
        {/* bigDescription */}
        <div className="hidden 2xl:block 3xl:hidden">
          <Paragraph text={bigDescription} />
        </div>
        {/* largeDescription */}
        <div className="hidden 3xl:block">
          <Paragraph text={largeDescription} />
        </div>
      </div>
    </div>
  );
};
