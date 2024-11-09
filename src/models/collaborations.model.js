import mongoose from "mongoose";

var collabSchema = new mongoose.Schema(
  {
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    onRequest: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollabRequest",
        required: true,
      },
    ],
    name: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: 0,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chatroom",
    },
  },
  {
    timestamps: true,
  }
);

const Collaboration = mongoose.model("Collaboration", collabSchema);
export { Collaboration };
