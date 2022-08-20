import User from "../models/User.js";
const adminAuth = async (req, res, next) => {
  try {
    req.admin = await User.findById(req.user.userId).select("-password");
    if (req.user.userId && req.admin.isAdmin === true) {
      next();
    }
  } catch (error) {
    res.status(404).send("Authentication invalid");
  }
};

export default adminAuth;
