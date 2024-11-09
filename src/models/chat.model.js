import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      maxlength: [250, "Post must be less than 250 characters"],
    },
    By: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    Date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

export { Chat };
