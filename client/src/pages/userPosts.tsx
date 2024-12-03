import React, { useState } from "react";
import { Title } from "../components/Title";
import { AllPostProps, Post } from "../interfaces/interfaces";
import { UserPostCards } from "../components/UserPostCards";
import { Heading1 } from "../components/Heading1";
import { DeleteButton } from "../components/DeleteButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { UpdatePost } from "./updatePost";
import { useNavigate } from "react-router-dom";
import { AlertBox } from "../components/AlertBox";
import { deletePost } from "../services";
import { SubHeading } from "../components/SubHeading";

export const UserPosts: React.FC<AllPostProps> = ({
  posts,
  checkedUser,
  currentPost,
  setCurrentPost,
}) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const userId = checkedUser?.id;

  const userPosts = posts?.filter((post: Post) => {
    return post?.user_id === userId;
  });

  const deleteThisPost = async () => {
    try {
      await deletePost(currentPost?.id);
      setIsDeleting(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Title pre="Have a look of all your " postblue="Posts!" />
      <div className="mb-10 text-primary-text border-[1px] border-border bg-secondary-background shadow rounded-lg p-3 md:p-6">
        <Heading1 text="Below are all the posts that you have published: " />
        <br />
        {isEditing && (
          <div className="overflow-auto hide-scrollbar fixed top-0 z-20 right-0 bottom-0 left-0 bg-black/75">
            <UpdatePost setIsEditing={setIsEditing} post={currentPost} />
            <div className="absolute top-8 right-5 md:right-8 xl:right-5 xl:top-5">
              <DeleteButton
                onClick={() => setIsEditing && setIsEditing(false)}
                padding="2px 4px"
                preIcon={<CloseRoundedIcon />}
              />
            </div>
          </div>
        )}
        {isDeleting && (
          <div className="overflow-auto hide-scrollbar fixed top-0 z-20 right-0 bottom-0 left-0 bg-black/75">
            <AlertBox
              proceedFunc={deleteThisPost}
              setter={setIsDeleting}
              pre="Are you sure you want to delete this Post?"
              cancelText="Cancel"
              proceedText="Delete"
            />
          </div>
        )}
        <div className="w-full grid grid-cols-1 gap-3 xl:grid-cols-2">
          {userPosts?.map((post: Post) => {
            return (
              <UserPostCards
                onClick={() => navigate(`/post/${post.id}`)}
                setIsEditing={setIsEditing}
                isEditing={isEditing}
                setCurrentPost={setCurrentPost}
                deleteThisPost={() => setIsDeleting(true)}
                currentPost={post}
                key={post.id}
                imgsrc={post.imgsrc}
                title={post.title}
                description={post.content}
              />
            );
          })}
        </div>
        {userPosts?.length === 0 && (
        <div className="border-[1px] border-border rounded-xl mx-auto w-full xl:w-[60%] px-4 py-4 text-center my-5">
          <SubHeading
            pre="No posts yet, get started by "
            postblue="adding your first post!"
          />
        </div>
      )}
      </div>
    </div>
  );
};
