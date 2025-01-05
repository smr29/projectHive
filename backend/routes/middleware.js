import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized. Token missing." });
  }

  const token = authHeader.split(" ")[1];
  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure your JWT_SECRET is correct
    req.user = decoded; // Attach decoded data (user email or ID) to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};
