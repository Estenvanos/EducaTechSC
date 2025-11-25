import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, unique: true, required: true },
  fullName: String,
  email: { type: String, unique: true },

  likedLessons: {
    type: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
    default: [],
  },

  dislikedLessons: {
    type: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
    default: [],
  },
});

export default models.User || model("User", UserSchema);
