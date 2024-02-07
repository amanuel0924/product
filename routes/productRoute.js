import express from "express"

import {
  getAllproducts,
  createproduct,
  updateproduct,
  deleteproduct,
} from "../controller/productControler.js"
const router = express.Router()

router.route("/").get(getAllproducts).post(createproduct)

router.route("/:id").delete(deleteproduct).put(updateproduct)

export default router
