import nextConnect from "next-connect";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
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
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "blogs",
  });
  res.send({ id: result.public_id, result: result.secure_url });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
