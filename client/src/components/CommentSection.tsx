import React, { useState } from "react";
import { CommentProps } from "../interfaces/interfaces";
import { Heading1 } from "./Heading1";
import { PrimaryButton } from "./PrimaryButton";
import { ErrorMessage } from "./ErrorMessage";
import { addComments } from "../services";
import { Paragraph } from "./Paragraph";
import { SubHeading } from "./SubHeading";
import { SubHeading2 } from "./SubHeading2";
import { TimeStamp } from "./TimeStamp";

export const CommentSection: React.FC<CommentProps> = ({
  isLogin,
  postId,
  comments,
}) => {
  const [comment, setComment] = useState<{
    content: string;
  }>({
    content: "",
  });
  const [commentError, setCommentError] = useState<string>("");
  const addComment = async () => {
    if (comment.content === "") {
      setCommentError("Please write something first!");
      return;
    }
    if (!isLogin) {
      setCommentError("Please login to add comments!");
    }
    try {
      await addComments(comment, postId);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const postComments = comments?.filter((comment) => {
    return comment?.post_id === postId;
  });

  return (
    <div className="mx-[-10px] lg:mx-0 w-auto bg-background border-[1px] border-border rounded-xl lg:px-8 px-4 py-8">
      <div>
        <Heading1 text="Add a comment" />
        <textarea
          onChange={(e) => {
            setComment({
              content: e.target.value,
            });
            setCommentError("");
          }}
          className="mt-5 w-full rounded-xl bg-secondary-background p-3 lg:py-5 lg:px-5 border-[1px] border-border "
          placeholder="Write your comment here..."
          id="comment"
          rows={5}
          name="comment"
        />
        {commentError && <ErrorMessage text={commentError} />}
        <PrimaryButton
          onClick={addComment}
          text="Add Comment"
          margin="10px 0px"
        />
      </div>
      <br />
      <Heading1 text="Comments" />

      {postComments?.map((comment) => {
        return (
          <div
          key={comment.id} 
          className="mx-[-10px] my-4 lg:mx-0 w-auto bg-secondary-background border-[1px] border-border rounded-xl px-4 pt-4 pb-2">
            <SubHeading2 text={comment?.username} />
            <Paragraph text={comment?.content} />
            <TimeStamp TimeStamp={comment?.created_at} />
          </div>
        );
      })}
      {postComments?.length === 0 && (
        <div className="border-[1px] border-border rounded-xl px-4 py-4 text-center my-5">
          <SubHeading
            pre="No comments yet, be the first one to "
            postblue="add a comment!"
          />
        </div>
      )}
    </div>
  );
};
