import { Product } from "./../model/productModel.js"


export const getAllproducts = async (req, res, next) => {
  try {
    const products = await Product.find()
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
    const product = await Product.create(req.body)

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
  try {
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
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    })
  }
}
