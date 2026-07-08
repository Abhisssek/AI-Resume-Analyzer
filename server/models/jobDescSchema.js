import mongoose from "mongoose";

const jobDescSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobTitle: {
      type: String,
      trim: true,
      default: "",
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    jobDescription: {
      type: String,
      trim: true,
      default: "",
    },
    parsedJobData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    sourceUrl: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true },
);

export default mongoose.model("JobDesc", jobDescSchema);
