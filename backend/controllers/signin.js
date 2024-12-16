import User from "../database/model/user.js"; 
import bcrypt from "bcrypt"; 
import env from "dotenv"; 
import createSecretToken from '../utils/generateToken.js'

env.config(); 

const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).json({ message: "All input is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!(user && (await bcrypt.compare(password, user.password)))) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const token = createSecretToken(user._id);

    // Uncomment if you want to send a cookie with the token
    // res.cookie("token", token, {
    //   domain: process.env.FRONTEND_URL,
    //   path: "/",
    //   expires: new Date(Date.now() + 86400000), // Expires in 1 day
    //   secure: true,
    //   httpOnly: true,
    //   sameSite: "None",
    // });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default signin;
