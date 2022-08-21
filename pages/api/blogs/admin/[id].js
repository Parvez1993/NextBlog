import nextConnect from "next-connect";
import middleware from "../../../../middleware/middleware";
import Blog from "../../../../models/Blog";
import dbConnect from "../../../../utils/dbConnect";

const handler = nextConnect();
handler.use(middleware);

handler.put(async (req, res) => {
  dbConnect();

  console.log(req.body.cloudinary_id, req.body.cloudinary_result);

  const blog = await Blog.findById(req.query.id);

  if (blog) {
    blog.user = req.user.userId;
    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.metaDesc = req.body.metaDesc || blog.metaDesc;
    blog.tags = req.body.tags || blog.tags;
    blog.status = req.body.status || blog.status;
    blog.cloudinary_id = req.body.cloudinary_id || blog.cloudinary_id;
    blog.cloudinary_result =
      req.body.cloudinary_result || blog.cloudinary_result;
    blog.image = req.body.image || blog.image;

    let saveBlog = await blog.save();
    return res.status(200).send(saveBlog);
  } else {
    return res.status(404).send("No Blog Found");
  }
});

handler.delete(async (req, res) => {
  dbConnect();

  const blog = await Blog.findById(req.query.id);
  if (blog) {
    await blog.remove();
    res.status(200).json(blog);
  } else {
    res.status(404).json("no products found");
  }
});

export default handler;
