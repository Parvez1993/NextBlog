import User from "../../../models/User.js";
import { createSendToken } from "../../../utils/createSendToken";
import dbConnect from "../../../utils/dbConnect";

export default async function handler(req, res) {
  dbConnect();
  if (req.method === "POST") {
    const { name, password, email } = req.body;
    if (!name || !email || !password) {
      res.status(404).send("Please Fill all the Forms");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(404).send("Email already in use");
    }
    const user = await User.create(req.body);

    createSendToken(user, 200, req, res);
  }
}
