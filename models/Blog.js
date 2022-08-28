import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const imageSchema = mongoose.Schema(
  {
    id: { type: String },
    result: { type: String },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const blogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    metaDesc: { type: String, required: true },
    tags: [{ type: String, required: true }],
    status: {
      type: String,
      required: true,
    },
    cloudinary_id: { type: String, required: true },
    cloudinary_result: { type: String, required: true },
    category_name: { type: String, default: "frontend" },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
