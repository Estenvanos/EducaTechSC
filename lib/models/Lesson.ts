import { Schema, model, models } from "mongoose";

const LessonSchema = new Schema({
  title: String,
  videoUrl: String,
  order: Number,
  moduleId: { type: Schema.Types.ObjectId, ref: "Module" },
});

export default models.Lesson || model("Lesson", LessonSchema);
