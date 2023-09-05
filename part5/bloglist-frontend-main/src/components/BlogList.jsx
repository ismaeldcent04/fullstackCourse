import React from "react";
import { Blog } from "./Blog";
export const BlogList = ({ blogs, LoggedUser }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog LoggedUser={LoggedUser} key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
