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
    res.status(401).json({
      status: "fail",
      message: "you are not loged in, please log in first",
    })
  }
})

export const adminValidator = asyncHandler(async (req, res, next) => {
  if (req.user.role === "admin") {
    next()
  } else {
    res.status(403).json({
      error: "this route only for admin",
    })
  }
})
