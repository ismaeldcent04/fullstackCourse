import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlogs, likeBlogs } from "../reducers/blogReducer";
import { Link } from "react-router-dom";

export const Blog = ({ blog, LoggedUser }) => {
  const dispatch = useDispatch();

  const handleRemoveBlog = async () => {
    try {
      window.confirm(`Are you sure you want to delete this blog?`)
        ? dispatch(deleteBlogs(blog.id))
        : alert("Good choice, everyone is important");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <fieldset>
        <div>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      </fieldset>
    </div>
  );
};
