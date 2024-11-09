import axios from "axios";
import { Comments, Post, User } from "../interfaces/interfaces";

const baseURL = import.meta.env.VITE_SERVER_URL;
const config = { withCredentials: true };

const imageConfig = {
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

//User Calls
export const registerNewUser = async (data: User) => {
  return await axios.post(`${baseURL}/user/register`, data, config);
};

export const loginUser = async (data: User) => {
  return await axios.post(`${baseURL}/user/login`, data, config);
};

export const logoutUser = async () => {
  return await axios.post(`${baseURL}/user/logout`, {}, config);
};

//Dashboard Call
export const getDashboard = async () => {
  return await axios.get(`${baseURL}/user/dashboard`, config);
};

//Post Calls
export const getAllPosts = async () => {
  return await axios.get(`${baseURL}/post`, config);
};

export const getPostById = async (id: number) => {
  return await axios.get(`${baseURL}/post/${id}`, config);
};

export const createNewPost = async (data: Post) => {
  return await axios.post(`${baseURL}/post/create`, data, config);
};

export const updatePost = async (
  id: number | string | undefined,
  data: Post
) => {
  return await axios.put(`${baseURL}/post/update/${id}`, data, config);
};

export const deletePost = async (id: number | string | undefined) => {
  return await axios.delete(`${baseURL}/post/delete/${id}`, config);
};

//Authentication Calls
export const checkUserAuth = async () => {
  return await axios.get(`${baseURL}/check-user/auth`, config);
};

//Image Calls
export const uploadImage = async (data: FormData) => {
  return await axios.post(`${baseURL}/image/upload`, data, imageConfig);
};

export const uploadUpdatedImage = async (data: FormData) => {
  return await axios.post(`${baseURL}/image/update`, data, imageConfig);
};

//Comment Calls
export const addComments = async (
  data: Comments,
  postId: number | string | undefined
) => {
  return await axios.post(`${baseURL}/comment/add/${postId}`, data, config);
};

export const getComments = async () => {
  return await axios.get(`${baseURL}/comment/get/`, config);
};

export const deleteComment = async (id: number | string | undefined) => {
  return await axios.delete(`${baseURL}/comment/delete/${id}`, config);
};
