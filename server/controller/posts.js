import { postRepository } from "../models/post.js";

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = await postRepository.createAndSave({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  const { entityId, ...rest } = newPost.toJSON();
  res.status(201).json({ data: { id: newPost.entityId, ...rest } });
};

export const getPosts = async (req, res) => {
  const { page } = req.query;
  const limit = 8;
  const offset = (page - 1) * limit;
  if (!page) {
    res.status(400).json({ message: "Enter count and offset" });
  }
  const posts = await postRepository.search().sortDescending("createdAt").return.page(offset, limit);
  const postsCount = await postRepository.search().sortDescending("createdAt").return.count();
  const newPosts = posts.map((item) => {
    const { entityId, ...rest } = item.toJSON();
    return { id: item.entityId, ...rest };
  });

  res.status(200).json({ data: newPosts, currentPage: Number(page), numberOfPages: Math.ceil(postsCount / limit) });
};

export const getPost = async (req, res) => {
  const data = await postRepository.fetch(req.params.id);
  if (!data.title) {
    return res.status(404).json({ message: "No post with that id" });
  }
  const { entityId, ...rest } = data.toJSON();
  res.status(200).json({ data: { id: data.entityId, ...rest } });
};

export const getMyPosts = async (req, res) => {
  const posts = await postRepository.search().sortDescending("createdAt").return.all();
  const newPosts = posts
    .map((item) => {
      const { entityId, ...rest } = item.toJSON();
      return { id: item.entityId, ...rest };
    })
    .filter((item) => item.creator === req.userId);

  res.status(200).json({ newPosts });
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags, page } = req.query;
  const limit = 8;
  const offset = (page - 1) * limit;

  const posts = await postRepository
    .search()
    .sortDescending("createdAt")
    .where("title")
    .match(searchQuery)
    .or("tags")
    .match(tags)
    .page(offset, limit);

  const postsCount = await postRepository
    .search()
    .sortDescending("createdAt")
    .where("title")
    .match(searchQuery)
    .or("tags")
    .match(tags)
    .return.count();
  const newPosts = posts.map((item) => {
    const { entityId, ...rest } = item.toJSON();
    return { id: item.entityId, ...rest };
  });
  res.status(200).json({ data: newPosts, currentPage: Number(page), numberOfPages: Math.ceil(postsCount / limit) });
};

export const getSuggestedPosts = async (req, res) => {
  const { tags } = req.query;
  const posts = await postRepository.search().where("tags").match(tags).return.all();
  const newPosts = posts.map((item) => {
    const { entityId, ...rest } = item.toJSON();
    return { id: item.entityId, ...rest };
  });
  res.status(200).json({ data: newPosts });
};

export const updatePost = async (req, res) => {
  const post = await postRepository.fetch(req.params.id);
  if (!post.title) {
    return res.status(404).json({ message: "No post with that id" });
  }
  if (req.userId !== post.creator) {
    return res.status(400).json({ message: "Unauthorized, only creator of post can update" });
  }
  if (req.body.title) {
    post.title = req.body.title;
  }
  if (req.body.message) {
    post.message = req.body.message;
  }
  if (req.body.name) {
    post.name = req.body.name;
  }
  if (req.body.likes) {
    post.likes = req.body.likes;
  }
  if (req.body.tags) {
    post.tags = req.body.tags;
  }
  if (req.body.selectedFile) {
    post.selectedFile = req.body.selectedFile;
  }
  if (req.body.comments) {
    post.comments = req.body.comments;
  }

  await postRepository.save(post);
  const { entityId, ...rest } = post.toJSON();
  res.status(200).json({ data: { id: post.entityId, ...rest } });
};

export const deletePost = async (req, res) => {
  const post = await postRepository.fetch(req.params.id);
  if (!post.title) {
    return res.status(404).json({ message: "No post with that id" });
  }
  if (req.userId !== post.creator) {
    return res.status(400).json({ message: "Unauthorized, only creator of post can delete" });
  }
  await postRepository.remove(req.params.id);
  res.status(200).json({ message: "post deleted successfully" });
};

export const commentPost = async (req, res) => {
  const { value } = req.body;
  const post = await postRepository.fetch(req.params.id);
  if (!post.title) {
    return res.status(404).json({ message: "No post with that id" });
  }
  if (!post.comments) {
    post.comments = [];
  }
  post.comments = [...post.comments, value] ?? [];
  await postRepository.save(post);
  const { entityId, ...rest } = post.toJSON();
  res.status(200).json({ data: { id: post.entityId, ...rest } });
};

export const likePost = async (req, res) => {
  let post = await postRepository.fetch(req.params.id);
  if (!post.title) {
    return res.status(400).json({ message: "Enter a comment" });
  }
  if (!post.likes) {
    post.likes = [];
  }
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes = [...post.likes, req.userId];
  } else {
    post.likes = post?.likes?.filter((id) => id !== String(req.userId));
  }
  await postRepository.save(post);
  const { entityId, ...rest } = post.toJSON();
  res.status(200).json({ data: { id: post.entityId, ...rest } });
};
