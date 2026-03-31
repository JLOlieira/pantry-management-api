import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    unit: String,
    category: String,
    location: String,
    groupId: String, // já preparando pro futuro
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
