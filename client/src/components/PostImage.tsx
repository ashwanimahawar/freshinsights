import React from "react";
import { Post } from "../interfaces/interfaces";

export const PostImage: React.FC<{
  post: Post | undefined;
}> = ({ post }) => {
  return (
    <div className="my-5 flex justify-center items-center w-full">
      <img
        className="rounded-xl h-auto lg:h-[500px] border-[1px] border-border w-auto aspect-auto"
        src={post?.imgsrc}
        alt={post?.title}
      />
    </div>
  );
};
