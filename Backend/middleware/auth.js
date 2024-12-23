import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
  console.log('Headers:', req.headers);
  const authHeader = req.headers.authorization;
  console.log('Auth header:', authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
          success: false,
          message: "No token provided"
      });
  }

  const token = authHeader.split(" ")[1];
  console.log('Extracted token:', token);

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);
      req.user = decoded;
      next();
  } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).json({
          success: false,
          message: "Invalid token"
      });
  }
};
