import mongoose from "mongoose";

const GroupSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Group", GroupSchema);
