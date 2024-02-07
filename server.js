import dotenv from "dotenv"
import express from "express"
import { ConnectDB } from "./config/DBconection.js"
import productRouter from "./routes/productRoute.js"
import userRouter from "./routes/userRoute.js"

dotenv.config()
const app = express()
await ConnectDB()
app.use(express.json())
app.use("/api/products", productRouter)
app.use("/api/users", userRouter)

app.listen(process.env.PORT, () => {
  console.log("app runinng on port", process.env.PORT)
})
