import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

interface SearchBarProps {
    setSearch?: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({setSearch}) => {
  return (
    <div className="inter w-full border-[1px] border-border rounded-xl py-2 px-6 flex text-primary-text bg-background gap-1">
      <SearchRoundedIcon />
      <input
        onChange={(e) => setSearch && setSearch(e.target.value)}
        className="w-full bg-background focus:outline-none"
        type="text"
        placeholder="Search Posts..."
      />
    </div>
  );
};
