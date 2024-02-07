import express from "express"
import {
  registerUser,
  logInUser,
  getMyProfile,
} from "./../controller/userController.js"
import { userValid } from "./../middleware/userValidator.js"
import { protect } from "../middleware/authMidleware.js"

const router = express.Router()

router.route("/register").post(userValid, registerUser)
router.route("/login").post(logInUser)
router.get("/profile", protect, getMyProfile)

export default router
