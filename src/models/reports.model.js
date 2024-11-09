// report accoount for any misleading content

import mongoose, { Mongoose } from "mongoose";

var reportSchema = new mongoose.Schema(
  {
    Category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReportCategory",
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reportedWhom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    actionTaken: {
      type: Boolean,
      default: 0,
    },
  },
  { timestamps: true }
);

//Export the model
export const Report = mongoose.model("Report", reportSchema);
