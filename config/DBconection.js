import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const DB = process.env.DB_URL

export const ConnectDB = async () => {
  try {
    const con = await mongoose.connect(DB)
    console.log("DB connection successful!")
  } catch (error) {
    console.log(error)
  }
}
