/** @format */

const cloudinary = require("cloudinary");
const Post = require("../Model/PostSchema");
const { default: mongoose } = require("mongoose");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

class PostController {
  constructor() {
    console.log("Post controller running");
  }

  async createPost(req, res) {
    // destructing request body
    const { title, body, popularity } = req.body;
    if (!req.files) {
      return res
        .status(401)
        .json({ msg: "Invalid post request", status: false });
    } else {
      const file = req.files.image;
      // Upload image into cloudinary...
      cloudinary.uploader.upload(file.tempFilePath, async (result, err) => {
        if (err) {
          // console.log(err);
          return res.status(501).json({ msg: err.message });
        } else {
          const newPost = Post({
            _id: new mongoose.Types.ObjectId(),
            title: title,
            body: body,
            image: result.url,
            popularity: popularity,
          });

          const data = await newPost.save();
          try {
            return res
              .status(201)
              .json({ msg: "Post has been saved", post: data });
          } catch (error) {
            return res.status(501).json({ msg: error.message });
          }
        }
      });
    }
  }

  async fetchPosts(req, res) {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    try {
      return res.status(200).json({ posts: posts });
    } catch (error) {
      return res.status(501).json({ msg: error.message });
    }
  }

  async fetchSinglePost(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.status(401).json({ msg: "Invalid request id" });
    } else {
      const post = await Post.findById(id);
      try {
        return res.status(200).json({ post: post });
      } catch (error) {
        return res.status(501).json({ msg: error.message });
      }
    }
  }
}

module.exports = new PostController();
