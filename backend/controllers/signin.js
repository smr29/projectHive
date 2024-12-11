const User = require("../database/model/user");
const bcrypt = require("bcrypt");

const env = require("dotenv");
const { createSecretToken } = require("../utils/generateToken");

env.config();

const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({ message: "All input is required" });
  }
  const user = await User.findOne({ email });
  if (!(user && (await bcrypt.compare(password, user.password)))) {
    return res.status(404).json({ message: "Invalid credentials" });
  }
  const token = createSecretToken(user._id);
  // res.cookie("token", token, {
  //   domain: process.env.FRONTEND_URL, 
  //   path: "/", 
  //   expires: new Date(Date.now() + 86400000), 
  //   secure: true, 
  //   httpOnly: true, 
  //   sameSite: "None",
  // });

  res.json({ token });
};
module.exports = signin;