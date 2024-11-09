import React from "react";
import { LatestPosts } from "../components/LatestPosts";
import { Sidebar } from "../components/Sidebar";
import { MorePosts } from "../components/MorePosts";
import { Title } from "../components/Title";
import { SearchBar } from "../components/SearchBar";
import { Post } from "../interfaces/interfaces";

interface HomeProps {
  posts?: Post[];
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  filteredPosts?: Post[];
}

export const Home: React.FC<HomeProps> = ({
  posts,
  filteredPosts,
  setSearch,
}) => {
  return (
    <div className="flex justify-center items-center flex-col text-primary-text w-full h-auto">
      <div className="w-[95%] xl:w-[85%] md:w-[95%] flex-col xl:flex-row flex mx-auto justify-center items-center gap-3">
        <div className=" xl:w-[75%] xl:ml-[-60px]">
          <Title pre="Welcome to " postblue="Fresh Insights!" />
        </div>
        <div className="mr-0 mb-10 xl:mb-0 xl:w-[20%]">
          <SearchBar setSearch={setSearch} />
        </div>
      </div>
      <LatestPosts filteredPosts={filteredPosts} />
      <Title pre="Explore more " postblue="Blog Posts!" />
      <div className="w-[95%] xl:w-[85%] md:w-[95%] flex-col md:flex-row flex mx-auto justify-center gap-3 pb-10">
        <MorePosts posts={posts} />
        <Sidebar posts={posts} />
      </div>
    </div>
  );
};
