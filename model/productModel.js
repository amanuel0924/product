import mongoose from "mongoose"

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
})

export const Product = mongoose.model("Product", productSchema)
