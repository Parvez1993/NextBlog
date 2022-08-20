import nextConnect from "next-connect";
import middleware from "../../../middleware/middleware";
import Blog from "../../../models/Blog";
import dbConnect from "../../../utils/dbConnect";

const handlerId = nextConnect();
handlerId.use(middleware);

handlerId.put(async (req, res) => {
  dbConnect();
  const blog = await blog.findById(req.params.id);
  if (blog) {
    res.status(StatusCodes.OK).json({ blog });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "no blogs found" });
  }
});

export default handlerId;
