import { v2 as cloudinary } from "cloudinary";

let cloudprocess = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

export default cloudprocess;
