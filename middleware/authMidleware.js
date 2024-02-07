import User from "../model/userModel.js"
import Jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"

export const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decode = Jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decode.id).select("-password")
      next()
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
        error: error,
      })
    }
  }

  if (!token) {
    throw new Error("you are not loged in, please log in first")
  }
})
