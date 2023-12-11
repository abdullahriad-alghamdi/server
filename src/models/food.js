import { Schema, model } from "mongoose";

const foodSchema = new Schema(
  {
    name: String,
    type: String,
    price: Number,
  },
  { timestamps: true }
);

const Food = model("Food", foodSchema);

export default Food;
