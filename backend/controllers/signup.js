const User = require("../database/model/user");

const { createSecretToken } = require("../utils/generateToken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    if (
      !(
        req.body.email &&
        req.body.password &&
        req.body.name &&
        req.body.usn
      )
    ) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email: req.body.email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      name: req.body.name,

      usn: req.body.usn,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      path: "/", 
      expires: new Date(Date.now() + 86400000), 
      secure: true, 
      httpOnly: true, 
      sameSite: "None",
    });

    console.log("cookie set succesfully");

    res.json(user);
  } catch (error) {
    console.log("Gott an error", error);
  }
};
module.exports = signup;