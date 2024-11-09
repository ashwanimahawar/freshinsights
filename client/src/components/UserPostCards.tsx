import React from "react";
import { PostCardProps } from "../interfaces/interfaces";
import { Paragraph } from "./Paragraph";
import { PostTitle } from "./PostTitle";
import { PrimaryButton } from "./PrimaryButton";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { DeleteButton } from "./DeleteButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";

export const UserPostCards: React.FC<PostCardProps> = ({
  title,
  imgsrc,
  description,
  setIsEditing,
  setCurrentPost,
  currentPost,
  onClick,
  deleteThisPost,
}) => {
  const mobileDescription = description.slice(0, 40) + "...";
  const laptopDescription = description.slice(0, 50) + "...";
  const largeDescription = description.slice(0, 320) + "...";
  const midDescription = description.slice(0, 150) + "...";

  const mobileTitle = title?.slice(0, 20) + "...";
  const bigTitle = title?.slice(0, 30) + "...";

  return (
    <div className="z-10 group xl:hover:scale-[1.01] h-auto min-h-[550px] md:min-h-[320px] max-h-[600px] md:max-h-[350px] cursor-pointer transition-all w-full bg-background rounded-2xl border-[1px] border-border overflow-hidden flex flex-col md:flex-row">
      <img
        src={imgsrc}
        alt="Featured Image"
        className="w-full xl:w-[50%] 2xl:w-full h-[65%] md:h-full lg:max-w-[45%]"
      />
      <div className="w-full px-3 lg:px-5 py-5 3xl:py-10 lg:min-w-[55%] lg:max-w-[60%]">
        <div onClick={onClick} className="sm:hidden">
          <PostTitle text={mobileTitle} />
        </div>
        <div onClick={onClick} className="hidden sm:block">
          <PostTitle text={bigTitle} />
        </div>

        {/* mobileDescription */}
        <div className="xl:hidden">
          <Paragraph text={mobileDescription} />
        </div>
        {/* bigDescription */}
        <div className="hidden xl:block 2xl:hidden">
          <Paragraph text={laptopDescription} />
        </div>
        {/* 2xl-Description */}
        <div className="hidden 2xl:block 3xl:hidden">
          <Paragraph text={midDescription} />
        </div>
        {/* largeDescription */}
        <div className="hidden 3xl:block">
          <Paragraph text={largeDescription} />
        </div>
        <div className="3xl:my-5 3xl:mx-3 flex gap-3">
          <PrimaryButton
            preIcon={<EditRoundedIcon />}
            bg="darkgrey"
            onClick={() => {
              setCurrentPost && setCurrentPost(currentPost);
              setIsEditing && setIsEditing(true);
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 100);
            }}
            text="Edit"
            smText="Post"
          />
          <DeleteButton
            onClick={() => {
              setCurrentPost && setCurrentPost(currentPost);
              deleteThisPost && deleteThisPost();
            }}
            preIcon={<DeleteRoundedIcon />}
            smText="Delete"
          />
        </div>
      </div>
    </div>
  );
};
