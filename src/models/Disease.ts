import mongoose, { Schema } from "mongoose";
import { IDisease } from "./types/disease";

const diseaseSchema = new Schema<IDisease>(
  {
    catId: { type: String, required: true },
    gradeCode: { type: Number, default: null },
    diseaseCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

diseaseSchema.index({ diseaseCode: 1 }, { unique: true });
diseaseSchema.index({ catId: 1 });

const Disease = mongoose.model<IDisease>("Disease", diseaseSchema);

export default Disease;
