import React from "react";

export interface User {
  id?: number | null;
  name?: string;
  email: string;
  created_at?: string | number | Date | undefined;
  password: string;
}

export interface ProfileProps {
  checkedUser?: User;
}

export interface DashProps {
  posts?: Post[];
  checkedUser?: User;
}

export interface TimeStampProps {
  accountStamp?: string | number | Date | undefined;
  padding?: string;
  margin?: string;
  TimeStamp?: string | number | Date | undefined;
  updateStamp?: string | number | Date | undefined;
}

export interface Comments {
  id?: number;
  user_id?: number | string;
  post_id?: number | string;
  content: string;
  username?: string;
  created_at?: string | number | Date;
}

export interface CommentProps {
  comments?: Comments[];
  post?: Post | null | undefined;
  isLogin?: boolean;
  postId?: string | number | undefined;
  checkedUser?: User;
}

export interface PagesProps {
  posts?: Post[];
}

export interface ListProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface ListItemProps {
  style?: React.CSSProperties;
  bold?: string;
  post?: string;
  break?: boolean;
  mailto?: string;
}

export interface Post {
  id?: number | string;
  title: string | undefined;
  imgsrc: string;
  content: string;
  author?: string;
  created_at?: Date;
  updated_at?: Date;
  user_id?: number;
}

export interface LoginProps {
  isLogin?: boolean;
  setIsLogin?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PostCardProps {
  deleteThisPost?: () => void;
  onClick?: () => void;
  currentPost?: Post | null | undefined;
  setCurrentPost?:
    | React.Dispatch<React.SetStateAction<Post | null | undefined>>
    | undefined;
  imgsrc: string;
  openPost?: () => void;
  title: string | undefined;
  LatestPosts?: Post[];
  description: string;
  isEditing?: boolean;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface AllPostProps {
  isLogin?: boolean;
  setCurrentPost?:
    | React.Dispatch<React.SetStateAction<Post | null | undefined>>
    | undefined;
  currentPost?: Post | null | undefined;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
  posts?: Post[];
  post?: Post | null;
  checkedUser?: User;
  filteredPosts?: Post[];
  setPosts?: React.Dispatch<React.SetStateAction<Post[]>>;
}

export interface ParagraphProps {
  whiteSpace?: string;
  text: string | undefined;
  fontSize?: string;
  padding?: string;
  margin?: string;
}
