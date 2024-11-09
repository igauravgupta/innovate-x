import { type } from "express/lib/response";
import mongoose from "mongoose";

var collabRequestSchema = new mongoose.Schema(
  {
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    details: {
      type: String,
      required: true,
      maxlength: [100, "comment should not exceed 100 characters"],
    },
    completed: {
      type: Boolean,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", collabRequestSchema);
export { Comment };
