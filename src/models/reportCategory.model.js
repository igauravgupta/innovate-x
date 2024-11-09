import mongoose from "mongoose";

const reportCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
});

export const ReportCategory = mongoose.model(
  "ReportCategory",
  reportCategorySchema
);
