/** @format */

const router = require("express").Router();
const {
  createPost,
  fetchPosts,
  fetchSinglePost,
} = require("../Controller/PostController");

router.post("/", createPost);
router.get("/", fetchPosts);
router.get("/:id", fetchSinglePost);

module.exports = router;
