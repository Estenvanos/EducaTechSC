import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  level: String,
});

export default models.User || model("User", UserSchema);
