import React from "react";
import { Heading1 } from "./Heading1";
import { AllPostProps, Post } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";

const SubHeading2: React.FC<{
  text: string | undefined;
  onClick?: () => void;
  pre?: string | number | undefined;
}> = ({ text, pre, onClick }) => {
  return (
    <h1 className="text-lg font-bold text-primary-text">
      <span className="text-primary-text font-bold">{pre}</span>
      <span
        onClick={onClick}
        className="text-secondary-text rounded-lg hover:bg-border transition-all py-1 px-2 cursor-pointer"
      >
        {text}
      </span>
    </h1>
  );
};

export const Sidebar: React.FC<AllPostProps> = ({ posts }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full md:w-[39%] lg:px-10 px-4 py-4 lg:py-10 border-[1px] border-border rounded-xl bg-secondary-background text-primary-text">
      <Heading1 text="All Posts" />
      <div className="my-5">
        {posts?.map((post: Post, i: number) => {
          return (
            <SubHeading2
              key={post?.id}
              onClick={() => navigate(`/post/${post.id}`)}
              pre={i + 1 + ". "}
              text={post?.title}
            />
          );
        })}
      </div>
    </div>
  );
};
