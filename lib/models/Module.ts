import { Schema, model, models } from "mongoose";

const ModuleSchema = new Schema({
  title: String,
  category: String,
});

export default models.Module || model("Module", ModuleSchema);
