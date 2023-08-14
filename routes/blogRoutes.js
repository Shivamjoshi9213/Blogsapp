import express from "express";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogByIdController,
  updateBlogController,
  userBlogController,
} from "../controllers/blogController.js";

// router obecj
const router = express.Router();

// Routes
// GET || ALL BLOG
router.get("/all-blog", getAllBlogsController);

// GET || SINGLE BLOG
router.get("/get-blog/:id", getBlogByIdController);

// POST || CREATE BLOG
router.post("/create-blog", createBlogController);

// PUT || UPDATE BLOG
router.put("/update-blog/:id", updateBlogController);

// DELET || SINGLE BLOG
router.delete("/delete-blog/:id", deleteBlogController);

// GET || USER BLOG
router.get("/user-blog/:id", userBlogController);

export default router;
