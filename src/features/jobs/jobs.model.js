import { model, Schema } from "mongoose";
import { JOB_STATUS } from "../../utils/constant.js";
import mongoose from "mongoose";
const JobSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, "Veuillez fournir une netreprise"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Veuillez fournir un poste"],
      maxlength: 100,
    },

    status: {
      type: String,
      enum: [JOB_STATUS.DECLINED, JOB_STATUS.INTERVIEW, JOB_STATUS.PENDING],
      default: JOB_STATUS.PENDING,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Veuillez fournir un utilisateur"],
    },
  },
  { timestamps: true }
);

export default model("Job", JobSchema);
