import { Request, Response } from "express";
import db from "../config/database";

export const createComment = async (req: any, res: Response): Promise<any> => {
  const comment = req?.body?.content;
  const userId = req?.user?.id;
  const userName = req?.user?.name;
  const { postId } = req?.params;

  try {
    const dbResult = await db.query(
      "INSERT INTO comments (content, user_id, post_id, username) VALUES ($1, $2, $3, $4) RETURNING *",
      [comment, userId, postId, userName]
    );
    const Comment = dbResult.rows[0];
    return res.status(200).json({
      message: "Comment added Successfully!",
      status: 200,
      comment: Comment,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to add comment, try again later!",
      status: 400,
    });
  }
};

export const getComments = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const dbResult = await db.query("SELECT * FROM comments");
    return res.status(200).json({
      message: "Comments Loaded Successfully!",
      status: 200,
      comments: dbResult.rows,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to load comments, try again later!",
      status: 400,
    });
  }
};

export const deleteComment = async (req: any, res: Response): Promise<any> => {
  try {
    const postId = req?.params?.postId;
    await db.query("DELETE FROM comments WHERE id = $1", [postId]);
    return res
      .status(200)
      .json({ message: "Comment Deleted Successfully!", status: 200 });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "Failed to delete the comment, try again later!",
      status: 400,
    });
  }
};
