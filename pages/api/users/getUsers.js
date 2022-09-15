// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";

//  public functions

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  dbConnect();

  const users = await User.find({ isAdmin: false });

  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404).send("no blogs found");
  }
});

export default handler;
