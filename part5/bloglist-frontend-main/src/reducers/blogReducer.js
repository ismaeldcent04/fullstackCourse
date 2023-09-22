import { createSlice } from "@reduxjs/toolkit";
import blogServices from "../services/blogServices";
export const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    createBlogs(state, action) {
      return [...state, action.payload];
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  };
};

export const newBlogs = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogServices.create(newBlog);
    dispatch(createBlogs(blog));
  };
};

export const deleteBlogs = (id) => {
  return async (dispatch) => {
    await blogServices.remove(id);
    dispatch(setBlogs());
  };
};

export const likeBlogs = (blog) => {
  return async (dispatch) => {
    await blogServices.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });
    dispatch(setBlogs());
  };
};

export const { setBlogs, createBlogs, removeBlogs } = blogSlice.actions;

export default blogSlice.reducer;
