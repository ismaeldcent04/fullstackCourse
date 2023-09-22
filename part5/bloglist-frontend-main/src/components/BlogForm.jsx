import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlogs, newBlogs } from "../reducers/blogReducer";
import blogServices from "../services/blogServices";

export const BlogForm = () => {
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);

  const handleShowform = () => {
    setIsShown(true);
  };

  const handleHideForm = () => {
    setIsShown(false);
  };

  const handleNewBlog = async (e) => {
    e.preventDefault();
    const title = e.target.Title.value;
    const author = e.target.Author.value;
    const url = e.target.Url.value;
    e.target.Title.value = "";
    e.target.Author.value = "";
    e.target.Url.value = "";

    const newBlog = {
      title,
      author,
      url,
    };

    dispatch(newBlogs(newBlog));
  };
  return (
    <div>
      {isShown && (
        <div>
          <h3>Create new</h3>
          <form onSubmit={handleNewBlog}>
            <div>
              Title:
              <input type="text" name="Title" />
            </div>
            <div>
              Author:
              <input type="text" name="Author" />
            </div>
            <div>
              Url:
              <input type="text" name="Url" />
            </div>
            <div>
              <button type="submit">Create</button>
            </div>
            <div>
              <button onClick={handleHideForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}
      {!isShown && <button onClick={handleShowform}>New Blog</button>}
    </div>
  );
};
