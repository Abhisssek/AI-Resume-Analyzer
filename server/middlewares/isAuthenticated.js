import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    
    if (!token) {
      return res
        .status(401)
        .json({ message: "you must be logged out (no token found)", success: false });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log(req.user);
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
};

export default isAuthenticated;
