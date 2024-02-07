import User from "../model/userModel.js"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken"

export const registerUser = async (req, res, next) => {}
export const logInUser = (req, res, next) => {
  res.status(200).json({
    message: "loginUser success",
  })
}
