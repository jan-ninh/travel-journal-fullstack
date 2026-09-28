// src\data\index.ts
import {
  createPost,
  getPosts,
  getSinglePost,
  deletePost,
  updatePost,
} from "./posts";
import { login, register, me, logout } from "./auth";

export {
  createPost,
  getPosts,
  getSinglePost,
  deletePost,
  updatePost,
  login,
  register,
  me,
  logout,
};
