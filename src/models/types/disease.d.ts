import { Document } from "mongoose";

export interface IDisease extends Document {
  catId: string;
  gradeCode: number | null;
  diseaseCode: string;
  name: string;
  category: string;
  description: string;
}
