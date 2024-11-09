import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: [250, "Post must be less than 250 characters"],
    },
    media: [
      {
        type: String,
        required: false,
      },
    ],
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PostCategory",
      },
    ],
    githubUrl: {
      type: String,
    },
    deployed: {
      type: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export { Post };
