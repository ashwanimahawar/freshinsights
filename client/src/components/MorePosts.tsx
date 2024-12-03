import React from "react";
import { MorePostCards } from "./MorePostCards";
import { AllPostProps, Post } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";

export const MorePosts: React.FC<AllPostProps> = ({ posts }) => {
  const latestposts = posts?.filter((post: Post, i: number) => {
    post;
    return i > 10 && i < 15;
  });

  const navigate = useNavigate();
  return (
    <div className="w-full md:w-[60%] lg:w-full h-auto lg:w-[75%] lg:px-10 px-4 py-4 lg:py-10 border-[1px] flex flex-col border-border rounded-xl bg-secondary-background text-primary-text gap-3">
      {latestposts?.map((post: Post) => {
        return (
          <MorePostCards
            onClick={() => navigate(`/post/${post.id}`)}
            key={post.id}
            currentPost={post}
            title={post?.title}
            imgsrc={post.imgsrc}
            description={post.content}
          />
        );
      })}
    </div>
  );
};
