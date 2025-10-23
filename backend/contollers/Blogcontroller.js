import Blog from "../models/Blogmodel.js";
import User from "../models/Usermodel.js";
import { error, success } from "../utils/Response.js";
import cloudinary from "../config/Clodinary.js";
import{unlink}from "fs/promises"
const createblog = async (req, res) => {
  const { title, subtitle, description, category } = req.body;
  const image = req.files?.image && req.files.image[0];
  const { _id } = req.user;
  try {
    if (
      !title ||
      !subtitle ||
      !description ||
      !category ||
      image == undefined
    ) {
      return error(res, "Pls provide the all fields");
    }
    if (!_id) {
      return error(res, "Authentication failed");
    }
    const user = User.findOne({ _id });
    if (!user) {
      return error(res, "Authentication failed");
    }

    const url = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });
    if (!url.secure_url) {
      return error(res, "Something went wrong in Image upload cloudinary");
    }
    await unlink(image.path)

    const newblog = await Blog.create({
      title,
      subtitle,
      description,
      image: url.secure_url,
      author: _id,
      category,
    });

    if (!newblog) {
      return error(res, "Couldn't create blog");
    }
    return success(res, "Blog created");
  } catch (err) {
    return error(res, err.message);
  }
};

const getallblog = async (req, res) => {
  const { _id } = req.user;
  try {
    if (!_id) return error(res, "Authentication failed");
    const blogs = await Blog.find({ });
    if (blogs.length < 1) {
      return error(res, "No blog found");
    }

    return success(res, "Blog found", blogs);
  } catch (error) {
    return error(res, error.message);
  }
};
const listownblog = async (req, res) => {
  const { _id } = req.user;
  try {
    const blog = await Blog.find({author: _id });
    if (blog.length < 1) return error(res, "No blog found");
    return success(res, "Blog found", blog);
  } catch (error) {
    return error(res, error.message);
  }
};
const postblog = async (req, res) => {
  const{_id}=req.user
  const { blogid } = req.body;
  try {
    if (!blogid) {
      return error(res, "Pls provide blog");
    }
    const blog = await Blog.findOneAndUpdate(
      { _id: blogid,author:_id },
      { ispublished: true },
      { new: true }
    );
    if (!blog) {
      return error(res, "Cannot post blog");
    }
    return success(res, "Blog posted !");
  } catch (error) {
    return error(res, error.message);
  }
};

const blogbyid = async (req, res) => {
  const { blogid } = req.body;
  try {
    if (!blogid) {
      return error(res, "Provide blog ");
    }
    const blog = await Blog.findOne({ _id: blogid }).populate({
      path: "comments",
      select:"sender message createdAt",
      populate: {
        path: "sender",
        select:"fullname profilepic"
      },
    }).populate({
      path:"author",
      select:"fullname bio profilepic coverpic"
    });
    if (!blog) {
      return error(res, "Not found");
    }

    return success(res, "Found", blog);
  } catch (error) {
    return error(res, error.message);
  }
};

export { createblog, getallblog, postblog, listownblog, blogbyid };
