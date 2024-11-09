import React from "react";
import { PostCardProps } from "../interfaces/interfaces";

export const LatestPostCards: React.FC<PostCardProps> = ({
  title,
  imgsrc,
  description,
  onClick,
}) => {
  //Without Hover
  const laptopDescription = description.slice(0, 200) + "...";
  const tabletDescription = description.slice(0, 150) + "...";
  const mobileDescription = description.slice(0, 100) + "...";
  const bigDescription = description.slice(0, 300) + "...";

  //On Hover
  const smallDescription = description.slice(0, 500) + "...";
  const midDescription = description.slice(0, 300) + "...";

  return (
    <div
      onClick={onClick}
      className="inter hover:scale-[1.02] transition-all group cursor-pointer relative cards w-auto bg-secondary-background rounded-2xl border-[1px] border-border h-[450px] overflow-hidden hover:flex hover:items-center object-fill"
    >
      {/* Background with blur */}
      <div
        style={{
          filter: "blur(8px)",
          backgroundImage: `url(${imgsrc})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          transition: "filter 0.3s ease-in-out",
        }}
        className="absolute group-hover:block hidden inset-0 w-full h-full"
      ></div>
      <img
        src={imgsrc}
        alt="Featured"
        className="min-h-[50%] group-hover:hidden w-full h-[80%] object-fill"
      />
      {/* On Hover */}
      <div className="transition-all duration-300 my-3 group-hover:opacity-100 opacity-0 bg-transparent group-hover:bg-secondary-background relative z-20 w-[97%] mx-auto rounded-xl py-3 flex flex-col justify-center px-5">
        <h2 className="text-primary-text font-extrabold text-2xl break-words inter my-3">
          {title}
        </h2>
        <p className="block md:hidden xl:block font-semibold break-words text-secondary-text text-sm">
          {smallDescription}
        </p>
        <p className="hidden md:block xl:hidden font-semibold break-words text-secondary-text text-sm">
          {midDescription}
        </p>
      </div>

      {/* Without Hover */}
      <div className="transition-all duration-300 group-hover:hidden block bottom-0 bg-secondary-background absolute z-10 w-full py-3 flex flex-col justify-center px-5">
        <h2 className="text-primary-text font-extrabold text-2xl break-words inter mb-3">
          {title}
        </h2>
        <p className="hidden xl:block 2xl:hidden tracking-wide font-semibold break-words text-secondary-text text-sm">
          {laptopDescription}
        </p>
        <p className="block sm:hidden font-semibold tracking-wide text-secondary-text break-words text-sm">
          {mobileDescription}
        </p>
        <p className="hidden sm:block xl:hidden tracking-wide font-semibold text-secondary-text break-words text-sm">
          {tabletDescription}
        </p>
        <p className="hidden 2xl:block font-semibold tracking-wide text-secondary-text break-words text-sm">
          {bigDescription}
        </p>
      </div>
    </div>
  );
};
