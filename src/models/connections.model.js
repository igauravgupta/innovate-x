import mongoose from "mongoose";

var connectionsSchema = new mongoose.Schema(
  {
    // jo hmko follow kar rhe
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // hm jinhe follow kar rhe
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    relatedto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Connection = mongoose.model("Connection", connectionsSchema);
export { Connection };
