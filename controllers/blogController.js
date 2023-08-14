import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModels.js";

// get all blogs
export const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find().populate("user");
    if (blogs) {
      return res.status(200).send({
        blogCount: blogs.length,
        message: "All blogs List  ",
        success: true,
        blogs,
      });
    } else {
      return res.status(200).send({
        message: "No blogs found ",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while fetching blogs data  ",
      success: false,
      error,
    });
  }
};

// single blog get
export const getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        message: "Blog Not Found with this id",
        success: false,
      });
    }
    return res.status(200).send({
      message: " blog found successfully",
      success: true,
      blog,
    });
    //
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while fetching  single blog data  ",
      success: false,
      error,
    });
  }
};
//   create blog
export const createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    // validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        message: "Please Provide All Fields  ",
        success: false,
      });
    }

    const existingUser = await userModel.findById(user);
    // validation
    if (!existingUser) {
      return res.status(404).send({
        message: "Unable to find User",
        success: false,
      });
    }

    const newBlog = new blogModel({
      title,
      description,
      image,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();

    await newBlog.save();
    return res.status(201).send({
      message: "Blog created successfully  ",
      success: true,
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while creating blog  ",
      success: false,
      error,
    });
  }
};
//   update blog
export const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      message: "Blog updated successfully  ",
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while updating blog  ",
      success: false,
      error,
    });
  }
};
//   delete blog
export const deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id).lean();
    if (!blog) {
      return res.status(404).send({
        message: "Blog not found",
        success: false,
      });
    }

    const userId = blog.user && blog.user._id; // Check if user object is defined

    await blogModel.findByIdAndDelete(id);

    if (userId) {
      // Remove the reference to the deleted blog from the user's 'blogs' array
      const user = await userModel.findById(userId);
      if (user) {
        user.blogs.pull(id);
        await user.save();
      }
    }

    return res.status(200).send({
      message: "Blog deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while deleting blog",
      success: false,
      error,
    });
  }
};

// export const deleteBlogController = async (req, res) => {
//   try {
//     const blog = await blogModel
//       // .findOneAndDelete(req.params.id)
//       .findByIdAndDelete(req.params.id)
//       .populate("user");
//     await blog.user.blogs.pull(blog);
//     await blog.user.save();
//     return res.status(200).send({
//       success: true,
//       message: "Blog Deleted!",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       success: false,
//       message: "Erorr WHile Deleteing BLog",
//       error,
//     });
//   }
// };

export const userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "  BLogs not found with this id ",
      });
    }
    return res.status(200).send({
      success: true,
      message: "User BLog Data",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr While fetching user BLog",
      error,
    });
  }
};
