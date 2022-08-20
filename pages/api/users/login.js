import User from "../../../models/User.js";
import { createSendToken } from "../../../utils/createSendToken";
import dbConnect from "../../../utils/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  if (req.method === "POST") {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      res.status(404).send("Please provide all the values");
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(404).send("Incorrect credentials");
    }

    // 3) If everything ok, send token to client

    createSendToken(user, 200, req, res);
  }
}
