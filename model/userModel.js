import mongoose from "mongoose"

const userShema = mongoose.Schema({
  username: { type: String },
  password: { type: String },
  email: { type: String, unique: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
})
const User = mongoose.model("User", userShema)

export default User
