// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Blog from "../../../models/Blog";
import dbConnect from "../../../utils/dbConnect";

//  public functions

export default async function handler(req, res) {
  dbConnect();
  let pageSize = 4;
  const page = Number(req.query.page) || 1;
  const skipit = (page - 1) * pageSize; //10

  const statuses = req.query.status;

  const statusFiler = statuses !== "all" ? { status: statuses } : "";

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const totalProducts = await Blog.count(keyword);
  const numOfPages = Math.ceil(totalProducts / pageSize);

  const blogs = await Blog.find({ ...keyword, ...statusFiler })
    .skip(skipit)
    .limit(pageSize);

  if (blogs) {
    res.status(200).json({ blogs, page, numOfPages });
  } else {
    res.status(404).send("no blogs found");
  }
}
