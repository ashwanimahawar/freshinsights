import React, { useEffect, useState } from "react";
import { AllPostProps, Comments, Post } from "../interfaces/interfaces";
import { useParams } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Title } from "../components/Title";
import { Paragraph } from "../components/Paragraph";
import { PostImage } from "../components/PostImage";
import { CommentSection } from "../components/CommentSection";
import { getComments } from "../services";
import { TimeStamp } from "../components/TimeStamp";

export const PostPage: React.FC<AllPostProps> = ({
  filteredPosts,
  posts,
  isLogin,
}) => {
  const { postId } = useParams<{ postId: string | undefined }>();
  const [comments, setComments] = useState<Comments[]>();
  const thisPost: Post[] | undefined = filteredPosts?.filter((post: Post) => {
    const idOfPost = post?.id?.toString();
    return idOfPost === postId;
  });

  const thisTitle: string | undefined = thisPost?.[0]?.title;
  const thisContent: string | undefined = thisPost?.[0]?.content;
  const postid: string | number | undefined = thisPost?.[0]?.id;

  //Get Comments
  const getAllComments = async () => {
    await getComments().then((res) => {
      setComments(res?.data?.comments);
    });
  };
  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <div className="w-[95%] xl:w-[85%] md:w-[95%] flex-col md:flex-row flex mx-auto justify-center gap-3 pb-10 my-10">
      <div className="w-full md:w-[60%] lg:w-full h-auto lg:w-[75%] lg:px-10 px-4 py-4 lg:pb-10 lg:pt-5 border-[1px] flex flex-col border-border rounded-xl bg-secondary-background text-primary-text gap-3">
        <div>
          <TimeStamp margin="1px 0px" TimeStamp={thisPost?.[0]?.created_at} />
          <TimeStamp margin="1px 0px" updateStamp={thisPost?.[0]?.updated_at} />
        </div>
        <Title pre={thisTitle} />
        <PostImage post={thisPost?.[0]} />
        <Paragraph whiteSpace="pre-wrap" text={thisContent} />
        <Title
          padding="0px"
          margin="25px 0px"
          pre="Look what people have, "
          postblue="Comented!"
        />
        <CommentSection
          comments={comments}
          postId={postid}
          isLogin={isLogin}
          post={thisPost?.[0]}
        />
      </div>
      <Sidebar posts={posts} />
    </div>
  );
};
