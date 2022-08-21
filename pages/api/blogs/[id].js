import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";
import Blog from "../../../models/Blog";
import dbConnect from "../../../utils/dbConnect";

const handlerId = nextConnect();

handlerId.get(async (req, res) => {
  dbConnect();
  const blog = await Blog.findById(req.query.id);
  if (blog) {
    res.status(200).json({ blog });
  } else {
    res.status(404).json({ msg: "no blogs found" });
  }
});

export default handlerId;
