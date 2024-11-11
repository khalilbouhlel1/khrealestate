import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Please login to access this resource" 
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          username: true,
          avatar: true,
          role: true
        }
      });

      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: "User not found" 
        });
      }

      req.user = user;
      next();
    } catch (jwtError) {
      console.error("JWT verification error:", jwtError);
      return res.status(401).json({ 
        success: false, 
        message: "Invalid or expired token" 
      });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}; 