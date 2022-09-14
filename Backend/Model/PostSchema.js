/** @format */

const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, trim: true },
    body: { type: String, trim: true },
    image: { type: String, trim: true },
    popularity: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
