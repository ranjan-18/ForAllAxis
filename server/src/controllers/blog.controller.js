import asyncHandler from '../utils/asyncHandler.js';
import BlogPost from '../models/BlogPost.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';

export const getAll = asyncHandler(async (req, res) => {
  const filter = { isPublished: true };
  const posts = await BlogPost.find(filter)
    .populate('author', 'name avatar')
    .sort('-publishedAt');
  res.status(200).json(ApiResponse.success(posts));
});

export const getAllAdmin = asyncHandler(async (req, res) => {
  const posts = await BlogPost.find()
    .populate('author', 'name')
    .sort('-createdAt');
  res.status(200).json(ApiResponse.success(posts));
});

export const getBySlug = asyncHandler(async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug }).populate('author', 'name avatar');
  if (!post) throw ApiError.notFound('Blog post not found');
  res.status(200).json(ApiResponse.success(post));
});

export const create = asyncHandler(async (req, res) => {
  req.body.author = req.user._id;
  if (req.body.isPublished) req.body.publishedAt = Date.now();
  const post = await BlogPost.create(req.body);
  res.status(201).json(ApiResponse.created(post));
});

export const update = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) throw ApiError.notFound('Blog post not found');
  
  if (req.body.isPublished && !post.isPublished) {
    req.body.publishedAt = Date.now();
  } else if (req.body.isPublished === false) {
    req.body.publishedAt = null;
  }

  const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json(ApiResponse.success(updatedPost));
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findByIdAndDelete(req.params.id);
  if (!post) throw ApiError.notFound('Blog post not found');
  res.status(200).json(ApiResponse.success(null, 'Blog post deleted'));
});

export const togglePublish = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) throw ApiError.notFound('Blog post not found');
  
  post.isPublished = !post.isPublished;
  post.publishedAt = post.isPublished ? Date.now() : null;
  await post.save();
  
  res.status(200).json(ApiResponse.success(post));
});
