import User from "../database/model/user.js";
import bcrypt from "bcrypt";
import createSecretToken from "../utils/generateToken.js";

const signup = async (req, res) => {
  try {
    const { email, password, name, usn } = req.body;

    // Check if all fields are provided
    if (!(email && password && name && usn)) {
      return res.status(400).send("All input is required");
    }

    // Check if the user already exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Hash the password before saving it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      name,
      usn,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    // Generate a token for the user
    const token = createSecretToken(user.usn);

    // Return the user data and token in the response
    res.json({
      message: "User registered successfully",
      user,
      token, // Include the token in the response
    });
  } catch (error) {
    console.error("Got an error", error);
    res.status(500).send("Internal Server Error");
  }
};

export default signup;
