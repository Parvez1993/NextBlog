import nextConnect from "next-connect";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Blog from "../../../../../models/Blog";
import dbConnect from "../../../../../utils/dbConnect";
const upload = multer({
  storage: multer.diskStorage({}),
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("image"));

apiRoute.post(async (req, res) => {
  const id = req.query.id;
  dbConnect();

  const blog = await Blog.findById(id);

  await cloudinary.uploader.destroy(`${blog.cloudinary_id}`);

  if (blog) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "blogs",
    });

    return res.send({ id: result.public_id, result: result.secure_url });
  } else {
    res.status(404).send("Not found");
  }
});

//delete also here//////////////////////////////////////////////////////////////////////////////////////////////

apiRoute.delete(async (req, res) => {
  const id = req.query.id;
  dbConnect();

  const blog = await Blog.findById(id);

  await cloudinary.uploader.destroy(`${blog.cloudinary_id}`);
  await blog.remove();

  return res.send("succesfully deleted");
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
