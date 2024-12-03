import React, { Suspense, useEffect, useState } from "react";
import { Title } from "../components/Title";
import { CommentProps, Comments } from "../interfaces/interfaces";
import { deleteComment, getComments } from "../services";
import { Heading1 } from "../components/Heading1";
import { TimeStamp } from "../components/TimeStamp";
import { Paragraph } from "../components/Paragraph";
import { DeleteButton } from "../components/DeleteButton";
import { Delete } from "@mui/icons-material";
import { AlertBox } from "../components/AlertBox";
import CircularProgress from "@mui/joy/CircularProgress";

const LazySubHeading = React.lazy(() =>
  import("../components/SubHeading").then((module) => ({
    default: module.SubHeading,
  }))
);

export const MyComments: React.FC<CommentProps> = ({ checkedUser }) => {
  const userid = checkedUser?.id;
  const [allCommentsNow, setAllCommentsNow] = useState<Comments[]>();
  const [commentId, setCommentId] = useState<string | number>();
  const [deleting, setDeleting] = useState<boolean>(false);
  
  const loadAllComments = async () => {
    await getComments().then((res) => {
      setAllCommentsNow(res?.data?.comments);
    });
  };
  useEffect(() => {
    loadAllComments();
  }, []);
  const userComments = allCommentsNow?.filter((comment: Comments) => {
    return comment?.user_id === userid;
  });

  const deleteThisComment = async (id: number | string | undefined) => {
    try {
      await deleteComment(id);
      setDeleting(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Title pre="Check all your " postblue="Comments!" />
      <div className="mb-10 text-primary-text border-[1px] border-border bg-secondary-background shadow rounded-lg px-2 py-6 lg:p-6 w-full">
        <Heading1 text="Below are all the comments that you have made: " />
        <div className="w-full grid grid-cols-1 gap-3 xl:grid-cols-2 my-10">
          {deleting && (
            <div className="overflow-auto hide-scrollbar fixed top-0 z-20 right-0 bottom-0 left-0 bg-black/75">
              <AlertBox
                proceedFunc={() => deleteThisComment(commentId)}
                setter={setDeleting}
                pre="Are you sure you want to delete this Comment?"
                cancelText="Cancel"
                proceedText="Delete"
              />
            </div>
          )}
          {userComments?.map((comment: Comments) => {
            return (
              <div
                key={comment.id}
                className="w-full bg-background rounded-xl border-[1px] border-border px-2 py-5 lg:px-5"
              >
                <Paragraph text={comment.content} />
                <TimeStamp TimeStamp={comment?.created_at} />
                <div className="px-2 lg:px-0">
                  <DeleteButton
                    onClick={() => {
                      setDeleting(true);
                      setCommentId(comment?.id);
                    }}
                    preIcon={<Delete />}
                    smText="Delete"
                  />
                </div>
              </div>
            );
          })}
        </div>
        {userComments?.length === 0 && (
          <div className="text-center">
            <Suspense
              fallback={
                <CircularProgress
                  color="primary"
                  determinate={false}
                  variant="soft"
                />
              }
            >
              <div className="border-[1px] border-border rounded-xl mx-auto w-full xl:w-[60%] px-4 py-4 text-center my-5">
                <LazySubHeading
                  pre="No comments yet, get started by "
                  postblue="adding your first comment!"
                />
              </div>
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};
