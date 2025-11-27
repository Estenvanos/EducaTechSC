import { Schema, model, models } from "mongoose";

const LessonSchema = new Schema({
  title: String,
  videoUrl: String,
  moduleId: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

export default models.Lesson || model("Lesson", LessonSchema);
