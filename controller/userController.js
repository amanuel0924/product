import User from "../model/userModel.js"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"

const generateToken = (id) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

export const registerUser = asyncHandler(async (req, res, next) => {
  const { username, password, email, role } = req.body

  if (!username || !password || !email) {
    res.status(400)
    throw new Error("Please add all fields")
  }
  const isUserExist = await User.findOne({ email: email })
  if (isUserExist) {
    res.status(400)
    throw new Error("user alredy exist")
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  })
  res.status(201).json({
    message: "registerd success",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    },
  })
})
export const logInUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      message: "login successfuly",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      },
    })
  } else {
    res.status(400)
    throw new Error("Invalid credentials")
  }
})
export const getMyProfile = (req, res, next) => {
  res.status(200).json(req.user)
}
