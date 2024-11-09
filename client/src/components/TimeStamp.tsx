import React, { useEffect, useState } from "react";
import { TimeStampProps } from "../interfaces/interfaces";
import { Title } from "./Title";

const Paragraph: React.FC<{
  text: string | undefined;
  fontSize?: string;
  padding?: string;
  margin?: string;
  fontWeight?: string;
}> = ({ text, margin, padding, fontSize, fontWeight }) => {
  return (
    <p
      style={{
        margin: margin,
        padding: padding,
        fontSize: fontSize,
        fontWeight: fontWeight,
      }}
      className="py-2 text-md text-secondary-text break-words"
    >
      {text}
    </p>
  );
};

export const TimeStamp: React.FC<TimeStampProps> = ({
  TimeStamp,
  updateStamp,
  padding,
  margin,
  accountStamp,
}) => {
  const [date, setDate] = useState<Date>();
  const [upDate, setUpDate] = useState<Date>();
  const [accDate, setAccDate] = useState<Date>();

  useEffect(() => {
    if (TimeStamp) {
      const date = new Date(TimeStamp);
      setDate(date);
    }
  }, [TimeStamp]);

  useEffect(() => {
    if (updateStamp) {
      const date = new Date(updateStamp);
      setUpDate(date);
    }
  }, [updateStamp]);

  useEffect(() => {
    if (accountStamp) {
      const date = new Date(accountStamp);
      setAccDate(date);
    }
  }, [accountStamp]);

  return (
    <>
      {date !== undefined && (
        <div
          style={{
            padding: padding,
            margin: margin,
          }}
          className="my-2 flex msm:gap-2 flex-col msm:flex-row msm:items-center"
        >
          <Paragraph fontSize="15px" padding="0px" text="Posted on: " />
          <span className="flex gap-2">
            <Paragraph
              padding="0px"
              fontSize="12px"
              text={date?.toDateString()}
            />
            <Paragraph
              padding="0px"
              fontSize="12px"
              text={date?.toLocaleTimeString()}
            />
          </span>
        </div>
      )}
      {upDate !== undefined && (
        <div
          style={{
            padding: padding,
            margin: margin,
          }}
          className="my-2 flex msm:gap-2 flex-col msm:flex-row msm:items-center"
        >
          <Paragraph fontSize="15px" padding="0px" text="Updated on: " />
          <span className="flex gap-2">
            <Paragraph
              padding="0px"
              fontSize="12px"
              text={upDate?.toDateString()}
            />
            <Paragraph
              padding="0px"
              fontSize="12px"
              text={upDate?.toLocaleTimeString()}
            />
          </span>
        </div>
      )}
      {accDate !== undefined && (
        <>
          <Title padding="0px" margin="8px 0px" fontSize="30px" pre={accDate?.toDateString()} />{" "}
          <Title padding="0px" margin="8px 0px" fontSize="30px" pre={accDate?.toLocaleTimeString()} />
        </>
      )}
    </>
  );
};
