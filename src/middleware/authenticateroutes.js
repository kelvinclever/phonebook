import jwt from 'jsonwebtoken';
import {JWT_SECRET} from 'dotenv'

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing." });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token." });
    }

    // Attach the decoded user object to the request for further use
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  });
};
