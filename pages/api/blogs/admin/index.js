// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nextConnect from "next-connect";
import middleware from "../../../../middleware/middleware";
import Blog from "../../../../models/Blog";
import dbConnect from "../../../../utils/dbConnect";

const handler = nextConnect();
handler.use(middleware);

handler.post(async (req, res) => {
  dbConnect();

  const {
    title,
    content,
    metaDesc,
    tags,
    status,
    cloudinary_id,
    cloudinary_result,
    numReviews,
  } = req.body;

  const blog = await Blog.create({
    user: req.user.userId,
    title,
    content,
    metaDesc,
    tags,
    status,
    tags,
    cloudinary_id,
    cloudinary_result,
    numReviews,
  });

  if (blog) {
    return res.status(201).send({ blog });
  } else {
    return res.status(404).send("No Blog Found");
  }
});

export default handler;
