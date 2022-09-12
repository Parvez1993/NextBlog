// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Blog from "../../../models/Blog";
import dbConnect from "../../../utils/dbConnect";

//  public functions

export default async function handler(req, res) {
  dbConnect();
  const blog = await Blog.find({ status: "completed" });
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(404).send("no blogs found");
  }
}
