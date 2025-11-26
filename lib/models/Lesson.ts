import { Schema, model, models } from "mongoose";

const LessonSchema = new Schema({
  title: String,
  videoUrl: String,
  moduleId: { type: Schema.Types.ObjectId, ref: "Module" },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

export default models.Lesson || model("Lesson", LessonSchema);
