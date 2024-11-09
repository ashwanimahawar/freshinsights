import React from "react";
import { LatestPostCards } from "./LatestPostCards";
import { AllPostProps } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";

export const LatestPosts: React.FC<AllPostProps> = ({ filteredPosts }) => {
  const navigate = useNavigate();
  const latestFilteredPosts = filteredPosts?.filter((post, i) => {
    post;
    return i >= 0 && i <= 9;
  });
  return (
    <div className="w-[95%] xl:w-[85%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 3xl:grid-cols-6 gap-3">
      {latestFilteredPosts?.map((post) => {
        return (
          <LatestPostCards
            onClick={() => navigate(`/post/${post.id}`)}
            key={post.id}
            imgsrc={post.imgsrc}
            title={post.title}
            description={post.content}
          />
        );
      })}
    </div>
  );
};
