import mongoose from "mongoose"
import User from "./userModel.js"

const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
})

export const Product = mongoose.model("Product", productSchema)
