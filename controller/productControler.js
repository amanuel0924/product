import { Product } from "./../model/productModel.js"
import User from "../model/userModel.js"

export const getAllProduct = async (req, res, next) => {
  const products = await Product.find()
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  })
}
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ owner: req.user.id })
    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    })
  }
}
export const createproduct = async (req, res, next) => {
  try {
    const product = await Product.create({ ...req.body, owner: req.user.id })

    res.status(200).json({
      status: "success",
      data: product,
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    })
  }
}
export const deleteproduct = async (req, res, next) => {
  try {
    console.log(req.user)
    const product = await Product.findById(req.params.id)

    if (!product) {
      res.status(400).json({
        error: "product not found",
      })
    }
    const user = await User.findById(req.user.id)

    if (!user) {
      res.status(400).json({
        error: "user not found",
      })
    }
    if (user.id !== product.owner.toString()) {
      res.status(400).json({
        error: "you have no permition",
      })
    }
    await Product.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: "success",
      message: "data deleted successfully",
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    })
  }
}
export const updateproduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(400).json({
      error: "product not found",
    })
    return
  }
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(400).json({
      error: "user not found",
    })
    return
  }

  if (user.id !== product.owner.toString()) {
    res.status(400).json({
      error: "you have no permition",
    })
    return
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  )

  res.status(200).json({
    status: "success",
    message: updatedProduct,
  })
}
