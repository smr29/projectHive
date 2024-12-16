import { mongoose } from "mongoose"

const userSchema=mongoose.Schema({
      name:String,
      usn:String,
      email:String,
      password:String,
})
const user=mongoose.model("user",userSchema);

export default user