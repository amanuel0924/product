import express from "express"
import { protect, adminValidator } from "../middleware/authMidleware.js"

import {
  getAllProduct,
  getProducts,
  createproduct,
  updateproduct,
  deleteproduct,
} from "../controller/productControler.js"
const router = express.Router()

router.use(protect)

router.route("/").get(getProducts).post(createproduct)

router.route("/:id").delete(deleteproduct).put(updateproduct)
router.get("/getAllProduct", adminValidator, getAllProduct)

export default router
