import bodyParser from "body-parser";
import multer from "multer";
import nextConnect from "next-connect";
import middleware from "../../../../middleware/middleware";
var upload = multer({ dest: "uploads/" });

const ImageHandler = nextConnect();
ImageHandler.use(middleware);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

ImageHandler.post(upload.single("avatar"), (req, res) => {
  res.send(bodyParser.json(req.file));
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ImageHandler;
