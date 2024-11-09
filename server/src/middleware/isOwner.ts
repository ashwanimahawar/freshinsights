import { NextFunction, Response } from "express";
import db from "../config/database";

export const isOwner = async (req: any, res: Response, next: NextFunction) => {
  const postId = req?.params?.id;
  const userId = req?.user?.id;
  const post = await db.query("SELECT * FROM posts WHERE id = $1", [postId]);
  if (post.rows[0].user_id === userId) {
    return next();
  } else {
    res.status(401).json({
      message: "You are not authorized to access this route, please login!",
      status: 400,
      redirect: "/login",
    });
  }
};
