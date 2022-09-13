import nextConnect from "next-connect";
import middleware from "../../../../middleware/middleware";
import Blog from "../../../../models/Blog";
import User from "../../../../models/User";
import dbConnect from "../../../../utils/dbConnect";

const handlerId = nextConnect();
handlerId.use(middleware);

handlerId.post(async (req, res) => {
  dbConnect();
  const { rating, comment } = req.body;

  console.log(rating, comment, req.user.userId);
  const blog = await Blog.findById(req.query.id);

  if (blog) {
    const product = await Blog.findById(req.query.id);

    if (product) {
      console.log(product.reviews[0].user.toString());
      console.log(req.user.userId);
      const alreadyReviewed = await product.reviews.find((r) => {
        return r.user.toString() === req.user.userId;
      });

      console.log("already reviewed", alreadyReviewed);

      if (alreadyReviewed) {
        throw new Error("Sorry");
      }
      let userdetail = await User.findById(req.user.userId).select("-password");
      const review = {
        name: userdetail.name,
        rating: Number(rating),
        comment,
        user: req.user.userId,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length; //5
      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404).send("No Review Found");
    }
  }
});

export default handlerId;
