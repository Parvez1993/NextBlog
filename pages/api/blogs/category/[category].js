import nextConnect from "next-connect";
import Blog from "../../../../models/Blog";
import dbConnect from "../../../../utils/dbConnect";

const handlerId = nextConnect();

handlerId.get(async (req, res) => {
  dbConnect();
  const blog = await Blog.find({ category_name: req.query.category });
  if (blog) {
    res.status(200).json({ blog });
  } else {
    res.status(404).json({ msg: "no blogs found" });
  }
});

export default handlerId;
