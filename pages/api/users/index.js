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
  let pageSize = 3;
  const page = Number(req.query.page) || 1;
  const skipit = (page - 1) * pageSize; //10

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const totalProducts = await User.count(keyword);
  const numOfPages = Math.ceil(totalProducts / pageSize);

  const users = await User.find({ ...keyword })
    .skip(skipit)
    .limit(pageSize);

  if (users) {
    res.status(200).json({ users, page, numOfPages });
  } else {
    res.status(404).send("no blogs found");
  }
});

export default handler;
