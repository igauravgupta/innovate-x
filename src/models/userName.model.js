import mongoose from "mongoose";

const userNameSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxlength: [15, "Username should not exceed 15 characters"],
  },
  ownedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const UserName = mongoose.model("UserName", userNameSchema);

export { UserName };
