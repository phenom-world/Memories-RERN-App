import express from "express";
const router = express.Router();
import {
  getPosts,
  getPost,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  getMyPosts,
  getSuggestedPosts,
} from "../controller/posts.js";
import validator from "../middleware/validator.js";
import auth from "../middleware/auth.js";
import schema from "../validation/post.js";
const { postSchema } = schema;

router.route("/").get(auth, getMyPosts).post(auth, validator(postSchema), createPost);
router.route("/all").get(getPosts);
router.get("/search", getPostsBySearch);
router.get("/suggestion", getSuggestedPosts);
router.route("/:id").patch(auth, updatePost).delete(auth, deletePost);
router.get("/:id", getPost);
router.patch("/:id/comment", commentPost);
router.patch("/:id/like", auth, likePost);

export default router;
