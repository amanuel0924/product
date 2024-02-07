import express from "express"
import { registerUser, logInUser } from "./../controller/userController.js"
import { userValid } from "./../middleware/userValidator.js"

const router = express.Router()

router.route("/register").post(userValid, registerUser)
router.route("/login").post(logInUser)

export default router
