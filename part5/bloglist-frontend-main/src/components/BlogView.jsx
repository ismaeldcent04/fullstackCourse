import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteBlogs, likeBlogs } from "../reducers/blogReducer";

export const BlogView = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  const handleRemoveBlog = async () => {
    try {
      window.confirm(`Are you sure you want to delete this blog?`)
        ? dispatch(deleteBlogs(blog.id))
        : alert("Good choice, everyone is important");
    } catch (error) {
      console.log(error);
    }
  };

  if (!blog) return null;

  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes}{" "}
        <button onClick={dispatch(() => likeBlogs(blog))}>like</button>
      </p>
      <p>added by {blog.author}</p>
      <button onClick={handleRemoveBlog}>Remove blog</button>
    </div>
  );
};
