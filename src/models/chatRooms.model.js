import mongoose from "mongoose";

var chatRoomSchema = new mongoose.Schema(
  {
    persons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chatroom = mongoose.model("Chatroom", chatRoomSchema);
export { Chatroom };
