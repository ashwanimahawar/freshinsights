import React, { useEffect, useState } from "react";
import { Title } from "./Title";
import { Heading1 } from "./Heading1";
import { Comments, DashProps } from "../interfaces/interfaces";
import { TimeStamp } from "./TimeStamp";
import { getComments } from "../services";

export const DashArea: React.FC<DashProps> = ({ posts, checkedUser }) => {
  const [allComments, setAllComments] = useState<Comments[]>();

  const userId = checkedUser?.id;
  const allUserPosts = posts?.filter((post) => {
    return post?.user_id === userId;
  });

  const loadComments = async () => {
    await getComments().then((res) => {
      setAllComments(res?.data?.comments);
    });
  };
  const userComments = allComments?.filter((comment) => {
    return comment?.user_id === userId;
  });

  useEffect(() => {
    loadComments();
  }, []);
  return (
    <div>
      <Title pre="Welcome to your " postblue="Dashboard!" />
      <div className="mb-10 text-primary-text border-[1px] border-border bg-secondary-background shadow rounded-lg px-2 py-6 lg:py-10 lg:px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-3 xl:grid-cols-3">
        <div className="flex justify-center flex-col items-center gap-5 lg:gap-3 w-full bg-background rounded-xl px-3 pt-10 pb-5 border-[1px] border-border">
          <Title
            padding="0px"
            margin="0px"
            fontSize="80px"
            pre={allUserPosts?.length.toString()}
          />
          <Heading1 text="Total Posts" />
        </div>
        <div className="flex justify-center flex-col items-center gap-5 lg:gap-3 w-full bg-background rounded-xl px-3 pt-10 pb-5 border-[1px] border-border">
          <Title
            padding="0px"
            margin="0px"
            fontSize="80px"
            pre={userComments?.length.toString()}
          />
          <Heading1 text="Total Comments" />
        </div>
        <div className="flex justify-center flex-col items-center gap-0 w-full bg-background rounded-xl p-3 border-[1px] border-border">
          <TimeStamp accountStamp={checkedUser?.created_at} />
          <div className="text-center">
            <Heading1 text="Your Account was created" />
          </div>
        </div>
      </div>
    </div>
  );
};
