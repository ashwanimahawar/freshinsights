import React from "react";
import { PrimaryButton } from "./PrimaryButton";
import { DeleteButton } from "./DeleteButton";

const SubHeading: React.FC<{
  prered?: string;
  pre?: string;
  postred?: string;
  post?: string;
  margin?: string;
  fontSize?: string;
  padding?: string;
}> = ({ prered, pre, postred, post, margin, padding, fontSize }) => {
  return (
    <h1
      style={{
        margin: margin,
        fontSize: fontSize,
        padding: padding,
      }}
      className="text-xl font-bold text-primary-text mb-3"
    >
      {" "}
      <span className="text-red-600">{prered}</span>
      {pre}
      <span className="text-red-600">{postred}</span>
      {post}
    </h1>
  );
};

export const AlertBox: React.FC<{
  prered?: string;
  pre?: string;
  postred?: string;
  cancelText?: string;
  proceedText?: string;
  post?: string;
  setter?: React.Dispatch<React.SetStateAction<boolean>>;
  proceedFunc?: (id?: string | number | undefined) => void;
}> = ({
  prered,
  pre,
  postred,
  post,
  setter,
  cancelText,
  proceedText,
  proceedFunc,
}) => {
  return (
    <div className="w-[95%] lg:w-[60%] 2xl:w-[45%] bg-secondary-background border-2 border-border rounded-xl py-5 lg:py-10 px-3 lg:px-5 mx-auto my-20">
      <div className="text-center">
        <SubHeading pre={pre} post={post} postred={postred} prered={prered} />
        <div className="flex gap-3 justify-center items-center">
          <PrimaryButton
            bg="darkgrey"
            text={cancelText}
            onClick={() => setter && setter(false)}
          />
          <DeleteButton onClick={proceedFunc} text={proceedText} />
        </div>
      </div>
    </div>
  );
};
