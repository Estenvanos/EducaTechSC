import { Schema, model, models } from "mongoose";

const ProgressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  moduleId: { type: Schema.Types.ObjectId, ref: "Module" },
  completedLessons: [String],
  score: Number,
});

export default models.Progress || model("Progress", ProgressSchema);
