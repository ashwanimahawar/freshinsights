import { Request, Response } from "express";
import db from "../config/database";

//Get All Posts
export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const result = await db.query(
      "SELECT * FROM posts ORDER BY created_at DESC"
    );
    return res.status(200).json({
      message: "Posts loaded successfully!",
      status: 200,
      posts: result.rows,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to load posts, try refreshing the page!",
      status: 400,
      posts: [],
    });
  }
};

//Get Single Post
export const getPost = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM posts WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Sorry, post doesn't exists!",
        status: 400,
        redirect: "/",
      });
    }

    return res.status(200).json({
      message: "Post loaded seccessfully!",
      status: 200,
      post: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to load post, try refreshing the page!",
      status: 400,
    });
  }
};

//Create Post
export const createPost = async (req: any, res: Response): Promise<any> => {
  const { title, content, imgsrc } = req?.body;
  const userId = req?.user?.id;
  try {
    const newPosts = await db.query(
      "INSERT INTO posts (title, content, imgsrc, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, imgsrc, userId]
    );
    return res.status(200).json({
      message: "Post created successfully!",
      status: 200,
      post: newPosts.rows[0],
      redirect: "/dashboard/post",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to create post, try again later!",
      status: 400,
      redirect: "/post/create",
    });
  }
};

//Update Post
export const updatePost = async (req: any, res: Response): Promise<any> => {
  const { title, content, imgsrc } = req?.body;
  const postId = req?.params?.id;

  try {
    const updatedPost = await db.query(
      "UPDATE posts SET title = $1, content = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
      [title, content, postId]
    );
    if (imgsrc) {
      db.query("UPDATE posts SET imgsrc = $1 WHERE id = $2", [imgsrc, postId]);
    }
    return res.status(200).json({
      message: "Post updated Successfully!",
      status: 200,
      post: updatedPost.rows[0],
      redirect: "/dashboard/post",
      isEditing: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to update post, try again later!",
      status: 400,
      redirect: "/dashboard/post",
    });
  }
};

//Delete Post
export const deletePost = async (req: Request, res: Response): Promise<any> => {
  const postId = req?.params?.id;
  try {
    await db.query("DELETE FROM comments WHERE post_id = $1", [postId]);
    await db.query("DELETE FROM posts WHERE id = $1", [postId]);
    return res
      .status(200)
      .json({ message: "Post Deleted Successfully!", status: 200 });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to delete post, try again later!",
      status: 400,
      redirect: "/post/delete",
    });
  }
};
