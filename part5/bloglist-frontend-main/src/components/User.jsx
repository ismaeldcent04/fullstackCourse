import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const User = () => {
  const id = useParams().id;
  const user = useSelector((state) => {
    return state.users.find((user) => user.id === id);
  });
  if (!user) {
    return null;
  }
  return (
    <div>
      <h1>{user.name}</h1>
      <h3>Added blogs</h3>
      {user.blogs.map((blog) => (
        <li>{blog.title}</li>
      ))}
    </div>
  );
};
