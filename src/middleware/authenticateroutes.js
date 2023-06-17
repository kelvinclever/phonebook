import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const {JWT_SECRET}= process.env;
    const decoded=jwt.verify(token,JWT_SECRET);
    req.userData=decoded;
    
    next();
  } catch (error) {
    res.status(500).json({ message: "please login auth failed" });
  }
  
};
