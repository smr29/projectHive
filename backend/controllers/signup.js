import User from "../database/model/user.js"; 
import bcrypt from "bcrypt"; 
import createSecretToken from "../utils/generateToken.js"; 

const signup = async (req, res) => {
  try {
    const { email, password, name, usn } = req.body;
    if (!(email && password && name && usn)) {
      return res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      usn,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    const token = createSecretToken(user.usn);

    res.cookie("token", token, {
      path: "/",
      expires: new Date(Date.now() + 86400000), 
      httpOnly: true,
      sameSite: "None",
    });

    console.log("Cookie set successfully");

    res.json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Got an error", error);
    res.status(500).send("Internal Server Error");
  }
};

export default signup;
